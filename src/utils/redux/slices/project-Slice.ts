"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dimension } from "@/utils/types/project";

type Project = {
  id: string;
  name: string | null;
  description: string | null;
  dimension: Dimension;
  user_id: string | null;
  asset: Record<string, any> | null;
  ai_chat: Record<string, any> | null;
  setting: Record<string, any> | null;
  created_at: Date;
};

const initialState = {
  projects: [] as Project[],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProjects: (state, action: PayloadAction<Project[]>) => {
      const newProjects = action.payload;
      const uniqueProjects = newProjects.filter(
        (newProject) =>
          !state.projects.some(
            (existingProject) => existingProject.id === newProject.id
          )
      );
      state.projects = [...state.projects, ...uniqueProjects];
    },
  },
});

export default projectSlice.reducer;
export const { addProjects } = projectSlice.actions;
