import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

let supabaseInstance: SupabaseClient<Database> | null = null;

/**
 * Resilient Supabase browser client, typed against the Database schema.
 * Does not expose service role secrets.
 * Safely initializes using public environment variables.
 */
export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  try {
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
    return supabaseInstance;
  } catch (error) {
    console.warn("Supabase client failed to initialize:", error);
    return null;
  }
}
