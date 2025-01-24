"use client";

import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  toggleCamera,
  resetToDefault,
  setError,
  clearError,
} from "@/redux/slices/reset-camera-state-Slice";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CameraView } from "@/types/Canvas";

export function ResetCamera() {
  const { camera } = useThree();
  const dispatch = useDispatch();
  const { isReset, CameraView } = useSelector(
    (state: RootState) => state.CameraReset
  );
  const controlsRef = useRef<any>(null);

  const resetCamera = (View: CameraView) => {
    const getTargetPosition = (View: CameraView) => {
      switch (View) {
        case "Perspective":
          return new THREE.Vector3(10, 10, 10);
        case "Top":
          return new THREE.Vector3(0, 10, 0);
        case "Front":
          return new THREE.Vector3(0, 0, 10);
        case "Side":
          return new THREE.Vector3(10, 0, 0);
      }
    };
    const targetPosition = getTargetPosition(View);
    const startPosition = camera.position.clone();
    const duration = 1.5;
    let elapsed = 0;

    const animate = () => {
      elapsed += 0.016;
      const t = Math.min(elapsed / duration, 1);
      camera.position.lerpVectors(startPosition, targetPosition, t);

      camera.lookAt(0, 0, 0);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else if (controlsRef.current) {
        controlsRef.current.update();
      }
    };

    animate();
  };

  useEffect(() => {
    if (isReset) {
      try {
        resetCamera(CameraView);
        dispatch(clearError());
      } catch (e) {
        dispatch(setError((e as Error).message));
      }
    }
    dispatch(resetToDefault());
  }, [isReset]);

  return <OrbitControls ref={controlsRef} />;
}

export function ResetCameraButton() {
  const dispatch = useDispatch();
  const [position, setPosition] = useState<CameraView>("Perspective");

  useEffect(() => {
    dispatch(toggleCamera(position));
  }, [position]);

  console.log(position);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Camera</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={setPosition as any}
        >
          <DropdownMenuRadioItem value="Perspective">
            Perspective
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Front">Front</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Side">Side</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
