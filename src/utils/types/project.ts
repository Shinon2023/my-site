type Dimension = "3D" | "2D";

type Vector = {
  x: number;
  y: number;
  z: number;
};

type Variable = {
  name: string;
  exponent: number;
};

type Term = {
  coefficient: number;
  variables: Variable[];
};

type DynamicEquation =
  | {
      type: "Vector";
      vector: Vector;
    }
  | {
      type: "General";
      terms: Term[];
    };

export interface asset {
  id: string;
  name: string;
  data: DynamicEquation;
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
