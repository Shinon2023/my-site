"use client";

import { createClient } from "../client";
import { Project } from "@/utils/types/project";

export async function crateProject(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const dimension = formData.get("dimension") as string;
  const supabase = createClient();
  const { error } = await supabase.from("project").insert({
    name: name,
    description: description,
    dimension: dimension,
  });

  if (error) {
    throw error;
  }

  //  console.log(name, description, dimension);
}

export async function getProjects(): Promise<Project[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("project").select("*");
  if (error) {
    throw error;
  }
  return data;
}
