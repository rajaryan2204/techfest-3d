"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

// 02 PLEXUS: Algorithmic Torus Knot & Quantum Neural Lattice (0.28 to 0.42)
function PlexusObject({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    const p = scrollStore.currentProgress;

    if (groupRef.current) {
      if (p < 0.27 || p > 0.43) {
        groupRef.current.visible = false;
      } else {
        groupRef.current.visible = true;
        let factor = 1.0;
        if (p < 0.31) factor = THREE.MathUtils.smoothstep(p, 0.27, 0.31);
        else if (p > 0.39) factor = 1.0 - THREE.MathUtils.smoothstep(p, 0.39, 0.43);

        const targetX = isMobile ? 0.35 : 1.35;
        const targetY = isMobile ? 0.52 : 0.0;
        const floatY = Math.sin(t * 1.3) * 0.035;

        groupRef.current.position.set(
          targetX + (1 - factor) * (isMobile ? 1.0 : 2.5),
          targetY + floatY,
          isMobile ? 0.0 : 0.5
        );
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.2, isMobile ? 0.65 : 1.15, factor));

        const mouseGazeX = !isMobile ? state.pointer.x * 0.16 : 0;
        const mouseGazeY = !isMobile ? -state.pointer.y * 0.08 : 0;

        if (coreRef.current) {
          coreRef.current.rotation.x += safeDelta * 0.3;
          coreRef.current.rotation.y += safeDelta * 0.4;
        }
        if (wireRef.current) {
          wireRef.current.rotation.x -= safeDelta * 0.2;
          wireRef.current.rotation.z += safeDelta * 0.35;
        }

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          mouseGazeX,
          safeDelta * 3.0
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mouseGazeY,
          safeDelta * 3.0
        );
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Studio Lighting for Plexus */}
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.5} color="#38bdf8" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.5} color="#818cf8" />

      {/* Main Knot Geometry */}
      <mesh ref={coreRef}>
        <torusKnotGeometry args={[0.7, 0.2, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Cyan Wireframe */}
      <mesh ref={wireRef} scale={1.02}>
        <torusKnotGeometry args={[0.7, 0.2, 64, 16, 2, 3]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Glowing Quantum Core Sphere */}
      <mesh scale={0.32}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// 03 KARYARACHNA: Faceted Sustainable Architecture Polyhedron (0.42 to 0.56)
function KaryarachnaObject({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    const p = scrollStore.currentProgress;

    if (groupRef.current) {
      if (p < 0.41 || p > 0.57) {
        groupRef.current.visible = false;
      } else {
        groupRef.current.visible = true;
        let factor = 1.0;
        if (p < 0.45) factor = THREE.MathUtils.smoothstep(p, 0.41, 0.45);
        else if (p > 0.53) factor = 1.0 - THREE.MathUtils.smoothstep(p, 0.53, 0.57);

        const targetX = isMobile ? 0.35 : 1.35;
        const targetY = isMobile ? 0.52 : 0.0;
        const floatY = Math.sin(t * 1.1) * 0.035;

        groupRef.current.position.set(
          targetX + (1 - factor) * (isMobile ? 1.0 : 2.5),
          targetY + floatY,
          isMobile ? 0.0 : 0.5
        );
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.2, isMobile ? 0.65 : 1.15, factor));

        const mouseGazeX = !isMobile ? state.pointer.x * 0.16 : 0;
        const mouseGazeY = !isMobile ? -state.pointer.y * 0.08 : 0;

        if (coreRef.current) {
          coreRef.current.rotation.x += safeDelta * 0.35;
          coreRef.current.rotation.y += safeDelta * 0.28;
        }
        if (ringRef.current) {
          ringRef.current.rotation.z += safeDelta * 0.45;
          ringRef.current.rotation.x += safeDelta * 0.2;
        }

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          mouseGazeX,
          safeDelta * 3.0
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mouseGazeY,
          safeDelta * 3.0
        );
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Studio Lighting for Karyarachna */}
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.5} color="#34d399" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.5} color="#94a3b8" />

      {/* Faceted Polyhedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#18181b"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Emerald Wireframe Shell */}
      <mesh scale={1.03}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial
          color="#34d399"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Sustainable Orbit Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#059669"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>
    </group>
  );
}

// 04 KERMIS: Intersecting Gyro Rings & Esports Core (0.56 to 0.70)
function KermisObject({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    const p = scrollStore.currentProgress;

    if (groupRef.current) {
      if (p < 0.55 || p > 0.71) {
        groupRef.current.visible = false;
      } else {
        groupRef.current.visible = true;
        let factor = 1.0;
        if (p < 0.59) factor = THREE.MathUtils.smoothstep(p, 0.55, 0.59);
        else if (p > 0.67) factor = 1.0 - THREE.MathUtils.smoothstep(p, 0.67, 0.71);

        const targetX = isMobile ? 0.35 : 1.35;
        const targetY = isMobile ? 0.52 : 0.0;
        const floatY = Math.sin(t * 1.3) * 0.035;

        groupRef.current.position.set(
          targetX + (1 - factor) * (isMobile ? 1.0 : 2.5),
          targetY + floatY,
          isMobile ? 0.0 : 0.5
        );
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.2, isMobile ? 0.65 : 1.2, factor));

        if (ring1Ref.current) ring1Ref.current.rotation.x += safeDelta * 0.55;
        if (ring2Ref.current) ring2Ref.current.rotation.y += safeDelta * 0.7;
        if (ring3Ref.current) ring3Ref.current.rotation.z += safeDelta * 0.45;

        const mouseGazeX = !isMobile ? state.pointer.x * 0.16 : 0;
        const mouseGazeY = !isMobile ? -state.pointer.y * 0.08 : 0;

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          mouseGazeX,
          safeDelta * 3.0
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mouseGazeY,
          safeDelta * 3.0
        );
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Studio Lighting for Kermis */}
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.6} color="#a855f7" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.6} color="#38bdf8" />

      {/* Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.95, 0.02, 16, 64]} />
        <meshStandardMaterial color="#27272a" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.8, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[0.65, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#7e22ce"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Center Plasma Core */}
      <mesh>
        <dodecahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.95}
          emissive="#a855f7"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

// 05 ELECTRICA: Concentric Electromagnetic Field Coils & Smart Grid Core (0.70 to 0.84)
function ElectricaObject({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coilGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    const p = scrollStore.currentProgress;

    if (groupRef.current) {
      if (p < 0.69 || p > 0.85) {
        groupRef.current.visible = false;
      } else {
        groupRef.current.visible = true;
        let factor = 1.0;
        if (p < 0.73) factor = THREE.MathUtils.smoothstep(p, 0.69, 0.73);
        else if (p > 0.81) factor = 1.0 - THREE.MathUtils.smoothstep(p, 0.81, 0.85);

        const targetX = isMobile ? 0.35 : 1.35;
        const targetY = isMobile ? 0.52 : 0.0;
        const floatY = Math.sin(t * 1.0) * 0.035;

        groupRef.current.position.set(
          targetX + (1 - factor) * (isMobile ? 1.0 : 2.5),
          targetY + floatY,
          isMobile ? 0.0 : 0.5
        );
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.2, isMobile ? 0.65 : 1.15, factor));

        if (coilGroupRef.current) {
          coilGroupRef.current.rotation.z += safeDelta * 0.45;
          coilGroupRef.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.6) * 0.15;
        }

        const mouseGazeX = !isMobile ? state.pointer.x * 0.16 : 0;
        const mouseGazeY = !isMobile ? -state.pointer.y * 0.08 : 0;

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          mouseGazeX,
          safeDelta * 3.0
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mouseGazeY,
          safeDelta * 3.0
        );
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Studio Lighting for Electrica */}
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.7} color="#38bdf8" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.5} color="#f59e0b" />

      <group ref={coilGroupRef}>
        {[0, 0.25, -0.25, 0.5, -0.5].map((offsetZ, i) => (
          <mesh key={i} position={[0, 0, offsetZ]}>
            <torusGeometry args={[0.72 - Math.abs(offsetZ) * 0.35, 0.02, 16, 64]} />
            <meshStandardMaterial
              color="#0f172a"
              roughness={0.2}
              metalness={0.9}
              emissive="#0284c7"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
        {/* Center High-Voltage Conductor */}
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 1.4, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.95}
            emissive="#38bdf8"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </group>
  );
}

// 06 MECHANICA: Precision Machined Geometric Transmission (0.84 to 0.98)
function MechanicaObject({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const gearRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    const p = scrollStore.currentProgress;

    if (groupRef.current) {
      if (p < 0.83 || p > 0.99) {
        groupRef.current.visible = false;
      } else {
        groupRef.current.visible = true;
        let factor = 1.0;
        if (p < 0.87) factor = THREE.MathUtils.smoothstep(p, 0.83, 0.87);
        else if (p > 0.95) factor = 1.0 - THREE.MathUtils.smoothstep(p, 0.95, 0.99);

        const targetX = isMobile ? 0.35 : 1.35;
        const targetY = isMobile ? 0.52 : 0.0;
        const floatY = Math.sin(t * 1.2) * 0.035;

        groupRef.current.position.set(
          targetX + (1 - factor) * (isMobile ? 1.0 : 2.5),
          targetY + floatY,
          isMobile ? 0.0 : 0.5
        );
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.2, isMobile ? 0.65 : 1.15, factor));

        if (coreRef.current) coreRef.current.rotation.x += safeDelta * 0.45;
        if (gearRingRef.current) gearRingRef.current.rotation.y += safeDelta * 0.35;

        const mouseGazeX = !isMobile ? state.pointer.x * 0.16 : 0;
        const mouseGazeY = !isMobile ? -state.pointer.y * 0.08 : 0;

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          mouseGazeX,
          safeDelta * 3.0
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mouseGazeY,
          safeDelta * 3.0
        );
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Studio Lighting for Mechanica */}
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.6} color="#ffffff" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.6} color="#f59e0b" />

      {/* Main Machined Core */}
      <mesh ref={coreRef}>
        <cylinderGeometry args={[0.65, 0.65, 0.3, 8]} />
        <meshStandardMaterial
          color="#18181b"
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Outer Wireframe Hull */}
      <mesh scale={1.03}>
        <cylinderGeometry args={[0.65, 0.65, 0.3, 8]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Outer Planetary Gear Ring */}
      <mesh ref={gearRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.018, 16, 64]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

export default function AbstractObjects() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  return (
    <group>
      <PlexusObject isMobile={isMobile} />
      <KaryarachnaObject isMobile={isMobile} />
      <KermisObject isMobile={isMobile} />
      <ElectricaObject isMobile={isMobile} />
      <MechanicaObject isMobile={isMobile} />
    </group>
  );
}
