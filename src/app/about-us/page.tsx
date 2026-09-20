"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";
import CyberPhotoFrame from "@/components/teams/CyberPhotoFrame";
import { FEST_DATA, ABOUT_STATS, FACULTY_LEADERSHIP } from "@/data/festData";

export default function AboutUsPage() {
  return (
    <CyberPageWrapper
      activeBadge="INSTITUTION & LEGACY"
      title="ABOUT TECHFEST'26 & SLIET"
      subtitle="Sant Longowal Institute of Engineering & Technology (SLIET) presents the pinnacle of northern India's technical ingenuity, bringing together thousands of engineering minds under the vision of Sustainable Earth."
    >
      {/* 1. Key Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
        {ABOUT_STATS.map((st) => (
          <div
            key={st.label}
            className="cyber-card p-5 sm:p-6 space-y-1 group"
          >
            <div className="cyber-card-glow" />
            <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase block">
              {st.label}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">
              {st.value}
            </div>
            <p className="text-xs text-neutral-400 font-mono">{st.detail}</p>
          </div>
        ))}
      </div>

      {/* 2. Main Narrative Section with Official Seal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start mb-20">
        {/* Left: About SLIET */}
        <div className="lg:col-span-7 space-y-6 text-neutral-300 font-sans leading-relaxed">
          <div className="space-y-3">
            <div className="cyber-badge">
              <span className="cyber-badge-dot" />
              <span>INSTITUTION PROFILE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
              SANT LONGOWAL INSTITUTE OF ENGINEERING & TECHNOLOGY
            </h2>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
            <div className="w-14 h-14 shrink-0 relative bg-white/10 rounded-xl p-2 border border-white/20">
              <Image
                src="/events/header/sliet.svg"
                alt="SLIET Seal"
                width={56}
                height={56}
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]"
              />
            </div>
            <div className="text-xs font-mono space-y-0.5">
              <span className="text-cyan-300 font-bold block uppercase">
                DEEMED-TO-BE-UNIVERSITY (ESTD. 1989)
              </span>
              <span className="text-neutral-400 block">
                Ministry of Education, Govt. of India &bull; Centrally Funded Technical Institute (CFTI)
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-relaxed">
            Sant Longowal Institute of Engineering & Technology (SLIET), Deemed-to-be-University, was established by the Ministry of Human Resource Development (now Ministry of Education), Government of India in 1989. Named in memory of the revered national leader Sant Harchand Singh Longowal, the institute stands across an expansive <strong className="text-white font-semibold">451-acre lush green campus</strong> in Longowal, Sangrur district, Punjab.
          </p>

          <p className="text-sm sm:text-base leading-relaxed">
            SLIET is an autonomous Centrally Funded Technical Institute (CFTI) imparting quality technical education at Certificate, Diploma, Undergraduate (B.Tech), Postgraduate (M.Tech, M.Sc, MBA), and Doctoral (Ph.D.) levels. Accoladed with <strong className="text-cyan-300 font-semibold">NAAC Grade &apos;A&apos;</strong> and consistently ranked among premier technical institutions in India, SLIET is a pioneer in multidisciplinary technological education.
          </p>

          {/* Theme Highlight */}
          <div className="cyber-card p-6 space-y-2 font-mono">
            <div className="cyber-card-glow" />
            <span className="text-[10px] tracking-widest text-cyan-300 uppercase block font-semibold">
              // FESTIVAL THEME 2026
            </span>
            <h3 className="text-lg font-bold text-white uppercase">
              {FEST_DATA.theme}
            </h3>
            <p className="text-xs text-neutral-300">
              TechFEST&apos;26 addresses critical global ecological and planetary challenges by uniting modern robotics, intelligent computing, clean energy, and sustainable materials.
            </p>
          </div>
        </div>

        {/* Right: Festival Vision & Highlights Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="cyber-card p-6 sm:p-8 space-y-6">
            <div className="cyber-card-glow" />
            <h3 className="text-sm font-mono tracking-widest text-cyan-400 uppercase border-b border-cyan-500/20 pb-3">
              // THE TECHFEST PILLARS
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-300 font-bold block">
                  01. PAN-INDIA COMPETITIONS
                </span>
                <p className="text-xs text-neutral-400 font-mono">
                  61 certified events across 13 engineering domains including Robotics, AI/ML, Cybersecurity, CAD, and Green Energy.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-300 font-bold block">
                  02. HANDS-ON BOOTCAMPS
                </span>
                <p className="text-xs text-neutral-400 font-mono">
                  Specialized workshops led by senior industry veterans in autonomous drones, LLM multi-agents, and industrial hardware.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-300 font-bold block">
                  03. CELEBRITY PRONITES
                </span>
                <p className="text-xs text-neutral-400 font-mono">
                  Electrifying EDM nights, star concerts, and stand-up galas featuring India&apos;s celebrated artists.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-300 font-bold block">
                  04. ₹5,00,000+ PRIZE POOL
                </span>
                <p className="text-xs text-neutral-400 font-mono">
                  Nationwide recognition, cash prizes, trophies, and industrial internships for winning innovators.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/events"
                className="cyber-btn-primary w-full text-center"
              >
                <span>EXPLORE ALL 61 EVENTS</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Leadership & Patronage */}
      <section className="space-y-10">
        <div className="space-y-2 border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FFCC] animate-pulse" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#00FFCC] uppercase">
              // PATRONAGE & GOVERNANCE
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
            INSTITUTIONAL LEADERSHIP & FACULTY ADVISORY
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Distinguished professors and academic administrators guiding TechFEST&apos;26 with institutional vision.
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
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6">
            {FACULTY_LEADERSHIP.filter((l) => l.role.includes("Patron")).map((lead) => (
              <div
                key={lead.name}
                className="cyber-card p-5 space-y-4 flex flex-col justify-between group"
              >
                <div className="cyber-card-glow" />
                {lead.image && (
                  <div className="w-full overflow-hidden rounded-xl">
                    <CyberPhotoFrame
                      image={lead.image}
                      alt={lead.name}
                      zoom={lead.zoom}
                      x={lead.x}
                      y={lead.y}
                      bgColor={lead.bgColor}
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block font-semibold">
                    {lead.role}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                    {lead.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">{lead.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Advisory Committee */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC]"></span>
            <span className="text-xs font-mono tracking-widest text-[#00FFCC] uppercase font-bold">
              FACULTY ADVISORY & ORGANIZING COMMITTEE
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACULTY_LEADERSHIP.filter((l) => !l.role.includes("Patron")).map((lead) => (
              <div
                key={lead.name}
                className="cyber-card p-5 space-y-4 flex flex-col justify-between group"
              >
                <div className="cyber-card-glow" />
                {lead.image && (
                  <div className="w-full overflow-hidden rounded-xl">
                    <CyberPhotoFrame
                      image={lead.image}
                      alt={lead.name}
                      zoom={lead.zoom}
                      x={lead.x}
                      y={lead.y}
                      bgColor={lead.bgColor}
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#00FFCC] uppercase block font-semibold">
                    {lead.role}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00FFCC] transition-colors font-sans">
                    {lead.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">{lead.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CyberPageWrapper>
  );
}
