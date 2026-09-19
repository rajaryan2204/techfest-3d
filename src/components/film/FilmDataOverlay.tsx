"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FilmDataOverlayProps {
  progress: number;
}

export default function FilmDataOverlay({ progress }: FilmDataOverlayProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Subtle data points around the Earth
  const particles = useMemo(() => {
    const count = 48;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.45 + Math.random() * 0.45;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    if (!groupRef.current) return;

    // Active in Scenes 3, 4, 5, and 7
    let opacity = 0;
    if (progress >= 0.22 && progress <= 0.64) {
      if (progress < 0.26) opacity = (progress - 0.22) / 0.04;
      else if (progress > 0.60) opacity = (0.64 - progress) / 0.04;
      else opacity = 1.0;
    } else if (progress >= 0.76 && progress <= 0.88) {
      if (progress < 0.79) opacity = (progress - 0.76) / 0.03;
      else if (progress > 0.85) opacity = (0.88 - progress) / 0.03;
      else opacity = 0.8;
    }

    groupRef.current.visible = opacity > 0.01;

    if (groupRef.current.visible) {
      if (ring1Ref.current) {
        ring1Ref.current.rotation.y += safeDelta * 0.2;
        ring1Ref.current.rotation.x = Math.PI / 6 + Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.y -= safeDelta * 0.22;
        ring2Ref.current.rotation.z = Math.PI / 4;
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.52, 0.006, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.68, 0.005, 16, 64]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.25} />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.025} color="#38bdf8" transparent opacity={0.65} sizeAttenuation />
      </points>
    </group>
  );
}
