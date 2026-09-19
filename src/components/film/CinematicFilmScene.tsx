"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import FilmLighting from "./FilmLighting";
import FilmEarth from "./FilmEarth";
import FilmDataOverlay from "./FilmDataOverlay";
import FilmTechnologyGeometry from "./FilmTechnologyGeometry";
import FilmCharacter from "./FilmCharacter";
import FilmCameraRig from "./FilmCameraRig";
import ErrorBoundary from "@/components/common/ErrorBoundary";

interface CinematicFilmSceneProps {
  progress: number;
}

export default function CinematicFilmScene({ progress }: CinematicFilmSceneProps) {
  const [dpr, setDpr] = useState<number[]>([1, 1.5]);

  useEffect(() => {
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
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#070709] pointer-events-none select-none z-10">
      <ErrorBoundary
        fallback={
          <div className="fixed inset-0 bg-[#070709] opacity-40 pointer-events-none" />
        }
      >
        <Canvas
          dpr={dpr as [number, number]}
          camera={{ position: [0, 0, 6.2], fov: 38 }}
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
          <FilmCameraRig progress={progress} />
          <Suspense fallback={null}>
            <FilmLighting />
            <FilmEarth progress={progress} />
            <FilmDataOverlay progress={progress} />
            <FilmTechnologyGeometry progress={progress} />
            <FilmCharacter progress={progress} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
