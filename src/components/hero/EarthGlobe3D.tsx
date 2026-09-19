"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface EarthGlobe3DProps {
  onIndiaLocked?: () => void;
  onInitiateZoom: () => void;
  isZooming?: boolean;
}

export default function EarthGlobe3D({
  onIndiaLocked,
  onInitiateZoom,
  isZooming = false,
}: EarthGlobe3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [indiaFacing, setIndiaFacing] = useState(false);

  // Direct reference to track rotation state
  const rotationStateRef = useRef({
    hasLocked: false,
    indiaFacing: false,
  });

  const handleTriggerZoom = () => {
    if (isLocked) return;
    setIsLocked(true);
    setTimeout(() => {
      onInitiateZoom();
    }, 450);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 6.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Earth Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load("/textures/earth.jpg");
    earthMap.colorSpace = THREE.SRGBColorSpace;

    // 1. Earth Sphere
    const earthRadius = 2.2;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthMap,
      roughness: 0.75,
      metalness: 0.12,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    // Slight axial tilt for natural Earth orientation
    earthMesh.rotation.x = 0.22;
    scene.add(earthMesh);

    // 2. Atmospheric Glow Outer Rim
    const atmosGeo = new THREE.SphereGeometry(earthRadius * 1.025, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(0.0, 0.85, 1.0, 1.0) * intensity * 1.6;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);

    // 3. Lighting
    // Directional sunlight illuminating from top-left
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(-6, 4, 7);
    scene.add(sunLight);

    // Cyan secondary fill light for space atmosphere
    const cyanLight = new THREE.DirectionalLight(0x00d9ff, 0.9);
    cyanLight.position.set(6, -2, 3);
    scene.add(cyanLight);

    // Subtle ambient light so night side isn't pitch black
    const ambientLight = new THREE.AmbientLight(0x0a192f, 0.8);
    scene.add(ambientLight);

    // =========================================================================
    // ROTATION MECHANICS: ROTATE TO INDIA & LOCK
    // =========================================================================
    // Target angle where India (77° E, 25° N) is centered directly facing camera
    // In equirectangular UV mapping, India is centered at rotation.y approx -2.92 rad
    const targetIndiaY = -2.92;

    // Start Earth at -6.0 rad (so it completes about half a rotation showing continents)
    let currentY = -6.0;
    earthMesh.rotation.y = currentY;

    let animId: number;
    let isDecelerating = false;
    let hasReachedTarget = false;

    const animate = () => {
      if (!hasReachedTarget) {
        // Distance remaining to target
        const diff = targetIndiaY - currentY;

        if (diff > 0.01) {
          // Smooth rotation speed that slows down as India approaches
          const step = Math.max(0.003, Math.min(0.016, diff * 0.022));
          currentY += step;
          earthMesh.rotation.y = currentY;
        } else {
          // Reached India! Lock rotation.
          currentY = targetIndiaY;
          earthMesh.rotation.y = targetIndiaY;
          hasReachedTarget = true;
          rotationStateRef.current.indiaFacing = true;
          setIndiaFacing(true);

          if (onIndiaLocked) {
            onIndiaLocked();
          }

          // Auto-trigger zoom after 2.8s of holding on India if not clicked
          setTimeout(() => {
            if (!rotationStateRef.current.hasLocked) {
              rotationStateRef.current.hasLocked = true;
              setIsLocked(true);
              setTimeout(() => {
                onInitiateZoom();
              }, 500);
            }
          }, 2800);
        }
      } else {
        // Very subtle micro-drift once locked so Earth feels alive but stays on India
        earthMesh.rotation.y = targetIndiaY + Math.sin(Date.now() * 0.0005) * 0.015;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      earthMap.dispose();
    };
  }, [onIndiaLocked, onInitiateZoom]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden flex items-center justify-center">
      {/* Three.js 3D Earth Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* ========================================================================= */}
      {/* TARGET RETICLE DIRECTLY ON INDIA (Appears & Locks when India is Front)   */}
      {/* ========================================================================= */}
      <div
        className={`absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-all duration-700 ${
          indiaFacing ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
        onClick={handleTriggerZoom}
      >
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Reticle Ring */}
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-dashed transition-all duration-300 animate-[spin_12s_linear_infinite] ${
              isLocked ? "border-emerald-400" : "border-[#00D9FF]"
            }`}
          />

          {/* Inner Corner Brackets */}
          <div className="absolute inset-2 border border-[#00D9FF]/40 rounded-full" />

          {/* Crosshair Center Point on India */}
          <div
            className={`absolute w-3 h-3 rounded-full animate-ping ${
              isLocked ? "bg-emerald-400" : "bg-[#00D9FF]"
            }`}
          />
          <div
            className={`absolute w-2 h-2 rounded-full ${
              isLocked ? "bg-emerald-300" : "bg-white"
            }`}
          />

          {/* India Information HUD Card */}
          <div className="absolute left-full ml-3 sm:ml-4 top-1/2 -translate-y-1/2 w-48 sm:w-56 p-2.5 rounded-lg bg-[#020817]/90 border border-[#00D9FF]/70 backdrop-blur-md shadow-[0_0_25px_rgba(0,217,255,0.4)] text-left">
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLocked ? "bg-emerald-400 animate-ping" : "bg-[#00D9FF] animate-pulse"
                }`}
              />
              <span
                className={`font-mono text-[10px] sm:text-xs font-bold tracking-wider ${
                  isLocked ? "text-emerald-400" : "text-[#00D9FF]"
                }`}
              >
                {isLocked ? "● TARGET LOCKED" : "TARGET ACQUIRED: INDIA"}
              </span>
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] text-white font-semibold tracking-wider">
              SLIET LONGOWAL, PUNJAB
            </div>
            <div className="font-mono text-[8px] sm:text-[9px] text-neutral-400 tracking-widest mt-0.5">
              30.7391° N, 76.6888° E
            </div>
          </div>
        </div>
      </div>

      {/* Top Status Prompt */}
      <div className="absolute top-20 sm:top-24 inset-x-0 flex flex-col items-center justify-center gap-1.5 pointer-events-auto px-4 z-20">
        <button
          onClick={handleTriggerZoom}
          className={`inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#00D9FF]/60 bg-[#020817]/90 backdrop-blur-md text-[10px] sm:text-xs font-mono text-neutral-200 hover:text-white shadow-[0_0_25px_rgba(0,217,255,0.35)] active:scale-95 hover:scale-105 transition-all cursor-pointer ${
            isLocked
              ? "border-emerald-400 text-emerald-300 bg-emerald-950/90 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
              : ""
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isLocked ? "bg-emerald-400 animate-ping" : "bg-[#00D9FF] animate-ping"
            }`}
          />
          <span className="font-bold tracking-wider uppercase">
            {isLocked
              ? "🎯 TARGET LOCKED: INDIA // COMMENCING DESCENT..."
              : indiaFacing
              ? "🎯 INDIA IN SIGHT • CLICK TO ZOOM INTO SLIET"
              : "🌍 EARTH ROTATING TO INDIA... // ORBIT ACTIVE"}
          </span>
          <span className="text-[#00D9FF] font-bold">→</span>
        </button>
      </div>
    </div>
  );
}
