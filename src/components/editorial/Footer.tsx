"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FooterCircuitTraces from "./FooterCircuitTraces";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-16 bg-[#000D1A] text-white overflow-hidden select-none border-t border-cyan-500/20">
      {/* Cyber Circuit Traces Motherboard Background */}
      <FooterCircuitTraces />

      <div className="w-11/12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 h-full relative z-10 items-center justify-between">
        {/* Left Side: Directory Grid + Logos */}
        <div className="w-full lg:w-3/5 h-full justify-center flex flex-col gap-12 sm:gap-16">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            {/* 1. Explore Column */}
            <div className="flex flex-col gap-3 w-full h-full">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#00D9FF] font-bold">
                Explore
              </div>
              <div className="flex flex-col h-full text-sm sm:text-lg md:text-xl px-4 gap-2.5 border-l-2 border-[#433e38] font-sans">
                <Link href="/package" className="italic text-neutral-300 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors">
                  Register
                </Link>
                <Link href="/about-us" className="italic text-neutral-300 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors">
                  About Us
                </Link>
                <Link href="/events" className="italic text-neutral-300 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors">
                  Events
                </Link>
                <Link href="/workshop" className="italic text-neutral-300 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors">
                  Workshops
                </Link>
                <Link href="/teams" className="italic text-neutral-300 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors">
                  Our Team
                </Link>
                <Link href="/events" className="italic text-neutral-300 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors">
                  Prefest Events
                </Link>
                <Link href="/gallery" className="italic text-neutral-300 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors">
                  Gallery
                </Link>
                <Link href="/sponsors" className="italic text-neutral-300 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors">
                  Sponsors
                </Link>
                <Link href="/terms" className="italic text-neutral-400 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors text-xs sm:text-sm pt-1">
                  Terms of Service
                </Link>
                <Link href="/privacy-policy" className="italic text-neutral-400 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors text-xs sm:text-sm">
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* 2. Socials Column */}
            <div className="flex flex-col gap-3 w-full h-full">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#00D9FF] font-bold">
                Socials
              </div>
              <div className="flex flex-col h-full text-sm sm:text-lg md:text-xl px-4 gap-2.5 border-l-2 border-[#433e38] font-sans">
                <a
                  href="https://www.instagram.com/techfestsliet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic text-neutral-300 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/school/sant-longowal-institute-of-engineering-and-technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic text-neutral-300 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.youtube.com/@techfestsliet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic text-neutral-300 hover:text-[#00D9FF] hover:underline cursor-pointer transition-colors"
                >
                  Youtube
                </a>
              </div>
            </div>

            {/* 3. Reach Us Column */}
            <div className="flex flex-col gap-3 w-full h-full col-span-2 md:col-span-1">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#00D9FF] font-bold">
                Reach Us
              </div>
              <div className="flex flex-col h-full text-sm sm:text-lg md:text-xl px-4 gap-4 border-l-2 border-[#433e38] font-sans">
                <div className="italic">
                  <a href="tel:+917856893952" className="text-white hover:text-[#00D9FF] hover:underline cursor-pointer font-bold block">
                    +91 78568-93952
                  </a>
                  <span className="text-neutral-400 text-xs sm:text-sm font-light">
                    Naman kumar sinha
                  </span>
                </div>
                <div className="italic">
                  <a href="tel:+919771174465" className="text-white hover:text-[#00D9FF] hover:underline cursor-pointer font-bold block">
                    +91 97711-74465
                  </a>
                  <span className="text-neutral-400 text-xs sm:text-sm font-light">
                    Shubham kumar singh
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Logos: SLIET Seal + TechFest Text Logo */}
          <div className="w-full h-auto flex flex-row items-center justify-start gap-6 pt-4 border-t border-white/10">
            <Image
              src="/events/header/sliet.svg"
              alt="SLIET Longowal Seal"
              width={240}
              height={80}
              className="h-16 sm:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/logo/techfest-text.svg"
              alt="TechFest'26 Typography"
              width={300}
              height={80}
              className="h-14 sm:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Right Side: 3D Cyberpunk Robot Mascot */}
        <div className="w-full lg:w-2/5 flex items-center justify-center relative">
          <Image
            src="/header/footer.svg"
            alt="TechFest'26 Cyber Mascot"
            width={500}
            height={600}
            className="w-full max-w-[420px] lg:max-w-[480px] h-auto object-contain drop-shadow-[0_0_35px_rgba(0,217,255,0.3)] select-none pointer-events-none"
            priority
          />
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="w-11/12 max-w-7xl mx-auto pt-8 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 tracking-wider">
        <span>© 2026 SLIET TECHFEST &bull; SANT LONGOWAL INSTITUTE OF ENGINEERING & TECHNOLOGY</span>
        <button
          onClick={scrollToTop}
          className="text-neutral-400 hover:text-[#00D9FF] transition-colors cursor-pointer flex items-center gap-1 mt-2 sm:mt-0"
        >
          <span>↑ BACK TO TOP</span>
        </button>
      </div>
    </footer>
  );
}
