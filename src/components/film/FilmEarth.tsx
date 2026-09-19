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

interface FilmEarthProps {
  progress: number;
}

export default function FilmEarth({ progress }: FilmEarthProps) {
  const rootRef = useRef<THREE.Group>(null);
  const earthBodyRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/earth.glb");
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;
  const baseRadius = isMobile ? 1.0 : 1.35;

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
      let targetY = isMobile ? 0.25 : 0.0;
      let targetZ = 0;
      let targetScale = 1.0;
      let isVisible = true;

      if (progress < 0.20) {
        // Scene 1: Distant Earth in space void
        const enterT = THREE.MathUtils.smoothstep(progress, 0.0, 0.15);
        targetZ = THREE.MathUtils.lerp(-2.0, 0.0, enterT);
        targetScale = THREE.MathUtils.lerp(0.8, 1.0, enterT);
      } else if (progress < 0.40) {
        // Scene 2: The Pulse of Innovation
        const pulseT = THREE.MathUtils.smoothstep(progress, 0.20, 0.38);
        targetZ = THREE.MathUtils.lerp(0.0, 1.0, pulseT);
        targetScale = THREE.MathUtils.lerp(1.0, 1.25, pulseT);
      } else if (progress < 0.60) {
        // Scene 3: The Pioneer Character -> HIDE Earth completely to prevent any overlap!
        isVisible = false;
      } else if (progress < 0.80) {
        // Scene 4: Sustainability Climax -> Earth returns center stage
        const returnT = THREE.MathUtils.smoothstep(progress, 0.60, 0.70);
        targetZ = THREE.MathUtils.lerp(-3.0, 0.5, returnT);
        targetScale = THREE.MathUtils.lerp(0.5, 1.15, returnT);
      } else {
        // Scene 5: Reveal & Enter
        const revealT = THREE.MathUtils.smoothstep(progress, 0.80, 0.95);
        targetY = isMobile ? 0.35 : 0.1;
        targetZ = THREE.MathUtils.lerp(0.5, -0.8, revealT);
        targetScale = THREE.MathUtils.lerp(1.15, 0.85, revealT);
      }

      rootRef.current.visible = isVisible;
      if (isVisible) {
        rootRef.current.position.set(targetX, targetY, targetZ);
        rootRef.current.scale.setScalar(targetScale);
        earthBodyRef.current.rotation.y += safeDelta * 0.04;
      }
    }
  });

  return (
    <group ref={rootRef} position={[0, isMobile ? 0.25 : 0.0, 0]}>
      <group ref={earthBodyRef} rotation={[0.3, 0, 0]}>
        <primitive object={earthGroup} />
      </group>
      <AtmosphereGlow radius={radius} opacity={progress < 0.02 ? progress / 0.02 : 1.0} />
    </group>
  );
}

useGLTF.preload("/models/earth.glb");
