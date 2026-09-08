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
 * Natural Language Search Parser for The Baker's Edit.
 * Analyzes unstructured freeform text like:
 * "Find me a premium chocolate cake baker in Bandra under ₹2000"
 * and extracts intent, location, budget constraints, dessert types, and dietary preferences.
 */
export function parseNaturalLanguageQuery(query: string): NlpParsedQuery {
  const clean = query.trim().toLowerCase();
  const parsed: NlpParsedQuery = {
    rawQuery: query,
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
    if (underMatch[2]?.toLowerCase() === "k") {
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
    if (loc.matchers.some((m) => clean.includes(m))) {
      parsed.location = loc.name;
      matchedAspects++;
      break;
    }
  }

  // 3. Extract Dessert / Category
  for (const [, val] of Object.entries(CATEGORY_MAP)) {
    if (val.aliases.some((alias) => clean.includes(alias))) {
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
    if (terms.some((term) => clean.includes(term))) {
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
  const query = filters.searchQuery.trim();
  const nlp = query.length > 3 ? parseNaturalLanguageQuery(query) : null;

  const filtered = bakers.filter((baker) => {
    // 1. NLP / Text Match
    if (query) {
      if (nlp && nlp.confidence >= 0.5) {
        // NLP Location check
        if (nlp.location && !baker.area.toLowerCase().includes(nlp.location.toLowerCase())) {
          return false;
        }

        // NLP Budget check
        if (nlp.maxBudget && baker.priceMin > nlp.maxBudget) {
          return false;
        }
        if (nlp.minBudget && baker.priceMax < nlp.minBudget) {
          return false;
        }

        // NLP Category check
        if (nlp.category) {
          const catLower = nlp.category.toLowerCase();
          const matchesSpecialties = baker.specialties.toLowerCase().includes(catLower);
          const matchesTags = baker.specialtyTags.some((t) => t.toLowerCase().includes(catLower));
          const matchesDesserts = baker.signatureDesserts.some((d) =>
            d.category.toLowerCase().includes(catLower) || d.name.toLowerCase().includes(catLower)
          );
          if (!matchesSpecialties && !matchesTags && !matchesDesserts) {
            return false;
          }
        }

        // NLP Dietary check
        if (nlp.dietaryPreferences.length > 0) {
          const hasDiet = nlp.dietaryPreferences.every((pref) => {
            if (pref === "eggless") {
              return baker.dietaryOptions.some((o) => o.toLowerCase().includes("eggless"));
            }
            if (pref === "vegan") {
              return (
                baker.dietaryOptions.some((o) => o.toLowerCase().includes("vegan")) ||
                baker.signatureDesserts.some((d) => d.isVegan)
              );
            }
            return true;
          });
          if (!hasDiet) {
            return false;
          }
        }
      } else {
        // Fallback to literal keyword search
        const qLower = query.toLowerCase();
        const matchesName = baker.name.toLowerCase().includes(qLower);
        const matchesLoc = baker.location.toLowerCase().includes(qLower);
        const matchesSpec = baker.specialties.toLowerCase().includes(qLower);
        const matchesBio = baker.shortDescription.toLowerCase().includes(qLower);
        const matchesDessert = baker.signatureDesserts.some(
          (d) => d.name.toLowerCase().includes(qLower) || d.category.toLowerCase().includes(qLower)
        );

        if (!matchesName && !matchesLoc && !matchesSpec && !matchesBio && !matchesDessert) {
          return false;
        }
      }
    }

    // 2. Explicit Category filter
    if (filters.selectedCategory && filters.selectedCategory !== "all") {
      const catLower = filters.selectedCategory.toLowerCase();
      const hasCategory =
        baker.specialties.toLowerCase().includes(catLower) ||
        baker.specialtyTags.some((t) => t.toLowerCase().includes(catLower)) ||
        baker.signatureDesserts.some((d) => d.category.toLowerCase().includes(catLower));
      if (!hasCategory) return false;
    }

    // 3. Explicit Area filter
    if (filters.selectedArea && filters.selectedArea !== "All Areas" && filters.selectedArea !== "all") {
      const areaLower = filters.selectedArea.toLowerCase();
      if (!baker.area.toLowerCase().includes(areaLower) && !baker.location.toLowerCase().includes(areaLower)) {
        return false;
      }
    }

    // 4. Explicit Price Range filter
    if (filters.priceRange && filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "under-1000":
          if (baker.priceMin > 1000) return false;
          break;
        case "1000-2500":
          if (baker.priceMax < 1000 || baker.priceMin > 2500) return false;
          break;
        case "2500-5000":
          if (baker.priceMax < 2500 || baker.priceMin > 5000) return false;
          break;
        case "above-5000":
          if (baker.priceMax < 5000) return false;
          break;
      }
    }

    // 5. Explicit Rating filter
    if (filters.minRating && filters.minRating > 0) {
      if (baker.rating < filters.minRating) return false;
    }

    // 6. Explicit Dietary filter
    if (filters.dietary && filters.dietary !== "all") {
      if (filters.dietary === "eggless") {
        const isEggless = baker.dietaryOptions.some((d) => d.toLowerCase().includes("eggless"));
        if (!isEggless) return false;
      } else if (filters.dietary === "vegan") {
        const isVegan =
          baker.dietaryOptions.some((d) => d.toLowerCase().includes("vegan")) ||
          baker.signatureDesserts.some((d) => d.isVegan);
        if (!isVegan) return false;
      } else if (filters.dietary === "gluten-free") {
        const isGf = baker.dietaryOptions.some((d) => d.toLowerCase().includes("gluten"));
        if (!isGf) return false;
      }
    }

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviewCount - a.reviewCount;
      case "price-asc":
        return a.priceMin - b.priceMin;
      case "price-desc":
        return b.priceMax - a.priceMax;
      default:
        return 0; // featured original order
    }
  });

  return { filtered: sorted, nlpParsed: nlp };
}
