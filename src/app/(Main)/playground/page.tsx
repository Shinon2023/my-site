"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AxesHelper, GridHelper, ArrowHelper, Vector3 } from "three";
import { ResetCamera } from "@/components/math/components/reset-camera";
import { Button } from "@/components/ui/button";

function PlaygroundPage() {
  const [reset, setReset] = useState(false);

  return (
    <div className="flex w-full">
      <Canvas camera={{ position: [10, 10, 10], fov: 75 }}>
        <ResetCamera />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        <primitive object={new AxesHelper(5)} />

        <primitive object={new GridHelper(10, 10, 0x00ff00, 0x00ff00)} />

        <primitive
          object={new GridHelper(10, 10, 0xff0000, 0xff0000)}
          rotation={[Math.PI / 2, 0, 0]}
        />

        <primitive
          object={new GridHelper(10, 10, 0x0000ff, 0x0000ff)}
          rotation={[0, 0, Math.PI / 2]}
        />

        <primitive
          object={
            new ArrowHelper(
              new Vector3(1, 2, 1).normalize(),
              new Vector3(0, 0, 0),
              new Vector3(1, 2, 1).length(),
              0xffff00
            )
          }
        />
      </Canvas>
    </div>
  );
}

export default PlaygroundPage;
