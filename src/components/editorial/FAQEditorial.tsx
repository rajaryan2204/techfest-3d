"use client";

import React, { useState } from "react";
import { FAQ_DATA, FEST_DATA } from "@/data/festData";

export default function FAQEditorial() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="relative z-20 w-full py-16 sm:py-28 px-4 sm:px-12 md:px-20 max-w-7xl mx-auto text-white font-sans select-none border-b border-white/10">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Column: Heading & Quick Info */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FFCC] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#00D9FF] uppercase block">
              // FAQ // PROTOCOL DIRECTORY
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white uppercase font-sans leading-tight">
            FREQUENTLY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#00FFCC] font-normal">
              ASKED QUESTIONS
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-md pt-1">
            Everything you need to know about participation, registration, travel, campus accommodation, and event tracks for TechFEST&apos;26 at SLIET Longowal.
          </p>

          <div className="pt-4 flex flex-col gap-2.5 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <span className="text-neutral-400">FESTIVAL DATES</span>
              <span className="text-[#00D9FF] font-semibold">{FEST_DATA.datesFull}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <span className="text-neutral-400">CAMPUS VENUE</span>
              <span className="text-white font-medium">SLIET Longowal, Punjab</span>
            </div>
            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <span className="text-neutral-400">HELP DESK</span>
              <a href={`mailto:${FEST_DATA.email}`} className="text-[#00FFCC] hover:underline">
                {FEST_DATA.email}
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Accordion List */}
        <div className="lg:col-span-7 divide-y divide-white/10 rounded-2xl bg-white/[0.01] border border-white/10 p-2 sm:p-6 backdrop-blur-xs">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            const numStr = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={idx}
                className={`py-4 sm:py-5 px-3 sm:px-4 rounded-xl transition-all duration-200 ${
                  isOpen ? "bg-white/[0.03] border border-[#00D9FF]/20 shadow-[0_0_20px_rgba(0,217,255,0.05)]" : "border border-transparent"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D9FF] group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-5">
                    <span
                      className={`text-xs font-mono transition-colors pt-0.5 sm:pt-0 ${
                        isOpen ? "text-[#00D9FF] font-bold" : "text-neutral-500 group-hover:text-[#00D9FF]"
                      }`}
                    >
                      {numStr}
                    </span>
                    <span
                      className={`text-sm sm:text-base font-normal tracking-wide transition-colors ${
                        isOpen ? "text-white" : "text-neutral-300 group-hover:text-white"
                      }`}
                    >
                      {item.q}
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-sm shrink-0 transition-all ${
                      isOpen
                        ? "bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/40 rotate-180"
                        : "bg-white/5 text-neutral-400 group-hover:bg-white/10 group-hover:text-white"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pl-8 sm:pl-10 pr-2 sm:pr-4 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
