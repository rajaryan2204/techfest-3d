"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import AutoplayCameraRig from "./AutoplayCameraRig";
import AutoplayLighting from "./AutoplayLighting";
import AutoplayEarth from "./AutoplayEarth";
import AutoplayTechnology from "./AutoplayTechnology";
import ErrorBoundary from "@/components/common/ErrorBoundary";

interface AutoplayCanvasProps {
  elapsedTime: number;
}

export default function AutoplayCanvas({ elapsedTime }: AutoplayCanvasProps) {
  const [dpr, setDpr] = useState<number[]>([1, 1.5]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 768) {
        setDpr([1, 1.25]);
      } else {
        setDpr([1, 1.6]);
      }
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 bg-[#070709]">
      <ErrorBoundary fallback={<div className="absolute inset-0 bg-[#070709]" />}>
        <Canvas
          dpr={dpr as [number, number]}
          camera={{ position: [0, 0, 6.8], fov: 38 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <AutoplayCameraRig elapsedTime={elapsedTime} />
          <AutoplayLighting elapsedTime={elapsedTime} />

          <Suspense fallback={null}>
            <AutoplayEarth elapsedTime={elapsedTime} />
            <AutoplayTechnology elapsedTime={elapsedTime} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
