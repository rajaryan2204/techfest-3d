"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface WelcomeTechStructureProps {
  progress: number;
}

export default function WelcomeTechStructure({ progress }: WelcomeTechStructureProps) {
  const rootRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;

  // Discrete points for the connecting network in Scene 05
  const networkNodes = useMemo(() => {
    const pts: [number, number, number][] = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.35;
      pts.push([
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ]);
    }
    return pts;
  }, []);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;

    if (!rootRef.current) return;

    // Active in Scenes 04, 05, 06, and transitioning in 07 (0.36 to 0.76)
    const isVisible = progress >= 0.36 && progress <= 0.76;
    rootRef.current.visible = isVisible;

    if (isVisible) {
      let scale = 0;
      let opacity = 1.0;

      if (progress < 0.48) {
        // Scene 04: CREATE (0.38 - 0.48) - Emerging from small components
        const enterT = THREE.MathUtils.smoothstep(progress, 0.36, 0.44);
        scale = THREE.MathUtils.lerp(0.2, isMobile ? 0.75 : 1.05, enterT);
      } else if (progress < 0.58) {
        // Scene 05: CONNECT (0.48 - 0.58) - Full structure with network
        scale = isMobile ? 0.75 : 1.05;
      } else if (progress < 0.68) {
        // Scene 06: INNOVATE (0.58 - 0.68) - Sophisticated kinetic structure
        scale = isMobile ? 0.8 : 1.15;
      } else {
        // Scene 07: SUSTAIN (0.68 - 0.76) - Blending into Earth orbit
        const exitT = THREE.MathUtils.smoothstep(progress, 0.68, 0.76);
        scale = THREE.MathUtils.lerp(isMobile ? 0.8 : 1.15, isMobile ? 1.2 : 1.6, exitT);
        opacity = 1.0 - exitT;
      }

      rootRef.current.scale.setScalar(scale);

      const targetX = 0;
      const targetY = isMobile ? 0.15 : 0;
      const targetZ = progress > 0.68 ? THREE.MathUtils.lerp(0, -1.0, (progress - 0.68) / 0.08) : 0;

      rootRef.current.position.set(targetX, targetY + Math.sin(t * 1.2) * 0.025, targetZ);

      if (coreRef.current) {
        coreRef.current.rotation.x += safeDelta * 0.35;
        coreRef.current.rotation.y += safeDelta * 0.45;
      }
      if (shellRef.current) {
        shellRef.current.rotation.y -= safeDelta * 0.25;
        shellRef.current.rotation.z += safeDelta * 0.3;
      }
      if (ring1Ref.current) {
        ring1Ref.current.rotation.x += safeDelta * 0.5;
        ring1Ref.current.rotation.y += safeDelta * 0.2;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.y -= safeDelta * 0.45;
        ring2Ref.current.rotation.z += safeDelta * 0.35;
      }
      if (nodesGroupRef.current) {
        nodesGroupRef.current.rotation.y += safeDelta * 0.15;
      }
    }
  });

  return (
    <group ref={rootRef} visible={false}>
      {/* Central Solid Geometric Core (Faceted Metallic Octahedron) */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.15}
          metalness={0.92}
        />
      </mesh>

      {/* Outer Wireframe Precision Shell */}
      <mesh ref={shellRef} scale={1.04}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Kinetic Coordinate Gyro Rings (Scientific Measurement) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.05, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[0.92, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>

      {/* Network Nodes (Scene 05 Connect) */}
      <group ref={nodesGroupRef}>
        {networkNodes.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.2}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Subtle Studio Key & Rim Lights */}
      <pointLight position={[2, 2, 2.5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-2, -1, -1.5]} intensity={1.5} color="#38bdf8" />
    </group>
  );
}
