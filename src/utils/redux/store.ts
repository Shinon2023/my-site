import { configureStore } from "@reduxjs/toolkit";
import CameraResetReducer from "./slices/reset-camera-state-Slice";
import MathVectorReducer from "./slices/math-vector-Slice";
import projectSlice from "./slices/project-Slice";

export const store = configureStore({
  reducer: {
    CameraReset: CameraResetReducer,
    MathVector: MathVectorReducer,
    Project: projectSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
