"use client";

import React, { useState } from "react";

interface OrbitalSatelliteViewProps {
  onInitiateZoom: () => void;
  isZooming?: boolean;
}

export default function OrbitalSatelliteView({
  onInitiateZoom,
  isZooming = false,
}: OrbitalSatelliteViewProps) {
  const [isLocked, setIsLocked] = useState(false);

  const handleTrigger = () => {
    setIsLocked(true);
    setTimeout(() => {
      onInitiateZoom();
    }, 400);
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none flex items-center justify-center overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HARDWARE-ACCELERATED SVG ORBITAL SATELLITE & SCANNING RADAR SYSTEM    */}
      {/* ========================================================================= */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-w-[1400px] max-h-[100dvh] transition-opacity duration-700"
      >
        <defs>
          {/* Cyan/Blue Orbit Glow Gradient */}
          <linearGradient id="orbitGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.15" />
          </linearGradient>

          {/* Radar Scanning Beam Gradient */}
          <linearGradient id="radarBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#00D9FF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
          </linearGradient>

          {/* Solar Panel Cells Gradient */}
          <linearGradient id="solarCellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          {/* Satellite Metallic Bus Gradient */}
          <linearGradient id="satChassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Gold Thermal Foil Gradient */}
          <linearGradient id="goldFoilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Elliptical Orbital Path (Tilted -12° around center 500, 300) */}
          <path
            id="satOrbitPath"
            d="M 130 310 A 370 145 -12 1 0 870 310 A 370 145 -12 1 0 130 310"
            fill="none"
          />
        </defs>

        {/* Back Half of Orbit (Dashed Deep Space Path) */}
        <path
          d="M 870 310 A 370 145 -12 0 0 130 310"
          fill="none"
          stroke="#00D9FF"
          strokeOpacity="0.25"
          strokeWidth="1.2"
          strokeDasharray="4 8"
        />

        {/* Front Half of Orbit (Illuminated Glowing Path) */}
        <path
          d="M 130 310 A 370 145 -12 0 0 870 310"
          fill="none"
          stroke="url(#orbitGlowGrad)"
          strokeWidth="1.8"
          strokeDasharray="8 6"
          filter="url(#cyanGlow)"
        />

        {/* ========================================================================= */}
        {/* TARGETING RETICLE OVER INDIA (Center 500, 290)                           */}
        {/* ========================================================================= */}
        <g
          transform="translate(500, 290)"
          className="pointer-events-auto cursor-pointer"
          onClick={handleTrigger}
        >
          {/* Pulsing Outer Range Ring */}
          <circle
            r="44"
            fill="none"
            stroke="#00D9FF"
            strokeOpacity={isLocked ? "0.9" : "0.35"}
            strokeWidth="1"
            strokeDasharray="4 4"
            className="animate-[spin_18s_linear_infinite]"
          />

          {/* Target Corner Ticks */}
          <path
            d="M -32 -20 L -32 -32 L -20 -32  M 20 -32 L 32 -32 L 32 -20  M 32 20 L 32 32 L 20 32  M -20 32 L -32 32 L -32 20"
            fill="none"
            stroke={isLocked ? "#10b981" : "#00D9FF"}
            strokeWidth="1.8"
          />

          {/* Center Target Crosshair & Blinking Ping */}
          <circle
            r="4"
            fill={isLocked ? "#10b981" : "#00D9FF"}
            className="animate-ping"
            opacity="0.75"
          />
          <circle
            r="2.5"
            fill={isLocked ? "#10b981" : "#ffffff"}
          />
          <line x1="-12" y1="0" x2="-4" y2="0" stroke="#00D9FF" strokeWidth="1" />
          <line x1="4" y1="0" x2="12" y2="0" stroke="#00D9FF" strokeWidth="1" />
          <line x1="0" y1="-12" x2="0" y2="-4" stroke="#00D9FF" strokeWidth="1" />
          <line x1="0" y1="4" x2="0" y2="12" stroke="#00D9FF" strokeWidth="1" />

          {/* Target Telemetry Label */}
          <g transform="translate(42, -18)">
            <rect
              x="0"
              y="-10"
              width="145"
              height="28"
              rx="4"
              fill="#020817"
              fillOpacity="0.85"
              stroke={isLocked ? "#10b981" : "#00D9FF"}
              strokeOpacity="0.6"
              strokeWidth="0.8"
            />
            <text
              x="8"
              y="2"
              fill={isLocked ? "#10b981" : "#00D9FF"}
              fontSize="8"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="1"
            >
              {isLocked ? "● TARGET LOCKED" : "TARGET: INDIA (SLIET)"}
            </text>
            <text
              x="8"
              y="12"
              fill="#94a3b8"
              fontSize="6.5"
              fontFamily="monospace"
              letterSpacing="0.8"
            >
              30.7391° N, 76.6888° E
            </text>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* RECONNAISSANCE SATELLITE (Active Motion Along Orbital Trajectory)         */}
        {/* ========================================================================= */}
        <g className="pointer-events-auto cursor-pointer" onClick={handleTrigger}>
          {/* Animate Motion Along satOrbitPath */}
          <animateMotion
            dur="18s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#satOrbitPath" />
          </animateMotion>

          {/* Radar Scanning Beam Projecting Toward Earth Surface */}
          <polygon
            points="0,-6 -140,-120 140,-120"
            fill="url(#radarBeamGrad)"
            opacity="0.8"
            className="animate-pulse"
          />

          {/* Satellite Structure Group (Scale & Details) */}
          <g transform="scale(0.85)">
            {/* Left Solar Array Wing */}
            <g transform="translate(-46, -10)">
              <rect
                x="0"
                y="0"
                width="34"
                height="20"
                rx="2"
                fill="url(#solarCellGrad)"
                stroke="#38bdf8"
                strokeWidth="1"
              />
              {/* Solar Cell Grid Lines */}
              <line x1="11" y1="0" x2="11" y2="20" stroke="#38bdf8" strokeWidth="0.6" />
              <line x1="22" y1="0" x2="22" y2="20" stroke="#38bdf8" strokeWidth="0.6" />
              <line x1="0" y1="10" x2="34" y2="10" stroke="#38bdf8" strokeWidth="0.6" />
              {/* Solar Array Boom */}
              <line x1="34" y1="10" x2="46" y2="10" stroke="#cbd5e1" strokeWidth="2.5" />
            </g>

            {/* Satellite Central Chassis / Bus */}
            <rect
              x="-14"
              y="-12"
              width="28"
              height="24"
              rx="4"
              fill="url(#goldFoilGrad)"
              stroke="#ffffff"
              strokeWidth="1.2"
              filter="url(#cyanGlow)"
            />

            {/* Avionics Core Panel */}
            <rect
              x="-10"
              y="-8"
              width="20"
              height="16"
              rx="2"
              fill="url(#satChassisGrad)"
              stroke="#38bdf8"
              strokeWidth="0.8"
            />
            <circle cx="0" cy="0" r="3.5" fill="#00D9FF" />

            {/* Right Solar Array Wing */}
            <g transform="translate(12, -10)">
              {/* Solar Array Boom */}
              <line x1="0" y1="10" x2="12" y2="10" stroke="#cbd5e1" strokeWidth="2.5" />
              <rect
                x="12"
                y="0"
                width="34"
                height="20"
                rx="2"
                fill="url(#solarCellGrad)"
                stroke="#38bdf8"
                strokeWidth="1"
              />
              {/* Solar Cell Grid Lines */}
              <line x1="23" y1="0" x2="23" y2="20" stroke="#38bdf8" strokeWidth="0.6" />
              <line x1="34" y1="0" x2="34" y2="20" stroke="#38bdf8" strokeWidth="0.6" />
              <line x1="12" y1="10" x2="46" y2="10" stroke="#38bdf8" strokeWidth="0.6" />
            </g>

            {/* High-Gain Parabolic Communications Dish (Pointing to Earth) */}
            <path
              d="M -10 12 Q 0 24 10 12"
              fill="none"
              stroke="#f8fafc"
              strokeWidth="2"
            />
            <line x1="0" y1="12" x2="0" y2="21" stroke="#00D9FF" strokeWidth="1.5" />
            <circle cx="0" cy="21" r="2" fill="#00D9FF" />

            {/* Pulsing LED Beacon */}
            <circle cx="0" cy="-14" r="2.5" fill="#00D9FF" className="animate-ping" />
            <circle cx="0" cy="-14" r="1.5" fill="#ffffff" />
          </g>

          {/* Floating Satellite Telemetry Tag */}
          <g transform="translate(24, -30)">
            <rect
              x="0"
              y="0"
              width="105"
              height="22"
              rx="3"
              fill="#020817"
              fillOpacity="0.85"
              stroke="#00D9FF"
              strokeOpacity="0.6"
              strokeWidth="0.8"
            />
            <text
              x="6"
              y="9"
              fill="#00D9FF"
              fontSize="6.5"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="0.8"
            >
              🛰️ ISRO-TF26 RECON
            </text>
            <text
              x="6"
              y="17"
              fill="#94a3b8"
              fontSize="5.5"
              fontFamily="monospace"
              letterSpacing="0.5"
            >
              ALT: 35,786 KM • GEO-SYNC
            </text>
          </g>
        </g>
      </svg>

      {/* ========================================================================= */}
      {/* 2. SLEEK SCANNER STATUS HUD CHIP (Non-intrusive on Mobile)               */}
      {/* ========================================================================= */}
      <div className="absolute top-20 sm:top-24 inset-x-0 flex flex-col items-center justify-center gap-1.5 pointer-events-auto px-4 z-20">
        <button
          onClick={handleTrigger}
          className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#00D9FF]/40 bg-[#020817]/85 backdrop-blur-md text-[9px] sm:text-[11px] font-mono text-neutral-300 hover:text-white shadow-[0_0_20px_rgba(0,217,255,0.25)] active:scale-95 transition-all cursor-pointer ${
            isLocked ? "border-emerald-400 text-emerald-400 bg-emerald-950/80" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-ping" />
          <span className="font-bold tracking-wider">
            {isLocked ? "LOCK CONFIRMED • COMMENCING DESCENT" : "🛰️ SATELLITE ORBITING EARTH // TAP TO ZOOM TO INDIA"}
          </span>
          <span className="text-[#00D9FF]">→</span>
        </button>
      </div>
    </div>
  );
}
