"use client";

import React from "react";
import Link from "next/link";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";
import { SPONSORS_DATA, FEST_DATA } from "@/data/festData";

export default function SponsorsPage() {
  const titleSponsors = SPONSORS_DATA.filter((s) => s.tier === "title");
  const partners = SPONSORS_DATA.filter((s) => s.tier === "partner");

  return (
    <CyberPageWrapper
      activeBadge="CORPORATE & TECH ALLIANCES"
      title="SPONSORS & PARTNERS"
      subtitle="TechFEST'26 SLIET is proudly backed by leading global technology corporations, consumer brands, media powerhouses, and innovation accelerators."
    >
      {/* 1. Title Sponsors Section */}
      <section className="mb-20 space-y-8">
        <div className="space-y-2 border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#00D9FF] uppercase">
              // TIER 1 ALLIANCES
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
            TITLE & PRINCIPAL SPONSORS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Flagship industry partners driving technological innovation and student excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {titleSponsors.map((sp) => (
            <div
              key={sp.name}
              className="cyber-card p-6 flex flex-col items-center justify-between text-center group min-h-[220px]"
            >
              <div className="cyber-card-glow" />
              
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400/40">⌜</div>
              <div className="absolute top-2 right-2 text-[9px] font-mono text-cyan-400/40">⌝</div>
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-cyan-400/40">⌞</div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-cyan-400/40">⌟</div>

              {/* Logo container with white backing for authentic color display */}
              <div className="w-full h-24 bg-white rounded-xl p-3 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                {sp.image ? (
                  <img
                    src={sp.image}
                    alt={sp.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-xs font-bold text-black font-sans">{sp.name}</span>
                )}
              </div>

              {/* Sponsor Meta */}
              <div className="pt-4 space-y-1 w-full">
                <span className="text-xs sm:text-sm font-black font-sans tracking-wide text-white group-hover:text-cyan-300 transition-colors uppercase block truncate">
                  {sp.name}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase block">
                  TITLE PARTNER
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Associate Partners Section */}
      <section className="mb-20 space-y-8">
        <div className="space-y-2 border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FFCC] animate-pulse" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#00FFCC] uppercase">
              // TIER 2 ALLIANCES
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
            ASSOCIATE PARTNERS & MEDIA ALLIANCES
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Ecosystem partners, community sponsors, and broadcast networks powering TechFEST&apos;26.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {partners.map((sp) => (
            <div
              key={sp.name}
              className="cyber-card p-5 flex flex-col items-center justify-between text-center group min-h-[180px]"
            >
              <div className="cyber-card-glow" />

              {/* Logo container */}
              <div className="w-full h-18 bg-white rounded-xl p-2.5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                {sp.image ? (
                  <img
                    src={sp.image}
                    alt={sp.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-xs font-bold text-black font-sans">{sp.name}</span>
                )}
              </div>

              {/* Meta */}
              <div className="pt-3 space-y-0.5 w-full">
                <span className="text-xs font-bold font-sans tracking-wide text-neutral-200 group-hover:text-white transition-colors uppercase block truncate">
                  {sp.name}
                </span>
                <span className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase block">
                  OFFICIAL PARTNER
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Become a Sponsor CTA Banner */}
      <section className="cyber-card p-8 sm:p-12 relative overflow-hidden">
        <div className="cyber-card-glow" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="cyber-badge">
              <span className="cyber-badge-dot" />
              <span>PARTNERSHIP OPPORTUNITIES</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
              COLLABORATE WITH TECHFEST&apos;26
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
              Gain direct brand engagement with 10,000+ top engineering minds across India, prominent on-stage visibility, experiential product showcases, and pan-India digital reach.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <a
              href={FEST_DATA.links.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn-primary w-full sm:w-auto text-center"
            >
              <span>SPONSOR BROCHURE</span>
              <span>↗</span>
            </a>
            <Link
              href="/reach-us"
              className="cyber-btn-outline w-full sm:w-auto text-center"
            >
              <span>CONTACT TEAM</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </CyberPageWrapper>
  );
}
