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
      <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-[#020817]/60 backdrop-blur-xl border border-white/10 min-h-[64px] min-w-[260px]" />
    );
  }

  return (
    <div className="inline-flex flex-col gap-2 p-3.5 sm:p-4 rounded-2xl bg-[#020817]/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] select-none">
      {/* Header: Status */}
      <div className="flex items-center justify-between gap-4 text-[10px] font-mono text-neutral-300">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold tracking-wider uppercase text-neutral-200">
            {timeLeft.isLive ? "Fest In Progress" : "Countdown to TechFEST'26"}
          </span>
        </div>
        <span className="text-neutral-400 tracking-wider">
          16-17 OCT 2026
        </span>
      </div>

      {/* Countdown Grid */}
      <div className="flex items-center gap-2 font-mono">
        {/* DAYS */}
        <div className="flex flex-col items-center px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 min-w-[52px]">
          <span className="text-lg sm:text-xl font-bold text-white tracking-wider">
            {timeLeft.days.toString().padStart(2, "0")}
          </span>
          <span className="text-[8px] text-neutral-400 font-medium tracking-wider uppercase">
            DAYS
          </span>
        </div>

        <span className="text-neutral-500 font-bold text-sm">:</span>

        {/* HOURS */}
        <div className="flex flex-col items-center px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 min-w-[52px]">
          <span className="text-lg sm:text-xl font-bold text-white tracking-wider">
            {timeLeft.hours.toString().padStart(2, "0")}
          </span>
          <span className="text-[8px] text-neutral-400 font-medium tracking-wider uppercase">
            HOURS
          </span>
        </div>

        <span className="text-neutral-500 font-bold text-sm">:</span>

        {/* MINS */}
        <div className="flex flex-col items-center px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 min-w-[52px]">
          <span className="text-lg sm:text-xl font-bold text-white tracking-wider">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-[8px] text-neutral-400 font-medium tracking-wider uppercase">
            MINS
          </span>
        </div>

        <span className="text-neutral-500 font-bold text-sm">:</span>

        {/* SECS */}
        <div className="flex flex-col items-center px-3 py-1.5 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 min-w-[52px]">
          <span className="text-lg sm:text-xl font-bold text-[#00D9FF] tracking-wider">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-[8px] text-[#00D9FF]/80 font-medium tracking-wider uppercase">
            SECS
          </span>
        </div>
      </div>
    </div>
  );
}
