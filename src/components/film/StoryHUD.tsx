"use client";

import React, { useState, useEffect } from "react";
import { audioEngine } from "@/lib/audioEngine";

interface StoryHUDProps {
  progress: number;
  onSkip: () => void;
}

const CHAPTERS = [
  { id: 1, p: 0.10, label: "01 // OUR HOME" },
  { id: 2, p: 0.30, label: "02 // INNOVATION" },
  { id: 3, p: 0.50, label: "03 // THE PIONEER" },
  { id: 4, p: 0.70, label: "04 // SUSTAINABILITY" },
  { id: 5, p: 0.90, label: "05 // TECHFEST'26" },
];

export default function StoryHUD({ progress, onSkip }: StoryHUDProps) {
  const [soundMuted, setSoundMuted] = useState(true);

  useEffect(() => {
    const unsub = audioEngine.subscribe((muted) => setSoundMuted(muted));
    return unsub;
  }, []);

  // If user has scrolled into website main, hide the story HUD
  if (progress > 0.98) return null;

  const currentChapter = CHAPTERS.findLast((c) => progress >= c.p - 0.1) || CHAPTERS[0];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none flex flex-col justify-between p-4 sm:p-8">
      {/* 1. TOP HUD BAR */}
      <div className="w-full flex items-center justify-between text-white pointer-events-auto">
        {/* Left: Live Story Mode Tag */}
        <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-300 uppercase">
            {currentChapter.label}
          </span>
        </div>

        {/* Right: Audio & Skip Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => audioEngine.toggleSound()}
            className={`px-3 py-1 text-[9px] font-mono tracking-widest uppercase border rounded-full transition-all cursor-pointer ${
              !soundMuted
                ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                : "border-white/15 bg-black/40 backdrop-blur-md text-neutral-400 hover:text-white"
            }`}
            aria-label="Toggle atmospheric audio"
          >
            SOUND {!soundMuted ? "[ON]" : "[OFF]"}
          </button>

          {/* Direct Skip Button */}
          <button
            onClick={onSkip}
            className="px-3 py-1 text-[9px] font-mono tracking-widest uppercase border border-white/15 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black text-white rounded-full transition-all cursor-pointer shadow-lg"
            aria-label="Skip to main exhibition"
          >
            SKIP [→]
          </button>
        </div>
      </div>

      {/* 2. SCI-FI RETICLE CORNER BRACKETS */}
      <div className="absolute top-10 left-8 w-4 h-4 border-t border-l border-white/20 pointer-events-none hidden sm:block" />
      <div className="absolute top-10 right-8 w-4 h-4 border-t border-r border-white/20 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-10 left-8 w-4 h-4 border-b border-l border-white/20 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-10 right-8 w-4 h-4 border-b border-r border-white/20 pointer-events-none hidden sm:block" />

      {/* 3. BOTTOM MINIMAL PROGRESS HAIRLINE */}
      <div className="w-full flex items-center justify-between gap-4 text-white pointer-events-none">
        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase hidden sm:block">
          SLIET 30.22°N 75.83°E // ALT: 410KM
        </span>

        {/* Minimal Hairline Progress Bar */}
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
