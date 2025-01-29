"use client";

import { supabase } from "../client";

export async function getAssets(user_id: string) {
  const { data, error } = await supabase
    .from("project_assets")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    throw error;
  }
  console.log("API", data);
  return data;
}

export async function crateAsset(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const dimension = formData.get("dimension") as string;
  const user_id = formData.get("user_id") as string;
  const { error } = await supabase.from("project_assets").insert([
    {
      name: name,
      description: description,
      dimension: dimension,
      user_id: user_id,
    },
  ]);
  if (error) {
    throw error;
  }
}
