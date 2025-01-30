import { parseEquation } from "@/utils/func/parse-equation";

describe("parseEquation", () => {
  it("should parse '5x^2 + 3xy + 12x + 5y - 3' correctly", () => {
    const input = "5x^2 + 3xy + 12x + 5y - 3";
    const expectedOutput = [
      { coefficient: 5, variables: [{ name: "x", exponent: 2 }] },
      {
        coefficient: 3,
        variables: [
          { name: "x", exponent: 1 },
          { name: "y", exponent: 1 },
        ],
      },
      { coefficient: 12, variables: [{ name: "x", exponent: 1 }] },
      { coefficient: 5, variables: [{ name: "y", exponent: 1 }] },
      { coefficient: -3, variables: [] },
    ];

    expect(parseEquation(input)).toEqual(expectedOutput);
  });

  it("should parse '-7x^3 + 4y - 2' correctly", () => {
    const input = "-7x^3 + 4y - 2";
    const expectedOutput = [
      { coefficient: -7, variables: [{ name: "x", exponent: 3 }] },
      { coefficient: 4, variables: [{ name: "y", exponent: 1 }] },
      { coefficient: -2, variables: [] },
    ];

    expect(parseEquation(input)).toEqual(expectedOutput);
  });

  it("should handle 'x^2 - y^2 + xy - 5' correctly", () => {
    const input = "x^2 - y^2 + xy - 5";
    const expectedOutput = [
      { coefficient: 1, variables: [{ name: "x", exponent: 2 }] },
      { coefficient: -1, variables: [{ name: "y", exponent: 2 }] },
      {
        coefficient: 1,
        variables: [
          { name: "x", exponent: 1 },
          { name: "y", exponent: 1 },
        ],
      },
      { coefficient: -5, variables: [] },
    ];

    expect(parseEquation(input)).toEqual(expectedOutput);
  });

  it("should handle single term '3x' correctly", () => {
    const input = "3x";
    const expectedOutput = [
      { coefficient: 3, variables: [{ name: "x", exponent: 1 }] },
    ];

    expect(parseEquation(input)).toEqual(expectedOutput);
  });

  it("should handle constant '-10' correctly", () => {
    const input = "-10";
    const expectedOutput = [{ coefficient: -10, variables: [] }];

    expect(parseEquation(input)).toEqual(expectedOutput);
  });

  it("should handle empty string correctly", () => {
    const input = "";
    const expectedOutput: any[] = [];

    expect(parseEquation(input)).toEqual(expectedOutput);
  });
});
