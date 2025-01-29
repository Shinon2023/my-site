import { configureStore } from "@reduxjs/toolkit";
import CameraResetReducer from "./slices/reset-camera-state-Slice";
import MathVectorReducer from "./slices/assets-Slice";
import assetReducer from "./slices/assets-Slice";
import userReducer, { fetchUser } from "./slices/user-Slice";
import projectReducer from "./slices/project-Slice";
import syncToSupabaseMiddleware, { fetchUserAndProjects } from "./middleware";

export const store = configureStore({
  reducer: {
    CameraReset: CameraResetReducer,
    MathVector: MathVectorReducer,
    Project: projectReducer,
    Asset: assetReducer,
    User: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(syncToSupabaseMiddleware),
});

fetchUserAndProjects();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
