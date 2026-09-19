"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AutoplayLightingProps {
  elapsedTime: number; // in seconds
}

export default function AutoplayLighting({ elapsedTime }: AutoplayLightingProps) {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const mainDirRef = useRef<THREE.DirectionalLight>(null);
  const rimDirRef = useRef<THREE.DirectionalLight>(null);
  const slietLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    // 1. Narrative Ambient Light
    if (ambientRef.current) {
      if (elapsedTime < 2.0) {
        // Darkness to subtle discovery
        const t = Math.max(0, (elapsedTime - 0.5) / 1.5);
        ambientRef.current.intensity = THREE.MathUtils.lerp(0.05, 0.35, t);
      } else if (elapsedTime < 9.5) {
        // Nature & Technology emergence
        ambientRef.current.intensity = 0.4;
      } else if (elapsedTime < 11.5) {
        // Sustainability: Slightly warmer natural illumination
        ambientRef.current.intensity = 0.55;
      } else if (elapsedTime < 13.5) {
        // SLIET Transition
        ambientRef.current.intensity = 0.4;
      } else {
        // Final Reveal
        ambientRef.current.intensity = 0.35;
      }
    }

    // 2. Main Directional Key Light
    if (mainDirRef.current) {
      if (elapsedTime < 2.0) {
        const t = Math.max(0, (elapsedTime - 0.5) / 1.5);
        mainDirRef.current.intensity = THREE.MathUtils.lerp(0.1, 2.0, t);
      } else if (elapsedTime >= 9.5 && elapsedTime < 11.5) {
        // Sustainability: slight cyan-emerald warmth
        mainDirRef.current.intensity = 2.4;
        mainDirRef.current.color.set("#e2f8f0");
      } else {
        mainDirRef.current.intensity = 2.0;
        mainDirRef.current.color.set("#ffffff");
      }
    }

    // 3. Rim Lighting
    if (rimDirRef.current) {
      if (elapsedTime < 2.0) {
        const t = Math.max(0, (elapsedTime - 0.2) / 1.8);
        rimDirRef.current.intensity = THREE.MathUtils.lerp(0.0, 0.8, t);
      } else if (elapsedTime >= 5.5 && elapsedTime < 9.5) {
        // Cool scientific rim during Tech & Science
        rimDirRef.current.intensity = 1.2;
        rimDirRef.current.color.set("#38bdf8");
      } else {
        rimDirRef.current.intensity = 0.7;
        rimDirRef.current.color.set("#0284c7");
      }
    }

    // 4. SLIET Focused Destination Light
    if (slietLightRef.current) {
      const isSliet = elapsedTime >= 11.5 && elapsedTime <= 14.0;
      if (isSliet) {
        const t = Math.sin(((elapsedTime - 11.5) / 2.5) * Math.PI);
        slietLightRef.current.intensity = t * 3.5;
      } else {
        slietLightRef.current.intensity = 0;
      }
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.1} />
      <directionalLight ref={mainDirRef} position={[5, 4, 5]} intensity={0.1} color="#ffffff" />
      <directionalLight ref={rimDirRef} position={[-5, -2, -3]} intensity={0.0} color="#38bdf8" />
      <pointLight ref={slietLightRef} position={[0.5, 0.8, 1.2]} intensity={0} color="#38bdf8" distance={4} />
    </>
  );
}
