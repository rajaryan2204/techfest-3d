"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FilmTechnologyGeometryProps {
  progress: number;
}

export default function FilmTechnologyGeometry({ progress }: FilmTechnologyGeometryProps) {
  const groupRef = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const wireShellRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    if (!groupRef.current) return;

    // Active in Scene 5 (0.50 to 0.64)
    let opacity = 0;
    if (progress >= 0.50 && progress <= 0.64) {
      if (progress < 0.53) opacity = (progress - 0.50) / 0.03;
      else if (progress > 0.61) opacity = (0.64 - progress) / 0.03;
      else opacity = 1.0;
    }

    groupRef.current.visible = opacity > 0.01;

    if (groupRef.current.visible) {
      const factor = THREE.MathUtils.smoothstep(progress, 0.50, 0.56);
      const targetScale = THREE.MathUtils.lerp(0.3, 0.95, factor);
      groupRef.current.scale.setScalar(targetScale);

      if (knotRef.current) {
        knotRef.current.rotation.x += safeDelta * 0.35;
        knotRef.current.rotation.y += safeDelta * 0.45;
      }
      if (wireShellRef.current) {
        wireShellRef.current.rotation.y -= safeDelta * 0.3;
        wireShellRef.current.rotation.z += safeDelta * 0.4;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0.65, 0.1, 1.2]} visible={false}>
      <pointLight position={[1.0, 1.0, 1.0]} intensity={2.0} color="#38bdf8" />
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[0.55, 0.16, 96, 24, 2, 3]} />
        <meshStandardMaterial color="#0f172a" roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh ref={wireShellRef} scale={1.03}>
        <torusKnotGeometry args={[0.55, 0.16, 48, 12, 2, 3]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.45} />
      </mesh>
    </group>
  );
}
