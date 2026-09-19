"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicCameraProps {
  elapsedTime: number; // 0.0s to 14.5s
}

export default function CinematicCamera({ elapsedTime }: CinematicCameraProps) {
  const currentPos = useRef(new THREE.Vector3(0, 0, 7.2));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const isMobile = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 9 Cinematic Keyframes with intentional orbital curves
  const waypoints = useMemo(
    () => [
      { t: 0.0, pos: new THREE.Vector3(0, 0.1, 7.2), target: new THREE.Vector3(0, 0, 0) },     // Frame 01: Deep Space
      { t: 1.8, pos: new THREE.Vector3(0, 0.05, 5.6), target: new THREE.Vector3(0, 0, 0) },    // Frame 01 -> 02 Approach
      { t: 3.4, pos: new THREE.Vector3(0.18, 0.08, 5.1), target: new THREE.Vector3(0.04, 0.01, 0) },  // Frame 02: Orbit & Question
      { t: 5.0, pos: new THREE.Vector3(0.12, 0.04, 4.5), target: new THREE.Vector3(0.02, 0.01, 0) },  // Frame 03: Idea Seed
      { t: 6.8, pos: new THREE.Vector3(-0.16, 0.08, 4.6), target: new THREE.Vector3(0, 0, 0) },       // Frame 04: Fly Through Science
      { t: 8.6, pos: new THREE.Vector3(0.14, -0.05, 4.6), target: new THREE.Vector3(0, 0, 0) },       // Frame 05: Tech Rings & Silhouette
      { t: 10.4, pos: new THREE.Vector3(0, 0.05, 4.8), target: new THREE.Vector3(0, 0, 0) },         // Frame 06: Sustainability Atmosphere
      { t: 11.8, pos: new THREE.Vector3(0.09, 0.07, 4.5), target: new THREE.Vector3(0.03, 0.02, 0) }, // Frame 07: Follow Light Path
      { t: 13.0, pos: new THREE.Vector3(0.04, 0.04, 4.7), target: new THREE.Vector3(0.02, 0.01, 0) }, // Frame 08: Settle at SLIET
      { t: 14.5, pos: new THREE.Vector3(0, 0.06, 5.8), target: new THREE.Vector3(0, 0.02, 0) },       // Frame 09: Final Title Pullback
    ],
    []
  );

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);

    // Find active narrative segment
    let segIdx = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      if (elapsedTime >= waypoints[i].t && elapsedTime <= waypoints[i + 1].t) {
        segIdx = i;
        break;
      }
    }

    const p0 = waypoints[segIdx];
    const p1 = waypoints[Math.min(segIdx + 1, waypoints.length - 1)];
    const range = p1.t - p0.t || 1;
    
    // Smooth Hermite cubic easing for natural acceleration & deceleration
    const progress = THREE.MathUtils.smoothstep((elapsedTime - p0.t) / range, 0, 1);

    const targetPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, progress);
    const targetLook = new THREE.Vector3().lerpVectors(p0.target, p1.target, progress);

    // Subtle breathing drift
    const time = state.clock.elapsedTime;
    targetPos.x += Math.sin(time * 0.4) * 0.02;
    targetPos.y += Math.cos(time * 0.3) * 0.015;

    // Desktop pointer parallax
    if (!isMobile.current) {
      targetPos.x += state.pointer.x * 0.06;
      targetPos.y += state.pointer.y * 0.03;
    }

    const lerpSpeed = Math.min(1.0, safeDelta * 4.5);
    currentPos.current.lerp(targetPos, lerpSpeed);
    currentTarget.current.lerp(targetLook, lerpSpeed);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentTarget.current);
  });

  return null;
}
