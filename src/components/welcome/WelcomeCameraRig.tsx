"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WelcomeCameraRigProps {
  progress: number;
}

export default function WelcomeCameraRig({ progress }: WelcomeCameraRigProps) {
  const currentPos = useRef(new THREE.Vector3(0, 0, 5.8));
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

  // 11-Beat Continuous Camera Waypoints
  const waypoints = [
    { p: 0.00, pos: new THREE.Vector3(0, 0, 6.2), target: new THREE.Vector3(0, 0, 0) }, // 00 BLACK
    { p: 0.12, pos: new THREE.Vector3(0, 0, 5.6), target: new THREE.Vector3(0, 0, 0) }, // 01 EARTH
    { p: 0.24, pos: new THREE.Vector3(0.1, 0.05, 4.4), target: new THREE.Vector3(0.05, 0.05, 0) }, // 02 OBSERVE
    { p: 0.34, pos: new THREE.Vector3(-0.08, 0.05, 4.2), target: new THREE.Vector3(0, 0.05, 0) }, // 03 QUESTION
    { p: 0.44, pos: new THREE.Vector3(0, 0.02, 4.6), target: new THREE.Vector3(0, 0, 0) }, // 04 CREATE
    { p: 0.54, pos: new THREE.Vector3(0.12, 0.05, 4.8), target: new THREE.Vector3(0, 0, 0) }, // 05 CONNECT
    { p: 0.64, pos: new THREE.Vector3(-0.1, 0.05, 4.6), target: new THREE.Vector3(0, 0, 0) }, // 06 INNOVATE
    { p: 0.74, pos: new THREE.Vector3(0, 0.05, 5.0), target: new THREE.Vector3(0, 0, 0) }, // 07 SUSTAIN
    { p: 0.84, pos: new THREE.Vector3(0.05, 0.05, 4.5), target: new THREE.Vector3(0.05, 0.05, 0) }, // 08 SLIET
    { p: 0.94, pos: new THREE.Vector3(0, 0.08, 5.2), target: new THREE.Vector3(0, 0.05, 0) }, // 09 TECHFEST
    { p: 1.00, pos: new THREE.Vector3(0, 0, 5.4), target: new THREE.Vector3(0, 0, 0) }, // 10 ENTER
  ];

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);

    // Find active segment
    let segIdx = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      if (progress >= waypoints[i].p && progress <= waypoints[i + 1].p) {
        segIdx = i;
        break;
      }
    }

    const p0 = waypoints[segIdx];
    const p1 = waypoints[Math.min(segIdx + 1, waypoints.length - 1)];
    const range = p1.p - p0.p || 1;
    const t = THREE.MathUtils.smoothstep((progress - p0.p) / range, 0, 1);

    const targetPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, t);
    const targetLook = new THREE.Vector3().lerpVectors(p0.target, p1.target, t);

    // Subtle desktop pointer parallax
    if (!isMobile.current) {
      targetPos.x += state.pointer.x * 0.1;
      targetPos.y += state.pointer.y * 0.05;
    }

    const lerpSpeed = Math.min(1.0, safeDelta * 6.0);
    currentPos.current.lerp(targetPos, lerpSpeed);
    currentTarget.current.lerp(targetLook, lerpSpeed);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentTarget.current);
  });

  return null;
}
