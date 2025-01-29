import {
  Delete,
  ChevronRight,
  ChevronLeft,
  CornerDownLeft,
  X,
  Divide,
  Plus,
  ArrowBigUp,
  Minus,
  Equal,
} from "lucide-react";
import {
  moveItemForward,
  moveItemBackward,
  addToEquation,
  deleteFromEquation,
} from "@/utils/arrayUtils";
import { comma } from "postcss/lib/list";

export const KeyboardOptions = ["(123)", "f(x)", "ABC", "#&?"];

const ButtonStyle = {
  common: "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400",
  SpaceBar: "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400",
  Enter: "bg-green-400 hover:bg-green-500 active:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600 dark:active:bg-green-700",
  Delete: "bg-red-400 hover:bg-red-500 active:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700",
  ArrowLeft: "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400",
  ArrowRight: "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400",
  ArrowUp: "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400",
  ArrowDown: "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400",
  ArrowDownLeft: "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400",
  ArrowDownRight: "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400",
}

type key = {
  key: string | React.ReactNode;
  spacial?: boolean;
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
      left: [
        {
          key: "x",
          action: () => addToEquation("x", equation, setEquation),
        },
        {
          key: "y",
          action: () => addToEquation("y", equation, setEquation),
        },
        {
          key: "z",
          action: () => addToEquation("z", equation, setEquation),
        },
        {
          key: "\\pi",
          action: () => addToEquation(" \\pi ", equation, setEquation),
        },
        {
          key: "{x}^2",
          action: () => addToEquation("{}^2", equation, setEquation),
        },
        {
          key: "{x}^{n}",
          action: () => addToEquation("{}^{}", equation, setEquation),
        },
        {
          key: "\\sqrt{x}",
          action: () => addToEquation("\\sqrt{}", equation, setEquation),
        },
        {
          key: "e",
          action: () => addToEquation("e", equation, setEquation),
        },
        {
          key: "<",
          action: () => addToEquation("<", equation, setEquation),
        },
        {
          key: ">",
          action: () => addToEquation(">", equation, setEquation),
        },
        {
          key: "\\bar{x}",
          action: () => addToEquation("\\bar{}", equation, setEquation),
        },
        {
          key: "\\frac{x}{y}",
          action: () => addToEquation("\\frac{}{}", equation, setEquation),
        },
        {
          key: "(",
          action: () => addToEquation("(", equation, setEquation),
        },
        {
          key: ")",
          action: () => addToEquation(")", equation, setEquation),
        },
        {
          key: "|{x}|",
          action: () => addToEquation("|{}|", equation, setEquation),
        },
        {
          key: ",",
          action: () => addToEquation(",", equation, setEquation),
        },
      ],
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
          spacial: true,
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
          spacial: true,
          action: () => moveItemBackward(equation, setEquation),
        },
        {
          key: <ChevronRight />,
          spacial: true,
          action: () => moveItemForward(equation, setEquation),
        },
        {
          key: <CornerDownLeft />,
          spacial: true,
          action: () => {
            console.log("Enter");
          },
        },
      ],
    },
    "f(x)": {
      left: [
        {
          key: "\\sin{x}",
          action: () => addToEquation("\\sin{}", equation, setEquation),
        },
        {
          key: "\\cos{x}",
          action: () => addToEquation("\\cos{}", equation, setEquation),
        },
        {
          key: "\\tan{x}",
          action: () => addToEquation("\\tan{}", equation, setEquation),
        },
        {
          key: "\\sin^{-1}{x}",
          action: () => addToEquation("\\sin^{-1}{}", equation, setEquation),
        },
        {
          key: "\\cos^{-1}{x}",
          action: () => addToEquation("\\cos^{-1}{}", equation, setEquation),
        },
        {
          key: "\\tan^{-1}{x}",
          action: () => addToEquation("\\tan^{-1}{}", equation, setEquation),
        },
        {
          key: "\\ln{x}",
          action: () => addToEquation("\\ln{}", equation, setEquation),
        },
        {
          key: "\\log_{10}{x}",
          action: () => addToEquation("\\log_{10}{}", equation, setEquation),
        },
        {
          key: "\\log_{n}{x}",
          action: () => addToEquation("\\log_{n}{}", equation, setEquation),
        },
        {
          key: "e^{x}",
          action: () => addToEquation("e^{x}", equation, setEquation),
        },
        {
          key: "10^{x}",
          action: () => addToEquation("10^{x}", equation, setEquation),
        },
        {
          key: "\\sqrt[n]{x}",
          action: () => addToEquation("\\sqrt[n]{x}", equation, setEquation),
        },
      ],
      right: [
        {
          key: "\\%",
          action: () => addToEquation("%", equation, setEquation),
        },
        {
          key: "!",
          action: () => addToEquation("!", equation, setEquation),
        },
        {
          key: "\\$",
          action: () => addToEquation("$", equation, setEquation),
        },
        {
          key: "{}^\\circ",
          action: () => addToEquation("90^circ", equation, setEquation),
        },
        {
          key: "\\{",
          action: () => addToEquation("{", equation, setEquation),
        },
        {
          key: "\\}",
          action: () => addToEquation("}", equation, setEquation),
        },
        {
          key: "\\geq",
          action: () => addToEquation("\\geq", equation, setEquation),
        },
        {
          key: "\\leq",
          action: () => addToEquation("\\leq", equation, setEquation),
        },
        {
          key: "\\frac{dy}{dx}",
          action: () => addToEquation("\\frac{dy}{dx}", equation, setEquation),
        },
        {
          key: "\\int",
          action: () => addToEquation("\\int f(x) , dx", equation, setEquation),
        },
        {
          key: "i",
          action: () => addToEquation("i", equation, setEquation),
        },
        {
          key: <Delete />,
          spacial: true,
          action: () => deleteFromEquation(equation, setEquation),
        },
        {
          key: "x_{i}",
          action: () => addToEquation("x_{i}", equation, setEquation),
        },
        {
          key: <ChevronLeft />,
          spacial: true,
          action: () => moveItemBackward(equation, setEquation),
        },
        {
          key: <ChevronRight />,
          spacial: true,
          action: () => moveItemForward(equation, setEquation),
        },
        {
          key: <CornerDownLeft />,
          spacial: true,
          action: () => {
            console.log("Enter");
          },
        },
      ],
    },
    ABC: {
      GreekLetters: {
        up: [],
        down: [],
      },
      EnglishLetters: {
        up: [
          {
            key: "Q",
            action: () => addToEquation("Q", equation, setEquation),
          },
          {
            key: "W",
            action: () => addToEquation("W", equation, setEquation),
          },
          {
            key: "E",
            action: () => addToEquation("E", equation, setEquation),
          },
          {
            key: "R",
            action: () => addToEquation("R", equation, setEquation),
          },
          {
            key: "T",
            action: () => addToEquation("T", equation, setEquation),
          },
          {
            key: "Y",
            action: () => addToEquation("Y", equation, setEquation),
          },
          {
            key: "U",
            action: () => addToEquation("U", equation, setEquation),
          },
          {
            key: "I",
            action: () => addToEquation("I", equation, setEquation),
          },
          {
            key: "O",
            action: () => addToEquation("O", equation, setEquation),
          },
          {
            key: "P",
            action: () => addToEquation("P", equation, setEquation),
          },
          {
            key: "A",
            action: () => addToEquation("A", equation, setEquation),
          },
          {
            key: "S",
            action: () => addToEquation("S", equation, setEquation),
          },
          {
            key: "D",
            action: () => addToEquation("D", equation, setEquation),
          },
          {
            key: "F",
            action: () => addToEquation("F", equation, setEquation),
          },
          {
            key: "G",
            action: () => addToEquation("G", equation, setEquation),
          },
          {
            key: "H",
            action: () => addToEquation("H", equation, setEquation),
          },
          {
            key: "J",
            action: () => addToEquation("J", equation, setEquation),
          },
          {
            key: "K",
            action: () => addToEquation("K", equation, setEquation),
          },
          {
            key: "L",
            action: () => addToEquation("L", equation, setEquation),
          },
          {
            key: <ArrowBigUp />,
            spacial: true,
            action: () => {
              console.log("Up");
            },
          },
          {
            key: "Z",
            action: () => addToEquation("Z", equation, setEquation),
          },
          {
            key: "X",
            action: () => addToEquation("X", equation, setEquation),
          },
          {
            key: "C",
            action: () => addToEquation("C", equation, setEquation),
          },
          {
            key: "V",
            action: () => addToEquation("V", equation, setEquation),
          },
          {
            key: "B",
            action: () => addToEquation("B", equation, setEquation),
          },
          {
            key: "N",
            action: () => addToEquation("N", equation, setEquation),
          },
          {
            key: "M",
            action: () => addToEquation("M", equation, setEquation),
          },
          {
            key: <Delete />,
            spacial: true,
            action: () => deleteFromEquation(equation, setEquation),
          },
          {
            key: "\\alpha\\beta\\gamma",
            spacial: true,
            action: () =>
              addToEquation("\\alpha\\beta\\gamma", equation, setEquation),
          },
          {
            key: ",",
            action: () => addToEquation(",", equation, setEquation),
          },
          {
            key: "(",
            action: () => addToEquation("(", equation, setEquation),
          },
          {
            key: ")",
            action: () => addToEquation(")", equation, setEquation),
          },
          {
            key: "SpaceBar",
            spacial: true,
            action: () => addToEquation(" ", equation, setEquation),
          },
          {
            key: <ChevronLeft />,
            spacial: true,
            action: () => moveItemBackward(equation, setEquation),
          },
          {
            key: <ChevronRight />,
            spacial: true,
            action: () => moveItemForward(equation, setEquation),
          },
          {
            key: <CornerDownLeft />,
            spacial: true,
            action: () => {
              console.log("Enter");
            },
          },
        ],
        down: [],
      },
    },
    "#&?": [],
  };
};
