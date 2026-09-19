"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicWorldGeometryProps {
  elapsedTime: number; // 0.0s to 14.5s
}

export default function CinematicWorldGeometry({ elapsedTime }: CinematicWorldGeometryProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ideaSeedRef = useRef<THREE.Group>(null);
  const scienceGroupRef = useRef<THREE.Group>(null);
  const techGroupRef = useRef<THREE.Group>(null);
  const silhouetteRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;

  // Minimal slow floating space dust for cinematic depth (Foreground / Midground)
  const particles = useMemo(() => {
    const count = isMobile ? 35 : 65;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 7.5;
      positions[i + 1] = (Math.random() - 0.5) * 5.5;
      positions[i + 2] = (Math.random() - 0.5) * 5.5;
    }
    return positions;
  }, [isMobile]);

  // Molecular Node coordinates (Scene 04 Science)
  const molecularNodes = useMemo(() => {
    const pts: [number, number, number][] = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pts.push([Math.cos(angle) * 1.38, Math.sin(angle * 2) * 0.32, Math.sin(angle) * 1.38]);
    }
    return pts;
  }, []);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.015;
      particlesRef.current.rotation.x = t * 0.008;
    }

    if (!groupRef.current) return;

    // Active during Scene 03 (Idea: 3.4s) through Scene 06 (Sustainability: 10.4s)
    const isVisible = elapsedTime >= 3.3 && elapsedTime <= 10.6;
    groupRef.current.visible = isVisible;

    if (isVisible) {
      let scale = 1.0;

      // 1. Scene 03: Idea Seed (3.4s - 5.0s)
      if (elapsedTime < 5.0) {
        const enterT = THREE.MathUtils.smoothstep(elapsedTime, 3.4, 4.4);
        scale = THREE.MathUtils.lerp(0.1, isMobile ? 0.65 : 1.1, enterT);
        if (ideaSeedRef.current) ideaSeedRef.current.visible = true;
        if (scienceGroupRef.current) scienceGroupRef.current.visible = false;
        if (techGroupRef.current) techGroupRef.current.visible = false;
      }
      // 2. Scene 04: Science Geometry (5.0s - 6.8s)
      else if (elapsedTime < 6.8) {
        scale = isMobile ? 0.65 : 1.15;
        if (ideaSeedRef.current) ideaSeedRef.current.visible = false;
        if (scienceGroupRef.current) scienceGroupRef.current.visible = true;
        if (techGroupRef.current) techGroupRef.current.visible = false;
      }
      // 3. Scene 05: Technology & Silhouette Teaser (6.8s - 8.6s)
      else if (elapsedTime < 8.6) {
        scale = isMobile ? 0.65 : 1.15;
        if (ideaSeedRef.current) ideaSeedRef.current.visible = false;
        if (scienceGroupRef.current) scienceGroupRef.current.visible = false;
        if (techGroupRef.current) techGroupRef.current.visible = true;
      }
      // 4. Scene 06: Convergence into Earth Atmosphere (8.6s - 10.4s)
      else {
        const exitT = THREE.MathUtils.smoothstep(elapsedTime, 8.6, 10.2);
        scale = THREE.MathUtils.lerp(isMobile ? 0.65 : 1.15, isMobile ? 0.25 : 0.5, exitT);
        if (ideaSeedRef.current) ideaSeedRef.current.visible = false;
        if (scienceGroupRef.current) scienceGroupRef.current.visible = false;
        if (techGroupRef.current) techGroupRef.current.visible = true;
      }

      groupRef.current.scale.setScalar(scale);

      if (ideaSeedRef.current) {
        ideaSeedRef.current.rotation.y += safeDelta * 0.35;
        ideaSeedRef.current.rotation.x += safeDelta * 0.2;
      }

      if (scienceGroupRef.current) {
        scienceGroupRef.current.rotation.y -= safeDelta * 0.28;
        scienceGroupRef.current.rotation.z += safeDelta * 0.2;
      }

      if (techGroupRef.current) {
        techGroupRef.current.rotation.y += safeDelta * 0.32;
        techGroupRef.current.rotation.x += safeDelta * 0.16;
      }

      if (silhouetteRef.current) {
        silhouetteRef.current.rotation.y = Math.sin(t * 0.8) * 0.15;
      }
    }
  });

  return (
    <>
      {/* Subtle Floating Dust for Cinematic 3D Depth */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.018}
          color="#38bdf8"
          transparent
          opacity={0.3}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <group ref={groupRef} position={[0, 0, 0]} visible={false}>
        {/* SCENE 03: IDEA SEED (Expanding Geometric Octahedron Wireframe) */}
        <group ref={ideaSeedRef} visible={false}>
          <mesh scale={0.7}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.75} />
          </mesh>
          <mesh scale={0.22}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={2.2} />
          </mesh>
        </group>

        {/* SCENE 04: SCIENCE (Harmonic Orbital Curves & Molecular Nodes) */}
        <group ref={scienceGroupRef} visible={false}>
          <mesh rotation={[Math.PI / 6, 0, Math.PI / 4]}>
            <torusGeometry args={[1.35, 0.007, 16, 64]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
            <torusGeometry args={[1.2, 0.005, 16, 64]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
          </mesh>
          {molecularNodes.map((pos, idx) => (
            <mesh key={idx} position={pos}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#38bdf8"
                emissiveIntensity={1.3}
                roughness={0.15}
              />
            </mesh>
          ))}
        </group>

        {/* SCENE 05: TECHNOLOGY (Engineered Metallic Rings & Backlit Silhouette Teaser) */}
        <group ref={techGroupRef} visible={false}>
          {/* Main Metallic Orbital Ring */}
          <mesh>
            <torusGeometry args={[1.28, 0.013, 16, 64]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.92} />
          </mesh>

          {/* Precision Gimbal Ring */}
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[1.12, 0.011, 16, 64]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={0.6}
              roughness={0.15}
              metalness={0.9}
            />
          </mesh>

          {/* Subtle Backlit Silhouette Teaser for ROBOZAR (Character Outline) */}
          <group ref={silhouetteRef} position={[0, -0.1, 0]} scale={0.52}>
            <mesh position={[0, 0.45, 0]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#050810" roughness={0.9} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.16, 0.55, 16]} />
              <meshStandardMaterial color="#050810" roughness={0.9} metalness={0.1} />
            </mesh>
            <mesh position={[0.28, 0.05, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
              <meshStandardMaterial color="#050810" roughness={0.9} metalness={0.1} />
            </mesh>
            <mesh position={[-0.28, 0.05, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
              <meshStandardMaterial color="#050810" roughness={0.9} metalness={0.1} />
            </mesh>
            {/* Soft Cyan Rim Glow on Silhouette */}
            <pointLight position={[0, 0.5, -0.6]} intensity={3.0} color="#38bdf8" distance={2} />
          </group>
        </group>
      </group>
    </>
  );
}
