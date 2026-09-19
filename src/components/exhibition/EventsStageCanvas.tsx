"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import ErrorBoundary from "@/components/common/ErrorBoundary";

interface EventsStageCanvasProps {
  scrollProgress: number; // 0.0 to 5.0 (corresponding to the 6 domain sections)
}

function getModelWeight(scrollProgress: number, targetIndex: number): number {
  const dist = Math.abs(scrollProgress - targetIndex);
  if (dist >= 0.85) return 0;
  // Smooth cosine bell curve
  return 0.5 * (1 + Math.cos((dist / 0.85) * Math.PI));
}

// 1. 01 ROBOZAR 3D Character Model (Index 0)
function RoboStageModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/character.glb");
  const { actions, names } = useAnimations(animations, groupRef);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const weight = getModelWeight(scrollProgress, 0);

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

    const targetHeight = isMobile ? 1.05 : 1.55;
    const scaleFactor = targetHeight / (size.y || maxDim);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.roughness = 0.3;
          mat.metalness = 0.6;
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
      const isVisible = weight > 0.01;
      groupRef.current.visible = isVisible;
      if (isVisible) {
        const floatY = Math.sin(t * 1.3) * 0.03;
        const targetX = isMobile ? 0 : 1.25;
        const targetY = (isMobile ? 0.6 : 0) + floatY;
        groupRef.current.position.set(targetX, targetY, 0);
        groupRef.current.scale.setScalar(Math.max(0.001, weight));

        const mouseX = !isMobile ? state.pointer.x * 0.15 : 0;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          Math.PI * 0.05 + mouseX,
          safeDelta * 4.0
        );
      }
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={characterGroup} />
      <pointLight position={[1.5, 1.5, 2.0]} intensity={3.8 * weight} color="#ffffff" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={2.2 * weight} color="#38bdf8" />
    </group>
  );
}

// 2. 02 PLEXUS Neural Torus Knot (Index 1)
function PlexusStageModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const weight = getModelWeight(scrollProgress, 1);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const isVisible = weight > 0.01;
      groupRef.current.visible = isVisible;
      if (isVisible) {
        const floatY = Math.sin(t * 1.3) * 0.03;
        const targetX = isMobile ? 0 : 1.25;
        const targetY = (isMobile ? 0.6 : 0) + floatY;
        groupRef.current.position.set(targetX, targetY, 0);
        groupRef.current.scale.setScalar((isMobile ? 0.8 : 1.25) * Math.max(0.001, weight));

        if (knotRef.current) {
          knotRef.current.rotation.x += safeDelta * 0.45;
          knotRef.current.rotation.y += safeDelta * 0.55;
        }
        if (wireRef.current) {
          wireRef.current.rotation.x -= safeDelta * 0.3;
          wireRef.current.rotation.z += safeDelta * 0.4;
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[2, 2, 2.5]} intensity={4.5 * weight} color="#38bdf8" />
      <pointLight position={[-2, -1.5, -1.5]} intensity={3.0 * weight} color="#818cf8" />
      
      {/* High-Luminosity Chrome Blue Torus Knot */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[0.7, 0.22, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.1}
          metalness={0.95}
          emissive="#0284c7"
          emissiveIntensity={0.8 * weight}
        />
      </mesh>
      
      {/* Radiant Cyan Wireframe Shell */}
      <mesh ref={wireRef} scale={1.03}>
        <torusKnotGeometry args={[0.7, 0.22, 64, 16, 2, 3]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.75 * weight} />
      </mesh>

      {/* Pulsing Central Energy Orb */}
      <mesh scale={0.38}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={2.0 * weight}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// 3. 03 KARYARACHNA Jade Polyhedron (Index 2)
function KaryarachnaStageModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const weight = getModelWeight(scrollProgress, 2);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const isVisible = weight > 0.01;
      groupRef.current.visible = isVisible;
      if (isVisible) {
        const floatY = Math.sin(t * 1.1) * 0.03;
        const targetX = isMobile ? 0 : 1.25;
        const targetY = (isMobile ? 0.6 : 0) + floatY;
        groupRef.current.position.set(targetX, targetY, 0);
        groupRef.current.scale.setScalar((isMobile ? 0.8 : 1.25) * Math.max(0.001, weight));

        if (coreRef.current) {
          coreRef.current.rotation.x += safeDelta * 0.4;
          coreRef.current.rotation.y += safeDelta * 0.35;
        }
        if (ringRef.current) {
          ringRef.current.rotation.z += safeDelta * 0.5;
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[2, 2, 2.5]} intensity={4.5 * weight} color="#34d399" />
      <pointLight position={[-2, -1.5, -1.5]} intensity={3.0 * weight} color="#10b981" />
      
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#064e3b"
          roughness={0.15}
          metalness={0.9}
          emissive="#059669"
          emissiveIntensity={0.8 * weight}
        />
      </mesh>
      
      <mesh scale={1.03}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.75 * weight} />
      </mesh>
      
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.25, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#10b981"
          emissiveIntensity={1.4 * weight}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>
    </group>
  );
}

// 4. 04 KERMIS Gyroscopic Rings (Index 3)
function KermisStageModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const weight = getModelWeight(scrollProgress, 3);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const isVisible = weight > 0.01;
      groupRef.current.visible = isVisible;
      if (isVisible) {
        const floatY = Math.sin(t * 1.3) * 0.03;
        const targetX = isMobile ? 0 : 1.25;
        const targetY = (isMobile ? 0.6 : 0) + floatY;
        groupRef.current.position.set(targetX, targetY, 0);
        groupRef.current.scale.setScalar((isMobile ? 0.8 : 1.25) * Math.max(0.001, weight));

        if (ring1Ref.current) ring1Ref.current.rotation.x += safeDelta * 0.65;
        if (ring2Ref.current) ring2Ref.current.rotation.y += safeDelta * 0.8;
        if (ring3Ref.current) ring3Ref.current.rotation.z += safeDelta * 0.55;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[2, 2, 2.5]} intensity={4.5 * weight} color="#c084fc" />
      <pointLight position={[-2, -1.5, -1.5]} intensity={3.0 * weight} color="#38bdf8" />
      
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.05, 0.025, 16, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.98} />
      </mesh>
      
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.88, 0.022, 16, 64]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#9333ea"
          emissiveIntensity={1.2 * weight}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>
      
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[0.72, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={1.0 * weight}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>
      
      <mesh>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.95}
          emissive="#c084fc"
          emissiveIntensity={1.6 * weight}
        />
      </mesh>
    </group>
  );
}

// 5. 05 ELECTRICA Induction Coils (Index 4)
function ElectricaStageModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coilRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const weight = getModelWeight(scrollProgress, 4);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const isVisible = weight > 0.01;
      groupRef.current.visible = isVisible;
      if (isVisible) {
        const floatY = Math.sin(t * 1.0) * 0.03;
        const targetX = isMobile ? 0 : 1.25;
        const targetY = (isMobile ? 0.6 : 0) + floatY;
        groupRef.current.position.set(targetX, targetY, 0);
        groupRef.current.scale.setScalar((isMobile ? 0.8 : 1.25) * Math.max(0.001, weight));

        if (coilRef.current) {
          coilRef.current.rotation.z += safeDelta * 0.55;
          coilRef.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.7) * 0.2;
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[2, 2, 2.5]} intensity={5.0 * weight} color="#38bdf8" />
      <pointLight position={[-2, -1.5, -1.5]} intensity={3.5 * weight} color="#f59e0b" />
      
      <group ref={coilRef}>
        {[0, 0.25, -0.25, 0.5, -0.5].map((offsetZ, i) => (
          <mesh key={i} position={[0, 0, offsetZ]}>
            <torusGeometry args={[0.8 - Math.abs(offsetZ) * 0.35, 0.024, 16, 64]} />
            <meshStandardMaterial
              color="#0284c7"
              roughness={0.15}
              metalness={0.92}
              emissive="#38bdf8"
              emissiveIntensity={1.0 * weight}
            />
          </mesh>
        ))}
        <mesh>
          <cylinderGeometry args={[0.09, 0.09, 1.5, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.05}
            metalness={0.98}
            emissive="#38bdf8"
            emissiveIntensity={1.8 * weight}
          />
        </mesh>
      </group>
    </group>
  );
}

// 6. 06 MECHANICA Gear Transmission (Index 5)
function MechanicaStageModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const gearRingRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const weight = getModelWeight(scrollProgress, 5);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const isVisible = weight > 0.01;
      groupRef.current.visible = isVisible;
      if (isVisible) {
        const floatY = Math.sin(t * 1.2) * 0.03;
        const targetX = isMobile ? 0 : 1.25;
        const targetY = (isMobile ? 0.6 : 0) + floatY;
        groupRef.current.position.set(targetX, targetY, 0);
        groupRef.current.scale.setScalar((isMobile ? 0.8 : 1.25) * Math.max(0.001, weight));

        if (coreRef.current) coreRef.current.rotation.x += safeDelta * 0.55;
        if (gearRingRef.current) gearRingRef.current.rotation.y += safeDelta * 0.45;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[2, 2, 2.5]} intensity={4.5 * weight} color="#ffffff" />
      <pointLight position={[-2, -1.5, -1.5]} intensity={3.0 * weight} color="#f59e0b" />
      
      <mesh ref={coreRef}>
        <cylinderGeometry args={[0.7, 0.7, 0.35, 8]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.15}
          metalness={0.95}
          emissive="#f59e0b"
          emissiveIntensity={0.65 * weight}
        />
      </mesh>
      
      <mesh scale={1.03}>
        <cylinderGeometry args={[0.7, 0.7, 0.35, 8]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.7 * weight} />
      </mesh>
      
      <mesh ref={gearRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.1}
          metalness={0.95}
          emissive="#d97706"
          emissiveIntensity={1.0 * weight}
        />
      </mesh>
    </group>
  );
}

export default function EventsStageCanvas({ scrollProgress }: EventsStageCanvasProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10">
      <ErrorBoundary fallback={<div className="absolute inset-0 bg-transparent" />}>
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 38 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 5, 4]} intensity={2.4} color="#ffffff" />
          <directionalLight position={[-4, -2, -2]} intensity={1.0} color="#38bdf8" />

          <RoboStageModel scrollProgress={scrollProgress} />
          <PlexusStageModel scrollProgress={scrollProgress} />
          <KaryarachnaStageModel scrollProgress={scrollProgress} />
          <KermisStageModel scrollProgress={scrollProgress} />
          <ElectricaStageModel scrollProgress={scrollProgress} />
          <MechanicaStageModel scrollProgress={scrollProgress} />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

useGLTF.preload("/models/character.glb");
