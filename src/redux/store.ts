import { configureStore } from "@reduxjs/toolkit";
import CameraResetReducer from "./slices/reset-camera-state-Slice";
import MathVectorReducer from "./slices/math-vector-Slice";

export const store = configureStore({
  reducer: {
    CameraReset: CameraResetReducer,
    MathVector: MathVectorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
