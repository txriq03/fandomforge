// import Profile from "@/types/profile";
import { Profile } from "@/types/tables";
import { devLog } from "../utils";
import { createClient } from "./client";
import { MediaType } from "@/types/trending";
import { Review } from "@/types/tables";

const supabase = createClient();

export const login = async (formData: FormData) => {
  // Data from form
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error logging in:", error);
    throw new Error(error.message);
  }

  return data;
};

export const signup = async (formData: FormData) => {
  const supabase = createClient();

  // Data from form
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const sessionname = formData.get("sessionname") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        sessionname,
      },
    },
  });

  if (error) {
    console.error("Error creating new account:", error);
    throw new Error(error.message);
  }

  return data;
};

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut({ scope: "local" });
};

export async function getOwnProfile(): Promise<Profile | null> {
  const supabase = createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    devLog.error("Error getting session:", sessionError?.message);
    return null;
  } else {
    devLog.log("session:", session);
  }

  devLog.log("session ID:", session.user.id);
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (profileError) {
    devLog.error("Error getting profile:", profileError.message);
    return null;
  }

  return profile;
}

export async function getProfile(username: string): Promise<Profile | null> {
  const supabase = createClient();

  const { data: profile, error: profileError } = await supabase
    .from("extended_profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (profileError) {
    devLog.error(
      "Error getting profile for username:",
      username,
      profileError.message
    );
    return null;
  }

  return profile;
}

export const isSameUser = (user: any, profile: Profile) => {
  return user?.user_metadata.username === profile?.username;
};

export const getPfp = (imageUrl: string | null | undefined) => {
  if (!imageUrl) {
    return "/default_pfp.png";
  }

  return imageUrl;
};

export type BookmarkPayload = {
  media_id: number;
  media_type: "movie" | "tv";
  user_id: string;
};

export const addBookmark = async (payload: BookmarkPayload) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("bookmarks").insert([payload]);

  if (error) throw error;

  return data;
};

export const removeBookmark = async (payload: BookmarkPayload) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("bookmarks").delete().match({
    user_id: payload.user_id,
    media_id: payload.media_id,
    media_type: payload.media_type,
  });

  if (error) throw error;

  return data;
};

export const isBookmarked = async (
  payload: BookmarkPayload
): Promise<boolean> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", payload.user_id)
    .eq("media_id", payload.media_id)
    .eq("media_type", payload.media_type)
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return !!data;
};

export async function getBookmarks(userId: string) {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("media_id, media_type") // adjust this based on your schema
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
}

export const getReviewsForMedia = async (
  mediaId: string,
  mediaType: MediaType
): Promise<Review[]> => {
  const { data, error } = await supabase
    .from("reviews_with_profiles")
    .select("*")
    .eq("media_id", mediaId)
    .eq("media_type", mediaType)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error.message);
    return [];
  }

  return data as Review[];
};
