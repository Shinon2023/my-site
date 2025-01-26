import {
  Delete,
  ChevronRight,
  ChevronLeft,
  CornerDownLeft,
  X,
  Divide,
  Plus,
  Pi,
  Minus,
  Equal,
} from "lucide-react";
import {
  moveItemForward,
  moveItemBackward,
  addToEquation,
  deleteFromEquation,
} from "@/utils/arrayUtils";

type key = {
  key: string | React.ReactNode;
  action: () => void;
};

type KeyBoard = {
  "(123)": {
    left: key[];
    right: key[];
  };
  "f(x)": {
    left: key[];
    right: key[];
  };
  ABC: {
    GreekLetters: { up: key[]; down: key[] };
    EnglishLetters: { up: key[]; down: key[] };
  };
  "#&?": key[];
};

export const KeyBoard = (
  equation: string[],
  setEquation: React.Dispatch<React.SetStateAction<string[]>>
): KeyBoard => {
  return {
    "(123)": {
      left: [],
      right: [
        {
          key: "7",
          action: () => addToEquation("7", equation, setEquation),
        },
        {
          key: "8",
          action: () => addToEquation("8", equation, setEquation),
        },
        {
          key: "9",
          action: () => addToEquation("9", equation, setEquation),
        },
        {
          key: <X />,
          action: () => addToEquation(" \\times ", equation, setEquation),
        },
        {
          key: <Divide />,
          action: () => addToEquation(" \\div ", equation, setEquation),
        },
        {
          key: "4",
          action: () => addToEquation("4", equation, setEquation),
        },
        {
          key: "5",
          action: () => addToEquation("5", equation, setEquation),
        },
        {
          key: "6",
          action: () => addToEquation("6", equation, setEquation),
        },
        {
          key: <Plus />,
          action: () => addToEquation("+", equation, setEquation),
        },
        {
          key: <Minus />,
          action: () => addToEquation("-", equation, setEquation),
        },
        {
          key: "1",
          action: () => addToEquation("1", equation, setEquation),
        },
        {
          key: "2",
          action: () => addToEquation("2", equation, setEquation),
        },
        {
          key: "3",
          action: () => addToEquation("3", equation, setEquation),
        },
        {
          key: <Equal />,
          action: () => {
            console.log("=");
          },
        },
        {
          key: <Delete />,
          action: () => deleteFromEquation(equation, setEquation),
        },
        {
          key: "0",
          action: () => addToEquation("0", equation, setEquation),
        },
        {
          key: ".",
          action: () => addToEquation(".", equation, setEquation),
        },
        {
          key: <ChevronLeft />,
          action: () => moveItemBackward(equation, setEquation),
        },
        {
          key: <ChevronRight />,
          action: () => moveItemForward(equation, setEquation),
        },
        {
          key: <CornerDownLeft />,
          action: () => {
            console.log("Enter");
          },
        },
      ],
    },
    "f(x)": {
      left: [],
      right: [],
    },
    ABC: {
      GreekLetters: {
        up: [],
        down: [],
      },
      EnglishLetters: {
        up: [],
        down: [],
      },
    },
    "#&?": [],
  };
};
