"use client";

import React from "react";
import { WORKSHOPS_DATA } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";

export default function WorkshopsEditorial() {
  return (
    <section className="relative z-20 w-full min-h-screen flex items-center py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-white font-sans">
      <div className="w-full space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-[0.35em] text-neutral-500 uppercase block">
            ACADEMIA & INDUSTRY // WORKSHOPS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white leading-tight">
            Hands-on Masterclasses <br />
            <span className="text-neutral-400 font-light">& Technical Bootcamps</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl">
            Intensive certified technical sessions conducted by aerospace engineers, cybersecurity practitioners, and AI researchers.
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          {WORKSHOPS_DATA.map((ws) => (
            <div
              key={ws.id}
              className="p-6 sm:p-8 bg-[#0a0a0d] border border-white/10 hover:border-white/25 transition-all space-y-5 rounded-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">
                  <span>{ws.date}</span>
                  <span className="text-cyan-400">{ws.duration}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-light text-white leading-snug">
                  {ws.title}
                </h3>

                <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                  MENTOR // {ws.instructor}
                </p>

                <p className="text-xs text-neutral-300 font-light leading-relaxed pt-1">
                  {ws.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  VENUE // {ws.venue}
                </span>

                <MagneticButton dataCursor="JOIN">
                  <a
                    href={ws.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono tracking-widest text-white hover:text-cyan-300 transition-colors uppercase inline-flex items-center gap-1.5 p-1"
                  >
                    <span>ENROLL</span>
                    <span>→</span>
                  </a>
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
