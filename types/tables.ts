import { Database } from "./database.types";

export type Review =
  Database["public"]["Views"]["reviews_with_profiles"]["Row"];

// export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type Profile = Database["public"]["Views"]["extended_profiles"]["Row"];
