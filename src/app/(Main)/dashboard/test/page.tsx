"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { GridHelper, ArrowHelper, Vector3 } from "three";
import { ResetCamera } from "@/components/math/components/reset-camera";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/utils/redux/store";

function PlaygroundPage() {
  const { Vector3D } = useSelector((state: RootState) => state.MathVector);
  return (
    <div className="flex w-[60vw] justify-center items-center flex-1 h-full">
      <Canvas camera={{ position: [10, 10, 10], fov: 75 }}>
        <ResetCamera />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {/* <primitive object={new AxesHelper(5)} /> */}

        <primitive object={new GridHelper(10, 10, 0xffffff)} />

        <primitive
          object={new GridHelper(10, 10, 0xffffff)}
          rotation={[Math.PI / 2, 0, 0]}
        />

        <primitive
          object={new GridHelper(10, 10, 0xffffff)}
          rotation={[0, 0, Math.PI / 2]}
        />
        {Vector3D.map((vector, index) => (
          <primitive
            key={index}
            object={
              new ArrowHelper(
                new Vector3(vector.x, vector.y, vector.z).normalize(),
                new Vector3(0, 0, 0),
                new Vector3(vector.x, vector.y, vector.z).length(),
                0xffff00
              )
            }
          />
        ))}
      </Canvas>
    </div>
  );
}

export default PlaygroundPage;
