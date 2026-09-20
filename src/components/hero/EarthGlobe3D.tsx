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
  const reticleRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [indiaFacing, setIndiaFacing] = useState(false);
  const [isActiveZooming, setIsActiveZooming] = useState(false);

  // Direct reference to track rotation and zoom state
  const rotationStateRef = useRef({
    hasLocked: false,
    indiaFacing: false,
  });

  // Synchronize external isZooming prop
  useEffect(() => {
    if (isZooming && !isActiveZooming) {
      setIsActiveZooming(true);
      setIsLocked(true);
    }
  }, [isZooming, isActiveZooming]);

  const handleTriggerZoom = () => {
    if (isActiveZooming) return;
    setIsLocked(true);
    setIsActiveZooming(true);
    onInitiateZoom();
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const isMobile = width < 768;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    if (isMobile) {
      camera.position.set(0, 0, 12.0);
    } else {
      camera.position.set(0, 0, 6.8);
    }
    camera.lookAt(0, 0, 0);

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
    // Target angle where India (77° E, 28.6° N) is centered directly facing camera
    // In equirectangular UV mapping, India is centered at rotation.y approx -2.92 rad
    const targetIndiaY = -2.92;

    // Start Earth at -6.0 rad (so it completes about half a rotation showing continents)
    let currentY = -6.0;
    earthMesh.rotation.y = currentY;

    // Local 3D coordinate vector for India (SLIET Longowal, Punjab: 77.2°E, 30.2°N)
    const uTarget = 1462 / 2048;
    const vTarget = 1 - (352 / 1024);
    const phi = uTarget * 2 * Math.PI;
    const theta = (1 - vTarget) * Math.PI;

    const indiaLocalPos = new THREE.Vector3(
      - earthRadius * Math.cos(phi) * Math.sin(theta),
      earthRadius * Math.cos(theta),
      earthRadius * Math.sin(phi) * Math.sin(theta)
    );

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

          // Auto-trigger zoom after 2.4s of holding on India if not clicked
          setTimeout(() => {
            if (!rotationStateRef.current.hasLocked) {
              rotationStateRef.current.hasLocked = true;
              setIsLocked(true);
              setIsActiveZooming(true);
              onInitiateZoom();
            }
          }, 2400);
        }
      } else {
        // Very subtle micro-drift once locked so Earth feels alive but stays on India
        earthMesh.rotation.y = targetIndiaY + Math.sin(Date.now() * 0.0005) * 0.015;
      }

      // Dynamically project India's exact 3D position to 2D screen coordinates
      const indiaWorldPos = indiaLocalPos.clone().applyMatrix4(earthMesh.matrixWorld);
      const screenPos = indiaWorldPos.clone().project(camera);
      const curW = container.clientWidth || window.innerWidth;
      const curH = container.clientHeight || window.innerHeight;
      const screenX = (screenPos.x * 0.5 + 0.5) * curW;
      const screenY = (-screenPos.y * 0.5 + 0.5) * curH;

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${screenX}px, ${screenY}px, 0px) translate(-50%, -50%)`;
      }

      // Smoothly zoom 3D camera into Earth / India during hyper-zoom
      if (isActiveZooming) {
        camera.position.z = Math.max(2.5, camera.position.z - 0.09);
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
      const mobile = w < 768;
      camera.aspect = w / h;
      if (mobile) {
        camera.position.set(0, 0, 12.0);
      } else {
        camera.position.set(0, 0, 6.8);
      }
      camera.lookAt(0, 0, 0);
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

      {/* Atmospheric Cloud & Hyper-Descent Penetration Veil */}
      <div
        className={`absolute inset-0 bg-radial from-[#00D9FF]/25 via-[#020817]/60 to-[#020817] pointer-events-none transition-opacity duration-700 ${
          isActiveZooming ? "opacity-90" : "opacity-0"
        }`}
      />

      {/* ========================================================================= */}
      {/* TARGET RETICLE DIRECTLY ON INDIA (Mathematically Locked to 3D Coordinates)*/}
      {/* ========================================================================= */}
      <div
        ref={reticleRef}
        style={{ left: 0, top: 0 }}
        className={`absolute pointer-events-auto cursor-pointer transition-opacity duration-500 ${
          indiaFacing && !isActiveZooming
            ? "opacity-100 scale-100"
            : "opacity-0 scale-150 pointer-events-none"
        }`}
        onClick={handleTriggerZoom}
      >
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Reticle Ring */}
          <div
            className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-dashed transition-all duration-300 animate-[spin_12s_linear_infinite] ${
              isLocked ? "border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]" : "border-[#00D9FF]"
            }`}
          />

          {/* Inner Corner Brackets */}
          <div className="absolute inset-1.5 sm:inset-2 border border-[#00D9FF]/40 rounded-full" />

          {/* Crosshair Center Point on India */}
          <div
            className={`absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full animate-ping ${
              isLocked ? "bg-emerald-400" : "bg-[#00D9FF]"
            }`}
          />
          <div
            className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              isLocked ? "bg-emerald-300" : "bg-white"
            }`}
          />

          {/* India Information HUD Card: centered below on mobile, to the right on desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 sm:mt-0 sm:left-full sm:ml-4 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 w-44 sm:w-56 p-2 sm:p-2.5 rounded-lg bg-[#020817]/95 border border-[#00D9FF]/70 backdrop-blur-md shadow-[0_0_25px_rgba(0,217,255,0.4)] text-left">
            <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLocked ? "bg-emerald-400 animate-ping" : "bg-[#00D9FF] animate-pulse"
                }`}
              />
              <span
                className={`font-mono text-[9px] sm:text-xs font-bold tracking-wider ${
                  isLocked ? "text-emerald-400" : "text-[#00D9FF]"
                }`}
              >
                {isLocked ? "● TARGET LOCKED" : "TARGET ACQUIRED: INDIA"}
              </span>
            </div>
            <div className="font-mono text-[8.5px] sm:text-[10px] text-white font-semibold tracking-wider">
              SLIET LONGOWAL, PUNJAB
            </div>
            <div className="font-mono text-[7.5px] sm:text-[9px] text-neutral-400 tracking-widest mt-0.5">
              30.7391° N, 76.6888° E
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
