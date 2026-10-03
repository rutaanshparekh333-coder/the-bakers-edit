import { Baker, FilterState, NlpParsedQuery } from "./types";

const MUMBAI_LOCATIONS = [
  { name: "Bandra West", matchers: ["bandra west", "bandra", "pali hill", "carter road"] },
  { name: "Juhu", matchers: ["juhu", "juhu tara road", "vile parle"] },
  { name: "Andheri West", matchers: ["andheri west", "andheri", "lokhandwala", "versova"] },
  { name: "Powai", matchers: ["powai", "hiranandani"] },
  { name: "Colaba", matchers: ["colaba", "south mumbai", "fort", "cuffe parade"] },
  { name: "Lower Parel", matchers: ["lower parel", "worli", "prabhadevi"] },
  { name: "Khar", matchers: ["khar west", "khar"] },
  { name: "Dadar", matchers: ["dadar", "dadar west", "matunga"] },
];

const CATEGORY_MAP: Record<string, { category: string; aliases: string[] }> = {
  "custom-cakes": {
    category: "Custom Cakes",
    aliases: ["custom cake", "custom cakes", "customised cake", "customized cake", "designer cake", "bento cake", "tier cake"],
  },
  "birthday-cakes": {
    category: "Birthday Cakes",
    aliases: ["birthday cake", "birthday cakes", "birthday", "bday cake"],
  },
  "wedding-cakes": {
    category: "Wedding Cakes",
    aliases: ["wedding cake", "wedding cakes", "wedding", "bridal cake", "reception cake"],
  },
  "cupcakes": {
    category: "Cupcakes",
    aliases: ["cupcake", "cupcakes", "muffins"],
  },
  "cookies": {
    category: "Cookies",
    aliases: ["cookie", "cookies", "nyc cookie", "brookie", "biscuit", "chunky cookie"],
  },
  "brownies": {
    category: "Brownies",
    aliases: ["brownie", "brownies", "fudge brownie", "fudgy brownie"],
  },
  "cheesecakes": {
    category: "Cheesecakes",
    aliases: ["cheesecake", "cheesecakes", "basque cheesecake", "cheese cake", "burnt cheesecake"],
  },
  "pastries": {
    category: "Pastries",
    aliases: ["pastry", "pastries", "tart", "tarts", "croissant", "croissants", "danish", "eclair"],
  },
  "dessert-boxes": {
    category: "Dessert Boxes",
    aliases: ["dessert box", "dessert boxes", "hamper", "gift box", "gifting hamper", "box"],
  },
};

const DIETARY_MAP: Record<string, string[]> = {
  eggless: ["eggless", "without egg", "egg-free", "egg free", "pure veg", "vegetarian"],
  vegan: ["vegan", "plant-based", "dairy-free", "dairy free"],
  "gluten-free": ["gluten-free", "gluten free", "gf"],
  "sugar-free": ["sugar-free", "sugar free", "no sugar"],
  organic: ["organic"],
};

/**
 * Safe string getter that returns a string, avoiding TypeError on null/undefined.
 */
export function safeString(val: unknown): string {
  return val == null ? "" : String(val);
}

/**
 * Safe string normalization helper that guarantees a trimmed lowercase string,
 * avoiding TypeError on null/undefined.
 */
export function safeLower(val: unknown): string {
  return safeString(val).toLowerCase();
}

/**
 * Safe array helper that ensures the returned value is always an array.
 */
export function safeArray<T>(arr: unknown): T[] {
  return Array.isArray(arr) ? arr : [];
}

/**
 * Natural Language Search Parser for The Baker's Edit.
 * Analyzes unstructured freeform text like:
 * "Find me a premium chocolate cake baker in Bandra under ₹2000"
 * and extracts intent, location, budget constraints, dessert types, and dietary preferences.
 */
export function parseNaturalLanguageQuery(query: string): NlpParsedQuery {
  const clean = safeLower(query).trim();
  const parsed: NlpParsedQuery = {
    rawQuery: safeString(query),
    dietaryPreferences: [],
    keywords: [],
    confidence: 0,
  };

  if (!clean) {
    return parsed;
  }

  let matchedAspects = 0;

  // 1. Extract Budget (e.g. "under 2000", "below 1500", "under ₹2000", "under 2k", "within 3000")
  const underMatch = clean.match(
    /(?:under|below|less than|within|max|maximum|budget|upto|up to)\s*(?:rs\.?|inr|₹)?\s*(\d+)(k)?\b/i
  );
  if (underMatch) {
    let amount = parseInt(underMatch[1], 10);
    if (safeLower(underMatch[2]) === "k") {
      amount *= 1000;
    }
    parsed.maxBudget = amount;
    matchedAspects++;
  } else {
    // Check if query is just e.g. "₹2000" or "under 2000"
    const rupeeMatch = clean.match(/(?:₹|rs\.?)\s*(\d+)/i);
    if (rupeeMatch) {
      parsed.maxBudget = parseInt(rupeeMatch[1], 10);
      matchedAspects++;
    }
  }

  // Check between e.g. "between 1000 and 3000"
  const betweenMatch = clean.match(
    /between\s*(?:rs\.?|₹)?\s*(\d+)\s*(?:and|to|-)\s*(?:rs\.?|₹)?\s*(\d+)/i
  );
  if (betweenMatch) {
    parsed.minBudget = parseInt(betweenMatch[1], 10);
    parsed.maxBudget = parseInt(betweenMatch[2], 10);
    matchedAspects++;
  }

  // 2. Extract Location
  for (const loc of MUMBAI_LOCATIONS) {
    if (safeArray(loc.matchers).some((m) => clean.includes(safeLower(m)))) {
      parsed.location = loc.name;
      matchedAspects++;
      break;
    }
  }

  // 3. Extract Dessert / Category
  for (const [, val] of Object.entries(CATEGORY_MAP)) {
    if (safeArray(val.aliases).some((alias) => clean.includes(safeLower(alias)))) {
      parsed.category = val.category;
      parsed.dessertType = val.category;
      matchedAspects++;
      break;
    }
  }

  // If general "cake" or "cakes" mentioned without specific category:
  if (!parsed.category && (clean.includes("cake") || clean.includes("cakes"))) {
    parsed.category = "Custom Cakes";
    parsed.dessertType = "Cakes";
    matchedAspects++;
  }

  // 4. Extract Dietary Preferences
  for (const [diet, terms] of Object.entries(DIETARY_MAP)) {
    if (safeArray(terms).some((term) => clean.includes(safeLower(term)))) {
      parsed.dietaryPreferences.push(diet);
      matchedAspects++;
    }
  }

  // 5. Compute Confidence (0.0 to 1.0)
  parsed.confidence = Math.min(1, matchedAspects * 0.25);

  // Extract residual meaningful keywords
  const stopWords = new Set([
    "find", "me", "a", "an", "the", "in", "at", "for", "under", "below", "with",
    "baker", "bakers", "best", "good", "top", "looking", "want", "need", "near", "please"
  ]);

  parsed.keywords = clean
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  return parsed;
}

/**
 * Multi-facet filtering engine supporting:
 * - Direct text search (baker name, location, specialties, dessert names)
 * - NLP entity extraction matching
 * - Explicit category, area, price range, and rating filters
 */
export function filterBakers(
  bakers: Baker[],
  filters: FilterState
): { filtered: Baker[]; nlpParsed: NlpParsedQuery | null } {
  if (!Array.isArray(bakers)) {
    return { filtered: [], nlpParsed: null };
  }

  const query = safeString(filters?.searchQuery).trim();
  const nlp = query.length > 3 ? parseNaturalLanguageQuery(query) : null;

  const filtered = bakers.filter((baker) => {
    if (!baker) return false;

    const bakerArea = safeLower(baker.area);
    const bakerLocation = safeLower(baker.location);
    const bakerSpecialties = safeLower(baker.specialties);
    const bakerName = safeLower(baker.name);
    const bakerBio = safeLower(baker.shortDescription || baker.bio);
    const specialtyTags = safeArray<string>(baker.specialtyTags);
    const signatureDesserts = safeArray<any>(baker.signatureDesserts);
    const dietaryOptions = safeArray<string>(baker.dietaryOptions);
    const priceMin = Number(baker.priceMin ?? 0);
    const priceMax = Number(baker.priceMax ?? 10000);

    // 1. NLP / Text Match
    if (query) {
      if (nlp && nlp.confidence >= 0.5) {
        // NLP Location check
        if (nlp.location) {
          const locLower = safeLower(nlp.location);
          const matchesLocation =
            bakerArea.includes(locLower) ||
            bakerLocation.includes(locLower) ||
            (bakerArea && locLower.includes(bakerArea));
          if (!matchesLocation) {
            return false;
          }
        }

        // NLP Budget check
        if (nlp.maxBudget && priceMin > nlp.maxBudget) {
          return false;
        }
        if (nlp.minBudget && priceMax < nlp.minBudget) {
          return false;
        }

        // NLP Category check
        if (nlp.category) {
          const catLower = safeLower(nlp.category);
          const matchesSpecialties = bakerSpecialties.includes(catLower);
          const matchesTags = specialtyTags.some((t) =>
            safeLower(t).includes(catLower)
          );
          const matchesDesserts = signatureDesserts.some((d) =>
            safeLower(d?.category).includes(catLower) ||
            safeLower(d?.name).includes(catLower)
          );
          if (!matchesSpecialties && !matchesTags && !matchesDesserts) {
            return false;
          }
        }

        // NLP Dietary check
        if (safeArray(nlp.dietaryPreferences).length > 0) {
          const hasDiet = nlp.dietaryPreferences.every((pref) => {
            const pLower = safeLower(pref);
            if (pLower === "eggless") {
              return dietaryOptions.some((o) => safeLower(o).includes("eggless"));
            }
            if (pLower === "vegan") {
              return (
                dietaryOptions.some((o) => safeLower(o).includes("vegan")) ||
                signatureDesserts.some((d) => Boolean(d?.isVegan))
              );
            }
            if (pLower === "gluten-free" || pLower === "gf") {
              return dietaryOptions.some((o) => safeLower(o).includes("gluten"));
            }
            return dietaryOptions.some((o) => safeLower(o).includes(pLower));
          });
          if (!hasDiet) {
            return false;
          }
        }
      } else {
        // Fallback to literal keyword search
        const qLower = safeLower(query);
        const matchesName = bakerName.includes(qLower);
        const matchesLoc = bakerLocation.includes(qLower) || bakerArea.includes(qLower);
        const matchesSpec = bakerSpecialties.includes(qLower);
        const matchesBio = bakerBio.includes(qLower);
        const matchesTags = specialtyTags.some((t) => safeLower(t).includes(qLower));
        const matchesDessert = signatureDesserts.some(
          (d) =>
            safeLower(d?.name).includes(qLower) ||
            safeLower(d?.category).includes(qLower) ||
            safeLower(d?.description).includes(qLower)
        );

        if (!matchesName && !matchesLoc && !matchesSpec && !matchesBio && !matchesTags && !matchesDessert) {
          return false;
        }
      }
    }

    // 2. Explicit Category filter
    if (filters?.selectedCategory && filters.selectedCategory !== "all") {
      const catLower = safeLower(filters.selectedCategory);
      const hasCategory =
        bakerSpecialties.includes(catLower) ||
        specialtyTags.some((t) => safeLower(t).includes(catLower)) ||
        signatureDesserts.some((d) =>
          safeLower(d?.category).includes(catLower) ||
          safeLower(d?.name).includes(catLower)
        );
      if (!hasCategory) return false;
    }

    // 3. Explicit Area filter
    if (
      filters?.selectedArea &&
      filters.selectedArea !== "All Areas" &&
      filters.selectedArea !== "all"
    ) {
      const areaLower = safeLower(filters.selectedArea);
      const matchesArea =
        (bakerArea && (bakerArea.includes(areaLower) || areaLower.includes(bakerArea))) ||
        (bakerLocation && (bakerLocation.includes(areaLower) || areaLower.includes(bakerLocation)));
      if (!matchesArea) {
        return false;
      }
    }

    // 4. Explicit Price Range filter
    if (filters?.priceRange && filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "under-1000":
          if (priceMin > 1000) return false;
          break;
        case "1000-2500":
          if (priceMax < 1000 || priceMin > 2500) return false;
          break;
        case "2500-5000":
          if (priceMax < 2500 || priceMin > 5000) return false;
          break;
        case "above-5000":
          if (priceMax < 5000) return false;
          break;
      }
    }

    // 5. Explicit Rating filter
    if (filters?.minRating && filters.minRating > 0) {
      const bakerRating = Number(baker.rating ?? 0);
      if (bakerRating < filters.minRating) return false;
    }

    // 6. Explicit Dietary filter
    if (filters?.dietary && filters.dietary !== "all") {
      const dietFilter = safeLower(filters.dietary);
      if (dietFilter === "eggless") {
        const isEggless = dietaryOptions.some((d) => safeLower(d).includes("eggless"));
        if (!isEggless) return false;
      } else if (dietFilter === "vegan") {
        const isVegan =
          dietaryOptions.some((d) => safeLower(d).includes("vegan")) ||
          signatureDesserts.some((d) => Boolean(d?.isVegan));
        if (!isVegan) return false;
      } else if (dietFilter === "gluten-free") {
        const isGf = dietaryOptions.some((d) => safeLower(d).includes("gluten"));
        if (!isGf) return false;
      }
    }

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    switch (filters?.sortBy) {
      case "rating":
        return Number(b.rating ?? 0) - Number(a.rating ?? 0);
      case "reviews":
        return Number(b.reviewCount ?? 0) - Number(a.reviewCount ?? 0);
      case "price-asc":
        return Number(a.priceMin ?? 0) - Number(b.priceMin ?? 0);
      case "price-desc":
        return Number(b.priceMax ?? 0) - Number(a.priceMax ?? 0);
      default:
        return 0; // featured original order
    }
  });

  return { filtered: sorted, nlpParsed: nlp };
}
