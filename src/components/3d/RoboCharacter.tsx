"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

export default function RoboCharacter() {
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

    const targetHeight = isMobile ? 0.95 : 1.35;
    const scaleFactor = targetHeight / (size.y || maxDim);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.roughness = 0.35;
          mat.metalness = 0.45;
          mat.needsUpdate = true;
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
    const p = scrollStore.currentProgress;

    if (groupRef.current) {
      if (p < 0.13 || p > 0.29) {
        groupRef.current.visible = false;
      } else {
        groupRef.current.visible = true;

        let factor = 1.0;
        if (p < 0.17) {
          factor = THREE.MathUtils.smoothstep(p, 0.13, 0.17);
        } else if (p > 0.25) {
          factor = 1.0 - THREE.MathUtils.smoothstep(p, 0.25, 0.29);
        }

        const targetX = isMobile ? 0.35 : 1.35;
        const targetY = isMobile ? 0.52 : -0.05;
        const targetZ = isMobile ? 0.0 : 0.5;

        const entryOffsetX = (1 - factor) * (isMobile ? 1.0 : 2.5);
        const entryOffsetZ = (1 - factor) * -1.5;

        const floatY = Math.sin(t * 1.3) * 0.035;
        const floatRot = Math.sin(t * 0.8) * 0.025;

        groupRef.current.position.set(
          targetX + entryOffsetX,
          targetY + floatY,
          targetZ + entryOffsetZ
        );

        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.3, 1.0, factor));

        const baseRotY = Math.PI * 0.05 + (p - 0.21) * 1.1;
        const mouseGazeX = !isMobile ? state.pointer.x * 0.16 : 0;
        const mouseGazeY = !isMobile ? -state.pointer.y * 0.08 : 0;

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          baseRotY + mouseGazeX,
          safeDelta * 3.0
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mouseGazeY + floatRot,
          safeDelta * 3.0
        );
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <primitive object={characterGroup} />
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.3} color="#38bdf8" />
    </group>
  );
}

useGLTF.preload("/models/character.glb");
