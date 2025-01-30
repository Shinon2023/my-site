type Dimension = "3D" | "2D";

export type Variable = {
  name: string;
  exponent: number;
};

export type Term = {
  coefficient: number;
  variables: Variable[];
};

export type Vector = {
  type: "Vector";
  vector: {
    x: number;
    y: number;
    z: number;
  };
};

export type GeneralEquation = {
  type: "General";
  terms: Term[];
};

export interface asset {
  id: string;
  name: string;
  data: Vector | GeneralEquation;
  project_id: string;
}

type ai_chat = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: Date;
};

export interface CreateProjectFormValues {
  name: string;
  description: string;
  dimension: Dimension;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  dimension: Dimension;
  user_id: string | null;
  ai_chat: ai_chat[] | [];
  setting: any[] | [];
  created_at: Date;
}
