"use client";

import React from "react";
import CyberPhotoFrame from "@/components/teams/CyberPhotoFrame";
import { FACULTY_LEADERSHIP, CORE_STUDENT_TEAM } from "@/data/festData";
import Link from "next/link";

export default function TeamEditorial() {
  const overallCoordinators = CORE_STUDENT_TEAM.filter((m) => m.role === "Overall Coordinator");
  const coreCoordinators = CORE_STUDENT_TEAM.filter((m) => m.role !== "Overall Coordinator");

  return (
    <section id="team-section" className="relative z-20 w-full py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-white font-sans select-none border-b border-white/10">
      <div className="w-full space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#00D9FF] uppercase block">
              // LEADERSHIP // ORGANIZING COUNCIL
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white uppercase font-sans leading-tight">
                THE MINDS BEHIND <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#00FFCC] font-normal">
                  TECHFEST&apos;26 SLIET
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xl mt-3">
                Guided by distinguished faculty advisors and executed by the student coordination council, bringing innovation, technology, and engineering to life.
              </p>
            </div>

            <Link
              href="/teams"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-400/30 hover:border-cyan-400 text-cyan-300 hover:text-black font-mono text-xs font-bold transition-all shrink-0 self-start md:self-end"
            >
              <span>EXPLORE FULL COUNCIL</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* 1. Faculty Leadership / Advisory */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="text-[11px] font-mono tracking-widest text-[#00FFCC] uppercase font-semibold">
              01 // PATRONS & FACULTY ADVISORY
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00FFCC]/40 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACULTY_LEADERSHIP.map((m) => (
              <div
                key={m.name}
                className="group relative p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#00D9FF]/50 transition-all duration-300 backdrop-blur-xs flex flex-col justify-between space-y-4 shadow-xl"
              >
                {m.image && (
                  <div className="w-full overflow-hidden rounded-xl">
                    <CyberPhotoFrame
                      image={m.image}
                      alt={m.name}
                      zoom={m.zoom}
                      x={m.x}
                      y={m.y}
                      bgColor={m.bgColor}
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#00D9FF] uppercase block font-semibold">
                    {m.role}
                  </span>
                  <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-[#00D9FF] transition-colors">
                    {m.name}
                  </h3>
                  {m.designation && (
                    <p className="text-xs text-neutral-400 font-light pt-0.5">
                      {m.designation}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-neutral-500 border-t border-white/5">
                  <span>SLIET LONGOWAL</span>
                  <span className="group-hover:text-[#00FFCC] transition-colors">ACADEMIC SENATE</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Overall Coordinators */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="text-[11px] font-mono tracking-widest text-[#00D9FF] uppercase font-semibold">
              02 // OVERALL COORDINATORS
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00D9FF]/40 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {overallCoordinators.map((m) => (
              <div
                key={m.name}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:from-[#00D9FF]/10 hover:to-transparent border border-white/15 hover:border-[#00D9FF]/60 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4"
              >
                {m.image && (
                  <div className="w-full overflow-hidden rounded-xl">
                    <CyberPhotoFrame
                      image={m.image}
                      alt={m.name}
                      zoom={m.zoom}
                      x={m.x}
                      y={m.y}
                      bgColor={m.bgColor}
                    />
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#00D9FF]/15 border border-[#00D9FF]/30 text-[10px] font-mono text-[#00D9FF] uppercase tracking-wider mb-2">
                      LEAD COORDINATOR
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#00D9FF] transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      TechFEST&apos;26 Central Executive Committee
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-neutral-400 group-hover:text-white group-hover:border-[#00D9FF]/50 transition-all shrink-0">
                    ⚡
                  </span>
                </div>

                {m.phone && (
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-400">Direct Contact:</span>
                    <a
                      href={`tel:${m.phone.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00D9FF]/10 hover:bg-[#00D9FF] hover:text-[#020817] text-[#00D9FF] border border-[#00D9FF]/30 font-mono text-xs font-semibold tracking-wider transition-all"
                    >
                      <span>📞</span>
                      <span>{m.phone}</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Core Coordinators */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
              03 // CORE COORDINATION TEAM
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-neutral-600 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {coreCoordinators.map((m) => (
              <div
                key={m.name}
                className="group p-4 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/10 hover:border-[#00FFCC]/40 transition-all duration-200 space-y-3 flex flex-col justify-between"
              >
                {m.image && (
                  <div className="w-full overflow-hidden rounded-lg">
                    <CyberPhotoFrame
                      image={m.image}
                      alt={m.name}
                      zoom={m.zoom}
                      x={m.x}
                      y={m.y}
                      bgColor={m.bgColor}
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-wider text-[#00FFCC] uppercase block">
                      {m.role}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC]/50 group-hover:bg-[#00FFCC] transition-colors"></span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                    {m.name}
                  </p>
                  <p className="text-[10px] font-mono text-neutral-500">
                    SLIET Executive
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
