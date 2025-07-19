import { Database } from "./supabase";

export type Review = Database["public"]["Tables"]["reviews"]["Row"];
