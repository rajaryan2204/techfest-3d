"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Atmospheric Glow Shader (Dynamic Blue -> Sustainability Green/Blue)
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
          vec3 greenColor = mix(vec3(0.04, 0.42, 0.38), vec3(0.20, 0.85, 0.65), rim);
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
      isSustainable ? 0.45 : 0.0,
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

// SLIET Geographic Light Ray & Beacon (30.22°N, 75.83°E)
function SlietDestinationRay({ radius, visible, opacity }: { radius: number; visible: boolean; opacity: number }) {
  const beaconRef = useRef<THREE.Group>(null);

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
      {/* Central Node */}
      <mesh>
        <sphereGeometry args={[0.024, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Target Concentric Pulse Rings */}
      <mesh>
        <ringGeometry args={[0.038, 0.045, 24]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.75 * opacity} side={THREE.DoubleSide} />
      </mesh>

      {/* Vertical Light Ray */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.3, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6 * opacity} />
      </mesh>
    </group>
  );
}

interface CinematicEarthSceneProps {
  elapsedTime: number; // 0.0s to 13.0s
}

export default function CinematicEarthScene({ elapsedTime }: CinematicEarthSceneProps) {
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
      // 1. CONTINUOUS ROTATION — NEVER STOPS, NEVER RESETS
      earthBodyRef.current.rotation.y += safeDelta * 0.06;

      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetScale = 1.0;

      if (elapsedTime < 2.5) {
        // Scene 1: Welcome to the World (0.0s - 2.5s) - Earth emerges from darkness
        const enterT = THREE.MathUtils.smoothstep(elapsedTime, 0.2, 2.0);
        targetZ = THREE.MathUtils.lerp(-3.2, 0.0, enterT);
        targetScale = THREE.MathUtils.lerp(0.5, 1.0, enterT);
      } else if (elapsedTime < 4.8) {
        // Scene 2: Sustainability (2.5s - 4.8s) - Approaching closer
        const susT = THREE.MathUtils.smoothstep(elapsedTime, 2.5, 4.2);
        targetZ = THREE.MathUtils.lerp(0.0, isMobile ? 0.25 : 0.45, susT);
        targetScale = THREE.MathUtils.lerp(1.0, isMobile ? 1.05 : 1.12, susT);
      } else if (elapsedTime < 7.2) {
        // Scene 3: Technology (4.8s - 7.2s) - Pull back for technology rings
        const techT = THREE.MathUtils.smoothstep(elapsedTime, 4.8, 6.5);
        targetZ = THREE.MathUtils.lerp(0.45, 0.15, techT);
        targetScale = THREE.MathUtils.lerp(1.12, 1.04, techT);
      } else if (elapsedTime < 9.4) {
        // Scene 4: Science (7.2s - 9.4s)
        targetZ = 0.15;
        targetScale = 1.04;
      } else if (elapsedTime < 11.2) {
        // Scene 5: SLIET Transition (9.4s - 11.2s) - Destination focus
        const slietT = THREE.MathUtils.smoothstep(elapsedTime, 9.4, 10.8);
        targetZ = THREE.MathUtils.lerp(0.15, 0.35, slietT);
        targetScale = THREE.MathUtils.lerp(1.04, 1.08, slietT);
      } else {
        // Scene 6: Final Reveal (11.2s - 13.0s) - Softly pulls back into deep space
        const revealT = THREE.MathUtils.smoothstep(elapsedTime, 11.2, 12.8);
        targetZ = THREE.MathUtils.lerp(0.35, -1.2, revealT);
        targetScale = THREE.MathUtils.lerp(1.08, 0.65, revealT);
      }

      rootRef.current.position.set(targetX, targetY, targetZ);
      rootRef.current.scale.setScalar(targetScale);
    }
  });

  const atmosphereOpacity = elapsedTime < 1.8 ? Math.min(1.0, elapsedTime / 1.8) : 1.0;
  const isSustainable = elapsedTime >= 2.4 && elapsedTime <= 5.2;
  const showSliet = elapsedTime >= 9.2 && elapsedTime <= 12.0;
  const slietOpacity = showSliet ? (elapsedTime < 9.8 ? (elapsedTime - 9.2) / 0.6 : (12.0 - elapsedTime) / 0.6) : 0;

  return (
    <group ref={rootRef} position={[0, 0, 0]}>
      <group ref={earthBodyRef} rotation={[0.3, 0, 0]}>
        <primitive object={earthGroup} />
        <SlietDestinationRay radius={radius} visible={showSliet} opacity={slietOpacity} />
      </group>
      <AtmosphereGlow radius={radius} opacity={atmosphereOpacity} isSustainable={isSustainable} />
    </group>
  );
}

useGLTF.preload("/models/earth.glb");
