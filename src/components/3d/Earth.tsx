"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

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
          float intensity = pow(rim, 4.2) * 1.05;
          vec3 atmosphereColor = mix(vec3(0.02, 0.22, 0.6), vec3(0.12, 0.55, 0.9), rim);
          gl_FragColor = vec4(atmosphereColor, intensity * 0.8);
        }
      `,
    };
  }, []);

  return (
    <mesh scale={radius * 1.018}>
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

export default function Earth() {
  const rootRef = useRef<THREE.Group>(null);
  const earthBodyRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/earth.glb");
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;
  const baseRadius = isMobile ? 0.95 : 1.3;

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
    const p = scrollStore.currentProgress;

    // 1. Slow continuous axial Earth rotation
    if (earthBodyRef.current) {
      earthBodyRef.current.rotation.y += safeDelta * 0.035;
    }

    if (rootRef.current) {
      let targetX = 0;
      let targetY = isMobile ? 0.35 : 0.05;
      let targetZ = 0;
      let targetScale = 1.0;

      if (p > 0.1) {
        const t = Math.min(1.0, (p - 0.1) / 0.18);
        const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);

        targetX = THREE.MathUtils.lerp(0, isMobile ? -0.8 : -2.2, smoothT);
        targetY = THREE.MathUtils.lerp(targetY, 0.35, smoothT);
        targetZ = THREE.MathUtils.lerp(0, -5.5, smoothT);
        targetScale = THREE.MathUtils.lerp(1.0, 0.4, smoothT);
      }

      if (p > 0.35) {
        const fadeT = Math.min(1.0, (p - 0.35) / 0.2);
        targetZ = THREE.MathUtils.lerp(-5.5, -9.0, fadeT);
        targetScale = THREE.MathUtils.lerp(0.4, 0.22, fadeT);
      }

      rootRef.current.position.set(targetX, targetY, targetZ);
      rootRef.current.scale.setScalar(targetScale);

      // Mouse parallax (desktop only)
      if (!isMobile) {
        rootRef.current.rotation.x = state.pointer.y * 0.02;
        rootRef.current.rotation.z = -state.pointer.x * 0.02;
      }
    }
  });

  return (
    <group ref={rootRef} position={[0, isMobile ? 0.35 : 0.05, 0]}>
      <group ref={earthBodyRef} rotation={[0.35, 0, 0]}>
        <primitive object={earthGroup} />
      </group>
      <AtmosphereGlow radius={radius} />
    </group>
  );
}

useGLTF.preload("/models/earth.glb");
