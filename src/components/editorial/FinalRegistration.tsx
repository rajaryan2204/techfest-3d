"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { FEST_DATA } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";
import ErrorBoundary from "@/components/common/ErrorBoundary";

// Subtle small Earth returning in deep space
function SubtleDistantEarth() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/earth.glb");

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={meshRef} scale={0.45} position={[0, 0, 0]}>
      <primitive object={scene} />
      <pointLight position={[2, 2, 2]} intensity={2.0} color="#38bdf8" />
      <ambientLight intensity={0.4} />
    </group>
  );
}

export default function FinalRegistration() {
  return (
    <section id="registration-finale" className="relative z-20 w-full min-h-screen flex flex-col justify-between py-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-white select-none">
      {/* SECTION 07: THE FINAL JOURNEY END */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase block">
          // FINALE
        </span>
        <p className="text-xs sm:text-sm font-mono tracking-[0.3em] text-neutral-400 uppercase">
          YOU MADE IT HERE.
        </p>
      </div>

      {/* Main Monumental Destination Typography */}
      <div className="space-y-6 my-auto max-w-3xl">
        <h2 className="text-5xl sm:text-8xl md:text-9xl font-extralight tracking-tight text-white leading-none font-sans">
          {FEST_DATA.shortTitle}
        </h2>

        <p className="text-3xl sm:text-5xl md:text-6xl font-light text-neutral-300 tracking-tight font-sans">
          SEE YOU AT SLIET.
        </p>

        <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase pt-2">
          {FEST_DATA.datesFull} // SLIET LONGOWAL, PUNJAB
        </p>

        {/* Primary Action Button */}
        <div className="pt-8">
          <MagneticButton dataCursor="JOIN">
            <a
              href={FEST_DATA.links.register}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-mono text-xs font-semibold tracking-[0.3em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl"
              aria-label="Register on official portal"
            >
              <span>REGISTER</span>
              <span>→</span>
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* SECTION 08: FINAL EARTH CALLBACK */}
      <div className="pt-16 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div className="space-y-1 max-w-sm">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
            // EARTH CALLBACK
          </span>
          <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
            We started with Earth. We travelled through technology. We arrived at TechFEST. Now we return to the Earth.
          </p>
        </div>

        {/* Subtle Far-away Earth WebGL widget */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 pointer-events-none">
          <ErrorBoundary fallback={<div className="w-full h-full bg-cyan-950/20 rounded-full" />}>
            <Canvas camera={{ position: [0, 0, 3], fov: 40 }} gl={{ alpha: true }}>
              <SubtleDistantEarth />
            </Canvas>
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/models/earth.glb");
