import { Line, BufferGeometry, LineBasicMaterial, Vector3 } from "three";
import { GeneralEquation } from "@/utils/types/project";

export function GeneralEquation3D({ equation }: { equation: GeneralEquation }) {
  if (equation.type !== "General") return null;

  const vertices = [] as number[];
  const width = 30;
  const step = 0.02;

  const gridSize = Math.round(width / step);

  for (let x = -width / 2; x <= width / 2; x += step) {
    for (let y = -width / 2; y <= width / 2; y += step) {
      let z = 0;

      for (const term of equation.terms) {
        let termValue = term.coefficient;

        for (const variable of term.variables) {
          if (variable.name === "x")
            termValue *= Math.pow(x, variable.exponent);
          if (variable.name === "y")
            termValue *= Math.pow(y, variable.exponent);
        }

        z += termValue;
      }

      if (Math.abs(x) <= 10 && Math.abs(y) <= 10 && Math.abs(z) <= 10) {
        vertices.push(x, z, y);
      }
    }
  }

  const indices = [];

  for (let i = 0; i < gridSize - 1; i++) {
    for (let j = 0; j < gridSize - 1; j++) {
      const a = i * gridSize + j;
      const b = a + 1;
      const c = a + gridSize;
      const d = c + 1;

      if (
        a < vertices.length / 3 &&
        b < vertices.length / 3 &&
        c < vertices.length / 3
      ) {
        indices.push(a, b, c);
      }
      if (
        b < vertices.length / 3 &&
        c < vertices.length / 3 &&
        d < vertices.length / 3
      ) {
        indices.push(b, d, c);
      }
    }
  }

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(vertices)}
          count={vertices.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={new Uint32Array(indices)}
          count={indices.length}
        />
      </bufferGeometry>
      <meshStandardMaterial color="blue" flatShading />
    </mesh>
  );
}

export function Parabola2D() {
  const points = [];
  for (let x = -10; x <= 10; x += 0.2) {
    const y = x * x + 5 * x;
    points.push(new Vector3(x, 0, y));
  }

  const graphGeometry = new BufferGeometry().setFromPoints(points);

  return (
    <primitive
      object={
        new Line(graphGeometry, new LineBasicMaterial({ color: 0xff00ff }))
      }
    />
  );
}
