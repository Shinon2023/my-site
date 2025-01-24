"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CameraView } from "@/utils/types/three-js";

interface CameraResetState {
  CameraView: CameraView;
  isReset: boolean;
  errorMessage?: string;
}

const initialState: CameraResetState = {
  CameraView: "Perspective",
  isReset: false,
  errorMessage: undefined,
};

const resetSlice = createSlice({
  name: "cameraReset",
  initialState,
  reducers: {
    toggleCamera: (state, action: PayloadAction<CameraView>) => {
      state.isReset = !state.isReset;
      state.CameraView = action.payload;
    },
    toggleReset: (state) => {
      // state.isReset = !state.isReset;
      state.isReset = !state.isReset;
    },
    resetToDefault: (state) => {
      state.CameraView = "Perspective";
      state.isReset = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  toggleReset,
  toggleCamera,
  resetToDefault,
  setError,
  clearError,
} = resetSlice.actions;
export default resetSlice.reducer;
