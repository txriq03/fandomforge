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
  const username = formData.get("username") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    console.error("Error creating new account:", error);
    throw new Error(error.message);
  }

  return data;
};
