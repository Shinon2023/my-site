"use server";

import { encodedRedirect } from "@/utils/supabase/utils/encoded-redirect";
import { createServer } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export async function signUpAction(formData: FormData): Promise<void> {
  const email = formData.get("email")?.toString();
  const password1 = formData.get("password1")?.toString();
  const password2 = formData.get("password2")?.toString();

  if (password1 !== password2) {
    return encodedRedirect("error", "/sign-up", "Passwords do not match");
  }
  const password = password1;
  const supabase = await createServer();
  const origin = headers().get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createServer();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", (await supabase.auth.getUser()).data.user?.id)
    .single();
  console.log(profile);

  if (profileError) {
    console.error(profileError);
    return redirect("/dashboard");
  }

  return redirect("/");
};

export const signOutAction = async () => {
  const supabase = await createServer();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
