"use client";

import { supabase } from "@/utils/supabase/client";
import { Project } from "@/utils/types/project";

export async function crateProject(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const dimension = formData.get("dimension") as string;
  const { error } = await supabase.from("project").insert({
    name: name,
    description: description,
    dimension: dimension,
  });

  if (error) {
    throw error;
  }
}

export async function getProject(project_id: string): Promise<Project> {
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .eq("id", project_id)
    .single();
  if (error) {
    throw error;
  }
  return data;
}

export async function getProjects(user_id: string): Promise<Project[]> {
  console.log(user_id);
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    console.error("Failed to fetch projects:", error);
    throw new Error("Failed to fetch projects");
  }
  return data;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("project").delete().eq("id", id);
  if (error) {
    throw error;
  }
}
