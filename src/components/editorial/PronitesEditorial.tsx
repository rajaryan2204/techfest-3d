"use client";

import React from "react";
import Link from "next/link";
import { PRONITES_DATA } from "@/data/festData";

export default function PronitesEditorial() {
  return (
    <section id="pronites-section" className="relative z-20 w-full min-h-screen flex items-center py-16 sm:py-28 px-4 sm:px-12 md:px-20 max-w-7xl mx-auto text-white font-sans border-b border-white/10">
      <div className="w-full space-y-10 sm:space-y-16">
        {/* Header with Live Soundwave Equalizer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.35em] text-[#EC4899] uppercase font-semibold">
                // STAR NIGHTS // PRONITES 2026
              </span>

              {/* Equalizer Visualizer Bars */}
              <div className="flex items-end gap-0.5 h-4 ml-2">
                <span className="w-1 bg-[#EC4899] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite_alternate]" style={{ height: "60%" }} />
                <span className="w-1 bg-[#00D9FF] rounded-full animate-[equalizer_0.6s_ease-in-out_infinite_alternate]" style={{ height: "100%" }} />
                <span className="w-1 bg-[#00FFCC] rounded-full animate-[equalizer_0.9s_ease-in-out_infinite_alternate]" style={{ height: "40%" }} />
                <span className="w-1 bg-[#A855F7] rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_alternate]" style={{ height: "80%" }} />
                <span className="w-1 bg-[#EC4899] rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_alternate]" style={{ height: "50%" }} />
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white leading-tight">
              Nights of Music, <br />
              <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00D9FF]">
                Illusion & Unstoppable Energy
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl leading-relaxed">
              When the coding sprints and robotics battles conclude, the SLIET main stadium comes alive with headline musical artists, EDM rhythms, and immersive laser shows.
            </p>
          </div>

          <Link
            href="/package"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all shrink-0 self-start md:self-end"
          >
            CLAIM FESTIVAL PASS ↗
          </Link>
        </div>

        {/* Pronites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRONITES_DATA.map((pro, index) => {
            const glowColors = [
              "border-pink-500/30 hover:border-pink-500 hover:shadow-[0_0_35px_rgba(236,72,153,0.25)]",
              "border-purple-500/30 hover:border-purple-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
              "border-cyan-500/30 hover:border-cyan-500 hover:shadow-[0_0_35px_rgba(0,217,255,0.25)]",
            ];
            const badgeColors = [
              "bg-pink-500/15 border-pink-400/40 text-pink-300",
              "bg-purple-500/15 border-purple-400/40 text-purple-300",
              "bg-cyan-500/15 border-cyan-400/40 text-cyan-300",
            ];

            return (
              <div
                key={pro.id}
                className={`group relative p-7 sm:p-8 bg-gradient-to-b from-[#090b14] to-[#04060c] border ${glowColors[index % 3]} transition-all duration-500 space-y-6 rounded-2xl flex flex-col justify-between shadow-xl backdrop-blur-md overflow-hidden`}
              >
                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between text-[11px] font-mono tracking-widest border-b border-white/10 pb-3">
                    <span className="text-neutral-300 font-bold">{pro.date}</span>
                    <span className="text-pink-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                      {pro.time}
                    </span>
                  </div>

                  <span className={`inline-block text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-md border font-bold ${badgeColors[index % 3]}`}>
                    {pro.type}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-pink-300 transition-colors tracking-tight font-sans">
                    {pro.title}
                  </h3>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed pt-1">
                    {pro.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase tracking-wider relative z-10">
                  <span className="flex items-center gap-1.5">
                    <span>📍</span>
                    <span>{pro.venue}</span>
                  </span>
                  <Link
                    href="/package"
                    className="text-pink-400 group-hover:text-white transition-colors font-bold flex items-center gap-1"
                  >
                    <span>FEST PASS INCLUDED</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
