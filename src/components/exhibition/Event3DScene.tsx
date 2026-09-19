"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import ErrorBoundary from "@/components/common/ErrorBoundary";

// 1. 01 ROBOZAR Character
function RoboCharacterObject() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/character.glb");
  const { actions, names } = useAnimations(animations, groupRef);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  useEffect(() => {
    if (names && names.length > 0) {
      const idleAction = actions[names[0]];
      idleAction?.reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  const characterGroup = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    cloned.position.set(-center.x, -center.y, -center.z);

    const targetHeight = isMobile ? 1.05 : 1.5;
    const scaleFactor = targetHeight / (size.y || maxDim);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.roughness = 0.35;
          mat.metalness = 0.45;
          mesh.material = mat;
        }
      }
    });

    const wrapper = new THREE.Group();
    wrapper.add(cloned);
    wrapper.scale.setScalar(scaleFactor);
    wrapper.rotation.y = Math.PI / 2;
    return wrapper;
  }, [scene, isMobile]);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const floatY = Math.sin(t * 1.3) * 0.035;
      const floatRot = Math.sin(t * 0.8) * 0.025;

      const targetX = isMobile ? 0 : 0.85;
      const targetY = isMobile ? 0.35 : -0.05;

      groupRef.current.position.set(targetX, targetY + floatY, 0);

      const mouseX = !isMobile ? state.pointer.x * 0.15 : 0;
      const mouseY = !isMobile ? -state.pointer.y * 0.08 : 0;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.PI * 0.05 + mouseX,
        safeDelta * 3.0
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY + floatRot,
        safeDelta * 3.0
      );
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={characterGroup} />
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.8} color="#ffffff" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.5} color="#38bdf8" />
    </group>
  );
}

// 2. 02 PLEXUS Geometric Lattice
function PlexusObject() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const targetX = isMobile ? 0 : 0.85;
      const targetY = isMobile ? 0.35 : 0.0;
      groupRef.current.position.set(targetX, targetY + Math.sin(t * 1.3) * 0.035, 0);

      if (coreRef.current) {
        coreRef.current.rotation.x += safeDelta * 0.3;
        coreRef.current.rotation.y += safeDelta * 0.4;
      }
      if (wireRef.current) {
        wireRef.current.rotation.x -= safeDelta * 0.2;
        wireRef.current.rotation.z += safeDelta * 0.35;
      }

      if (!isMobile) {
        groupRef.current.rotation.y = state.pointer.x * 0.15;
        groupRef.current.rotation.x = -state.pointer.y * 0.08;
      }
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.75 : 1.15}>
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.5} color="#38bdf8" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.5} color="#818cf8" />
      <mesh ref={coreRef}>
        <torusKnotGeometry args={[0.7, 0.2, 128, 32, 2, 3]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh ref={wireRef} scale={1.02}>
        <torusKnotGeometry args={[0.7, 0.2, 64, 16, 2, 3]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh scale={0.32}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.2} roughness={0.1} />
      </mesh>
    </group>
  );
}

// 3. 03 KARYARACHNA Structured Architecture
function KaryarachnaObject() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const targetX = isMobile ? 0 : 0.85;
      const targetY = isMobile ? 0.35 : 0.0;
      groupRef.current.position.set(targetX, targetY + Math.sin(t * 1.1) * 0.035, 0);

      if (coreRef.current) {
        coreRef.current.rotation.x += safeDelta * 0.35;
        coreRef.current.rotation.y += safeDelta * 0.28;
      }
      if (ringRef.current) {
        ringRef.current.rotation.z += safeDelta * 0.45;
      }
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.75 : 1.15}>
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.5} color="#34d399" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.5} color="#94a3b8" />
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial color="#18181b" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh scale={1.03}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 64]} />
        <meshStandardMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.6} roughness={0.1} metalness={0.95} />
      </mesh>
    </group>
  );
}

// 4. 04 KERMIS Gyroscopic Rings
function KermisObject() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const targetX = isMobile ? 0 : 0.85;
      const targetY = isMobile ? 0.35 : 0.0;
      groupRef.current.position.set(targetX, targetY + Math.sin(t * 1.3) * 0.035, 0);

      if (ring1Ref.current) ring1Ref.current.rotation.x += safeDelta * 0.55;
      if (ring2Ref.current) ring2Ref.current.rotation.y += safeDelta * 0.7;
      if (ring3Ref.current) ring3Ref.current.rotation.z += safeDelta * 0.45;
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.75 : 1.2}>
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.6} color="#a855f7" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.6} color="#38bdf8" />
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.95, 0.02, 16, 64]} />
        <meshStandardMaterial color="#27272a" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.8, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.95} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[0.65, 0.02, 16, 64]} />
        <meshStandardMaterial color="#a855f7" emissive="#7e22ce" emissiveIntensity={0.5} roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh>
        <dodecahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.95} emissive="#a855f7" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// 5. 05 ELECTRICA Electromagnetic Coils
function ElectricaObject() {
  const groupRef = useRef<THREE.Group>(null);
  const coilRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const targetX = isMobile ? 0 : 0.85;
      const targetY = isMobile ? 0.35 : 0.0;
      groupRef.current.position.set(targetX, targetY + Math.sin(t * 1.0) * 0.035, 0);

      if (coilRef.current) {
        coilRef.current.rotation.z += safeDelta * 0.45;
        coilRef.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.6) * 0.15;
      }
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.75 : 1.15}>
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.7} color="#38bdf8" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.5} color="#f59e0b" />
      <group ref={coilRef}>
        {[0, 0.25, -0.25, 0.5, -0.5].map((offsetZ, i) => (
          <mesh key={i} position={[0, 0, offsetZ]}>
            <torusGeometry args={[0.72 - Math.abs(offsetZ) * 0.35, 0.02, 16, 64]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} emissive="#0284c7" emissiveIntensity={0.4} />
          </mesh>
        ))}
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 1.4, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.95} emissive="#38bdf8" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

// 6. 06 MECHANICA Transmission
function MechanicaObject() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const gearRingRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const targetX = isMobile ? 0 : 0.85;
      const targetY = isMobile ? 0.35 : 0.0;
      groupRef.current.position.set(targetX, targetY + Math.sin(t * 1.2) * 0.035, 0);

      if (coreRef.current) coreRef.current.rotation.x += safeDelta * 0.45;
      if (gearRingRef.current) gearRingRef.current.rotation.y += safeDelta * 0.35;
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.75 : 1.15}>
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.6} color="#ffffff" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.6} color="#f59e0b" />
      <mesh ref={coreRef}>
        <cylinderGeometry args={[0.65, 0.65, 0.3, 8]} />
        <meshStandardMaterial color="#18181b" roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh scale={1.03}>
        <cylinderGeometry args={[0.65, 0.65, 0.3, 8]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh ref={gearRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.018, 16, 64]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

interface Event3DSceneProps {
  activeIndex: number;
}

export default function Event3DScene({ activeIndex }: Event3DSceneProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
      <ErrorBoundary fallback={<div className="absolute inset-0 bg-transparent" />}>
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 38 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 5, 4]} intensity={1.8} color="#ffffff" />
          <directionalLight position={[-4, -2, -2]} intensity={0.6} color="#64748b" />

          {activeIndex === 0 && <RoboCharacterObject />}
          {activeIndex === 1 && <PlexusObject />}
          {activeIndex === 2 && <KaryarachnaObject />}
          {activeIndex === 3 && <KermisObject />}
          {activeIndex === 4 && <ElectricaObject />}
          {activeIndex === 5 && <MechanicaObject />}
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

useGLTF.preload("/models/character.glb");
