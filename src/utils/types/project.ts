export type Dimension = "3D" | "2D";

type Variable = {
  name: string;
  exponent: number;
};

type Term = {
  coefficient: number;
  variables: Variable[];
};

type DynamicEquation = {
  id: string;
  type: "Vector" | "General";
  terms: Term[];
};

export type asset = {
  id: string;
  name: string;
  data: DynamicEquation;
  created_at: Date;
};

type ai_chat = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: Date;
}

export interface CreateProjectFormValues {
  name: string;
  description: string;
  dimension: Dimension;
}

export type Project = {
  id: string;
  name: string;
  description: string | null;
  dimension: Dimension;
  user_id: string | null;
  asset: asset[] | [];
  ai_chat: ai_chat[] | [];
  setting: any[] | [];
  created_at: Date;
};
