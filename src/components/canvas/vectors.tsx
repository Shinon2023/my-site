"use client";

import React from "react";
import { Text, Billboard } from "@react-three/drei";
import { Vector } from "@/utils/types/project";
import { Line, BufferGeometry, LineBasicMaterial, Vector3 } from "three";
import * as THREE from "three";

function Vectors({ vectors }: { vectors: Vector }) {
  const { x, y, z } = vectors.vector;

  return (
    <React.Fragment>
      <primitive
        object={
          new Line(
            new BufferGeometry().setFromPoints([
              new Vector3(0, 0, 0),
              new Vector3(
                vectors.vector.x,
                vectors.vector.z,
                vectors.vector.y
              ),
            ]),
            new LineBasicMaterial({ color: 0xffff00 })
          )
        }
      />
      <mesh position={[x / 2, z / 2, y / 2]}>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(x, z, y)]} />
          <lineBasicMaterial color={0xffffff} />
        </lineSegments>
      </mesh>
      <mesh position={[x, z, y]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color={0xffff00} />
      </mesh>
      <Billboard position={[x + 0.25, z + 0.25, y + 0.25]}>
        <Text color="white" fontSize={0.3} anchorX="center" anchorY="middle">
          ({x.toFixed(1)}, {y.toFixed(1)}, {z.toFixed(1)})
        </Text>
      </Billboard>
    </React.Fragment>
  );
}

export default Vectors; 
