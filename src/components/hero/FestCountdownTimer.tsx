"use client";

import React, { useState, useEffect } from "react";

// Official TechFest'26 Launch Date: October 16, 2026 09:00:00 IST
const TARGET_DATE = new Date("2026-10-16T09:00:00+05:30").getTime();

export default function FestCountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isLive: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateCountdown = () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="relative inline-flex flex-col gap-1.5 p-2 sm:p-3 rounded-xl bg-[#030919]/85 backdrop-blur-md border border-cyan-500/30 min-h-[70px] min-w-[240px]" />
    );
  }

  return (
    <div className="relative inline-flex flex-col gap-1.5 p-2 sm:p-3 rounded-xl bg-[#030919]/90 backdrop-blur-md border border-cyan-500/35 shadow-[0_0_25px_rgba(0,217,255,0.2)] select-none">
      {/* Sci-Fi Corner Brackets */}
      <span className="absolute top-1 left-1 text-[8px] text-cyan-400 font-mono leading-none">⌜</span>
      <span className="absolute top-1 right-1 text-[8px] text-cyan-400 font-mono leading-none">⌝</span>
      <span className="absolute bottom-1 left-1 text-[8px] text-cyan-400 font-mono leading-none">⌞</span>
      <span className="absolute bottom-1 right-1 text-[8px] text-cyan-400 font-mono leading-none">⌟</span>

      {/* Header Telemetry Line: Real Live Status */}
      <div className="flex items-center justify-between gap-3 text-[9px] font-mono text-neutral-300 px-0.5">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-cyan-300 font-bold tracking-widest uppercase">
            {timeLeft.isLive ? "● FEST IS LIVE" : "LIVE T-MINUS COUNTDOWN"}
          </span>
        </div>
        <span className="text-[8px] text-neutral-400 tracking-wider">
          TARGET: 16 OCT 2026 // IST
        </span>
      </div>

      {/* Countdown Grid with live second pulse */}
      <div className="flex items-center gap-1.5 sm:gap-2 font-mono">
        {/* DAYS */}
        <div className="flex flex-col items-center px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/25 min-w-[44px] sm:min-w-[50px]">
          <span className="text-sm sm:text-lg md:text-xl font-black text-white tracking-wider drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">
            {timeLeft.days.toString().padStart(2, "0")}
          </span>
          <span className="text-[7px] sm:text-[8px] text-cyan-400 font-semibold tracking-wider uppercase">
            DAYS
          </span>
        </div>

        <span className="text-cyan-400/80 font-bold text-xs sm:text-sm animate-pulse">:</span>

        {/* HOURS */}
        <div className="flex flex-col items-center px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/25 min-w-[44px] sm:min-w-[50px]">
          <span className="text-sm sm:text-lg md:text-xl font-black text-white tracking-wider drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">
            {timeLeft.hours.toString().padStart(2, "0")}
          </span>
          <span className="text-[7px] sm:text-[8px] text-cyan-400 font-semibold tracking-wider uppercase">
            HOURS
          </span>
        </div>

        <span className="text-cyan-400/80 font-bold text-xs sm:text-sm animate-pulse">:</span>

        {/* MINS */}
        <div className="flex flex-col items-center px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/25 min-w-[44px] sm:min-w-[50px]">
          <span className="text-sm sm:text-lg md:text-xl font-black text-white tracking-wider drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-[7px] sm:text-[8px] text-cyan-400 font-semibold tracking-wider uppercase">
            MINS
          </span>
        </div>

        <span className="text-cyan-400/80 font-bold text-xs sm:text-sm animate-pulse">:</span>

        {/* SECS with live heartbeat glow */}
        <div className="flex flex-col items-center px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-cyan-950/50 border border-cyan-400/40 min-w-[44px] sm:min-w-[50px] relative overflow-hidden">
          <span className="text-sm sm:text-lg md:text-xl font-black text-cyan-300 tracking-wider drop-shadow-[0_0_12px_rgba(0,217,255,0.9)]">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-[7px] sm:text-[8px] text-cyan-400 font-semibold tracking-wider uppercase">
            SECS
          </span>
        </div>
      </div>
    </div>
  );
}
