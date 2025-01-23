export function Parabola3D({ a = 1, b = 1, c = 0 }) {
  const vertices = [];
  const width = 20;
  const step = 0.5;

  for (let x = -width / 2; x <= width / 2; x += step) {
    for (let y = -width / 2; y <= width / 2; y += step) {
      const z = a * x * x + b * y * y + c;
      vertices.push(x, y, z);
    }
  }

  const indices = [];
  const gridSize = Math.round(width / step);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const a = i * (gridSize + 1) + j;
      const b = a + 1;
      const c = a + gridSize + 1;
      const d = c + 1;

      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(vertices.flat())}
          count={vertices.length}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={new Uint32Array(indices)}
          count={indices.length}
        />
      </bufferGeometry>
      <meshStandardMaterial
        color="blue"
        wireframe
      />
    </mesh>
  );
}
