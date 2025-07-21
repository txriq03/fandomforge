import { Database } from "./database.types";

export type Review =
  Database["public"]["Views"]["reviews_with_profiles"]["Row"];
export type Profile = Database["public"]["Views"]["extended_profiles"]["Row"];
export type Follow = Database["public"]["Tables"]["follows"]["Row"];
