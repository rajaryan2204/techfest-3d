"use client";

import React from "react";
import { FACULTY_LEADERSHIP, CORE_STUDENT_TEAM } from "@/data/festData";

export default function TeamEditorial() {
  return (
    <section className="relative z-20 w-full min-h-screen flex items-center py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-white font-sans">
      <div className="w-full space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <span className="text-[11px] font-mono tracking-[0.35em] text-neutral-500 uppercase block">
            ORGANIZATION // LEADERSHIP & CREW
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white leading-tight">
            The Minds Behind <br />
            <span className="text-neutral-400 font-light">TechFEST'26 SLIET</span>
          </h2>
        </div>

        {/* Faculty Leadership */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
            // PATRONS & FACULTY ADVISORY
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FACULTY_LEADERSHIP.map((m) => (
              <div
                key={m.name}
                className="p-5 bg-white/[0.02] border border-white/10 space-y-1 rounded-xs"
              >
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                  {m.role}
                </span>
                <p className="text-sm sm:text-base font-light text-white">
                  {m.name}
                </p>
                {m.designation && (
                  <p className="text-xs text-neutral-400 font-light pt-0.5">
                    {m.designation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Student Coordinators */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
            // STUDENT COORDINATION COUNCIL
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CORE_STUDENT_TEAM.map((m) => (
              <div
                key={m.name}
                className="p-4 bg-white/[0.01] border border-white/5 space-y-1 rounded-xs"
              >
                <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase block">
                  {m.role}
                </span>
                <p className="text-xs sm:text-sm font-light text-neutral-200">
                  {m.name}
                </p>
                {m.phone && (
                  <a
                    href={`tel:${m.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-[10px] font-mono text-neutral-400 hover:text-white transition-colors block pt-0.5"
                  >
                    {m.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
