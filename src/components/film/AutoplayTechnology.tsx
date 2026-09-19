"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AutoplayTechnologyProps {
  elapsedTime: number; // in seconds
}

export default function AutoplayTechnology({ elapsedTime }: AutoplayTechnologyProps) {
  const groupRef = useRef<THREE.Group>(null);
  const techGroupRef = useRef<THREE.Group>(null);
  const scienceGroupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;

  // Molecular node positions for Science Phase (7.5s - 9.5s)
  const molecularNodes = useMemo(() => {
    const pts: [number, number, number][] = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pts.push([Math.cos(angle) * 1.35, Math.sin(angle * 3) * 0.3, Math.sin(angle) * 1.35]);
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.1);

    if (!groupRef.current) return;

    // Active in Technology, Science & Sustainability phases (5.3s to 11.8s)
    const isVisible = elapsedTime >= 5.3 && elapsedTime <= 11.8;
    groupRef.current.visible = isVisible;

    if (isVisible) {
      let scale = 1.0;
      let techWeight = 0;
      let scienceWeight = 0;

      if (elapsedTime < 7.5) {
        // Technology Phase (5.5s - 7.5s): Emerging from darkness
        const enterT = THREE.MathUtils.smoothstep(elapsedTime, 5.3, 6.8);
        scale = THREE.MathUtils.lerp(0.3, isMobile ? 0.65 : 1.15, enterT);
        techWeight = enterT;
        scienceWeight = 0;
      } else if (elapsedTime < 9.5) {
        // Science Phase (7.5s - 9.5s): Morphing into scientific geometry
        const morphT = THREE.MathUtils.smoothstep(elapsedTime, 7.5, 8.8);
        scale = isMobile ? 0.65 : 1.15;
        techWeight = 1.0 - morphT;
        scienceWeight = morphT;
      } else {
        // Sustainability Phase (9.5s - 11.5s): Contracting back toward Earth & dissolving into harmony
        const contractT = THREE.MathUtils.smoothstep(elapsedTime, 9.5, 11.4);
        scale = THREE.MathUtils.lerp(isMobile ? 0.65 : 1.15, isMobile ? 0.45 : 0.8, contractT);
        scienceWeight = 1.0 - contractT;
        techWeight = 0;
      }

      groupRef.current.scale.setScalar(scale);

      if (techGroupRef.current) {
        techGroupRef.current.rotation.y += safeDelta * 0.35;
        techGroupRef.current.rotation.x += safeDelta * 0.15;
      }

      if (scienceGroupRef.current) {
        scienceGroupRef.current.rotation.y -= safeDelta * 0.25;
        scienceGroupRef.current.rotation.z += safeDelta * 0.2;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, isMobile ? 0.65 : 0, 0]} visible={false}>
      {/* 1. ENGINEERING / MECHANICAL STRUCTURES (Phase 1) */}
      <group ref={techGroupRef}>
        {/* Engineered Metallic Ring */}
        <mesh>
          <torusGeometry args={[1.25, 0.012, 16, 64]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.15} metalness={0.95} />
        </mesh>

        {/* Diagonal Structural Gimbal Ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[1.08, 0.01, 16, 64]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Minimal Precision Octahedral Frame */}
        <mesh scale={0.55}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.4} />
        </mesh>
      </group>

      {/* 2. SCIENCE / MOLECULAR GEOMETRY (Phase 2) */}
      <group ref={scienceGroupRef}>
        {/* Harmonic Orbital Curves */}
        <mesh rotation={[Math.PI / 6, 0, Math.PI / 4]}>
          <torusGeometry args={[1.35, 0.008, 16, 64]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.5} />
        </mesh>

        {/* Molecular Node Coordinates */}
        {molecularNodes.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.02, 12, 12]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.0}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
