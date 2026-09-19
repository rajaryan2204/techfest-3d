"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AutoplayCameraRigProps {
  elapsedTime: number; // in seconds
}

export default function AutoplayCameraRig({ elapsedTime }: AutoplayCameraRigProps) {
  const currentPos = useRef(new THREE.Vector3(0, 0, 6.8));
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

  // Narrative Waypoints (0.0s to 15.5s)
  const waypoints = [
    { t: 0.0, pos: new THREE.Vector3(0, 0, 6.8), target: new THREE.Vector3(0, 0, 0) }, // Darkness
    { t: 2.0, pos: new THREE.Vector3(0, 0, 5.6), target: new THREE.Vector3(0, 0, 0) }, // Earth Discovered
    { t: 4.0, pos: new THREE.Vector3(0.12, 0.04, 5.2), target: new THREE.Vector3(0.04, 0.01, 0) }, // Life / One Planet
    { t: 5.5, pos: new THREE.Vector3(0.08, 0.02, 4.4), target: new THREE.Vector3(0.02, 0.01, 0) }, // Curiosity (Close up)
    { t: 7.5, pos: new THREE.Vector3(-0.14, 0.06, 4.8), target: new THREE.Vector3(0, 0, 0) }, // Technology emerges
    { t: 9.5, pos: new THREE.Vector3(0.12, -0.04, 4.7), target: new THREE.Vector3(0, 0, 0) }, // Science geometry
    { t: 11.5, pos: new THREE.Vector3(0, 0.04, 4.9), target: new THREE.Vector3(0, 0, 0) }, // Sustainability (Harmony)
    { t: 13.5, pos: new THREE.Vector3(0.08, 0.06, 4.6), target: new THREE.Vector3(0.03, 0.02, 0) }, // SLIET Destination
    { t: 15.5, pos: new THREE.Vector3(0, 0.05, 5.5), target: new THREE.Vector3(0, 0.02, 0) }, // Final TechFEST Reveal
  ];

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
    const progress = THREE.MathUtils.smoothstep((elapsedTime - p0.t) / range, 0, 1);

    const targetPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, progress);
    const targetLook = new THREE.Vector3().lerpVectors(p0.target, p1.target, progress);

    // Subtle pointer parallax on desktop
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
