"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Atmospheric Fresnel Rim Glow (Soft, Non-Occluding, Realistic)
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
          float intensity = pow(rim, 3.4) * 1.35;
          
          vec3 blueColor = mix(vec3(0.02, 0.28, 0.75), vec3(0.18, 0.72, 1.0), rim);
          vec3 greenColor = mix(vec3(0.02, 0.48, 0.38), vec3(0.22, 0.92, 0.68), rim);
          vec3 finalColor = mix(blueColor, greenColor, uGreenTint);

          gl_FragColor = vec4(finalColor, intensity * 0.9 * uOpacity);
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
      isSustainable ? 0.55 : 0.0,
      0.05
    );
  });

  return (
    <mesh scale={radius * 1.026}>
      <sphereGeometry args={[1, 64, 64]} />
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

// Scene 02: Global Knowledge Points & Subtle Connected Arc Network
function GlobalKnowledgePoints({ radius, visible, opacity }: { radius: number; visible: boolean; opacity: number }) {
  const points = useMemo(() => {
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
      {points.map((pt, i) => (
        <mesh key={i} position={pt}>
          <sphereGeometry args={[0.016, 8, 8]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.85 * opacity} />
        </mesh>
      ))}
    </group>
  );
}

// Scene 07 & 08: SLIET Geographic Light Ray & Beacon Point (30.22°N, 75.83°E)
function SlietBeacon({ radius, visible, opacity }: { radius: number; visible: boolean; opacity: number }) {
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
      const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 6.0) * 0.25;
      beaconRef.current.scale.setScalar(pulse);
    }
  });

  if (!visible || opacity <= 0.01) return null;

  return (
    <group position={pos} ref={beaconRef}>
      {/* Central Node */}
      <mesh>
        <sphereGeometry args={[0.024, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Target Concentric Pulse Rings */}
      <mesh>
        <ringGeometry args={[0.038, 0.046, 24]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.85 * opacity} side={THREE.DoubleSide} />
      </mesh>
      {/* Vertical Light Ray */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.36, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.75 * opacity} />
      </mesh>
    </group>
  );
}

interface RealEarthProps {
  elapsedTime: number; // 0.0s to 14.5s
}

export default function RealEarth({ elapsedTime }: RealEarthProps) {
  const rootRef = useRef<THREE.Group>(null);
  const earthBodyRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/earth.glb");
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;
  const baseRadius = isMobile ? Math.min(0.85, viewport.width * 0.28) : 1.35;

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
          mat.roughness = 0.65;
          mat.metalness = 0.1;
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
      // 1. REAL CONTINUOUS PLANETARY ROTATION — NEVER STOPS, NEVER RESETS
      earthBodyRef.current.rotation.y += safeDelta * 0.055;

      let targetZ = 0;
      let targetScale = 1.0;

      if (elapsedTime < 1.8) {
        // Scene 01: Earth emerges from darkness (0.0s - 1.8s)
        const enterT = THREE.MathUtils.smoothstep(elapsedTime, 0.2, 1.6);
        targetZ = THREE.MathUtils.lerp(-3.2, 0.0, enterT);
        targetScale = THREE.MathUtils.lerp(0.5, 1.0, enterT);
      } else if (elapsedTime < 3.4) {
        // Scene 02: The Question (1.8s - 3.4s)
        targetZ = 0.0;
        targetScale = 1.0;
      } else if (elapsedTime < 5.0) {
        // Scene 03: Idea (3.4s - 5.0s)
        const ideaT = THREE.MathUtils.smoothstep(elapsedTime, 3.4, 4.8);
        targetZ = THREE.MathUtils.lerp(0.0, 0.2, ideaT);
        targetScale = THREE.MathUtils.lerp(1.0, 1.05, ideaT);
      } else if (elapsedTime < 6.8) {
        // Scene 04: Science (5.0s - 6.8s)
        targetZ = 0.2;
        targetScale = 1.05;
      } else if (elapsedTime < 8.6) {
        // Scene 05: Technology (6.8s - 8.6s)
        targetZ = 0.15;
        targetScale = 1.04;
      } else if (elapsedTime < 10.4) {
        // Scene 06: Sustainability (8.6s - 10.4s) - Emotional Peak
        const susT = THREE.MathUtils.smoothstep(elapsedTime, 8.6, 10.0);
        targetZ = THREE.MathUtils.lerp(0.15, isMobile ? 0.25 : 0.45, susT);
        targetScale = THREE.MathUtils.lerp(1.04, isMobile ? 1.06 : 1.12, susT);
      } else if (elapsedTime < 11.8) {
        // Scene 07: Geographic Journey (10.4s - 11.8s)
        const geoT = THREE.MathUtils.smoothstep(elapsedTime, 10.4, 11.6);
        targetZ = THREE.MathUtils.lerp(0.45, 0.25, geoT);
        targetScale = THREE.MathUtils.lerp(1.12, 1.06, geoT);
      } else if (elapsedTime < 13.0) {
        // Scene 08: SLIET (11.8s - 13.0s)
        targetZ = 0.25;
        targetScale = 1.06;
      } else {
        // Scene 09: Final Reveal (13.0s - 14.5s) - Softly retreats into deep space
        const revealT = THREE.MathUtils.smoothstep(elapsedTime, 13.0, 14.2);
        targetZ = THREE.MathUtils.lerp(0.25, -1.2, revealT);
        targetScale = THREE.MathUtils.lerp(1.06, 0.65, revealT);
      }

      rootRef.current.position.set(0, 0, targetZ);
      rootRef.current.scale.setScalar(targetScale);
    }
  });

  const atmosphereOpacity = elapsedTime < 1.6 ? Math.min(1.0, elapsedTime / 1.6) : 1.0;
  const isSustainable = elapsedTime >= 8.5 && elapsedTime <= 10.8;

  // Scene 02 Knowledge Points
  const showKnowledge = elapsedTime >= 1.8 && elapsedTime <= 3.8;
  const knowledgeOpacity = showKnowledge ? (elapsedTime < 2.3 ? (elapsedTime - 1.8) / 0.5 : (3.8 - elapsedTime) / 0.5) : 0;

  // Scene 07 & 08 SLIET Beacon
  const showSliet = elapsedTime >= 10.4 && elapsedTime <= 13.2;
  const slietOpacity = showSliet ? (elapsedTime < 11.0 ? (elapsedTime - 10.4) / 0.6 : (13.2 - elapsedTime) / 0.6) : 0;

  return (
    <group ref={rootRef}>
      <group ref={earthBodyRef} rotation={[0.3, 0, 0]}>
        {/* 1. Real Authentic 3D Earth GLB (100% Razor-Sharp High-Res Textures) */}
        <primitive object={earthGroup} />

        {/* 2. Global Knowledge Points (Scene 02) */}
        <GlobalKnowledgePoints radius={radius} visible={showKnowledge} opacity={knowledgeOpacity} />

        {/* 3. SLIET Geodesic Ray & Beacon Point (Scene 07 & 08) */}
        <SlietBeacon radius={radius} visible={showSliet} opacity={slietOpacity} />
      </group>

      {/* 4. Razor-Sharp Atmosphere Fresnel Halo */}
      <AtmosphereGlow radius={radius} opacity={atmosphereOpacity} isSustainable={isSustainable} />
    </group>
  );
}

useGLTF.preload("/models/earth.glb");
