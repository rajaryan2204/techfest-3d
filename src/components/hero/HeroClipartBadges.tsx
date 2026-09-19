"use client";

import React from "react";

export default function HeroClipartBadges() {
  return (
    <>
      {/* ========================================================================= */}
      {/* SLEEK ORBITAL SATELLITE CLIPART (Top-Right Sky, Subtle & Lightweight)      */}
      {/* ========================================================================= */}
      <div
        className="hidden md:flex absolute top-24 right-10 lg:right-16 z-20 flex-col items-center group pointer-events-none select-none"
      >
        <div className="relative w-20 h-20 lg:w-24 lg:h-24 animate-[float_5s_ease-in-out_infinite]">
          {/* Subtle Beacon Ping */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#00D9FF]/30 animate-ping pointer-events-none" />

          {/* Clean High-Tech Vector Satellite Clipart */}
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(0,217,255,0.45)]"
          >
            <defs>
              <linearGradient id="solarPanelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#082f49" />
              </linearGradient>
              <linearGradient id="satBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>

            <g transform="rotate(-15 80 80)">
              {/* Left Solar Panel */}
              <rect
                x="20"
                y="72"
                width="34"
                height="16"
                rx="2"
                fill="url(#solarPanelGrad)"
                stroke="#38bdf8"
                strokeWidth="1.2"
              />
              <line x1="31" y1="72" x2="31" y2="88" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="43" y1="72" x2="43" y2="88" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="20" y1="80" x2="54" y2="80" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="54" y1="80" x2="66" y2="80" stroke="#94a3b8" strokeWidth="2" />

              {/* Main Satellite Bus */}
              <rect
                x="66"
                y="68"
                width="28"
                height="24"
                rx="4"
                fill="url(#satBodyGrad)"
                stroke="#ffffff"
                strokeWidth="1.2"
              />
              <circle cx="80" cy="80" r="4.5" fill="#00D9FF" />

              {/* Right Solar Panel */}
              <line x1="94" y1="80" x2="106" y2="80" stroke="#94a3b8" strokeWidth="2" />
              <rect
                x="106"
                y="72"
                width="34"
                height="16"
                rx="2"
                fill="url(#solarPanelGrad)"
                stroke="#38bdf8"
                strokeWidth="1.2"
              />
              <line x1="117" y1="72" x2="117" y2="88" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="129" y1="72" x2="129" y2="88" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="106" y1="80" x2="140" y2="80" stroke="#38bdf8" strokeWidth="0.8" />

              {/* Downward Antenna Dish */}
              <path
                d="M 73 92 Q 80 102 87 92"
                fill="none"
                stroke="#f8fafc"
                strokeWidth="1.8"
              />
              <line x1="80" y1="92" x2="80" y2="100" stroke="#00D9FF" strokeWidth="1.2" />
              <circle cx="80" cy="100" r="1.5" fill="#00D9FF" />
            </g>
          </svg>
        </div>

        {/* Minimal Pill Badge */}
        <div className="mt-0.5 px-2 py-0.5 rounded-full bg-[#06152D]/70 border border-[#00D9FF]/30 text-[8px] font-mono text-[#00D9FF]/90 tracking-widest backdrop-blur-xs shadow-sm">
          🛰️ ORBITAL RECON
        </div>
      </div>
    </>
  );
}
