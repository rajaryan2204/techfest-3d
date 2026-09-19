"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Lighting from "./Lighting";
import Earth from "./Earth";
import RoboCharacter from "./RoboCharacter";
import AbstractObjects from "./AbstractObjects";
import CameraRig from "./CameraRig";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function Scene() {
  const [dpr, setDpr] = useState<number[]>([1, 1.5]);

  useEffect(() => {
    // Device-aware DPR settings: Mobile -> [1, 1.25], Tablet -> [1, 1.5], Desktop -> [1, 1.75]
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 768) {
        setDpr([1, 1.25]);
      } else if (width <= 1024) {
        setDpr([1, 1.5]);
      } else {
        setDpr([1, 1.75]);
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#070709] pointer-events-none select-none">
      <ErrorBoundary
        fallback={
          <div className="fixed inset-0 bg-[#070709] opacity-30 pointer-events-none" />
        }
      >
        <Canvas
          dpr={dpr as [number, number]}
          camera={{ position: [0, 0, 4.8], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <CameraRig />
          <Suspense fallback={null}>
            <Lighting />
            <Earth />
            <RoboCharacter />
            <AbstractObjects />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
