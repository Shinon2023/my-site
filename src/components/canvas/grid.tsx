"use client";

import React from "react";
import {
  Line,
  LineSegments,
  BufferGeometry,
  LineBasicMaterial,
  Vector3,
  Float32BufferAttribute,
} from "three";
import { Text, Billboard } from "@react-three/drei";

interface CreateAxisTicksParams {
    axis: "x" | "y" | "z";
    length: number;
    color: number;
}

function createAxisTicks({ axis, length, color }: CreateAxisTicksParams): LineSegments {
    const tickSize = 0.2;
    const tickSpacing = 1;
    const numTicks = Math.floor(length / tickSpacing);

    const points: number[] = [];
    for (let i = -numTicks; i <= numTicks; i++) {
        if (axis === "x") {
            points.push(i * tickSpacing, -tickSize, 0, i * tickSpacing, tickSize, 0);
            points.push(i * tickSpacing, 0, -tickSize, i * tickSpacing, 0, tickSize);
        } else if (axis === "y") {
            points.push(-tickSize, i * tickSpacing, 0, tickSize, i * tickSpacing, 0);
            points.push(0, i * tickSpacing, -tickSize, 0, i * tickSpacing, tickSize);
        } else if (axis === "z") {
            points.push(-tickSize, 0, i * tickSpacing, tickSize, 0, i * tickSpacing);
            points.push(0, -tickSize, i * tickSpacing, 0, tickSize, i * tickSpacing);
        }
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
    const material = new LineBasicMaterial({ color });

    return new LineSegments(geometry, material);
}

function Grid() {
  return (
    <>
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
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      <primitive
        object={createAxisTicks({ axis: "x", length: 10, color: 0xff0000 })}
      />
      <primitive
        object={createAxisTicks({ axis: "y", length: 10, color: 0x00ff00 })}
      />
      <primitive
        object={createAxisTicks({ axis: "z", length: 10, color: 0x0000ff })}
      />

      <Billboard position={[12, 0, 0]}>
        <Text color="white" fontSize={0.5}>
          +X
        </Text>
      </Billboard>
      <Billboard position={[-12, 0, 0]}>
        <Text color="white" fontSize={0.5}>
          -X
        </Text>
      </Billboard>
      <Billboard position={[0, 12, 0]}>
        <Text color="white" fontSize={0.5}>
          +Z
        </Text>
      </Billboard>
      <Billboard position={[0, -12, 0]}>
        <Text color="white" fontSize={0.5}>
          -Z
        </Text>
      </Billboard>
      <Billboard position={[0, 0, 12]}>
        <Text color="white" fontSize={0.5}>
          +Y
        </Text>
      </Billboard>
      <Billboard position={[0, 0, -12]}>
        <Text color="white" fontSize={0.5}>
          -Y
        </Text>
      </Billboard>
    </>
  );
}

export default Grid;
