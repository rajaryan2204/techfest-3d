"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SPONSORS_DATA } from "@/data/festData";

export default function SponsorsEditorial() {
  const titleSponsors = SPONSORS_DATA.filter((s) => s.tier === "title");
  const partnerSponsors = SPONSORS_DATA.filter((s) => s.tier === "partner");

  return (
    <section id="sponsors-section" className="relative z-20 w-full py-16 sm:py-28 px-4 sm:px-12 md:px-20 max-w-7xl mx-auto text-white font-sans select-none border-b border-white/10">
      <div className="w-full space-y-10 sm:space-y-16">
        {/* SECTION HEADER WITH SCI-FI TELEMETRY */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.35em] text-cyan-400 uppercase block font-semibold">
                // CORPORATE & TECH ALLIANCES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
              SUPPORTED BY <br />
              <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-white">
                INDUSTRY TITANS
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl leading-relaxed">
              Empowering technological frontiers and sustainable Earth solutions alongside India&apos;s leading tech innovators, industry leaders, and media partners.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-400/30 font-mono text-xs text-cyan-300">
            OFFICIAL ALLIANCE PORTFOLIO // 2026
          </div>
        </div>

        {/* 1. Title & Platform Partners Grid (Large Visual Logo Cards) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-[0.25em] text-[#00D9FF] uppercase font-bold">
              01 // TITLE & PLATFORM PARTNERS
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {titleSponsors.map((sp) => (
              <div
                key={sp.name}
                className="group relative p-3.5 sm:p-6 rounded-2xl border border-cyan-500/25 hover:border-cyan-400 bg-gradient-to-b from-[#061226]/80 to-[#020714]/90 backdrop-blur-md shadow-xl hover:shadow-[0_0_35px_rgba(0,217,255,0.25)] transition-all duration-300 flex flex-col items-center justify-between gap-3 sm:gap-4 min-h-[150px] sm:min-h-[170px]"
              >
                {/* Corner Accent Brackets */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />

                {/* Logo Container (Clean white backdrop for authentic crisp logo rendering) */}
                {sp.image ? (
                  <div className="relative w-full h-16 sm:h-20 bg-white rounded-xl p-2.5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <Image
                      src={sp.image}
                      alt={`${sp.name} Official Logo`}
                      width={220}
                      height={80}
                      className="max-h-12 sm:max-h-14 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-xl sm:text-2xl font-bold tracking-wider text-white uppercase font-mono">
                    {sp.name}
                  </span>
                )}

                {/* Label */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-white/10 w-full justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
                  <span className="text-[10px] font-mono tracking-widest text-cyan-300/80 group-hover:text-cyan-300 uppercase font-semibold">
                    {sp.name}
                  </span>
                </div>
              </div>
            ))}

            {/* 8th Slot: Partner with Us / Become a Sponsor */}
            <Link
              href="/sponsors"
              className="group relative p-5 sm:p-6 rounded-2xl border border-dashed border-cyan-500/40 hover:border-cyan-400 bg-gradient-to-b from-cyan-950/20 to-transparent hover:bg-cyan-950/40 backdrop-blur-md shadow-xl hover:shadow-[0_0_35px_rgba(0,217,255,0.25)] transition-all duration-300 flex flex-col items-center justify-center gap-3 min-h-[170px] text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 text-xl font-bold group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                +
              </div>
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-bold font-sans tracking-wide text-white group-hover:text-cyan-300 uppercase block">
                  PARTNER WITH US
                </span>
                <span className="text-[10px] font-mono text-cyan-400/70 tracking-wider uppercase block">
                  JOIN TECHFEST&apos;26 &rarr;
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* 2. Associate & Media Ecosystem Grid */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-[0.25em] text-[#00FFCC] uppercase font-bold">
              02 // ASSOCIATE & MEDIA ECOSYSTEM
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/30 to-transparent" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {partnerSponsors.map((sp) => (
              <div
                key={sp.name}
                className="group relative p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-emerald-400/50 bg-[#040c1a]/70 hover:bg-[#07152d]/90 backdrop-blur-xs shadow-md hover:shadow-[0_0_20px_rgba(0,255,204,0.15)] transition-all duration-300 flex flex-col items-center justify-between gap-3 min-h-[130px]"
              >
                {/* Logo Container */}
                {sp.image ? (
                  <div className="relative w-full h-12 sm:h-14 bg-white rounded-lg p-1.5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <Image
                      src={sp.image}
                      alt={`${sp.name} Partner Logo`}
                      width={140}
                      height={60}
                      className="max-h-9 sm:max-h-11 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-sm font-semibold tracking-wider text-neutral-300 uppercase font-mono">
                    {sp.name}
                  </span>
                )}

                {/* Subtitle */}
                <span className="text-[8px] font-mono tracking-wider text-neutral-400 group-hover:text-emerald-300 uppercase text-center truncate max-w-full">
                  {sp.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
