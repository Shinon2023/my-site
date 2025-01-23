"use client";

import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function ResetCameraButton({ reset }: { reset: boolean }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  const resetCamera = () => {
    // Reset camera position and look direction
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    // Reset OrbitControls
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  useEffect(() => {
    if (reset) {
      resetCamera();
    }
  }, [reset]);

  return (
    <>
      <OrbitControls ref={controlsRef} />
    </>
  );
}
