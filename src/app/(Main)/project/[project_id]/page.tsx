"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { ResetCamera } from "@/components/canvas/components/reset-camera";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import Vectors from "@/components/canvas/vectors";
import Grid from "@/components/canvas/grid";
import {
  GeneralEquation3D,
  GeneralEquation2D,
} from "@/components/canvas/parabola";
import { CanvasEffects } from "@/components/canvas/clipping-plane";

function PlaygroundPage() {
  const assets = useSelector((state: RootState) => state.Asset.assets);

  return (
    <div className="flex w-[60vw] justify-center items-center flex-1 h-full">
      <Canvas orthographic camera={{ position: [10, 10, 10], zoom: 25 }}>
        <ResetCamera />
        <CanvasEffects />
        <Grid />
        {assets.map((asset, index) => {
          const equation = asset.data;

          switch (asset.data.type) {
            case "Vector":
              return <Vectors key={index} vectors={asset.data} />;

            case "General":
              if ("terms" in equation) {
                const variableCount = equation.terms.reduce((count, term) => {
                  const termVariableNames = term.variables.map((v) => v.name);
                  termVariableNames.forEach((name) => {
                    if (!count.includes(name)) count.push(name);
                  });
                  return count;
                }, [] as string[]).length;

                if (variableCount === 1) {
                  return <GeneralEquation2D key={index} equation={equation} />;
                } else if (variableCount > 1) {
                  return <GeneralEquation3D key={index} equation={equation} />;
                } else {
                  return null;
                }
              }

            default:
              return null;
          }
        })}
      </Canvas>
    </div>
  );
}

export default PlaygroundPage;
