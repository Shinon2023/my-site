import { Term, Variable } from "@/utils/types/project";

export function parseEquation(input: string): Term[] {
  const termRegex = /([+-]?\d*)([a-zA-Z][\^]?\d*)*/g;
  const variableRegex = /([a-zA-Z])(?:\^(\d+))?/g;

  const terms: Term[] = [];

  input
    .replace(/\s+/g, "")
    .match(termRegex)
    ?.forEach((term) => {
      if (!term) return;

      const [, coefficientStr, varsStr] =
        term.match(/([+-]?\d*)([a-zA-Z\^0-9]*)/) || [];

      const coefficient =
        coefficientStr === "" ||
        coefficientStr === "+" ||
        coefficientStr === "-"
          ? parseInt(coefficientStr + "1", 10)
          : parseInt(coefficientStr, 10);

      const variables: Variable[] = [];

      varsStr.replace(
        variableRegex,
        (_: string, name: string, exponent: string) => {
          variables.push({
            name,
            exponent: exponent ? parseInt(exponent, 10) : 1,
          });
          return "";
        }
      );

      terms.push({ coefficient, variables });
    });

  return terms;
}
