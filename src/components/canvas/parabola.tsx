import { Line, BufferGeometry, LineBasicMaterial, Vector3 } from "three";
import { GeneralEquation } from "@/utils/types/project";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function GeneralEquation3D({ equation }: { equation: GeneralEquation }) {
  if (equation.type !== "General") return null;
  const { gl } = useThree();
  gl.localClippingEnabled = true;
  const clipPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 10),
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), 10),
    new THREE.Plane(new THREE.Vector3(0, 1, 0), 10),
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 10),
    new THREE.Plane(new THREE.Vector3(0, 0, 1), 10),
    new THREE.Plane(new THREE.Vector3(0, 0, -1), 10),
  ];
  const vertices = [] as number[];
  const step = 0.075;
  const width = 377.5 * step;

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

      vertices.push(x, z, y);
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
      <meshStandardMaterial
        color="green"
        flatShading
        clippingPlanes={clipPlanes}
        clipShadows
        // wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function GeneralEquation2D({ equation }: { equation: GeneralEquation }) {
  const points = [];
  const calculateY = (x: number): number => {
    let y = 0;
    for (const term of equation.terms) {
      let termValue = term.coefficient;
      for (const variable of term.variables) {
        if (variable.name === "x") {
          termValue *= Math.pow(x, variable.exponent);
        }
      }
      y += termValue;
    }
    return y;
  };

  for (let x = -10; x <= 10; x += 0.2) {
    const y = calculateY(x);
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
