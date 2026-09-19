"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// 1. Atmosphere Fresnel Glow Shader
function AtmosphereGlow({ radius, opacity, isSustainable }: { radius: number; opacity: number; isSustainable: boolean }) {
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
        uniform float uOpacity;
        uniform float uGreenTint;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float rim = 1.0 - clamp(dot(viewDir, vNormal), 0.0, 1.0);
          float intensity = pow(rim, 3.8) * 1.15;
          
          vec3 blueColor = mix(vec3(0.02, 0.25, 0.65), vec3(0.18, 0.65, 0.98), rim);
          vec3 greenColor = mix(vec3(0.05, 0.45, 0.40), vec3(0.20, 0.85, 0.65), rim);
          vec3 finalColor = mix(blueColor, greenColor, uGreenTint);

          gl_FragColor = vec4(finalColor, intensity * 0.85 * uOpacity);
        }
      `,
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uOpacity: { value: opacity },
      uGreenTint: { value: 0 },
    }),
    [opacity]
  );

  useFrame(() => {
    uniforms.uOpacity.value = opacity;
    uniforms.uGreenTint.value = THREE.MathUtils.lerp(
      uniforms.uGreenTint.value,
      isSustainable ? 0.4 : 0.0,
      0.05
    );
  });

  return (
    <mesh scale={radius * 1.022}>
      <sphereGeometry args={[1, 48, 48]} />
      <shaderMaterial
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// 2. Life & City Knowledge Points + Subtle Connecting Arcs (Scene 2: Life / Humanity)
function LifeConnections({ radius, visible, opacity }: { radius: number; visible: boolean; opacity: number }) {
  const points = useMemo(() => {
    // 12 key global hubs coordinates (lat, lon in radians)
    const coords = [
      [0.52, 0.0],     // Europe
      [0.70, 0.65],    // Central Asia
      [0.50, 1.30],    // India / SLIET region
      [0.60, 2.00],    // East Asia
      [-0.55, 2.60],   // Australia
      [0.68, -1.30],   // North America East
      [0.62, -2.10],   // North America West
      [-0.40, -1.00],  // South America
      [0.10, 0.40],    // Africa East
      [-0.30, 0.30],   // Africa South
      [0.45, 0.80],    // Middle East
      [0.25, 1.80],    // SE Asia
    ];

    return coords.map(([lat, lon]) => {
      const r = radius * 1.006;
      return new THREE.Vector3(
        r * Math.cos(lat) * Math.sin(lon),
        r * Math.sin(lat),
        r * Math.cos(lat) * Math.cos(lon)
      );
    });
  }, [radius]);

  if (!visible || opacity <= 0.01) return null;

  return (
    <group>
      {/* Knowledge Node Points */}
      {points.map((pt, i) => (
        <mesh key={i} position={pt}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.8 * opacity} />
        </mesh>
      ))}
    </group>
  );
}

// 3. Curiosity Traces & Scientific Measurement Geometry (Scene 3: Curiosity)
function ScientificTraces({ radius, visible, opacity }: { radius: number; visible: boolean; opacity: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    if (ringRef.current) ringRef.current.rotation.z += safeDelta * 0.12;
    if (ring2Ref.current) ring2Ref.current.rotation.x -= safeDelta * 0.08;
  });

  if (!visible || opacity <= 0.01) return null;

  return (
    <group>
      {/* Equatorial Scientific Orbit */}
      <mesh ref={ringRef}>
        <ringGeometry args={[radius * 1.2, radius * 1.203, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35 * opacity} side={THREE.DoubleSide} />
      </mesh>

      {/* Tilted Elliptical Path */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[radius * 1.28, radius * 1.282, 64]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.25 * opacity} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// 4. SLIET Destination Beacon & Geodesic Ray (Scene 7 & 8: SLIET -> TechFEST)
function SlietDestinationRay({ radius, visible, opacity }: { radius: number; visible: boolean; opacity: number }) {
  const beaconRef = useRef<THREE.Group>(null);

  // SLIET Longowal coordinates: 30.22°N, 75.83°E
  const pos = useMemo(() => {
    const lat = (30.22 * Math.PI) / 180;
    const lon = (75.83 * Math.PI) / 180;
    const r = radius * 1.01;
    return [
      r * Math.cos(lat) * Math.sin(lon),
      r * Math.sin(lat),
      r * Math.cos(lat) * Math.cos(lon),
    ] as [number, number, number];
  }, [radius]);

  useFrame((state) => {
    if (beaconRef.current && visible) {
      const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 5.0) * 0.2;
      beaconRef.current.scale.setScalar(pulse);
    }
  });

  if (!visible || opacity <= 0.01) return null;

  return (
    <group position={pos} ref={beaconRef}>
      {/* Destination Central Point */}
      <mesh>
        <sphereGeometry args={[0.024, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Target Concentric Pulse Rings */}
      <mesh>
        <ringGeometry args={[0.038, 0.045, 24]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.7 * opacity} side={THREE.DoubleSide} />
      </mesh>

      {/* Vertical Light Ray */}
      <mesh position={[0, 0.15, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.3, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6 * opacity} />
      </mesh>
    </group>
  );
}

interface AutoplayEarthProps {
  elapsedTime: number; // in seconds
}

export default function AutoplayEarth({ elapsedTime }: AutoplayEarthProps) {
  const rootRef = useRef<THREE.Group>(null);
  const earthBodyRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/earth.glb");
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;
  const baseRadius = isMobile ? Math.min(0.72, viewport.width * 0.22) : 1.35;

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
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.roughness = 0.75;
          mat.metalness = 0.05;
          mesh.material = mat;
        }
      }
    });

    const group = new THREE.Group();
    group.add(cloned);
    group.scale.setScalar(scaleFactor);

    return { earthGroup: group, radius: baseRadius };
  }, [scene, baseRadius]);

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.1);

    if (rootRef.current && earthBodyRef.current) {
      // 1. CONTINUOUS SLOW ROTATION — NEVER STOPS, NEVER RESETS
      earthBodyRef.current.rotation.y += safeDelta * 0.05;

      let targetX = 0;
      let targetY = isMobile ? 0.65 : 0.0;
      let targetZ = 0;
      let targetScale = 1.0;

      if (elapsedTime < 2.0) {
        // Darkness -> Earth Discovered (0.0s - 2.0s)
        const enterT = THREE.MathUtils.smoothstep(elapsedTime, 0.2, 1.8);
        targetZ = THREE.MathUtils.lerp(-3.0, 0.0, enterT);
        targetScale = THREE.MathUtils.lerp(0.5, 1.0, enterT);
      } else if (elapsedTime < 4.0) {
        // Life / One Planet (2.0s - 4.0s)
        targetZ = 0.0;
        targetScale = 1.0;
      } else if (elapsedTime < 5.5) {
        // Curiosity (4.0s - 5.5s): Camera & Earth move closer
        const curT = THREE.MathUtils.smoothstep(elapsedTime, 4.0, 5.2);
        targetZ = THREE.MathUtils.lerp(0.0, isMobile ? 0.35 : 0.65, curT);
        targetScale = THREE.MathUtils.lerp(1.0, isMobile ? 1.08 : 1.18, curT);
      } else if (elapsedTime < 7.5) {
        // Technology (5.5s - 7.5s): Slight pull back for surrounding geometry
        const techT = THREE.MathUtils.smoothstep(elapsedTime, 5.5, 7.0);
        targetZ = THREE.MathUtils.lerp(0.65, 0.15, techT);
        targetScale = THREE.MathUtils.lerp(1.18, 1.04, techT);
      } else if (elapsedTime < 9.5) {
        // Science (7.5s - 9.5s)
        targetZ = 0.15;
        targetScale = 1.04;
      } else if (elapsedTime < 11.5) {
        // Sustainability (9.5s - 11.5s): Return to Earth harmony
        const susT = THREE.MathUtils.smoothstep(elapsedTime, 9.5, 11.0);
        targetZ = THREE.MathUtils.lerp(0.15, isMobile ? 0.3 : 0.45, susT);
        targetScale = THREE.MathUtils.lerp(1.04, isMobile ? 1.06 : 1.12, susT);
      } else if (elapsedTime < 13.5) {
        // SLIET Reveal (11.5s - 13.5s): Focus on SLIET
        const slietT = THREE.MathUtils.smoothstep(elapsedTime, 11.5, 13.0);
        targetZ = THREE.MathUtils.lerp(0.45, 0.15, slietT);
        targetScale = THREE.MathUtils.lerp(1.12, 1.02, slietT);
      } else {
        // Final Reveal (13.5s - 15.5s): Softly settles into background
        const revealT = THREE.MathUtils.smoothstep(elapsedTime, 13.5, 15.0);
        targetY = isMobile ? 0.72 : 0.06;
        targetZ = THREE.MathUtils.lerp(0.15, -1.0, revealT);
        targetScale = THREE.MathUtils.lerp(1.02, 0.7, revealT);
      }

      rootRef.current.position.set(targetX, targetY, targetZ);
      rootRef.current.scale.setScalar(targetScale);
    }
  });

  const atmosphereOpacity = elapsedTime < 1.8 ? Math.min(1.0, elapsedTime / 1.8) : 1.0;
  const isSustainable = elapsedTime >= 9.5 && elapsedTime <= 12.0;

  // Visual Narrative Layer Triggers
  const showLife = elapsedTime >= 2.0 && elapsedTime <= 5.5;
  const lifeOpacity = showLife ? (elapsedTime < 2.5 ? (elapsedTime - 2.0) / 0.5 : (5.5 - elapsedTime) / 0.5) : 0;

  const showCuriosity = elapsedTime >= 4.0 && elapsedTime <= 7.5;
  const curiosityOpacity = showCuriosity ? (elapsedTime < 4.5 ? (elapsedTime - 4.0) / 0.5 : (7.5 - elapsedTime) / 0.5) : 0;

  const showSliet = elapsedTime >= 11.5 && elapsedTime <= 14.5;
  const slietOpacity = showSliet ? (elapsedTime < 12.0 ? (elapsedTime - 11.5) / 0.5 : (14.5 - elapsedTime) / 0.5) : 0;

  return (
    <group ref={rootRef} position={[0, isMobile ? 0.65 : 0.0, 0]}>
      <group ref={earthBodyRef} rotation={[0.3, 0, 0]}>
        <primitive object={earthGroup} />
        <LifeConnections radius={radius} visible={showLife} opacity={lifeOpacity} />
        <SlietDestinationRay radius={radius} visible={showSliet} opacity={slietOpacity} />
      </group>
      <AtmosphereGlow radius={radius} opacity={atmosphereOpacity} isSustainable={isSustainable} />
      <ScientificTraces radius={radius} visible={showCuriosity} opacity={curiosityOpacity} />
    </group>
  );
}

useGLTF.preload("/models/earth.glb");
