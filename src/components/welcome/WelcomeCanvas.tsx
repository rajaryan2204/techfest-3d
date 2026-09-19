"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import WelcomeCameraRig from "./WelcomeCameraRig";
import WelcomeEarth from "./WelcomeEarth";
import WelcomeTechStructure from "./WelcomeTechStructure";
import ErrorBoundary from "@/components/common/ErrorBoundary";

interface WelcomeCanvasProps {
  progress: number;
}

export default function WelcomeCanvas({ progress }: WelcomeCanvasProps) {
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
          camera={{ position: [0, 0, 5.8], fov: 38 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <WelcomeCameraRig progress={progress} />

          {/* Minimal, subtle cinematic lighting (realistic space atmosphere) */}
          <ambientLight intensity={0.45} />
          <directionalLight position={[5, 3, 5]} intensity={2.2} color="#ffffff" />
          <directionalLight position={[-5, -2, -3]} intensity={0.5} color="#38bdf8" />

          <Suspense fallback={null}>
            <WelcomeEarth progress={progress} />
            <WelcomeTechStructure progress={progress} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
