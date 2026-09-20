"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FEST_DATA, ABOUT_STATS } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";

export default function AboutEditorial() {
  const continuumSteps = [
    { label: "SUSTAINABLE EARTH", num: "01", desc: "Global Planetary Vision" },
    { label: "GROUNDBREAKING IDEAS", num: "02", desc: "Student Ingenuity" },
    { label: "CUTTING-EDGE SCIENCE", num: "03", desc: "Research & Analytics" },
    { label: "APPLIED ENGINEERING", num: "04", desc: "Robotics & Software" },
    { label: "SLIET TECHFEST", num: "05", desc: "Northern India's Apex" },
  ];

  return (
    <section id="about-section" className="relative w-full py-28 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto text-white select-none space-y-20 border-b border-white/10">
      {/* 1. SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8 relative">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.35em] text-[#00D9FF] uppercase font-semibold">
              // INSTITUTION & LEGACY // ESTD. 1989
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
            CONVERGENCE OF <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#00FFCC] to-white">
              EARTH &amp; SPACE SCIENCES
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl leading-relaxed">
            Sant Longowal Institute of Engineering &amp; Technology presents TechFEST&apos;26 — Northern India&apos;s apex symposium bridging terrestrial sustainable engineering with aerospace and cosmic frontiers.
          </p>
        </div>

        {/* Tagline Card */}
        <div className="p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#08152e] to-[#040b17] shadow-xl space-y-2 max-w-md relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#00D9FF]/10 rounded-full blur-2xl pointer-events-none" />
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#00D9FF]/15 border border-[#00D9FF]/30 text-[9px] font-mono text-[#00D9FF] uppercase tracking-wider font-bold">
            ANNUAL FESTIVAL THEME
          </span>
          <p className="text-base sm:text-lg font-medium text-white italic font-sans">
            &ldquo;{FEST_DATA.theme}&rdquo;
          </p>
          <p className="text-[11px] font-mono text-neutral-400">
            Dates: <span className="text-[#00FFCC] font-bold">{FEST_DATA.datesFull}</span> &bull; SLIET Longowal
          </p>
        </div>
      </div>

      {/* 2. CAMPUS SHOWCASE + 3D CHARACTER SPLIT FEATURE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 7 Columns: SLIET Campus Photo Card with Cyber Frame */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-white/15 bg-gradient-to-b from-[#060e22]/90 to-[#030713]/95 shadow-2xl relative overflow-hidden space-y-6">
          {/* Corner Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

          {/* Campus Image with CRT Scanlines & Telemetry */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-[#020817] group">
            <Image
              src="/about/sliet.webp"
              alt="SLIET Longowal 451-Acre Campus"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            {/* Gradient & Scanlines */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030713] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

            {/* Top Telemetry Chip */}
            <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>451-ACRE LUSH CAMPUS // LONGOWAL, PUNJAB</span>
            </div>

            {/* Bottom GPS Coordinates */}
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono text-neutral-400">
              COORDS: 30.2235° N, 75.6881° E
            </div>
          </div>

          {/* Campus Narrative */}
          <div className="space-y-3 relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
              About Sant Longowal Institute of Engineering & Technology
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Established in <strong>1989 by the Ministry of Education (Govt. of India)</strong>, SLIET is a premier centrally-funded technical institute accredited with <strong>Grade &apos;A&apos; by NAAC</strong>. Spanning 451 acres surrounded by lush greenery, it stands as a national beacon of engineering excellence and multidisciplinary innovation.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              SLIET awards its own Certificates, Diplomas, Undergraduate (NBA accredited), and Postgraduate degrees approved by AICTE as per the multi-entry, multi-exit policy of NEP-2020.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <Link
              href="/about-us"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-white text-black font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,217,255,0.3)]"
            >
              KNOW MORE ABOUT SLIET &rarr;
            </Link>
            <a
              href={FEST_DATA.links.slietWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-cyan-400 hover:bg-white/5 text-neutral-300 hover:text-white transition-all tracking-wider uppercase"
            >
              SLIET.AC.IN ↗
            </a>
            <a
              href={FEST_DATA.links.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-cyan-400 hover:bg-white/5 text-neutral-300 hover:text-white transition-all tracking-wider uppercase"
            >
              BROCHURE ↗
            </a>
          </div>
        </div>

        {/* Right 5 Columns: 3D Robot Mascot + Innovation Highlights Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#08152e] to-[#040813] shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00FFCC]/10 rounded-full blur-3xl pointer-events-none" />

          {/* TechFest'26 Official Emblem Showcase */}
          <div className="relative w-full py-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center group bg-radial from-cyan-500/10 via-transparent to-transparent">
            {/* Ambient Sci-Fi Glow Behind Logo */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-blue-500/5 to-transparent pointer-events-none rounded-2xl" />
            <div className="absolute w-44 h-44 bg-[#00D9FF]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            {/* Corner Sci-Fi Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50 pointer-events-none" />

            <Image
              src="/logo/techfest-emblem-transparent.webp"
              alt="TechFest'26 Official Emblem"
              width={400}
              height={400}
              priority
              unoptimized
              className="w-full max-w-[260px] h-auto object-contain drop-shadow-[0_0_35px_rgba(0,217,255,0.5)] group-hover:scale-105 transition-transform duration-500 relative z-10"
            />
            <div className="mt-4 px-3 py-1 rounded-md bg-cyan-950/40 backdrop-blur-md border border-cyan-400/30 text-[10px] font-mono text-cyan-300 tracking-wider relative z-10">
              // OFFICIAL TECHFEST&apos;26 EMBLEM
            </div>
          </div>

          {/* Festival Scale Highlights */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#00FFCC] uppercase font-bold block">
              // NATIONAL SYMPOSIUM SCALE
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-sans">
              ₹5,00,000+
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              Total Cash Prize Pool, Official Trophies & National Certificates
            </p>
            <p className="text-xs text-neutral-300 font-light leading-relaxed pt-1">
              Featuring 13 technical domains, 60+ competitive arenas, 24-hour hackathons, certified aerospace workshops, and headline pronite concerts.
            </p>
          </div>

          {/* Interactive Quick Pass CTA */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="text-xs font-mono text-neutral-400">
              PASSES START AT <span className="text-[#00FFCC] font-bold">₹299</span>
            </div>
            <Link
              href="/package"
              className="px-4 py-2 rounded-xl bg-[#00D9FF]/20 hover:bg-[#00D9FF] border border-[#00D9FF]/40 hover:border-[#00D9FF] text-[#00D9FF] hover:text-black font-mono text-xs font-bold transition-all"
            >
              GET PASSES &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* 3. VERIFIED FACTUAL METRICS CARDS (4-Grid with Glow & Borders) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {ABOUT_STATS.map((stat, i) => {
          const colors = [
            "border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,217,255,0.2)] text-[#00D9FF]",
            "border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(0,255,204,0.2)] text-[#00FFCC]",
            "border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(192,132,252,0.2)] text-[#C084FC]",
            "border-yellow-500/30 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.2)] text-[#FACC15]",
          ];

          return (
            <div
              key={i}
              className={`group relative p-6 sm:p-7 rounded-2xl border bg-gradient-to-b from-[#081226]/80 to-[#040814]/90 transition-all duration-300 space-y-3 shadow-xl backdrop-blur-md ${colors[i % 4]}`}
            >
              {/* Telemetry Corner Cross */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase font-semibold">
                  {stat.label}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
              </div>

              <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                {stat.value}
              </div>

              <p className="text-xs text-neutral-300 font-light leading-snug">
                {stat.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* 4. THE CONTINUUM: 5-STAGE ENGINEERING PIPELINE */}
      <div className="pt-8 border-t border-white/10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#00D9FF] uppercase font-semibold block">
              // THE CONTINUUM // INNOVATION PIPELINE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight font-sans">
              FROM VISION TO REALITY
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-500 hidden sm:block">
            5-PHASE ARCHITECTURE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {continuumSteps.map((step, idx) => (
            <div
              key={step.label}
              className="group p-5 rounded-2xl border border-white/10 hover:border-cyan-400/50 bg-[#060c1c]/70 hover:bg-[#081329] transition-all duration-300 space-y-2 relative shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00D9FF] font-bold">
                  {step.num} //
                </span>
                <span className="text-xs text-neutral-600 group-hover:text-cyan-400 transition-colors">
                  &rarr;
                </span>
              </div>

              <h4 className="text-sm font-bold tracking-wider text-white uppercase font-sans group-hover:text-cyan-300 transition-colors">
                {step.label}
              </h4>

              <p className="text-[11px] font-mono text-neutral-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
