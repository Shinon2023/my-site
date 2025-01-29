"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { asset } from "@/utils/types/project";
import { getAssets } from "@/utils/supabase/api/assets";

export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async (user_id: string) => {
    return await getAssets(user_id);
  }
);

const initialState = {
  assets: [] as asset[],
  loading: false,
  error: null as string | null,
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    cacheAssets: (state, action: PayloadAction<asset[]>) => {
      state.assets = action.payload;
    },
    addNewAsset: (state, action: PayloadAction<asset>) => {
      const existingIdSet = new Set(state.assets.map((a) => a.id));
      if (!existingIdSet.has(action.payload.id)) {
        state.assets.push(action.payload);
      }
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.assets = state.assets.filter((asset) => asset.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.assets = action.payload;
        state.loading = false;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { addNewAsset, removeAsset, cacheAssets } = assetSlice.actions;
export default assetSlice.reducer;
