"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function AtmosphereGlow({ radius, opacity }: { radius: number; opacity: number }) {
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
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float rim = 1.0 - clamp(dot(viewDir, vNormal), 0.0, 1.0);
          float intensity = pow(rim, 3.8) * 1.15;
          vec3 atmosphereColor = mix(vec3(0.02, 0.25, 0.65), vec3(0.18, 0.65, 0.98), rim);
          gl_FragColor = vec4(atmosphereColor, intensity * 0.85 * uOpacity);
        }
      `,
    };
  }, []);

  const uniforms = useMemo(() => ({ uOpacity: { value: opacity } }), [opacity]);

  useFrame(() => {
    uniforms.uOpacity.value = opacity;
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

// Subtle scientific observation rings for Scenes 02 & 03
function ScientificObservationRings({ radius, visible }: { radius: number; visible: boolean }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    if (ring1Ref.current) ring1Ref.current.rotation.z += safeDelta * 0.15;
    if (ring2Ref.current) ring2Ref.current.rotation.y += safeDelta * 0.12;
  });

  if (!visible) return null;

  return (
    <group>
      {/* Thin equatorial scientific telemetry ring */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[radius * 1.18, radius * 1.186, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Tilted orbital observation curve */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[radius * 1.28, radius * 1.284, 64]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// SLIET Geographic Light Beacon for Scene 08
function SlietBeacon({ radius, visible }: { radius: number; visible: boolean }) {
  const beaconRef = useRef<THREE.Group>(null);

  // Geographic coordinates for SLIET Longowal (30.22°N, 75.83°E)
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
      const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 4.0) * 0.25;
      beaconRef.current.scale.setScalar(pulse);
    }
  });

  if (!visible) return null;

  return (
    <group position={pos} ref={beaconRef}>
      <mesh>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      <mesh>
        <ringGeometry args={[0.04, 0.048, 24]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

interface WelcomeEarthProps {
  progress: number;
}

export default function WelcomeEarth({ progress }: WelcomeEarthProps) {
  const rootRef = useRef<THREE.Group>(null);
  const earthBodyRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/earth.glb");
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;
  const baseRadius = isMobile ? 1.05 : 1.35;

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

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;

    if (rootRef.current && earthBodyRef.current) {
      let targetX = 0;
      let targetY = isMobile ? 0.2 : 0.0;
      let targetZ = 0;
      let targetScale = 1.0;
      let targetRotY = t * 0.035;
      let isVisible = true;

      if (progress < 0.08) {
        // Scene 00: BLACK - Earth hidden in complete darkness
        const enterT = THREE.MathUtils.smoothstep(progress, 0.03, 0.08);
        targetZ = THREE.MathUtils.lerp(-3.5, -1.8, enterT);
        targetScale = THREE.MathUtils.lerp(0.5, 0.85, enterT);
      } else if (progress < 0.18) {
        // Scene 01: EARTH - THIS IS WHERE IT BEGINS
        const enterT = THREE.MathUtils.smoothstep(progress, 0.08, 0.18);
        targetZ = THREE.MathUtils.lerp(-1.8, 0.0, enterT);
        targetScale = THREE.MathUtils.lerp(0.85, 1.0, enterT);
      } else if (progress < 0.28) {
        // Scene 02: OBSERVE - WE LOOK CLOSER
        const obsT = THREE.MathUtils.smoothstep(progress, 0.18, 0.28);
        targetZ = THREE.MathUtils.lerp(0.0, 1.1, obsT);
        targetScale = THREE.MathUtils.lerp(1.0, 1.25, obsT);
      } else if (progress < 0.38) {
        // Scene 03: QUESTION - WHAT EXISTS?
        const qT = THREE.MathUtils.smoothstep(progress, 0.28, 0.38);
        targetZ = THREE.MathUtils.lerp(1.1, 0.8, qT);
        targetScale = THREE.MathUtils.lerp(1.25, 1.1, qT);
      } else if (progress < 0.68) {
        // Scenes 04-06: CREATE, CONNECT, INNOVATE - Technology takes stage, Earth hidden cleanly
        isVisible = false;
      } else if (progress < 0.78) {
        // Scene 07: SUSTAIN - Earth returns in harmony with technology
        const sustainT = THREE.MathUtils.smoothstep(progress, 0.68, 0.76);
        targetZ = THREE.MathUtils.lerp(-3.5, 0.2, sustainT);
        targetScale = THREE.MathUtils.lerp(0.4, 1.05, sustainT);
      } else if (progress < 0.88) {
        // Scene 08: EARTH -> SLIET - India/SLIET Geographic orientation
        targetZ = 0.5;
        targetScale = 1.15;
        targetRotY = THREE.MathUtils.lerp(earthBodyRef.current.rotation.y, 1.35, safeDelta * 2.5);
      } else {
        // Scenes 09-10: TECHFEST REVEAL & ENTER
        const revealT = THREE.MathUtils.smoothstep(progress, 0.88, 0.98);
        targetY = isMobile ? 0.35 : 0.08;
        targetZ = THREE.MathUtils.lerp(0.5, -1.0, revealT);
        targetScale = THREE.MathUtils.lerp(1.15, 0.75, revealT);
      }

      rootRef.current.visible = isVisible;
      if (isVisible) {
        rootRef.current.position.set(targetX, targetY, targetZ);
        rootRef.current.scale.setScalar(targetScale);

        if (progress < 0.78 || progress >= 0.88) {
          earthBodyRef.current.rotation.y += safeDelta * 0.035;
        } else {
          earthBodyRef.current.rotation.y = targetRotY;
        }
      }
    }
  });

  const showScientificRings = progress >= 0.18 && progress <= 0.38;
  const showSlietBeacon = progress >= 0.78 && progress <= 0.88;

  return (
    <group ref={rootRef} position={[0, isMobile ? 0.2 : 0.0, 0]}>
      <group ref={earthBodyRef} rotation={[0.3, 0, 0]}>
        <primitive object={earthGroup} />
        <SlietBeacon radius={radius} visible={showSlietBeacon} />
      </group>
      <AtmosphereGlow radius={radius} opacity={progress < 0.06 ? progress / 0.06 : 1.0} />
      <ScientificObservationRings radius={radius} visible={showScientificRings} />
    </group>
  );
}

useGLTF.preload("/models/earth.glb");
