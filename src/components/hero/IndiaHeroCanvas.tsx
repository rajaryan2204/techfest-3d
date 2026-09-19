"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Atmospheric Rim Glow Shader
function AtmosphereGlow({ radius }: { radius: number }) {
  const shader = useMemo(() => {
    return {
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * vec4(vPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float rim = 1.0 - clamp(dot(viewDir, vNormal), 0.0, 1.0);
          float intensity = pow(rim, 3.8) * 1.35;
          // Futuristic Indian Aurora: cyan blending with soft saffron aura
          vec3 atmosphereColor = mix(vec3(0.02, 0.35, 0.85), vec3(0.15, 0.75, 1.0), rim);
          gl_FragColor = vec4(atmosphereColor, intensity * 0.95);
        }
      `,
    };
  }, []);

  return (
    <mesh scale={radius * 1.028}>
      <sphereGeometry args={[1, 48, 48]} />
      <shaderMaterial
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// 3D India Beacon with Pulsating Concentric Radar Rings & Target Pin
function IndiaTargetMarker({ earthRadius }: { earthRadius: number }) {
  const ringsRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // Geographic coordinates for SLIET Longowal, Punjab, India: Lat 30.22° N, Lon 75.83° E
  // Spherical to 3D Cartesian on the sphere surface
  const indiaPos = useMemo(() => {
    const lat = (30.22 * Math.PI) / 180;
    const lon = (75.83 * Math.PI) / 180;
    const r = earthRadius * 1.002;
    const x = r * Math.cos(lat) * Math.sin(lon);
    const y = r * Math.sin(lat);
    const z = r * Math.cos(lat) * Math.cos(lon);
    return new THREE.Vector3(x, y, z);
  }, [earthRadius]);

  // Normal vector at India position to orient rings flat on the surface
  const normal = useMemo(() => indiaPos.clone().normalize(), [indiaPos]);
  const orientationQuat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, idx) => {
        const ring = child as THREE.Mesh;
        const phase = (t * 1.2 + idx * 0.4) % 1.5;
        const scale = 0.5 + phase * 1.6;
        const opacity = Math.max(0, 1 - phase / 1.5);
        ring.scale.set(scale, scale, 1);
        if (ring.material) {
          (ring.material as THREE.MeshBasicMaterial).opacity = opacity * 0.8;
        }
      });
    }
    if (pulseRef.current) {
      const s = 1.0 + Math.sin(t * 4) * 0.25;
      pulseRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={indiaPos}>
      {/* Surface Concentric Rings */}
      <group ref={ringsRef} quaternion={orientationQuat}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <ringGeometry args={[0.04, 0.055, 32]} />
            <meshBasicMaterial
              color="#00D9FF"
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Center Pulsating Core Beacon */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Vertical Holographic Data Antenna */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                0,
                0,
                0,
                normal.x * 0.35,
                normal.y * 0.35,
                normal.z * 0.35,
              ]),
              3,
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00D9FF" transparent opacity={0.75} />
      </line>

      {/* Glowing Pin Tip */}
      <mesh position={[normal.x * 0.35, normal.y * 0.35, normal.z * 0.35]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Orbiting Space Satellite around India with Arc Trajectory
function OrbitingSatellite({ earthRadius }: { earthRadius: number }) {
  const satelliteRef = useRef<THREE.Group>(null);
  const orbitRadius = earthRadius * 1.35;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.5;
    if (satelliteRef.current) {
      // Inclined orbit around Earth passing over India
      const x = Math.cos(t) * orbitRadius;
      const y = Math.sin(t * 1.5) * 0.45 + (Math.sin(t) * orbitRadius * 0.4);
      const z = Math.sin(t) * orbitRadius;
      satelliteRef.current.position.set(x, y, z);
    }
  });

  return (
    <group>
      {/* Orbital Path Ring */}
      <mesh rotation={[0.4, 0.2, 0.2]}>
        <torusGeometry args={[orbitRadius, 0.003, 16, 100]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.25} />
      </mesh>

      {/* Satellite Node */}
      <group ref={satelliteRef}>
        <mesh>
          <boxGeometry args={[0.04, 0.02, 0.02]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Solar Panels */}
        <mesh position={[-0.05, 0, 0]}>
          <boxGeometry args={[0.05, 0.015, 0.002]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.05, 0, 0]}>
          <boxGeometry args={[0.05, 0.015, 0.002]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Telemetry Signal Glow */}
        <pointLight color="#00D9FF" intensity={1.5} distance={0.8} />
      </group>
    </group>
  );
}

// 3D Deep Space Starfield & Cosmic Dust Particles
function DeepSpaceStars() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 650;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Star hues: cyan, icy white, soft amber
      const rand = Math.random();
      if (rand < 0.6) {
        col[i * 3] = 0.9;
        col[i * 3 + 1] = 0.95;
        col[i * 3 + 2] = 1.0;
      } else if (rand < 0.85) {
        col[i * 3] = 0.2;
        col[i * 3 + 1] = 0.85;
        col[i * 3 + 2] = 1.0;
      } else {
        col[i * 3] = 1.0;
        col[i * 3 + 1] = 0.8;
        col[i * 3 + 2] = 0.4;
      }
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.008;
      pointsRef.current.rotation.x += delta * 0.003;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

// 3D Earth Mesh Model with India Oriented towards Viewer
function EarthGlobe({
  isMobile,
  lockTarget,
  pointer,
  dragRotation,
}: {
  isMobile: boolean;
  lockTarget: boolean;
  pointer: { x: number; y: number };
  dragRotation: { x: number; y: number };
}) {
  const rootRef = useRef<THREE.Group>(null);
  const earthBodyRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/earth.glb");

  const baseRadius = isMobile ? 1.15 : 1.55;

  // Angles that put India in front & center:
  // Lon 75.83° E -> target Y rotation ~ -1.75 rad (-100°)
  // Lat 30.22° N -> target X tilt ~ 0.32 rad (18°)
  const targetIndiaRotation = useMemo(() => ({ x: 0.32, y: -1.75 }), []);

  const { earthGroup, radius } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    cloned.position.sub(center);

    const targetDiameter = baseRadius * 2;
    const scaleFactor = targetDiameter / maxDim;

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.roughness = 0.68;
          mat.metalness = 0.06;
          mat.needsUpdate = true;
          mesh.material = mat;
        }
      }
    });

    const group = new THREE.Group();
    group.add(cloned);
    group.scale.setScalar(scaleFactor);

    return { earthGroup: group, radius: baseRadius };
  }, [scene, baseRadius]);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);

    if (rootRef.current && earthBodyRef.current) {
      if (lockTarget) {
        // Smoothly lock and hold onto India
        earthBodyRef.current.rotation.y = THREE.MathUtils.lerp(
          earthBodyRef.current.rotation.y,
          targetIndiaRotation.y + dragRotation.y,
          safeDelta * 4.0
        );
        earthBodyRef.current.rotation.x = THREE.MathUtils.lerp(
          earthBodyRef.current.rotation.x,
          targetIndiaRotation.x + dragRotation.x,
          safeDelta * 4.0
        );
      } else {
        // Slow continuous ambient rotation around India
        earthBodyRef.current.rotation.y += safeDelta * 0.02;
      }

      // Parallax with cursor
      const mouseX = !isMobile ? pointer.x * 0.25 : 0;
      const mouseY = !isMobile ? -pointer.y * 0.15 : 0;

      rootRef.current.position.x = THREE.MathUtils.lerp(
        rootRef.current.position.x,
        (isMobile ? 0 : -0.65) + mouseX,
        safeDelta * 3.0
      );
      rootRef.current.position.y = THREE.MathUtils.lerp(
        rootRef.current.position.y,
        (isMobile ? 0.35 : 0.05) + mouseY,
        safeDelta * 3.0
      );
    }
  });

  return (
    <group
      ref={rootRef}
      position={[isMobile ? 0 : -0.65, isMobile ? 0.35 : 0.05, 0]}
    >
      <group
        ref={earthBodyRef}
        rotation={[targetIndiaRotation.x, targetIndiaRotation.y, 0]}
      >
        <primitive object={earthGroup} />
        <IndiaTargetMarker earthRadius={radius} />
      </group>
      <AtmosphereGlow radius={radius} />
      <OrbitingSatellite earthRadius={radius} />
    </group>
  );
}

// 3D Robo-Astronaut Observer looking directly at India from space
function ObserverCharacter({
  isMobile,
  pointer,
}: {
  isMobile: boolean;
  pointer: { x: number; y: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/character.glb");

  const characterGroup = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    cloned.position.set(-center.x, -center.y, -center.z);

    const targetHeight = isMobile ? 1.05 : 1.6;
    const scaleFactor = targetHeight / (size.y || maxDim);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.roughness = 0.3;
          mat.metalness = 0.55;
          mat.needsUpdate = true;
          mesh.material = mat;
        }
      }
    });

    const wrapper = new THREE.Group();
    wrapper.add(cloned);
    wrapper.scale.setScalar(scaleFactor);

    // Orient character facing towards Earth & India (leftwards into the scene)
    wrapper.rotation.y = Math.PI * 0.75;
    return wrapper;
  }, [scene, isMobile]);

  useFrame(({ clock }, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = clock.elapsedTime;

    if (groupRef.current) {
      // Floating harmonic zero-G animation
      const floatY = Math.sin(t * 1.4) * 0.045;
      const floatRotX = Math.cos(t * 0.9) * 0.03;
      const floatRotZ = Math.sin(t * 0.7) * 0.02;

      // Position in space looking towards Earth/India
      const baseX = isMobile ? 0.95 : 2.1;
      const baseY = isMobile ? -0.9 : -0.25;
      const baseZ = isMobile ? 1.1 : 1.6;

      // Cursor interactive gaze towards India
      const gazeX = !isMobile ? pointer.x * 0.15 : 0;
      const gazeY = !isMobile ? -pointer.y * 0.1 : 0;

      groupRef.current.position.set(baseX, baseY + floatY, baseZ);
      groupRef.current.rotation.set(
        floatRotX + gazeY,
        Math.PI * 0.75 + gazeX,
        floatRotZ
      );
    }
  });

  return (
    <group ref={groupRef} position={[isMobile ? 0.95 : 2.1, isMobile ? -0.9 : -0.25, isMobile ? 1.1 : 1.6]}>
      <primitive object={characterGroup} />
      {/* Futuristic Visor & Suit Lighting */}
      <pointLight position={[0.2, 0.5, 0.5]} intensity={2.8} color="#ffffff" />
      <pointLight position={[-0.8, -0.3, -0.4]} intensity={2.2} color="#00D9FF" />
      <pointLight position={[0.6, -0.5, 0.2]} intensity={1.2} color="#f59e0b" />
    </group>
  );
}

// Scene Canvas Wrapper
interface IndiaHeroCanvasProps {
  lockTargetIndia: boolean;
  onTargetLocked?: () => void;
}

export default function IndiaHeroCanvas({ lockTargetIndia }: IndiaHeroCanvasProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width) * 2 - 1;
    const y = -(((clientY - top) / height) * 2 - 1);
    setPointer({ x, y });

    if (isDraggingRef.current) {
      const dx = clientX - prevMouseRef.current.x;
      const dy = clientY - prevMouseRef.current.y;
      setDragRotation((prev) => ({
        x: Math.max(-0.8, Math.min(0.8, prev.x + dy * 0.005)),
        y: prev.y + dx * 0.005,
      }));
      prevMouseRef.current = { x: clientX, y: clientY };
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
    >
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Space Lighting */}
        <ambientLight intensity={0.45} />
        {/* Key Sunlight casting on Earth and Observer */}
        <directionalLight position={[-6, 4, 5]} intensity={3.2} color="#ffffff" />
        {/* Cyan Space Rim Light */}
        <directionalLight position={[6, -2, -3]} intensity={1.2} color="#00D9FF" />
        {/* Subtle Indian Saffron Sunlight Rim Accent */}
        <directionalLight position={[0, 6, 2]} intensity={0.8} color="#fbbf24" />

        <DeepSpaceStars />
        <EarthGlobe
          isMobile={typeof window !== "undefined" && window.innerWidth < 768}
          lockTarget={lockTargetIndia}
          pointer={pointer}
          dragRotation={dragRotation}
        />
        <ObserverCharacter
          isMobile={typeof window !== "undefined" && window.innerWidth < 768}
          pointer={pointer}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/earth.glb");
useGLTF.preload("/models/character.glb");
