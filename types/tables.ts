import { Database } from "./supabase";

// export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Review =
  Database["public"]["Views"]["reviews_with_profiles"]["Row"];
