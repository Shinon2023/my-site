"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Line,
  BufferGeometry,
  LineBasicMaterial,
  Vector3,
  GridHelper,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";
import { ResetCamera } from "@/components/math/components/reset-camera";
import { useSelector, useDispatch } from "react-redux";
import { Text, Billboard } from "@react-three/drei";
import { RootState } from "@/utils/redux/store";

function PlaygroundPage() {
  const { Vector3D } = useSelector((state: RootState) => state.MathVector);
  return (
    <div className="flex w-[60vw] justify-center items-center flex-1 h-full">
      <Canvas orthographic camera={{ position: [10, 10, 10], zoom: 50 }}>
        <ResetCamera />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        <primitive object={new GridHelper(20, 20, 0xffffff)} />
        <primitive
          object={new GridHelper(20, 20, 0xffffff)}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <primitive
          object={new GridHelper(20, 20, 0xffffff)}
          rotation={[0, 0, Math.PI / 2]}
        />

        <primitive
          object={
            new Line(
              new BufferGeometry().setFromPoints([
                new Vector3(-11, 0, 0),
                new Vector3(11, 0, 0),
              ]),
              new LineBasicMaterial({ color: 0xff0000 })
            )
          }
        />
        <Billboard position={[12, 0, 0]}>
          <Text color="white" fontSize={0.5} anchorX="center" anchorY="middle">
            +X
          </Text>
        </Billboard>
        <Billboard position={[-12, 0, 0]}>
          <Text color="white" fontSize={0.5} anchorX="center" anchorY="middle">
            -X
          </Text>
        </Billboard>

        <primitive
          object={
            new Line(
              new BufferGeometry().setFromPoints([
                new Vector3(0, -11, 0),
                new Vector3(0, 11, 0),
              ]),
              new LineBasicMaterial({ color: 0x00ff00 })
            )
          }
        />
        <Billboard position={[0, 12, 0]}>
          <Text color="white" fontSize={0.5} anchorX="center" anchorY="middle">
            +Z
          </Text>
        </Billboard>
        <Billboard position={[0, -12, 0]}>
          <Text color="white" fontSize={0.5} anchorX="center" anchorY="middle">
            -Z
          </Text>
        </Billboard>

        <primitive
          object={
            new Line(
              new BufferGeometry().setFromPoints([
                new Vector3(0, 0, -11),
                new Vector3(0, 0, 11),
              ]),
              new LineBasicMaterial({ color: 0x0000ff })
            )
          }
        />
        <Billboard position={[0, 0, 12]}>
          <Text color="white" fontSize={0.5} anchorX="center" anchorY="middle">
            +Y
          </Text>
        </Billboard>
        <Billboard position={[0, 0, -12]}>
          <Text color="white" fontSize={0.5} anchorX="center" anchorY="middle">
            -Y
          </Text>
        </Billboard>

        {Vector3D.map((vector, index) => (
          <React.Fragment key={index}>
            <primitive
              object={
                new Line(
                  new BufferGeometry().setFromPoints([
                    new Vector3(0, 0, 0),
                    new Vector3(vector.x, vector.z, vector.y),
                  ]),
                  new LineBasicMaterial({ color: 0xffff00 })
                )
              }
            />
            <mesh position={[vector.x, vector.z, vector.y]}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshBasicMaterial color={0xff0000} />
            </mesh>
            <Billboard position={[vector.x + 0.1, vector.z + 0.1, vector.y + 0.1]}>
              <Text
                color="white"
                fontSize={0.3}
                anchorX="center"
                anchorY="middle"
              >
                ({vector.x.toFixed(1)}, {vector.z.toFixed(1)},{" "}
                {vector.y.toFixed(1)})
              </Text>
            </Billboard>
          </React.Fragment>
        ))}
      </Canvas>
    </div>
  );
}

export default PlaygroundPage;
