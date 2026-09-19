"use client";

import React, { useState } from "react";

interface IndiaTargetHUDProps {
  onLockIndia: () => void;
  onInspectCampus: () => void;
  isLocked: boolean;
}

export default function IndiaTargetHUD({
  onLockIndia,
  onInspectCampus,
  isLocked,
}: IndiaTargetHUDProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Synthesized Web Audio API Cosmic Ambient Space Drone
  const toggleAmbientSound = () => {
    if (typeof window === "undefined") return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!soundEnabled) {
        const ctx = new AudioCtx();
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 deep space fundamental

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 harmonic

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.5);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        (window as unknown as { _ambientGain?: GainNode; _ambientCtx?: AudioContext })._ambientGain = gain;
        (window as unknown as { _ambientGain?: GainNode; _ambientCtx?: AudioContext })._ambientCtx = ctx;

        setSoundEnabled(true);
      } else {
        const globalStore = window as unknown as { _ambientGain?: GainNode; _ambientCtx?: AudioContext };
        if (globalStore._ambientGain && globalStore._ambientCtx) {
          globalStore._ambientGain.gain.exponentialRampToValueAtTime(
            0.001,
            globalStore._ambientCtx.currentTime + 0.8
          );
          setTimeout(() => {
            globalStore._ambientCtx?.close();
          }, 900);
        }
        setSoundEnabled(false);
      }
    } catch {
      setSoundEnabled(!soundEnabled);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 w-full pointer-events-none">
      {/* ========================================================================= */}
      {/* 1. RADAR SCANNER CLIPART & TARGETING CARD (Bottom-Left)                   */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#06152D]/85 border border-[#00D9FF]/40 backdrop-blur-xl shadow-[0_0_35px_rgba(0,217,255,0.3)] pointer-events-auto max-w-sm">
        {/* Animated Radar Screen Clipart */}
        <div className="relative w-16 h-16 rounded-full bg-[#020817] border border-[#00D9FF]/60 flex items-center justify-center overflow-hidden shrink-0 shadow-[inset_0_0_15px_rgba(0,217,255,0.4)]">
          {/* Concentric Range Rings */}
          <div className="absolute inset-1.5 rounded-full border border-[#00D9FF]/25" />
          <div className="absolute inset-3.5 rounded-full border border-[#00D9FF]/20" />
          <div className="absolute inset-5 rounded-full border border-[#00D9FF]/15" />
          {/* Crosshairs */}
          <div className="absolute w-full h-[1px] bg-[#00D9FF]/30" />
          <div className="absolute h-full w-[1px] bg-[#00D9FF]/30" />

          {/* Rotating Radar Sweep Line */}
          <div className="absolute inset-0 origin-center animate-[spin_3.5s_linear_infinite]">
            <div className="w-1/2 h-1/2 origin-bottom-right bg-gradient-to-tr from-transparent via-[#00D9FF]/10 to-[#00D9FF]/70" />
          </div>

          {/* Target Blip: India / SLIET Longowal */}
          <div className="absolute top-4 left-5 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF] animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-white relative" />
          </div>
        </div>

        {/* Telemetry Readout */}
        <div className="flex flex-col text-[10px] font-mono leading-tight space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[#00D9FF] font-bold tracking-widest uppercase">
              🇮🇳 INDIA // 30.22°N 75.83°E
            </span>
          </div>
          <span className="text-neutral-300 text-[11px] font-semibold">
            SLIET Longowal, Punjab
          </span>
          <div className="flex items-center gap-2 text-[9px] text-neutral-400">
            <span>OBSERVER: GAZING</span>
            <span className="text-emerald-400 font-semibold">• LOCKED</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE CONTROLS (Lock India / Inspect / Sound)                    */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Re-center / Lock onto India */}
        <button
          onClick={onLockIndia}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer shadow-lg active:scale-95 ${
            isLocked
              ? "bg-[#00D9FF] text-[#020817] font-bold border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.6)]"
              : "bg-[#06152D]/80 hover:bg-[#00D9FF]/20 text-neutral-200 hover:text-white border-white/20"
          }`}
          title="Align observer and camera to India"
        >
          <span>🎯</span>
          <span>LOCK ON INDIA</span>
        </button>

        {/* Inspect Campus Button */}
        <button
          onClick={onInspectCampus}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 bg-[#06152D]/80 hover:bg-white/15 text-neutral-200 hover:text-white text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-md active:scale-95"
          title="Inspect SLIET 451-Acre Campus"
        >
          <span>🧭</span>
          <span className="hidden sm:inline">CAMPUS TOUR</span>
        </button>

        {/* Ambient Space Sound Toggle */}
        <button
          onClick={toggleAmbientSound}
          className="w-10 h-10 rounded-full border border-white/20 bg-[#06152D]/80 hover:bg-white/15 flex items-center justify-center text-sm transition-all duration-200 cursor-pointer backdrop-blur-md active:scale-95"
          title="Toggle Deep Space Ambience"
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>
      </div>
    </div>
  );
}
