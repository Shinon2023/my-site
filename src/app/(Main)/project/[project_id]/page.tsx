"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Line,
  BufferGeometry,
  LineBasicMaterial,
  Vector3,
  GridHelper,
} from "three";
import { ResetCamera } from "@/components/math/components/reset-camera";
import { useSelector } from "react-redux";
import { Text, Billboard } from "@react-three/drei";
import { RootState } from "@/utils/redux/store";

function PlaygroundPage() {
  const { assets } = useSelector((state: RootState) => state.MathVector);
  return (
    <div className="flex w-[60vw] justify-center items-center flex-1 h-full">
      <Canvas orthographic camera={{ position: [10, 10, 10], zoom: 25 }}>
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

        {assets.map(
          (vector, index) =>
            vector.data.type === "Vector" && (
              <React.Fragment key={index}>
                <primitive
                  object={
                    new Line(
                      new BufferGeometry().setFromPoints([
                        new Vector3(0, 0, 0),
                        new Vector3(
                          vector.data.vector.x,

                          vector.data.vector.z,
                          vector.data.vector.y
                        ),
                      ]),
                      new LineBasicMaterial({ color: 0xffff00 })
                    )
                  }
                />
                <mesh
                  position={[
                    vector.data.vector.x,
                    vector.data.vector.z,
                    vector.data.vector.y,
                  ]}
                >
                  <sphereGeometry args={[0.1, 32, 32]} />
                  <meshBasicMaterial color={0xffff00} />
                </mesh>
                <Billboard
                  position={[
                    vector.data.vector.x + 0.25,
                    vector.data.vector.z + 0.25,
                    vector.data.vector.y + 0.25,
                  ]}
                >
                  <Text
                    color="white"
                    fontSize={0.3}
                    anchorX="center"
                    anchorY="middle"
                  >
                    ({vector.data.vector.x.toFixed(1)},{" "}
                    {vector.data.vector.y.toFixed(1)},{" "}
                    {vector.data.vector.z.toFixed(1)})
                  </Text>
                </Billboard>
              </React.Fragment>
            )
        )}
      </Canvas>
    </div>
  );
}

export default PlaygroundPage;
