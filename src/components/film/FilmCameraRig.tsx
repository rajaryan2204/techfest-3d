"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FilmCameraRigProps {
  progress: number;
}

export default function FilmCameraRig({ progress }: FilmCameraRigProps) {
  const currentPos = useRef(new THREE.Vector3(0, 0, 5.8));
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

  // 5 Grand Scenes Camera Waypoints
  const waypoints = [
    { p: 0.00, pos: new THREE.Vector3(0, 0, 5.8), target: new THREE.Vector3(0, 0, 0) }, // 1. Space Origin
    { p: 0.20, pos: new THREE.Vector3(0.2, 0.1, 4.4), target: new THREE.Vector3(0.05, 0.05, 0) }, // 2. The Pulse
    { p: 0.45, pos: new THREE.Vector3(0, 0.05, 4.2), target: new THREE.Vector3(0, 0.05, 0) }, // 3. The Pioneer
    { p: 0.68, pos: new THREE.Vector3(-0.15, 0.05, 4.6), target: new THREE.Vector3(0, 0, 0) }, // 4. Sustainability
    { p: 0.85, pos: new THREE.Vector3(0, 0.08, 4.8), target: new THREE.Vector3(0, 0.05, 0) }, // 5. The Reveal
    { p: 1.00, pos: new THREE.Vector3(0, 0, 5.0), target: new THREE.Vector3(0, 0, 0) }, // Enter Exhibition
  ];

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);

    if (reducedMotion.current) {
      state.camera.position.set(0, 0, 4.8);
      state.camera.lookAt(0, 0, 0);
      return;
    }

    // Direct interpolation between waypoints
    let segIdx = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      if (progress >= waypoints[i].p && progress <= waypoints[i + 1].p) {
        segIdx = i;
        break;
      }
    }

    const p0 = waypoints[segIdx];
    const p1 = waypoints[Math.min(segIdx + 1, waypoints.length - 1)];
    const segRange = p1.p - p0.p || 1;
    const segT = THREE.MathUtils.smoothstep((progress - p0.p) / segRange, 0, 1);

    const targetPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, segT);
    const targetLook = new THREE.Vector3().lerpVectors(p0.target, p1.target, segT);

    // Subtle mouse parallax (desktop only)
    if (!isMobile.current) {
      const mouseX = state.pointer.x * 0.12;
      const mouseY = state.pointer.y * 0.06;
      targetPos.x += mouseX;
      targetPos.y += mouseY;
    }

    const cameraLerpSpeed = Math.min(1.0, safeDelta * 6.0);
    currentPos.current.lerp(targetPos, cameraLerpSpeed);
    currentTarget.current.lerp(targetLook, cameraLerpSpeed);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentTarget.current);
  });

  return null;
}
