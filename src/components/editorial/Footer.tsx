"use client";

import React from "react";
import { FEST_DATA } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 w-full py-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-white/10 text-white font-sans select-none">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Col 1: Identity */}
        <div className="md:col-span-5 space-y-3">
          <span className="text-sm font-mono tracking-[0.4em] text-white uppercase block font-medium">
            {FEST_DATA.shortTitle}
          </span>
          <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase space-y-1">
            <p className="text-white/80">SLIET LONGOWAL</p>
            <p className="text-neutral-500">{FEST_DATA.datesFull}</p>
          </div>
          <p className="text-xs text-neutral-500 font-light max-w-sm pt-1">
            Annual National Technical Festival of Sant Longowal Institute of Engineering & Technology.
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="md:col-span-3 space-y-3">
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase block">
            // INDEX
          </span>
          <nav className="flex flex-col gap-2 text-xs font-mono tracking-widest text-neutral-400">
            <button
              onClick={() => scrollToSection("events-track")}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              EVENTS
            </button>
            <button
              onClick={() => scrollToSection("about-section")}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection("gallery-section")}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              GALLERY
            </button>
            <button
              onClick={() => scrollToSection("contact-section")}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              CONTACT
            </button>
          </nav>
        </div>

        {/* Col 3: Registration & Socials */}
        <div className="md:col-span-4 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase block">
            // JOIN & CONNECT
          </span>

          <div>
            <MagneticButton dataCursor="JOIN">
              <a
                href={FEST_DATA.links.register}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3.5 bg-white text-black font-mono text-xs font-semibold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
              >
                REGISTER →
              </a>
            </MagneticButton>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono tracking-wider text-neutral-400 pt-2">
            {FEST_DATA.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline underline-offset-4"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Legal & Back to top */}
      <div className="pt-12 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-mono text-neutral-600 tracking-[0.25em] uppercase">
        <span>© 2026 SLIET TECHFEST // ALL RIGHTS RESERVED</span>
        <button
          onClick={scrollToTop}
          className="text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 p-1"
          aria-label="Back to Top"
        >
          <span>↑ BACK TO TOP</span>
        </button>
      </div>
    </footer>
  );
}
