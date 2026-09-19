"use client";

import React from "react";
import { PRONITES_DATA } from "@/data/festData";

export default function PronitesEditorial() {
  return (
    <section className="relative z-20 w-full min-h-screen flex items-center py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-white font-sans">
      <div className="w-full space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-[0.35em] text-neutral-500 uppercase block">
            CELEBRATION // PRONITES & CULTURAL EVENINGS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white leading-tight">
            Nights of Music, <br />
            <span className="text-neutral-400 font-light">Illusion & Unforgettable Energy</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl">
            When the coding sprints and robotics battles conclude, the main arena comes alive with headline musical acts and visual performances.
          </p>
        </div>

        {/* Pronites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
          {PRONITES_DATA.map((pro) => (
            <div
              key={pro.id}
              className="p-6 sm:p-8 bg-[#0a0a0d] border border-white/10 hover:border-white/25 transition-all space-y-5 rounded-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">
                  <span>{pro.date}</span>
                  <span className="text-cyan-400">{pro.time}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-light text-white leading-snug">
                  {pro.title}
                </h3>

                <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                  {pro.type}
                </p>

                <p className="text-xs text-neutral-300 font-light leading-relaxed pt-1">
                  {pro.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                <span>VENUE // {pro.venue}</span>
                <span className="text-white">OPEN PASS ↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
