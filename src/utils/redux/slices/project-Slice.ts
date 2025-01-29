import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "@/utils/types/project";
import { getProjects } from "@/utils/supabase/api/project";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (userId: string) => {
    return await getProjects(userId);
  }
);

interface ProjectState {
  projects: Project[];
  project_selected: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  project_selected: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      const existingProject = state.projects.find(
        (project) => project.id === action.payload.id
      );
      if (!existingProject) {
        state.projects.push(action.payload);
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    selectProject: (state, action: PayloadAction<string>) => {
      if (state.loading) return;
      const foundProject = state.projects.find((p) => p.id === action.payload);
      if (foundProject) {
        state.project_selected = foundProject;
      } else {
        state.project_selected = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.loading = false;
          state.error = null;
          state.projects = action.payload;
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unknown error occurred";
      });
  },
});

export const { addProject, removeProject, selectProject } =
  projectSlice.actions;
export default projectSlice.reducer;
