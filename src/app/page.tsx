"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AxesHelper, GridHelper, ArrowHelper, Vector3 } from "three";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
        {/* Controls */}
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {/* Axes Helper */}
        <primitive object={new AxesHelper(5)} />

        {/* Grid for XZ Plane */}
        <primitive
          object={
            new GridHelper(10, 10, 0x00ff00, 0x00ff00) // GridHelper(size, divisions, color1, color2)
          }
        />

        {/* Grid for XY Plane */}
        <primitive
          object={new GridHelper(10, 10, 0xff0000, 0xff0000)}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]} // Rotate to align with XY
        />

        {/* Grid for YZ Plane */}
        <primitive
          object={new GridHelper(10, 10, 0x0000ff, 0x0000ff)}
          position={[0, 0, 0]}
          rotation={[0, 0, Math.PI / 2]} // Rotate to align with YZ
        />

        {/* Vector (Arrow Helper) */}
        <primitive
          object={
            new ArrowHelper(
              new Vector3(2, 3, 1).normalize(), // Direction
              new Vector3(0, 0, 0), // Origin
              new Vector3(2, 3, 1).length(), // Length
              0xffff00 // Color
            )
          }
        />
      </Canvas>
    </div>
  );
}
