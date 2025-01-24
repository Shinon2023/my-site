export type Dimension = "3D" | "2D";

export interface CreateProjectFormValues {
    name: string;
    description: string;
    dimension: Dimension;
}

export type Project = {
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