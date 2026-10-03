import { getSupabaseClient } from "@/lib/supabase/client";
import * as seedData from "@/data/seedData";
import { Baker, Category, Occasion } from "@/lib/types";

const localBakers = (seedData as any).localBakers || [];
const localCategories = (seedData as any).localCategories || [];
const localAreas = (seedData as any).localAreas || [];
const occasions = (seedData as any).occasions || [];

export async function getBakers(): Promise<Baker[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return localBakers;
  }

  try {
    const client = supabase as any;

    const { data, error } = await client
      .from("bakers")
      .select("*, desserts(*), reviews(*)")
      .order("rating", { ascending: false });

    if (error) {
      console.error(
        "Supabase baker query error:",
        JSON.stringify(error, null, 2)
      );
      return localBakers;
    }

    if (!data || data.length === 0) {
      return localBakers;
    }

    return data.map((b: any) => ({
      id: String(b?.id ?? ""),
      name: String(b?.name ?? ""),
      slug: String(b?.slug ?? ""),
      bio: String(b?.bio ?? ""),
      shortDescription: String(b?.short_description ?? b?.shortDescription ?? ""),
      profileImage: String(b?.profile_image ?? b?.profileImage ?? ""),
      coverImage: b?.cover_image ?? b?.coverImage ?? undefined,
      location: String(b?.location ?? b?.area ?? ""),
      area: b?.area
        ? String(b.area).split(",")[0].trim()
        : b?.location
        ? String(b.location).split(",")[0].trim()
        : "",
      rating: Number(b?.rating ?? 5),
      reviewCount:
        b?.review_count ??
        b?.reviewCount ??
        (Array.isArray(b?.reviews) ? b.reviews.length : 0),
      specialties: String(b?.specialties ?? ""),
      specialtyTags: Array.isArray(b?.specialty_tags)
        ? b.specialty_tags.filter((t: any) => t != null).map(String)
        : Array.isArray(b?.specialtyTags)
        ? b.specialtyTags.filter((t: any) => t != null).map(String)
        : [],
      priceRange: String(b?.price_range ?? b?.priceRange ?? "₹₹"),
      priceMin: Number(b?.price_min ?? b?.priceMin ?? 0),
      priceMax: Number(b?.price_max ?? b?.priceMax ?? 10000),
      instagram: String(b?.instagram ?? ""),
      website: b?.website ?? undefined,
      phone: b?.phone ?? undefined,
      leadTime: String(b?.lead_time ?? b?.leadTime ?? "24-48 hours notice"),
      dietaryOptions: Array.isArray(b?.dietary_options)
        ? b.dietary_options.filter((o: any) => o != null).map(String)
        : Array.isArray(b?.dietaryOptions)
        ? b.dietaryOptions.filter((o: any) => o != null).map(String)
        : [],
      verified: Boolean(b?.verified ?? true),
      features: b?.features ?? {},

      signatureDesserts: Array.isArray(b?.desserts)
        ? b.desserts.map((d: any) => ({
            id: String(d?.id ?? ""),
            bakerId: String(d?.baker_id ?? d?.bakerId ?? b?.id ?? ""),
            name: String(d?.name ?? ""),
            category: String(d?.category ?? ""),
            price: Number(d?.price ?? 0),
            description: String(d?.description ?? ""),
            isEggless: Boolean(d?.is_eggless ?? d?.isEggless),
            isVegan: Boolean(d?.is_vegan ?? d?.isVegan),
            image: String(d?.image_url ?? d?.image ?? ""),
          }))
        : Array.isArray(b?.signatureDesserts)
        ? b.signatureDesserts.map((d: any) => ({
            id: String(d?.id ?? ""),
            bakerId: String(d?.bakerId ?? b?.id ?? ""),
            name: String(d?.name ?? ""),
            category: String(d?.category ?? ""),
            price: Number(d?.price ?? 0),
            description: String(d?.description ?? ""),
            isEggless: Boolean(d?.isEggless),
            isVegan: Boolean(d?.isVegan),
            image: String(d?.image ?? ""),
          }))
        : [],

      reviews: Array.isArray(b?.reviews)
        ? b.reviews.map((r: any) => ({
            id: String(r?.id ?? ""),
            bakerId: String(r?.baker_id ?? r?.bakerId ?? b?.id ?? ""),
            author: String(r?.author ?? "Anonymous"),
            rating: Number(r?.rating ?? 5),
            date: String(r?.date ?? ""),
            comment: String(r?.comment ?? ""),
            sentimentScore: Number(r?.sentiment_score ?? r?.sentimentScore ?? 0),
            sentimentLabel: r?.sentiment_label ?? r?.sentimentLabel ?? "Positive",
            aspects: Array.isArray(r?.aspects)
              ? r.aspects.filter((a: any) => a != null).map(String)
              : [],
          }))
        : [],
    }));
  } catch (error) {
    console.error(
      "Unexpected baker loading error:",
      error
    );

    return localBakers;
  }
}

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return localCategories;
  }

  try {
    const client = supabase as any;

    const { data, error } = await client
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error(
        "Supabase category query error:",
        JSON.stringify(error, null, 2)
      );
      return localCategories;
    }

    if (!data || data.length === 0) {
      return localCategories;
    }

    return data.map((c: any) => ({
      id: String(c?.id ?? ""),
      name: String(c?.name ?? ""),
      slug: String(c?.slug ?? ""),
      description: String(c?.description ?? ""),
      image: String(c?.image ?? c?.image_url ?? ""),
      itemCount: Number(c?.item_count ?? c?.itemCount ?? 0),
    }));
  } catch (error) {
    console.error(
      "Unexpected category loading error:",
      error
    );

    return localCategories;
  }
}

export async function getAreas(): Promise<string[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return localAreas;
  }

  try {
    const client = supabase as any;

    const { data, error } = await client
      .from("locations")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error(
        "Supabase location query error:",
        JSON.stringify(error, null, 2)
      );
      return localAreas;
    }

    if (!data || data.length === 0) {
      return localAreas;
    }

    return data
      .map((location: any) => String(location?.name ?? "").trim())
      .filter(Boolean);
  } catch (error) {
    console.error(
      "Unexpected location loading error:",
      error
    );

    return localAreas;
  }
}

export function getLocalBakers(): Baker[] {
  return localBakers;
}

export function getLocalCategories(): Category[] {
  return localCategories;
}

export function getLocalAreas(): string[] {
  return localAreas;
}

export function getOccasions(): Occasion[] {
  return occasions;
}

export async function submitBakerApplication(application: {
  name: string;
  brandName: string;
  instagram: string;
  location: string;
  specialty: string;
  message?: string;
}) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      success: false,
      error: "Supabase is not available.",
    };
  }

  try {
    const client = supabase as any;

    const { data, error } = await client
      .from("baker_applications")
      .insert({
        name: application.name,
        brand_name: application.brandName,
        instagram: application.instagram,
        location: application.location,
        specialty: application.specialty,
        message: application.message || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error(
        "Baker application error:",
        JSON.stringify(error, null, 2)
      );

      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(
      "Unexpected application error:",
      error
    );

    return {
      success: false,
      error:
        "Something went wrong while submitting the application.",
    };
  }
}