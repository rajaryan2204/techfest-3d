"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FEST_DATA } from "@/data/festData";

export default function CyberNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "EVENTS", href: "/events" },
    { label: "WORKSHOPS", href: "/workshop" },
    { label: "ABOUT", href: "/about-us" },
    { label: "TEAMS", href: "/teams" },
    { label: "PASSES", href: "/package" },
    { label: "SPONSORS", href: "/sponsors" },
    { label: "GALLERY", href: "/gallery" },
    { label: "REACH US", href: "/reach-us" },
  ];

  const isActive = (href: string) => {
    if (href === "/events") {
      return pathname.startsWith("/events");
    }
    if (href === "/package") {
      return pathname.startsWith("/package");
    }
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#020817]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3"
          : "bg-[#020817]/60 backdrop-blur-xs border-b border-white/10 py-4"
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4 lg:gap-8">
        {/* Brand Logo / Home link with Official TechFest Logo */}
        <Link
          href="/"
          className="flex-shrink-0 flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            <Image
              src="/logo/techfest.webp"
              alt="TechFest'26"
              width={200}
              height={50}
              className="h-7 sm:h-8 lg:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(0,217,255,0.4)]"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links (Centered with spacious balanced gaps) */}
        <nav
          className="hidden xl:flex items-center justify-center gap-5 2xl:gap-7 text-[12px] font-mono tracking-wider text-neutral-300 uppercase"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 px-1 transition-all duration-200 hover:text-cyan-300 ${
                  active ? "text-cyan-400 font-bold" : "text-neutral-300 font-medium"
                }`}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00d9ff]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTAs (Structured with clean spacing, divider & visual hierarchy) */}
        <div className="flex-shrink-0 flex items-center gap-2.5 sm:gap-3.5 font-mono">
          {/* Notification Bell with Badge */}
          <Link
            href="/package"
            title="Passes & Notifications"
            className="relative w-8 h-8 rounded-full border border-white/20 hover:border-cyan-400/80 bg-white/5 flex items-center justify-center text-neutral-300 hover:text-white transition-all shadow-sm"
          >
            <span className="text-xs">🔔</span>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-black text-[8px] font-bold flex items-center justify-center font-mono animate-pulse">
              2
            </span>
          </Link>

          {/* Official Event Brochure Pill */}
          <a
            href={FEST_DATA.links.brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[#0CC7F8]/40 bg-[#0CC7F8]/10 hover:bg-[#0CC7F8] text-[#0CC7F8] hover:text-black font-bold text-[11px] uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            title="Download Official Brochure"
          >
            <span>Brochure</span>
            <span className="text-[10px]">↗</span>
          </a>

          {/* Sign In Link */}
          <Link
            href="/auth/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer font-medium hover:underline"
          >
            <span>👤</span>
            <span>Sign In</span>
          </Link>

          {/* Subtle Vertical Divider */}
          <div className="hidden sm:block h-4 w-[1px] bg-white/20" />

          {/* Primary CTA: Register / Get Pass */}
          <Link
            href="/package"
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(0,217,255,0.35)] transition-all cursor-pointer"
          >
            GET PASS →
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-lg border border-white/15 bg-white/5 flex flex-col items-center justify-center gap-1.5 text-white cursor-pointer active:bg-white/10"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`w-4 h-[1.5px] bg-cyan-400 transition-all duration-200 ${
                mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-white transition-all duration-200 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-cyan-400 transition-all duration-200 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[57px] bg-[#020817]/98 backdrop-blur-xl border-t border-cyan-500/20 z-50 p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2 py-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase">
              // NAVIGATION INDEX
            </span>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-3 rounded-lg border transition-all text-sm font-mono tracking-widest ${
                    active
                      ? "bg-cyan-500/15 border-cyan-400/50 text-cyan-300 font-bold"
                      : "border-transparent text-neutral-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-neutral-600">→</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3 font-mono">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-white/20 bg-white/5 text-neutral-200 text-xs tracking-wider uppercase hover:bg-white/10 transition-colors"
              >
                SIGN IN
              </Link>
              <a
                href={FEST_DATA.links.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-lg border border-white/20 bg-white/5 text-neutral-200 text-xs tracking-wider uppercase hover:bg-white/10 transition-colors"
              >
                BROCHURE ↗
              </a>
            </div>

            <Link
              href="/package"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs tracking-[0.25em] uppercase hover:brightness-110 shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all"
            >
              REGISTER / GET PASSES →
            </Link>

            <p className="text-[10px] text-neutral-500 text-center tracking-widest uppercase pt-2">
              {FEST_DATA.datesFull} // SLIET LONGOWAL
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
