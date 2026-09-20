"use client";

import React from "react";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";
import CyberPhotoFrame from "@/components/teams/CyberPhotoFrame";
import { FACULTY_LEADERSHIP, CORE_STUDENT_TEAM } from "@/data/festData";

export default function TeamsPage() {
  const overallCoordinators = CORE_STUDENT_TEAM.filter(
    (m) => m.role === "Overall Coordinator"
  );
  const coreMembers = CORE_STUDENT_TEAM.filter(
    (m) => m.role !== "Overall Coordinator"
  );

  return (
    <CyberPageWrapper
      activeBadge="ORGANIZING BODY & LEADERSHIP"
      title="TECHFEST'26 LEADERSHIP & TEAM"
      subtitle="Meet the distinguished faculty leadership, student overall coordinators, and operational pillars powering TechFEST'26 at Sant Longowal Institute of Engineering & Technology."
    >
      {/* 1. Faculty Leadership */}
      <section className="mb-20 space-y-10">
        <div className="space-y-2 border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FFCC] animate-pulse" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#00FFCC] uppercase">
              // PATRONAGE & FACULTY COUNCIL
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
            FACULTY LEADERSHIP & ADVISORY
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Distinguished professors and academic administrators guiding TechFEST&apos;26 with institutional vision and excellence.
          </p>
        </div>

        {/* Patrons */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]"></span>
            <span className="text-xs font-mono tracking-widest text-[#00D9FF] uppercase font-bold">
              PATRONAGE & INSTITUTIONAL LEADERSHIP
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
            {FACULTY_LEADERSHIP.filter((l) => l.role.includes("Patron")).map((leader) => (
              <div
                key={leader.name}
                className="cyber-card p-6 flex flex-col justify-between space-y-4 group"
              >
                <div className="cyber-card-glow" />

                {leader.image && (
                  <div className="w-full overflow-hidden rounded-xl">
                    <CyberPhotoFrame
                      image={leader.image}
                      alt={leader.name}
                      zoom={leader.zoom}
                      x={leader.x}
                      y={leader.y}
                      bgColor={leader.bgColor}
                    />
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#00D9FF]/15 border border-[#00D9FF]/30 text-[#00D9FF] font-mono text-[10px] uppercase font-bold tracking-wider">
                      {leader.role}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">SLIET LONGOWAL</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors font-sans">
                      {leader.name}
                    </h3>
                    {leader.designation && (
                      <p className="text-xs text-neutral-400 font-mono pt-0.5">
                        {leader.designation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>ACADEMIC SENATE</span>
                  <span className="text-[#00FFCC]/70">SANCTIONED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Advisory & Organizing Committee */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC]"></span>
            <span className="text-xs font-mono tracking-widest text-[#00FFCC] uppercase font-bold">
              FACULTY ADVISORY & ORGANIZING COMMITTEE
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACULTY_LEADERSHIP.filter((l) => !l.role.includes("Patron")).map((leader) => (
              <div
                key={leader.name}
                className="cyber-card p-5 flex flex-col justify-between space-y-4 group"
              >
                <div className="cyber-card-glow" />

                {leader.image && (
                  <div className="w-full overflow-hidden rounded-xl">
                    <CyberPhotoFrame
                      image={leader.image}
                      alt={leader.name}
                      zoom={leader.zoom}
                      x={leader.x}
                      y={leader.y}
                      bgColor={leader.bgColor}
                    />
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#00FFCC]/15 border border-[#00FFCC]/30 text-[#00FFCC] font-mono text-[10px] uppercase font-bold tracking-wider">
                      {leader.role}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">SLIET LONGOWAL</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00FFCC] transition-colors font-sans">
                      {leader.name}
                    </h3>
                    {leader.designation && (
                      <p className="text-xs text-neutral-400 font-mono pt-0.5">
                        {leader.designation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>FACULTY ADVISOR</span>
                  <span className="text-[#00FFCC]/70">SANCTIONED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Overall Coordinators */}
      <section className="mb-20 space-y-8">
        <div className="space-y-2 border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#00D9FF] uppercase">
              // CENTRAL EXECUTIVE
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
            OVERALL COORDINATORS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Lead student executives orchestrating operations, logistics, sponsorship, technical infrastructure, and fest execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {overallCoordinators.map((coord) => (
            <div
              key={coord.name}
              className="cyber-card p-6 sm:p-8 space-y-5 group"
            >
              <div className="cyber-card-glow" />

              {/* Circuit photo frame */}
              {coord.image && (
                <div className="w-full overflow-hidden rounded-xl">
                  <CyberPhotoFrame
                    image={coord.image}
                    alt={coord.name}
                    zoom={coord.zoom}
                    x={coord.x}
                    y={coord.y}
                    bgColor={coord.bgColor}
                  />
                </div>
              )}

              {/* Status Header */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md bg-[#00D9FF]/20 border border-[#00D9FF]/40 text-[#00D9FF] font-mono text-xs uppercase font-bold tracking-wider">
                  {coord.role}
                </span>
                <span className="text-xs font-mono text-[#00FFCC] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC] animate-ping" />
                  ACTIVE HEAD
                </span>
              </div>

              {/* Name & Role */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00D9FF] transition-colors font-sans">
                  {coord.name}
                </h3>
                <p className="text-xs text-neutral-400 font-mono pt-1">
                  TechFEST&apos;26 Central Executive Committee &bull; SLIET Longowal
                </p>
              </div>

              {/* Contact Button */}
              {coord.phone && (
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">DIRECT LINE:</span>
                  <a
                    href={`tel:${coord.phone.replace(/[^0-9+]/g, "")}`}
                    className="px-4 py-2 rounded-xl bg-[#00D9FF]/15 hover:bg-[#00D9FF] border border-[#00D9FF]/40 hover:border-[#00D9FF] text-[#00D9FF] hover:text-[#020817] font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
                  >
                    <span>📞</span>
                    <span>{coord.phone}</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Coordinators */}
      <section className="mb-20 space-y-8">
        <div className="space-y-2 border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FFCC] animate-pulse" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#00FFCC] uppercase">
              // OPERATIONAL COMMITTEE
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
            CORE COORDINATORS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Key team leaders overseeing technical domains, events management, web development, design, and participant experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {coreMembers.map((member) => (
            <div
              key={member.name}
              className="cyber-card p-4 flex flex-col justify-between space-y-3 group"
            >
              <div className="cyber-card-glow" />

              {/* Photo frame */}
              {member.image && (
                <div className="w-full overflow-hidden rounded-lg">
                  <CyberPhotoFrame
                    image={member.image}
                    alt={member.name}
                    zoom={member.zoom}
                    x={member.x}
                    y={member.y}
                    bgColor={member.bgColor}
                  />
                </div>
              )}

              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-[#00FFCC] uppercase block font-semibold">
                  {member.role}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-[#00FFCC] transition-colors font-sans">
                  {member.name}
                </h3>
                <p className="text-[11px] text-neutral-400 font-mono">SLIET Longowal</p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-neutral-500">
                <span>TECHFEST&apos;26</span>
                <span className="text-cyan-400/80">CORE TEAM</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Team Collective Banner */}
      <section className="cyber-card p-8 sm:p-12 relative overflow-hidden text-center space-y-4">
        <div className="cyber-card-glow" />
        <span className="text-xs font-mono tracking-[0.3em] text-[#00D9FF] uppercase font-bold block">
          // ONE VISION &bull; ONE SLIET
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
          THE COMPLETE TECHFEST&apos;26 COLLECTIVE
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-mono leading-relaxed">
          Supported by 100+ student volunteers, department leads, and technical mentors across the SLIET campus to deliver Northern India&apos;s premier tech symposium.
        </p>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-cyan-300">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30">
            📍 SLIET LONGOWAL, PUNJAB
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30">
            🗓️ 16-17 OCT 2026
          </span>
        </div>
      </section>
    </CyberPageWrapper>
  );
}
