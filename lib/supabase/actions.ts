"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { devLog } from "../utils";
import { MediaType } from "@/types/trending";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const data = {
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
}

interface ReviewParameters {
  media_id: string;
  media_title: string;
  media_type: MediaType;
  rating: number;
  comment?: string;
  backdrop_path?: string;
}

export const createReview = async (input: ReviewParameters) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase.from("reviews").insert({
    ...input,
    user_id: user.id,
  });

  if (error) {
    return { error: "Could not create review", details: error.message };
  }

  return { success: true };
};

export const sendGlobalMessage = async (content: string) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated.");
  }

  // Fetch user's profile (username & avatar_url)
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username, avatar_url")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    throw new Error("Failed to fetch user profile.");
  }

  const { error, data } = await supabase
    .from("global_messages")
    .insert([
      {
        user_id: user.id,
        username: profile.username,
        avatar_url: profile.avatar_url,
        content: content,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
};
