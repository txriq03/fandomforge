import { devLog } from "../utils";
import { createClient } from "./client";

export const login = async (formData: FormData) => {
  const supabase = createClient();

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

export async function getProfile() {
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
  } else {
    devLog.log("Profile:", profile);
  }

  return profile;
}
