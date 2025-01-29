import { Middleware } from "@reduxjs/toolkit";
import { addProject, removeProject } from "./slices/project-Slice";
import { addNewAsset, removeAsset } from "./slices/assets-Slice";
import { supabase } from "@/utils/supabase/client";
import { store } from "./store";
import { fetchUser } from "./slices/user-Slice";
import { fetchAssets } from "./slices/assets-Slice";
import { fetchProjects } from "./slices/project-Slice";

const syncToSupabaseMiddleware: Middleware = () => (next) => async (action) => {
  next(action);
  const actionType = (action as { type: string }).type;
  try {
    switch (actionType) {
      case addProject.type: {
        const addAction = action as ReturnType<typeof addProject>;
        await supabase.from("project").upsert([addAction.payload]);
        break;
      }

      case removeProject.type: {
        const removeAction = action as ReturnType<typeof removeProject>;
        supabase.from("project").delete().match({ id: removeAction.payload });
        break;
      }

      case addNewAsset.type: {
        const addAssetAction = action as ReturnType<typeof addNewAsset>;
        const asset = addAssetAction.payload;

        const { error: fetchError } = await supabase
          .from("project_assets")
          .insert(asset);

        if (fetchError) {
          console.error("Failed to fetch project:", fetchError);
          return;
        }
        break;
      }

      case removeAsset.type: {
        const removeAssetAction = action as ReturnType<typeof removeAsset>;
        const asset_id = removeAssetAction.payload;

        const { error: fetchError } = await supabase
          .from("project_assets")
          .delete()
          .eq("id", asset_id);

        if (fetchError) {
          console.error("Failed to fetch project:", fetchError);
          return;
        }
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Supabase sync failed:", error);
  }
};

export default syncToSupabaseMiddleware;

export const fetchUserAndProjects = async () => {
  try {
    await store.dispatch(fetchUser());

    const user = store.getState().User.user;

    if (user && user.id) {
      await store.dispatch(fetchProjects(user.id));
      await store.dispatch(fetchAssets(user.id));
    }
  } catch (error) {
    console.error("Error fetching user and projects:", error);
  }
};
