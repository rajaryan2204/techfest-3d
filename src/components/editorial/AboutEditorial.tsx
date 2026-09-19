"use client";

import React from "react";
import { FEST_DATA, ABOUT_STATS } from "@/data/festData";

export default function AboutEditorial() {
  const continuumSteps = [
    { label: "EARTH", num: "01" },
    { label: "IDEAS", num: "02" },
    { label: "SCIENCE", num: "03" },
    { label: "ENGINEERING", num: "04" },
    { label: "SLIET", num: "05" },
  ];

  return (
    <section id="about-section" className="relative w-full py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-white select-none space-y-24 border-b border-white/10">
      {/* SECTION 02: ABOUT TECHFEST */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
        {/* Left Column: Heading & Vision */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <span className="text-[10px] font-mono tracking-[0.35em] text-cyan-400 uppercase block">
            // ABOUT
          </span>

          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-white leading-none font-sans uppercase">
              {FEST_DATA.shortTitle}
            </h2>
            <p className="text-base sm:text-xl font-light text-neutral-300 tracking-wide font-sans pt-1">
              Technology and Sciences for Sustainable Earth
            </p>
          </div>

          <div className="w-12 h-px bg-white/20" />

          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-xl">
            Established in 1989 by the Ministry of Education (Govt. of India), <strong>Sant Longowal Institute of Engineering & Technology (SLIET)</strong> spans 451 green acres in Longowal, Punjab, accredited with <strong>Grade 'A' by NAAC</strong>.
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xl">
            <strong>TechFEST'26</strong> is SLIET's flagship national technical symposium, uniting engineering talent, researchers, and inventors to pioneer sustainable solutions for a balanced planet on <strong>{FEST_DATA.datesFull}</strong>.
          </p>

          <div className="pt-2 flex items-center gap-8 text-xs font-mono tracking-widest text-neutral-400">
            <a
              href={FEST_DATA.links.slietWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              SLIET.AC.IN ↗
            </a>
            <a
              href={FEST_DATA.links.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              BROCHURE ↗
            </a>
          </div>
        </div>

        {/* Right Column: Factual Verified Statistics */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-6 sm:gap-8 pt-2">
          {ABOUT_STATS.map((stat, i) => (
            <div key={i} className="space-y-1.5 border-t border-white/10 pt-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 block uppercase">
                {stat.label}
              </span>
              <span className="text-2xl sm:text-3xl font-extralight text-white block font-mono">
                {stat.value}
              </span>
              <span className="text-[11px] text-neutral-400 font-light block">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 03: SLIET CONTINUUM CONNECTION */}
      <div className="pt-8 border-t border-white/10 space-y-6">
        <span className="text-[10px] font-mono tracking-[0.35em] text-neutral-500 uppercase block">
          // THE CONTINUUM
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {continuumSteps.map((step, idx) => (
            <div
              key={step.label}
              className="p-4 border-l border-white/10 space-y-1"
            >
              <span className="text-[9px] font-mono text-cyan-400 tracking-widest block">
                {step.num}
              </span>
              <span className="text-sm sm:text-base font-light tracking-[0.2em] text-white uppercase block font-sans">
                {step.label}
              </span>
              {idx < continuumSteps.length - 1 && (
                <span className="text-[10px] text-neutral-600 block sm:hidden">
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
