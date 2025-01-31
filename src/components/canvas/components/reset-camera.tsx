"use client";

import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/utils/redux/store";
import {
  toggleCamera,
  setError,
  clearError,
  toggleReset,
} from "@/utils/redux/slices/reset-camera-state-Slice";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CameraView } from "@/utils/types/three-js";

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
        case "[+X][-Y]":
          return new THREE.Vector3(0, 10, 0);
        case "[+X][+Z]":
          return new THREE.Vector3(0, 0, 10);
        case "[-Y][+Z]":
          return new THREE.Vector3(10, 0, 0);
        case "[+X][+Y]":
          return new THREE.Vector3(0, -10, 0);
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
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    };

    animate();
  };

  useEffect(() => {
    if (!isReset) {
      try {
        resetCamera(CameraView);
        dispatch(clearError());
        dispatch(toggleReset(true));
      } catch (e) {
        dispatch(setError((e as Error).message));
      }
    }
  }, [isReset]);

  return <OrbitControls ref={controlsRef} />;
}

export function ResetCameraButton() {
  const dispatch = useDispatch();

  const handleClick = (View: CameraView) => {
    dispatch(toggleCamera(View));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Camera</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleClick("Perspective")}>
            Perspective
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClick("[+X][-Y]")}>
            [+X][-Y]
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClick("[+X][+Z]")}>
            [+X][+Z]
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClick("[-Y][+Z]")}>
            [-Y][+Z]
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClick("[+X][+Y]")}>
            [+X][+Y]
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
