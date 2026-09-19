"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ErrorBoundary from "@/components/common/ErrorBoundary";

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
          float intensity = pow(rim, 3.5) * 1.25;
          vec3 atmosphereColor = mix(vec3(0.02, 0.28, 0.72), vec3(0.22, 0.75, 1.0), rim);
          gl_FragColor = vec4(atmosphereColor, intensity * 0.9);
        }
      `,
    };
  }, []);

  return (
    <mesh scale={radius * 1.025}>
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

function EarthModel({ scrollY }: { scrollY: number }) {
  const rootRef = useRef<THREE.Group>(null);
  const earthBodyRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/earth.glb");
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;
  const baseRadius = isMobile ? 1.05 : 1.45;

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
          mat.roughness = 0.7;
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

    if (rootRef.current && earthBodyRef.current) {
      // Continuous slow axial rotation
      earthBodyRef.current.rotation.y += safeDelta * 0.06;

      // Mouse interactive tilt on desktop
      const mouseX = !isMobile ? state.pointer.x * 0.35 : 0;
      const mouseY = !isMobile ? -state.pointer.y * 0.2 : 0;

      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y,
        mouseX,
        safeDelta * 4.0
      );
      rootRef.current.rotation.x = THREE.MathUtils.lerp(
        rootRef.current.rotation.x,
        mouseY + 0.2,
        safeDelta * 4.0
      );

      // Scroll reactive subtle zoom & drift
      const scrollFactor = Math.min(1.0, scrollY / 600);
      const targetZ = -scrollFactor * 1.5;
      const targetY = (isMobile ? 0.25 : 0.0) - scrollFactor * 0.5;

      rootRef.current.position.set(0, targetY, targetZ);
    }
  });

  return (
    <group ref={rootRef} position={[0, isMobile ? 0.25 : 0.0, 0]}>
      <group ref={earthBodyRef}>
        <primitive object={earthGroup} />
      </group>
      <AtmosphereGlow radius={radius} />
    </group>
  );
}

interface Hero3DCanvasProps {
  scrollY: number;
}

export default function Hero3DCanvas({ scrollY }: Hero3DCanvasProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10">
      <ErrorBoundary fallback={<div className="absolute inset-0 bg-[#070709]" />}>
        <Canvas
          dpr={[1, 1.6]}
          camera={{ position: [0, 0, 5.5], fov: 38 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Subtle Studio & Ambient Space Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 4, 5]} intensity={2.4} color="#ffffff" />
          <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#38bdf8" />

          <EarthModel scrollY={scrollY} />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

useGLTF.preload("/models/earth.glb");
