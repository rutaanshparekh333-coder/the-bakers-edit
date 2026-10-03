/**
 * Database type definitions for The Baker's Edit Supabase project.
 * These match the tables defined in supabase/schema.sql.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      locations: {
        Row: {
          id: string;
          name: string;
          zone: string;
          city: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          zone: string;
          city?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          zone?: string;
          city?: string;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          image_url: string;
          description: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          image_url: string;
          description?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          image_url?: string;
          description?: string | null;
          display_order?: number;
          created_at?: string;
        };
      };
      bakers: {
        Row: {
          id: string;
          name: string;
          slug: string;
          bio: string;
          short_description: string;
          profile_image: string;
          cover_image: string | null;
          location_id: string | null;
          area: string;
          rating: number;
          review_count: number;
          specialties: string;
          specialty_tags: string[];
          price_range: string;
          price_min: number;
          price_max: number;
          instagram: string;
          instagram_handle: string;
          website: string | null;
          phone: string | null;
          lead_time: string;
          dietary_options: string[];
          verified: boolean;
          is_featured: boolean;
          features: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          bio: string;
          short_description: string;
          profile_image: string;
          cover_image?: string | null;
          location_id?: string | null;
          area: string;
          rating?: number;
          review_count?: number;
          specialties: string;
          specialty_tags?: string[];
          price_range: string;
          price_min?: number;
          price_max?: number;
          instagram: string;
          instagram_handle: string;
          website?: string | null;
          phone?: string | null;
          lead_time?: string;
          dietary_options?: string[];
          verified?: boolean;
          is_featured?: boolean;
          features?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bakers"]["Insert"]>;
      };
      desserts: {
        Row: {
          id: string;
          baker_id: string;
          category_id: string | null;
          name: string;
          description: string | null;
          price: number;
          is_eggless: boolean;
          is_vegan: boolean;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          baker_id: string;
          category_id?: string | null;
          name: string;
          description?: string | null;
          price: number;
          is_eggless?: boolean;
          is_vegan?: boolean;
          image_url: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["desserts"]["Insert"]>;
      };
      reviews: {
        Row: {
          id: string;
          baker_id: string;
          author: string;
          rating: number;
          comment: string;
          date: string;
          sentiment_score: number;
          sentiment_label: "Delighted" | "Positive" | "Neutral" | "Negative";
          aspects: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          baker_id: string;
          author: string;
          rating: number;
          comment: string;
          date: string;
          sentiment_score?: number;
          sentiment_label?: "Delighted" | "Positive" | "Neutral" | "Negative";
          aspects?: string[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
      };
      baker_applications: {
        Row: {
          id: string;
          name: string;
          brand_name: string;
          instagram: string;
          location: string;
          specialty: string;
          message: string | null;
          status: "pending" | "reviewed" | "approved" | "declined";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand_name: string;
          instagram: string;
          location: string;
          specialty: string;
          message?: string | null;
          status?: "pending" | "reviewed" | "approved" | "declined";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["baker_applications"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience row types
export type LocationRow = Database["public"]["Tables"]["locations"]["Row"];
export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
export type BakerRow = Database["public"]["Tables"]["bakers"]["Row"];
export type DessertRow = Database["public"]["Tables"]["desserts"]["Row"];
export type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"];
export type BakerApplicationInsert = Database["public"]["Tables"]["baker_applications"]["Insert"];
