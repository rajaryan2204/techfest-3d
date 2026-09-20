"use client";

import React, { useState, useEffect } from "react";
import Hero3DCanvas from "./Hero3DCanvas";
import { FEST_DATA } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";

export default function HeroMonumental() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToEvents = () => {
    const el = document.getElementById("events-track");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero-monumental" className="relative w-full h-screen min-h-[640px] bg-[#070709] overflow-hidden select-none flex flex-col justify-between p-6 sm:p-12 md:p-16">
      {/* 1. Real-Time Interactive 3D Earth Canvas */}
      <Hero3DCanvas scrollY={scrollY} />

      {/* 2. Top Header Bar */}
      <div className="relative z-20 w-full flex items-center justify-between text-white border-b border-white/10 pb-4">
        {/* Left Badge */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-neutral-300 uppercase">
            NATIONAL TECHNICAL FESTIVAL // SLIET
          </span>
        </div>

        {/* Right Dates */}
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">
          16—17 OCTOBER 2026
        </span>
      </div>

      {/* 3. Center Monumental Brand Typography */}
      <div className="relative z-20 max-w-4xl mx-auto text-center space-y-4 my-auto pointer-events-none">
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.45em] text-cyan-400 uppercase block">
          CENTRAL TECHNICAL BOARD PRESENTS
        </span>

        <h1 className="text-5xl sm:text-8xl md:text-9xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
          {FEST_DATA.shortTitle}
        </h1>

        <p className="text-xs sm:text-base font-light text-neutral-300 tracking-[0.25em] uppercase font-sans max-w-xl mx-auto leading-relaxed">
          Technology and Sciences for Sustainable Earth
        </p>

        {/* CTA Buttons */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <MagneticButton dataCursor="EXPLORE">
            <button
              onClick={scrollToEvents}
              className="px-8 py-3.5 bg-white text-black font-mono text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl flex items-center gap-2"
              aria-label="Explore 3D Competitions Exhibition"
            >
              <span>EXPLORE EXHIBITION</span>
              <span>↓</span>
            </button>
          </MagneticButton>

          <MagneticButton dataCursor="REGISTER">
            <a
              href={FEST_DATA.links.register}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-white/20 bg-white/5 backdrop-blur-md text-white font-mono text-xs font-medium tracking-[0.25em] uppercase hover:bg-white/15 hover:border-white/40 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              aria-label="Register for TechFEST'26"
            >
              <span>REGISTER NOW</span>
              <span>→</span>
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* 4. Bottom Live Telemetry & Quick Info Bar */}
      <div className="relative z-20 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white border-t border-white/10 pt-4 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
        {/* Left Telemetry */}
        <div className="flex items-center gap-4">
          <span>SLIET 30.22°N 75.83°E</span>
          <span className="hidden md:inline text-neutral-600">//</span>
          <span className="hidden md:inline">451 ACRES // NAAC 'A'</span>
        </div>

        {/* Right Scroll Prompt */}
        <div className="flex items-center gap-2 text-cyan-300">
          <span>SCROLL TO DISCOVER 3D DOMAINS</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
}
