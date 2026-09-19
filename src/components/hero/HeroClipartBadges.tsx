"use client";

import React, { useState } from "react";

export default function HeroClipartBadges() {
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. SATELLITE RECON CLIPART (Top-Right Floating)                           */}
      {/* ========================================================================= */}
      <div
        className="hidden md:flex absolute top-20 right-12 z-20 flex-col items-center group cursor-pointer"
        onMouseEnter={() => setActiveBadge("satellite")}
        onMouseLeave={() => setActiveBadge(null)}
      >
        <div className="relative w-28 h-28 animate-[float_4.5s_ease-in-out_infinite]">
          {/* Animated Radio Transmission Waves pointing to India */}
          <div className="absolute -bottom-2 -left-4 flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full border border-[#00D9FF]/40 animate-ping" />
            <span className="absolute w-12 h-12 rounded-full border border-[#00D9FF]/20 animate-pulse" />
          </div>

          {/* SVG Vector Satellite Clipart */}
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_0_25px_rgba(0,217,255,0.6)]">
            <defs>
              <linearGradient id="solarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#0369a1" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </linearGradient>
              <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>

            {/* Left Solar Array */}
            <g transform="rotate(-15 80 80)">
              <rect x="15" y="70" width="38" height="20" rx="3" fill="url(#solarGrad)" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="28" y1="70" x2="28" y2="90" stroke="#38bdf8" strokeWidth="1" />
              <line x1="40" y1="70" x2="40" y2="90" stroke="#38bdf8" strokeWidth="1" />
              <line x1="15" y1="80" x2="53" y2="80" stroke="#38bdf8" strokeWidth="1" />
              <line x1="53" y1="80" x2="65" y2="80" stroke="#94a3b8" strokeWidth="2.5" />

              {/* Central Satellite Body */}
              <rect x="65" y="66" width="30" height="28" rx="4" fill="url(#metalGrad)" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="80" cy="80" r="6" fill="#00D9FF" className="animate-pulse" />
              <rect x="70" y="72" width="6" height="4" fill="url(#goldGrad)" />
              <rect x="84" y="72" width="6" height="4" fill="url(#goldGrad)" />

              {/* Right Solar Array */}
              <line x1="95" y1="80" x2="107" y2="80" stroke="#94a3b8" strokeWidth="2.5" />
              <rect x="107" y="70" width="38" height="20" rx="3" fill="url(#solarGrad)" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="120" y1="70" x2="120" y2="90" stroke="#38bdf8" strokeWidth="1" />
              <line x1="132" y1="70" x2="132" y2="90" stroke="#38bdf8" strokeWidth="1" />
              <line x1="107" y1="80" x2="145" y2="80" stroke="#38bdf8" strokeWidth="1" />

              {/* Parabolic Dish Antenna pointing down to India */}
              <path d="M 72 94 Q 80 108 88 94" fill="none" stroke="#f8fafc" strokeWidth="2" />
              <line x1="80" y1="94" x2="80" y2="104" stroke="#00D9FF" strokeWidth="1.5" />
              <circle cx="80" cy="104" r="2" fill="#00D9FF" />
            </g>
          </svg>
        </div>

        {/* Badge Label */}
        <div className="px-2.5 py-1 rounded-full bg-[#06152D]/85 border border-[#00D9FF]/40 text-[9px] font-mono text-[#00D9FF] tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(0,217,255,0.3)] group-hover:scale-105 transition-transform">
          🛰️ ISRO / ORBITAL SATELLITE
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BHARAT INNOVATION // INDIAN TECH EMBLEM CLIPART (Left Floating)        */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex absolute top-48 left-10 z-20 flex-col items-center group cursor-pointer animate-[float_5s_ease-in-out_infinite_0.7s]">
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-[#06152D]/90 to-[#020817]/90 border border-white/20 p-2.5 backdrop-blur-xl shadow-[0_0_30px_rgba(0,217,255,0.25)] group-hover:border-[#00D9FF] transition-all group-hover:scale-105">
          {/* Holographic Ashoka Chakra + Circuit Traces Vector Clipart */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="chakraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* Outer Tech Hexagon */}
            <polygon points="50,5 89,27 89,73 50,95 11,73 11,27" fill="none" stroke="#00D9FF" strokeWidth="1.5" strokeDasharray="4 2" />
            
            {/* 24-Spoke Chakra Tech Gear */}
            <circle cx="50" cy="50" r="28" fill="none" stroke="url(#chakraGrad)" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="7" fill="#00D9FF" />
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 26 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={50 + 26 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="#38bdf8"
                strokeWidth="1"
                opacity="0.75"
              />
            ))}
          </svg>

          {/* Saffron & Green Cyber Corner Dots */}
          <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
          <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
        </div>

        <div className="mt-1.5 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[8px] font-mono tracking-widest text-neutral-300 uppercase">
          BHARAT INNOVATION
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ASTRONAUT / OBSERVER VISOR CLIPART BADGE                               */}
      {/* ========================================================================= */}
      <div className="hidden xl:flex absolute bottom-28 right-24 z-20 flex-col items-center group cursor-pointer animate-[float_6s_ease-in-out_infinite_1.4s]">
        <div className="relative w-24 h-24 rounded-full bg-[#06152D]/80 border border-[#00D9FF]/40 p-2 backdrop-blur-xl shadow-[0_0_35px_rgba(0,217,255,0.35)] group-hover:scale-105 transition-all">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Astronaut Helmet Silhouette */}
            <path
              d="M 20 55 C 20 28, 80 28, 80 55 C 80 75, 68 85, 50 85 C 32 85, 20 75, 20 55 Z"
              fill="#0f172a"
              stroke="#00D9FF"
              strokeWidth="2"
            />
            {/* Visor with India continent reflection */}
            <path
              d="M 28 50 C 28 35, 72 35, 72 50 C 72 65, 64 74, 50 74 C 36 74, 28 65, 28 50 Z"
              fill="url(#solarGrad)"
              stroke="#38bdf8"
              strokeWidth="1.5"
            />
            {/* Glowing Golden Reflection of India */}
            <path
              d="M 45 42 Q 52 40 56 46 Q 50 56 48 64 Q 44 56 45 42 Z"
              fill="#f59e0b"
              opacity="0.8"
            />
            {/* Helmet Light Beams */}
            <circle cx="23" cy="50" r="2.5" fill="#ffffff" />
            <circle cx="77" cy="50" r="2.5" fill="#ffffff" />
          </svg>

          {/* Live Beacon Pulse */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
        </div>

        <div className="mt-1 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[8px] font-mono tracking-widest text-[#00D9FF] uppercase">
          GAZING AT INDIA
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. FUTURISTIC TECH DOMAIN STICKERS / CLIPARTS                             */}
      {/* ========================================================================= */}
      <div className="hidden sm:flex absolute bottom-20 left-12 z-20 flex-wrap gap-2 max-w-sm pointer-events-auto">
        {/* Robotics Clipart Sticker */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md text-[10px] font-mono text-neutral-200 transition-transform hover:-translate-y-0.5 shadow-sm">
          <span className="text-sm">🤖</span>
          <span>ROBOWARS &amp; AI</span>
        </div>

        {/* Space Rocket Clipart Sticker */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00D9FF]/10 hover:bg-[#00D9FF]/20 border border-[#00D9FF]/40 backdrop-blur-md text-[10px] font-mono text-[#00D9FF] transition-transform hover:-translate-y-0.5 shadow-[0_0_12px_rgba(0,217,255,0.2)]">
          <span className="text-sm">🚀</span>
          <span>AEROSPACE &amp; DRONES</span>
        </div>

        {/* Hackathon Clipart Sticker */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md text-[10px] font-mono text-neutral-200 transition-transform hover:-translate-y-0.5 shadow-sm">
          <span className="text-sm">⚡</span>
          <span>36HR HACK-SLIET</span>
        </div>

        {/* Green Earth Tech Clipart Sticker */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md text-[10px] font-mono text-emerald-400 transition-transform hover:-translate-y-0.5 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
          <span className="text-sm">🌱</span>
          <span>SUSTAINABLE EARTH</span>
        </div>
      </div>
    </>
  );
}
