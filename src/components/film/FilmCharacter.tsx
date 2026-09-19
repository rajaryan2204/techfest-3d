"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface FilmCharacterProps {
  progress: number;
}

export default function FilmCharacter({ progress }: FilmCharacterProps) {
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

    const targetHeight = isMobile ? 1.1 : 1.5;
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

    if (!groupRef.current) return;

    // Active STRICTLY in Scene 3 (0.40 to 0.60)
    const isVisible = progress >= 0.40 && progress <= 0.60;
    groupRef.current.visible = isVisible;

    if (isVisible) {
      const localT = (progress - 0.40) / 0.20; // 0.0 to 1.0 within Scene 3

      let factor = 1.0;
      if (localT < 0.2) factor = localT / 0.2;
      else if (localT > 0.8) factor = (1.0 - localT) / 0.2;

      const floatY = Math.sin(t * 1.3) * 0.035;
      const targetY = isMobile ? 0.35 : 0.0;

      groupRef.current.position.set(0, targetY + floatY, 0.5);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.3, 1.0, factor));

      const mouseX = !isMobile ? state.pointer.x * 0.14 : 0;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.PI * 0.05 + mouseX,
        safeDelta * 4.0
      );
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <primitive object={characterGroup} />
      <pointLight position={[1.5, 1.5, 2.0]} intensity={2.8} color="#ffffff" />
      <pointLight position={[-1.2, -0.5, -1.0]} intensity={1.5} color="#38bdf8" />
    </group>
  );
}

useGLTF.preload("/models/character.glb");
