"use client";

import React, { useState } from "react";

const FAQ_ITEMS = [
  {
    num: "01",
    q: "WHO CAN PARTICIPATE?",
    a: "TechFEST'26 is open to all undergraduate, postgraduate, diploma, and school students across all recognized colleges and universities in India.",
  },
  {
    num: "02",
    q: "HOW DO I REGISTER?",
    a: "Registration is open online on the official portal at techfest26.com/auth/register. Participants can register individually or as multidisciplinary teams.",
  },
  {
    num: "03",
    q: "WHEN IS TECHFEST?",
    a: "TechFEST'26 takes place across two action-packed days on 09—10 October 2026.",
  },
  {
    num: "04",
    q: "WHERE IS TECHFEST?",
    a: "Held on the 451-acre campus of Sant Longowal Institute of Engineering & Technology (SLIET) in Longowal, Sangrur district, Punjab - 148106.",
  },
  {
    num: "05",
    q: "HOW CAN I CONTACT THE TEAM?",
    a: "You can reach the official team at techfest@sliet.ac.in or contact Overall Coordinators Naman Kumar Sinha (+91 78568-93952) and Shubham Kumar Singh (+91 97711-74465).",
  },
];

export default function FAQEditorial() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="relative z-20 w-full py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-white font-sans select-none border-b border-white/10">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.35em] text-cyan-400 uppercase block">
            // INQUIRIES
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
            FAQ
          </h2>

          <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm pt-2">
            Essential information for participants attending TechFEST'26 on the SLIET campus.
          </p>
        </div>

        {/* Right Column: Editorial Row List with Thin Separators */}
        <div className="lg:col-span-7 divide-y divide-white/10">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.num} className="py-5 sm:py-6 transition-colors duration-200">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-xs font-mono text-neutral-500 group-hover:text-cyan-400 transition-colors">
                      {item.num}
                    </span>
                    <span className="text-sm sm:text-base font-light text-white group-hover:text-neutral-200 transition-colors uppercase tracking-wide">
                      {item.q}
                    </span>
                  </div>
                  <span className="text-base font-mono text-neutral-400 group-hover:text-white transition-colors shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-3 pl-8 sm:pl-12 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-xl">
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
