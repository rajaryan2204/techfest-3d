"use client";

import React, { useEffect, useRef, useState } from "react";

interface OrbitalSatelliteViewProps {
  onInitiateZoom: () => void;
  isZooming?: boolean;
}

export default function OrbitalSatelliteView({
  onInitiateZoom,
  isZooming = false,
}: OrbitalSatelliteViewProps) {
  const [isLocked, setIsLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Direct DOM references for 60-120 FPS zero-rerender animation loop
  const satelliteGroupRef = useRef<SVGGElement>(null);
  const radarBeamRef = useRef<SVGPolygonElement>(null);
  const radarLineRef = useRef<SVGLineElement>(null);
  const telemetryTagRef = useRef<SVGGElement>(null);
  const telemetryAltRef = useRef<SVGTextElement>(null);
  const telemetryVelRef = useRef<SVGTextElement>(null);
  const orbitParticleRef = useRef<SVGCircleElement>(null);
  const targetReticleRef = useRef<SVGGElement>(null);

  const handleTrigger = () => {
    if (isLocked) return;
    setIsLocked(true);
    setTimeout(() => {
      onInitiateZoom();
    }, 450);
  };

  // =========================================================================
  // 60-120 FPS HARDWARE ACCELERATED 3D ORBIT TRAJECTORY SIMULATION
  // =========================================================================
  useEffect(() => {
    let animId: number;
    let angle = 0;
    const speed = 0.007; // Smooth, realistic orbital period (~15-18s full orbit)

    // Orbital Ellipse Parameters
    // Center of Earth is around (500, 300) in 1000x600 viewBox
    const cx = 500;
    const cy = 300;
    const a = 410; // Semi-major axis
    const b = 155; // Semi-minor axis
    const tilt = -16 * (Math.PI / 180); // -16 degree orbital plane tilt
    const cosTilt = Math.cos(tilt);
    const sinTilt = Math.sin(tilt);

    // Target coordinates on Earth (India - SLIET Longowal: 77.2°E, 28.6°N)
    // India is situated in the northern hemisphere above the equator (cy=300)
    const targetX = 500;
    const targetY = 244;

    let zoomProgress = 0;

    const render = () => {
      // If isZooming is active: Satellite locks onto India while camera dives past high orbit into Earth!
      if (isZooming) {
        // Progress zoom from 0 to 1 over ~1.1s (60 fps)
        zoomProgress = Math.min(1, zoomProgress + 0.018);
        const ease = Math.pow(zoomProgress, 1.6);

        // Satellite continues along its natural orbit trajectory, accelerating slightly
        angle += speed * (1 + ease * 1.2);
        if (angle >= Math.PI * 2) angle -= Math.PI * 2;

        const x0 = a * Math.cos(angle);
        const y0 = b * Math.sin(angle);
        const x = cx + x0 * cosTilt - y0 * sinTilt;
        const y = cy + x0 * sinTilt + y0 * cosTilt;
        const z = Math.sin(angle);

        // Perspective scale along orbit
        const scale = 1.1 + 0.28 * z;

        // Satellite smoothly fades out as camera plunges past orbital altitude into atmosphere
        const curOpacity = Math.max(0, 1 - zoomProgress * 1.7);

        if (satelliteGroupRef.current) {
          satelliteGroupRef.current.setAttribute(
            "transform",
            `translate(${x}, ${y}) scale(${scale})`
          );
          satelliteGroupRef.current.style.opacity = `${curOpacity}`;
          satelliteGroupRef.current.style.zIndex = "30";
        }

        // Radar beam locks firmly onto India with a glowing laser beam that fades as we enter atmosphere
        if (radarBeamRef.current) {
          const spread = Math.max(6, 28 * (1 - zoomProgress));
          radarBeamRef.current.setAttribute(
            "points",
            `${x},${y} ${targetX - spread},${targetY} ${targetX + spread},${targetY}`
          );
          radarBeamRef.current.style.opacity = `${curOpacity * 0.85}`;
        }

        if (radarLineRef.current) {
          radarLineRef.current.setAttribute("x1", `${x}`);
          radarLineRef.current.setAttribute("y1", `${y}`);
          radarLineRef.current.setAttribute("x2", `${targetX}`);
          radarLineRef.current.setAttribute("y2", `${targetY}`);
          radarLineRef.current.style.opacity = `${curOpacity}`;
        }

        // Expand target reticle as we approach Earth
        if (targetReticleRef.current) {
          const reticleScale = 1 + ease * 0.5;
          targetReticleRef.current.setAttribute(
            "transform",
            `translate(${targetX}, ${targetY}) scale(${reticleScale})`
          );
        }

        // Telemetry updates during zoom
        if (telemetryAltRef.current) {
          const currentAlt = Math.round(35786 * (1 - ease));
          telemetryAltRef.current.textContent = `ALT: ${currentAlt.toLocaleString()} KM // HYPER-DESCENT`;
        }

        if (telemetryVelRef.current) {
          const currentVel = (3.074 + ease * 25.0).toFixed(1);
          telemetryVelRef.current.textContent = `VEL: ${currentVel} KM/S // LOCK: INDIA`;
        }

        if (telemetryTagRef.current) {
          const tagOffsetX = x > cx ? 28 : -180;
          const tagOffsetY = -42;
          telemetryTagRef.current.setAttribute(
            "transform",
            `translate(${x + tagOffsetX}, ${y + tagOffsetY})`
          );
          telemetryTagRef.current.style.opacity = `${curOpacity}`;
        }
      } else {
        // Normal Elliptical Orbit loop
        angle += speed;
        if (angle >= Math.PI * 2) angle -= Math.PI * 2;

        // Calculate unrotated elliptical position
        const x0 = a * Math.cos(angle);
        const y0 = b * Math.sin(angle);

        // Rotate by orbital tilt angle
        const x = cx + x0 * cosTilt - y0 * sinTilt;
        const y = cy + x0 * sinTilt + y0 * cosTilt;

        // z-depth: sin(angle) determines foreground vs background
        const z = Math.sin(angle);

        // 3D Perspective Scaling: 0.85x in back -> 1.35x in front
        const scale = 1.1 + 0.28 * z;

        // Realistic opacity: Dims when orbiting the far side of the planet
        const opacity = z < -0.2 ? Math.max(0.35, 1.0 + z * 0.9) : 1.0;

        // Apply 3D Transform to Satellite Group
        if (satelliteGroupRef.current) {
          satelliteGroupRef.current.setAttribute(
            "transform",
            `translate(${x}, ${y}) scale(${scale})`
          );
          satelliteGroupRef.current.style.opacity = `${opacity}`;
          satelliteGroupRef.current.style.zIndex = z > 0 ? "30" : "10";
        }

        // Dynamic Radar Beam connecting Satellite Dish to India
        if (radarBeamRef.current) {
          const beamSpread = 32;
          radarBeamRef.current.setAttribute(
            "points",
            `${x},${y} ${targetX - beamSpread},${targetY} ${targetX + beamSpread},${targetY}`
          );
          radarBeamRef.current.style.opacity = z < -0.4 ? "0.15" : `${0.75 * Math.max(0.3, z + 0.5)}`;
        }

        if (radarLineRef.current) {
          radarLineRef.current.setAttribute("x1", `${x}`);
          radarLineRef.current.setAttribute("y1", `${y}`);
          radarLineRef.current.setAttribute("x2", `${targetX}`);
          radarLineRef.current.setAttribute("y2", `${targetY}`);
          radarLineRef.current.style.opacity = z < -0.4 ? "0.2" : "0.7";
        }

        // Dynamic Telemetry HUD Tag position
        if (telemetryTagRef.current) {
          const tagOffsetX = x > cx ? 28 : -180;
          const tagOffsetY = -42;
          telemetryTagRef.current.setAttribute(
            "transform",
            `translate(${x + tagOffsetX}, ${y + tagOffsetY})`
          );
          telemetryTagRef.current.style.opacity = z < -0.3 ? "0.4" : "1.0";
        }

        // Live Telemetry Numbers
        if (telemetryAltRef.current) {
          const alt = Math.round(35786 + z * 180);
          telemetryAltRef.current.textContent = `ALT: ${alt.toLocaleString()} KM // GEO-SYNC`;
        }

        if (telemetryVelRef.current) {
          const vel = (3.074 + Math.sin(angle * 2) * 0.015).toFixed(3);
          telemetryVelRef.current.textContent = `VEL: ${vel} KM/S // INCL: 18.4°`;
        }

        // Orbit particle pulse traveling along trajectory
        if (orbitParticleRef.current) {
          const pulseAngle = (angle + 1.2) % (Math.PI * 2);
          const px0 = a * Math.cos(pulseAngle);
          const py0 = b * Math.sin(pulseAngle);
          const px = cx + px0 * cosTilt - py0 * sinTilt;
          const py = cy + px0 * sinTilt + py0 * cosTilt;
          orbitParticleRef.current.setAttribute("cx", `${px}`);
          orbitParticleRef.current.setAttribute("cy", `${py}`);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isZooming]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20 pointer-events-none select-none flex items-center justify-center overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC SVG 3D ORBITAL SATELLITE SYSTEM                             */}
      {/* ========================================================================= */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-w-[1400px] max-h-[100dvh] transition-opacity duration-700"
      >
        <defs>
          {/* Cyan Glowing Orbit Trajectory Gradient */}
          <linearGradient id="orbitLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#0284c7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.8" />
          </linearGradient>

          {/* Dynamic Radar Beam Gradient from Satellite to Earth */}
          <linearGradient id="radarBeamLinearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.65" />
            <stop offset="60%" stopColor="#00D9FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.0" />
          </linearGradient>

          {/* Photorealistic Solar Panel Cells Gradient */}
          <linearGradient id="solarPanelDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="30%" stopColor="#0369a1" />
            <stop offset="70%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          {/* Solar Panel Specular Glint Reflection */}
          <linearGradient id="solarGlintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>

          {/* Golden Thermal Blanket / MLI Foil Gradient */}
          <linearGradient id="goldMLIFoilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#eab308" />
            <stop offset="65%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>

          {/* Metallic Avionics Bus Gradient */}
          <linearGradient id="avionicsMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#e2e8f0" />
            <stop offset="75%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* High-Gain Dish Antenna Metallic Gradient */}
          <linearGradient id="dishGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Ion Thruster Cyan Plasma Exhaust Gradient */}
          <linearGradient id="ionExhaustGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor="#00D9FF" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#0284c7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="cyanGlowHigh" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ========================================================================= */}
        {/* 3D ELLIPTICAL ORBIT TRACK                                                */}
        {/* ========================================================================= */}
        {/* Back Arc of Orbit (Behind the Globe) */}
        <path
          d="M 885 245 A 410 155 -16 0 0 115 355"
          fill="none"
          stroke="#00D9FF"
          strokeOpacity="0.25"
          strokeWidth="1.2"
          strokeDasharray="4 8"
        />

        {/* Front Arc of Orbit (Glowing in Space Foreground) */}
        <path
          d="M 115 355 A 410 155 -16 0 0 885 245"
          fill="none"
          stroke="url(#orbitLineGrad)"
          strokeWidth="2.2"
          strokeDasharray="8 6"
          filter="url(#cyanGlowHigh)"
        />

        {/* Orbit Signal Particle Pulse */}
        <circle
          ref={orbitParticleRef}
          r="3"
          fill="#00D9FF"
          filter="url(#cyanGlowHigh)"
          className="animate-ping"
          opacity="0.85"
        />

        {/* ========================================================================= */}
        {/* DYNAMIC RADAR BEAM CONE (Connecting Satellite to India)                  */}
        {/* ========================================================================= */}
        <polygon
          ref={radarBeamRef}
          points="500,150 460,295 540,295"
          fill="url(#radarBeamLinearGrad)"
          className="pointer-events-none transition-opacity duration-300"
        />
        <line
          ref={radarLineRef}
          x1="500"
          y1="150"
          x2="500"
          y2="295"
          stroke="#00D9FF"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          className="pointer-events-none"
        />

        {/* ========================================================================= */}
        {/* HYPER-ZOOM WARP STREAK LINES & ATMOSPHERIC ENTRY SHOCKWAVES               */}
        {/* ========================================================================= */}
        {isZooming && (
          <g className="pointer-events-none">
            {/* Warp Speed Streak Lines Radiating Outward from India */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 500 + Math.cos(rad) * 45;
              const y1 = 244 + Math.sin(rad) * 35;
              const x2 = 500 + Math.cos(rad) * 460;
              const y2 = 244 + Math.sin(rad) * 320;
              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#00D9FF"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                  strokeDasharray="16 20"
                  className="animate-pulse"
                />
              );
            })}

            {/* Expanding Atmospheric Shockwave Rings */}
            <circle
              cx="500"
              cy="244"
              r="40"
              fill="none"
              stroke="#00D9FF"
              strokeWidth="3"
              className="animate-ping"
              opacity="0.85"
            />
            <circle
              cx="500"
              cy="244"
              r="80"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              className="animate-ping"
              opacity="0.5"
            />
          </g>
        )}

        {/* ========================================================================= */}
        {/* TARGETING RETICLE OVER INDIA (Center 500, 244 - SLIET Longowal)          */}
        {/* ========================================================================= */}
        <g
          ref={targetReticleRef}
          transform="translate(500, 244)"
          className="pointer-events-auto cursor-pointer"
          onClick={handleTrigger}
        >
          {/* Pulsing Outer Scanning Ring */}
          <circle
            r="48"
            fill="none"
            stroke="#00D9FF"
            strokeOpacity={isLocked ? "0.95" : "0.35"}
            strokeWidth="1.2"
            strokeDasharray="5 5"
            className="animate-[spin_20s_linear_infinite]"
          />

          {/* Inner High-Precision Reticle Ring */}
          <circle
            r="28"
            fill="none"
            stroke={isLocked ? "#10b981" : "#00D9FF"}
            strokeOpacity="0.75"
            strokeWidth="1.4"
            strokeDasharray="8 4"
            className="animate-[spin_12s_linear_infinite_reverse]"
          />

          {/* Precision Target Brackets */}
          <path
            d="M -36 -24 L -36 -36 L -24 -36  M 24 -36 L 36 -36 L 36 -24  M 36 24 L 36 36 L 24 36  M -24 36 L -36 36 L -36 24"
            fill="none"
            stroke={isLocked ? "#10b981" : "#00D9FF"}
            strokeWidth="2"
            filter="url(#softGlow)"
          />

          {/* Center Target Acquisition Beacon */}
          <circle
            r="6"
            fill={isLocked ? "#10b981" : "#00D9FF"}
            className="animate-ping"
            opacity="0.8"
          />
          <circle
            r="3"
            fill={isLocked ? "#10b981" : "#ffffff"}
            filter="url(#softGlow)"
          />

          {/* Crosshairs */}
          <line x1="-16" y1="0" x2="-6" y2="0" stroke="#00D9FF" strokeWidth="1.2" />
          <line x1="6" y1="0" x2="16" y2="0" stroke="#00D9FF" strokeWidth="1.2" />
          <line x1="0" y1="-16" x2="0" y2="-6" stroke="#00D9FF" strokeWidth="1.2" />
          <line x1="0" y1="6" x2="0" y2="16" stroke="#00D9FF" strokeWidth="1.2" />

          {/* Target HUD Information Card */}
          <g transform="translate(46, -24)">
            <rect
              x="0"
              y="-10"
              width="165"
              height="36"
              rx="4"
              fill="#020817"
              fillOpacity="0.9"
              stroke={isLocked ? "#10b981" : "#00D9FF"}
              strokeOpacity="0.7"
              strokeWidth="1"
              filter="url(#softGlow)"
            />
            {/* Header Status */}
            <text
              x="10"
              y="4"
              fill={isLocked ? "#10b981" : "#00D9FF"}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="1.2"
            >
              {isLocked ? "● TARGET LOCKED" : "TARGET: INDIA (SLIET)"}
            </text>
            {/* Coordinates */}
            <text
              x="10"
              y="16"
              fill="#e2e8f0"
              fontSize="7.5"
              fontFamily="monospace"
              letterSpacing="0.8"
            >
              30.7391° N, 76.6888° E
            </text>
            <text
              x="10"
              y="23"
              fill="#94a3b8"
              fontSize="6.5"
              fontFamily="monospace"
              letterSpacing="0.6"
            >
              PUNJAB • CONTINENTAL SECTOR 4
            </text>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* RECONNAISSANCE SATELLITE (Fully Articulated 3D Model Group)                */}
        {/* ========================================================================= */}
        <g
          ref={satelliteGroupRef}
          className="pointer-events-auto cursor-pointer"
          onClick={handleTrigger}
        >
          {/* Click Hitbox */}
          <rect
            x="-70"
            y="-45"
            width="140"
            height="90"
            fill="transparent"
            className="cursor-pointer"
          />

          {/* Ion Propulsion Engine Cyan Plasma Plume */}
          <g transform="translate(-42, 0) rotate(180)">
            <polygon
              points="0,-5 28,-10 38,0 28,10 0,5"
              fill="url(#ionExhaustGrad)"
              filter="url(#cyanGlowHigh)"
              className="animate-pulse"
            />
            <line x1="0" y1="0" x2="35" y2="0" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Left Deployable Solar Array Wing */}
          <g transform="translate(-62, -18)">
            {/* Solar Array Boom Bracket */}
            <line x1="38" y1="18" x2="48" y2="18" stroke="#cbd5e1" strokeWidth="3" />
            <circle cx="48" cy="18" r="2.5" fill="#64748b" />

            {/* Main Solar Wing Frame */}
            <rect
              x="0"
              y="2"
              width="38"
              height="32"
              rx="2.5"
              fill="url(#solarPanelDeepGrad)"
              stroke="#38bdf8"
              strokeWidth="1.2"
              filter="url(#softGlow)"
            />

            {/* Solar Cell Grid Circuitry */}
            <line x1="12" y1="2" x2="12" y2="34" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
            <line x1="25" y1="2" x2="25" y2="34" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
            <line x1="0" y1="12" x2="38" y2="12" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
            <line x1="0" y1="23" x2="38" y2="23" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />

            {/* Specular Sun Glint Shimmer */}
            <rect
              x="0"
              y="2"
              width="38"
              height="32"
              rx="2.5"
              fill="url(#solarGlintGrad)"
              opacity="0.6"
            />

            {/* Starboard Green Navigation LED */}
            <circle cx="2" cy="4" r="1.5" fill="#22c55e" />
          </g>

          {/* Central Satellite Chassis / Golden MLI Blanket Bus */}
          <rect
            x="-18"
            y="-18"
            width="36"
            height="36"
            rx="5"
            fill="url(#goldMLIFoilGrad)"
            stroke="#ffffff"
            strokeWidth="1.4"
            filter="url(#softGlow)"
          />

          {/* Foil Multi-Layer Insulation Diamond Texture Lines */}
          <line x1="-18" y1="0" x2="0" y2="-18" stroke="#713f12" strokeWidth="0.8" opacity="0.45" />
          <line x1="0" y1="-18" x2="18" y2="0" stroke="#713f12" strokeWidth="0.8" opacity="0.45" />
          <line x1="-18" y1="0" x2="0" y2="18" stroke="#713f12" strokeWidth="0.8" opacity="0.45" />
          <line x1="0" y1="18" x2="18" y2="0" stroke="#713f12" strokeWidth="0.8" opacity="0.45" />

          {/* Avionics Core Equipment Deck */}
          <rect
            x="-12"
            y="-12"
            width="24"
            height="24"
            rx="3"
            fill="url(#avionicsMetalGrad)"
            stroke="#00D9FF"
            strokeWidth="0.9"
          />

          {/* Optical Camera / Sensor Aperture */}
          <circle cx="0" cy="0" r="5.5" fill="#020817" stroke="#00D9FF" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="3.2" fill="#00D9FF" filter="url(#cyanGlowHigh)" />
          <circle cx="1.2" cy="-1.2" r="1" fill="#ffffff" />

          {/* Right Deployable Solar Array Wing */}
          <g transform="translate(14, -18)">
            {/* Solar Array Boom Bracket */}
            <line x1="0" y1="18" x2="10" y2="18" stroke="#cbd5e1" strokeWidth="3" />
            <circle cx="0" cy="18" r="2.5" fill="#64748b" />

            {/* Main Solar Wing Frame */}
            <rect
              x="10"
              y="2"
              width="38"
              height="32"
              rx="2.5"
              fill="url(#solarPanelDeepGrad)"
              stroke="#38bdf8"
              strokeWidth="1.2"
              filter="url(#softGlow)"
            />

            {/* Solar Cell Grid Circuitry */}
            <line x1="22" y1="2" x2="22" y2="34" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
            <line x1="35" y1="2" x2="35" y2="34" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
            <line x1="10" y1="12" x2="48" y2="12" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
            <line x1="10" y1="23" x2="48" y2="23" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />

            {/* Specular Sun Glint Shimmer */}
            <rect
              x="10"
              y="2"
              width="38"
              height="32"
              rx="2.5"
              fill="url(#solarGlintGrad)"
              opacity="0.6"
            />

            {/* Port Red Navigation LED */}
            <circle cx="46" cy="4" r="1.5" fill="#ef4444" />
          </g>

          {/* High-Gain Steerable Communications Dish Antenna (Facing Earth) */}
          <g transform="translate(0, 18)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#cbd5e1" strokeWidth="2.5" />
            <path
              d="M -14 8 Q 0 22 14 8"
              fill="url(#dishGrad)"
              stroke="#ffffff"
              strokeWidth="1.6"
              filter="url(#softGlow)"
            />
            {/* Feed Horn & Sub-reflector */}
            <line x1="0" y1="8" x2="0" y2="20" stroke="#00D9FF" strokeWidth="1.8" />
            <circle cx="0" cy="20" r="2.8" fill="#00D9FF" filter="url(#cyanGlowHigh)" />
            <circle cx="0" cy="20" r="1.2" fill="#ffffff" />
          </g>

          {/* Omni Telemetry Antenna & Blinking Beacon Strobe */}
          <g transform="translate(0, -18)">
            <line x1="0" y1="0" x2="0" y2="-12" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="0" cy="-12" r="3.5" fill="#00D9FF" className="animate-ping" opacity="0.9" />
            <circle cx="0" cy="-12" r="2" fill="#ffffff" />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* SATELLITE TELEMETRY LEADER HUD BOX (Tracks With Satellite)               */}
        {/* ========================================================================= */}
        <g
          ref={telemetryTagRef}
          className="pointer-events-auto cursor-pointer"
          onClick={handleTrigger}
        >
          {/* Angled Cybernetic Leader Line */}
          <polyline
            points="0,35 25,18 60,18"
            fill="none"
            stroke="#00D9FF"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.8"
          />

          {/* Telemetry Card Background */}
          <rect
            x="30"
            y="-6"
            width="175"
            height="46"
            rx="5"
            fill="#020817"
            fillOpacity="0.9"
            stroke="#00D9FF"
            strokeOpacity="0.75"
            strokeWidth="1"
            filter="url(#softGlow)"
          />

          {/* Header Title */}
          <text
            x="40"
            y="9"
            fill="#00D9FF"
            fontSize="8.5"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="1"
          >
            🛰️ ISRO-TF26 RECON SATELLITE
          </text>

          {/* Altitude Readout */}
          <text
            ref={telemetryAltRef}
            x="40"
            y="21"
            fill="#f8fafc"
            fontSize="7.5"
            fontFamily="monospace"
            letterSpacing="0.8"
          >
            ALT: 35,786 KM // GEO-SYNC
          </text>

          {/* Velocity & Status Readout */}
          <text
            ref={telemetryVelRef}
            x="40"
            y="31"
            fill="#94a3b8"
            fontSize="6.8"
            fontFamily="monospace"
            letterSpacing="0.6"
          >
            VEL: 3.074 KM/S // SCANNING INDIA
          </text>
        </g>
      </svg>

      {/* ========================================================================= */}
      {/* 2. PROMINENT & SLEEK SCANNER STATUS HUD CHIP                             */}
      {/* ========================================================================= */}
      <div className="absolute top-[4.75rem] sm:top-24 inset-x-0 flex flex-col items-center justify-center gap-1.5 pointer-events-auto px-3 sm:px-4 z-20">
        <button
          onClick={handleTrigger}
          className={`inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#00D9FF]/60 bg-[#020817]/90 backdrop-blur-md text-[9px] sm:text-xs font-mono text-neutral-200 hover:text-white shadow-[0_0_25px_rgba(0,217,255,0.35)] active:scale-95 hover:scale-105 transition-all cursor-pointer max-w-[94vw] ${
            isLocked ? "border-emerald-400 text-emerald-300 bg-emerald-950/90 shadow-[0_0_30px_rgba(16,185,129,0.5)]" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00D9FF] animate-ping shrink-0" />
          <span className="font-bold tracking-wider uppercase truncate">
            {isLocked ? (
              <>
                <span className="hidden sm:inline">🎯 TARGET LOCKED: INDIA // COMMENCING DESCENT...</span>
                <span className="sm:hidden">🎯 LOCKED: INDIA // DESCENT...</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">🛰️ SATELLITE ORBITING • TAP TO ZOOM TO INDIA</span>
                <span className="sm:hidden">🛰️ TAP TO ZOOM TO INDIA</span>
              </>
            )}
          </span>
          <span className="text-[#00D9FF] font-bold shrink-0">→</span>
        </button>
      </div>
    </div>
  );
}
