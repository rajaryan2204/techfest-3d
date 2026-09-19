"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicLightingProps {
  elapsedTime: number; // 0.0s to 14.5s
}

export default function CinematicLighting({ elapsedTime }: CinematicLightingProps) {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const mainDirRef = useRef<THREE.DirectionalLight>(null);
  const rimDirRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    // 1. Ambient Lighting
    if (ambientRef.current) {
      if (elapsedTime < 1.8) {
        // Darkness to subtle discovery
        const t = Math.max(0, (elapsedTime - 0.2) / 1.6);
        ambientRef.current.intensity = THREE.MathUtils.lerp(0.05, 0.4, t);
      } else if (elapsedTime >= 8.6 && elapsedTime < 10.4) {
        // Sustainability: slightly warmer ambient
        ambientRef.current.intensity = 0.55;
      } else {
        ambientRef.current.intensity = 0.4;
      }
    }

    // 2. Main Key Directional Light
    if (mainDirRef.current) {
      if (elapsedTime < 1.8) {
        const t = Math.max(0, (elapsedTime - 0.2) / 1.6);
        mainDirRef.current.intensity = THREE.MathUtils.lerp(0.1, 2.2, t);
      } else if (elapsedTime >= 8.6 && elapsedTime < 10.4) {
        // Sustainability: emerald/cyan tinted key light
        mainDirRef.current.intensity = 2.4;
        mainDirRef.current.color.set("#e2f8f0");
      } else {
        mainDirRef.current.intensity = 2.2;
        mainDirRef.current.color.set("#ffffff");
      }
    }

    // 3. Rim Lighting
    if (rimDirRef.current) {
      if (elapsedTime < 1.8) {
        const t = Math.max(0, (elapsedTime - 0.2) / 1.6);
        rimDirRef.current.intensity = THREE.MathUtils.lerp(0.0, 0.8, t);
      } else if (elapsedTime >= 6.8 && elapsedTime < 8.6) {
        // Cool rim highlight for Technology & Character Silhouette
        rimDirRef.current.intensity = 1.4;
        rimDirRef.current.color.set("#38bdf8");
      } else {
        rimDirRef.current.intensity = 0.7;
        rimDirRef.current.color.set("#0284c7");
      }
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.1} />
      <directionalLight ref={mainDirRef} position={[5, 4, 5]} intensity={0.1} color="#ffffff" />
      <directionalLight ref={rimDirRef} position={[-5, -2, -3]} intensity={0.0} color="#38bdf8" />
    </>
  );
}
