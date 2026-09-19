"use client";

import React from "react";

interface WelcomeHUDProps {
  progress: number;
  onSkip: () => void;
}

const BEATS = [
  { id: 0, p: 0.04, label: "00 // ORIGIN" },
  { id: 1, p: 0.13, label: "01 // EARTH" },
  { id: 2, p: 0.23, label: "02 // OBSERVE" },
  { id: 3, p: 0.33, label: "03 // QUESTION" },
  { id: 4, p: 0.43, label: "04 // CREATE" },
  { id: 5, p: 0.53, label: "05 // CONNECT" },
  { id: 6, p: 0.63, label: "06 // INNOVATE" },
  { id: 7, p: 0.73, label: "07 // SUSTAIN" },
  { id: 8, p: 0.83, label: "08 // SLIET" },
  { id: 9, p: 0.92, label: "09 // REVEAL" },
  { id: 10, p: 0.98, label: "10 // ENTER" },
];

export default function WelcomeHUD({ progress, onSkip }: WelcomeHUDProps) {
  const currentBeat = BEATS.findLast((b) => progress >= b.p - 0.05) || BEATS[0];

  return (
    <div className="absolute inset-0 pointer-events-none z-30 select-none flex flex-col justify-between p-4 sm:p-8">
      {/* Top HUD Bar */}
      <div className="w-full flex items-center justify-between text-white pointer-events-auto">
        {/* Left Story Chapter Tag */}
        <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-300 uppercase">
            {currentBeat.label}
          </span>
        </div>

        {/* Right Skip Button */}
        <button
          onClick={onSkip}
          className="px-3.5 py-1 text-[9px] font-mono tracking-widest uppercase border border-white/15 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black text-white rounded-full transition-all cursor-pointer shadow-lg"
          aria-label="Skip story to main exhibition"
        >
          SKIP [→]
        </button>
      </div>

      {/* Reticle Corner Brackets */}
      <div className="absolute top-10 left-8 w-4 h-4 border-t border-l border-white/15 pointer-events-none hidden sm:block" />
      <div className="absolute top-10 right-8 w-4 h-4 border-t border-r border-white/15 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-10 left-8 w-4 h-4 border-b border-l border-white/15 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-10 right-8 w-4 h-4 border-b border-r border-white/15 pointer-events-none hidden sm:block" />

      {/* Bottom Progress Hairline */}
      <div className="w-full flex items-center justify-between gap-4 text-white pointer-events-none">
        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase hidden sm:block">
          SLIET 30.22°N 75.83°E // ALT: 410KM
        </span>

        {/* Hairline Progress Bar */}
        <div className="w-full sm:w-64 h-0.5 bg-white/10 rounded-full overflow-hidden mx-auto sm:mx-0">
          <div
            className="h-full bg-cyan-400 transition-all duration-100"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}
