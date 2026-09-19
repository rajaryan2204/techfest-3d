"use client";

import React from "react";
import { SPONSORS_DATA } from "@/data/festData";

export default function SponsorsEditorial() {
  const titleSponsors = SPONSORS_DATA.filter((s) => s.tier === "title");
  const partnerSponsors = SPONSORS_DATA.filter((s) => s.tier === "partner");

  return (
    <section id="sponsors-section" className="relative z-20 w-full py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-white font-sans select-none border-b border-white/10">
      <div className="w-full space-y-16">
        {/* SECTION 05: HEADING */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono tracking-[0.35em] text-cyan-400 uppercase block">
            // ALLIANCES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
            SUPPORTED BY
          </h2>
        </div>

        {/* Minimalist Logo Wall: Title Partners */}
        <div className="space-y-6 pt-4 border-t border-white/10">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
            TITLE & PLATFORM PARTNERS
          </span>
          <div className="flex flex-wrap items-center gap-12 sm:gap-20 pt-4">
            {titleSponsors.map((sp) => (
              <div key={sp.name} className="flex flex-col items-start space-y-1">
                <span className="text-xl sm:text-3xl font-extralight tracking-[0.2em] text-white uppercase font-mono hover:text-cyan-300 transition-colors">
                  {sp.name}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                  OFFICIAL PARTNER
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Minimalist Logo Wall: Ecosystem & Media Partners */}
        <div className="space-y-6 pt-8 border-t border-white/10">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
            ASSOCIATE & MEDIA ECOSYSTEM
          </span>
          <div className="flex flex-wrap items-center gap-8 sm:gap-14 pt-2">
            {partnerSponsors.map((sp) => (
              <div key={sp.name} className="flex flex-col items-start space-y-0.5">
                <span className="text-sm sm:text-lg font-light tracking-widest text-neutral-300 uppercase font-mono hover:text-white transition-colors">
                  {sp.name}
                </span>
                <span className="text-[8px] font-mono tracking-widest text-neutral-600 uppercase">
                  ECOSYSTEM ALLIANCE
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
