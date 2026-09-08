import { getSupabaseClient } from "./supabase/client";
import { bakers as localBakers, categories as localCategories, occasions as localOccasions, mumbaiAreas } from "@/data/seedData";
import { Baker, Category, Occasion } from "./types";

/**
 * Resilient Data Access Service.
 * Attempts to retrieve live data from Supabase if reachable;
 * gracefully falls back to local curated seed data without throwing errors or breaking the UI.
 */
export async function getBakers(): Promise<Baker[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return localBakers;
  }

  try {
    const { data, error } = await supabase
      .from("bakers")
      .select("*, signatureDesserts:desserts(*), reviews(*)")
      .order("rating", { ascending: false });

    if (error || !data || data.length === 0) {
      return localBakers;
    }

    type SupabaseBakerRow = {
      id: string;
      name: string;
      slug: string;
      bio: string;
      short_description?: string;
      profile_image: string;
      cover_image?: string;
      area: string;
      rating: number | string;
      review_count?: number;
      specialties: string;
      specialty_tags?: string[];
      price_range: string;
      price_min: number;
      price_max: number;
      instagram: string;
      website?: string;
      phone?: string;
      lead_time?: string;
      dietary_options?: string[];
      verified?: boolean;
      signatureDesserts?: Baker["signatureDesserts"];
      reviews?: Baker["reviews"];
    };

    return (data as unknown as SupabaseBakerRow[]).map((b) => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      bio: b.bio,
      shortDescription: b.short_description || b.bio,
      profileImage: b.profile_image,
      coverImage: b.cover_image,
      location: b.area,
      area: b.area.split(",")[0].trim(),
      rating: Number(b.rating),
      reviewCount: b.review_count || (b.reviews ? b.reviews.length : 0),
      specialties: b.specialties,
      specialtyTags: b.specialty_tags || [],
      priceRange: b.price_range,
      priceMin: b.price_min,
      priceMax: b.price_max,
      instagram: b.instagram,
      website: b.website,
      phone: b.phone,
      leadTime: b.lead_time || "24-48 hours notice",
      dietaryOptions: b.dietary_options || [],
      verified: b.verified ?? true,
      signatureDesserts: b.signatureDesserts || [],
      reviews: b.reviews || [],
    }));
  } catch {
    return localBakers;
  }
}

export function getLocalBakers(): Baker[] {
  return localBakers;
}

export function getCategories(): Category[] {
  return localCategories;
}

export function getOccasions(): Occasion[] {
  return localOccasions;
}

export function getAreas(): string[] {
  return mumbaiAreas;
}
