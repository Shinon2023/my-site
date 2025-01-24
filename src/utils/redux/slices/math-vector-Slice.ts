"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Vector3D = {
  x: number;
  y: number;
  z: number;
}

interface MathVector {
  Vector3D: Vector3D[];
}

const initialState: MathVector = {
  Vector3D: [],
};

const mathVectorSlice = createSlice({
  name: "mathVector",
  initialState,
  reducers: {
    addVector: (state, action: PayloadAction<Vector3D>) => {
      const vector = action.payload;
      state.Vector3D.push({
        x: vector.x,
        y: vector.y,
        z: vector.z,
      });
    },
    removeVector: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.Vector3D.splice(index, 1);
    },
  },
});

export const { addVector, removeVector } = mathVectorSlice.actions;
export default mathVectorSlice.reducer;