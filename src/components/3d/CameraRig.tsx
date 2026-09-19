"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

export default function CameraRig() {
  const currentPos = useRef(new THREE.Vector3(0, 0, 4.8));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const reducedMotion = useRef(false);
  const isMobile = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener("change", handler);

    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Discrete waypoint trajectory across the dedicated 3D Exhibition Track (0.0 to 1.0)
  const waypoints = [
    { progress: 0.0, pos: new THREE.Vector3(0, 0, 4.8), target: new THREE.Vector3(0, 0, 0) }, // Hero
    { progress: 0.14, pos: new THREE.Vector3(-0.2, 0.08, 4.5), target: new THREE.Vector3(-0.05, 0, 0) }, // Earth Transition
    { progress: 0.21, pos: new THREE.Vector3(0.25, 0, 4.3), target: new THREE.Vector3(0.4, 0, 0) }, // 01 ROBOZAR
    { progress: 0.35, pos: new THREE.Vector3(0.25, 0, 4.3), target: new THREE.Vector3(0.4, 0, 0) }, // 02 PLEXUS
    { progress: 0.49, pos: new THREE.Vector3(0.25, 0, 4.3), target: new THREE.Vector3(0.4, 0, 0) }, // 03 KARYARACHNA
    { progress: 0.63, pos: new THREE.Vector3(0.25, 0, 4.3), target: new THREE.Vector3(0.4, 0, 0) }, // 04 KERMIS
    { progress: 0.77, pos: new THREE.Vector3(0.25, 0, 4.3), target: new THREE.Vector3(0.4, 0, 0) }, // 05 ELECTRICA
    { progress: 0.91, pos: new THREE.Vector3(0.25, 0, 4.3), target: new THREE.Vector3(0.4, 0, 0) }, // 06 MECHANICA
    { progress: 1.0, pos: new THREE.Vector3(0.0, 0, 4.8), target: new THREE.Vector3(0.0, 0, 0) }, // Document Flow
  ];

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);

    // 1. Smoothly damp the global scroll progress
    const scrollLerpSpeed = Math.min(1.0, safeDelta * 5.0);
    scrollStore.currentProgress = THREE.MathUtils.lerp(
      scrollStore.currentProgress,
      scrollStore.targetProgress,
      scrollLerpSpeed
    );
    const p = scrollStore.currentProgress;

    // Reduced motion fallback
    if (reducedMotion.current) {
      state.camera.position.set(0, 0, 4.8);
      state.camera.lookAt(0, 0, 0);
      return;
    }

    // 2. Interpolate between discrete waypoints
    let segIdx = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      if (p >= waypoints[i].progress && p <= waypoints[i + 1].progress) {
        segIdx = i;
        break;
      }
    }

    const p0 = waypoints[segIdx];
    const p1 = waypoints[Math.min(segIdx + 1, waypoints.length - 1)];
    const segRange = p1.progress - p0.progress || 1;
    const segT = THREE.MathUtils.smoothstep((p - p0.progress) / segRange, 0, 1);

    const targetPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, segT);
    const targetLook = new THREE.Vector3().lerpVectors(p0.target, p1.target, segT);

    // 3. Subtle mouse parallax (desktop only)
    if (!isMobile.current) {
      const mouseX = state.pointer.x * 0.14;
      const mouseY = state.pointer.y * 0.08;

      targetPos.x += mouseX;
      targetPos.y += mouseY;
      targetLook.x += mouseX * 0.04;
      targetLook.y += mouseY * 0.04;
    }

    // 4. Smooth camera dampening
    const cameraLerpSpeed = Math.min(1.0, safeDelta * 3.8);
    currentPos.current.lerp(targetPos, cameraLerpSpeed);
    currentTarget.current.lerp(targetLook, cameraLerpSpeed);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentTarget.current);
  });

  return null;
}
