"use client";

import React, { useState, useEffect } from "react";
import { FEST_DATA } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import MagneticButton from "@/components/interaction/MagneticButton";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const eventsEl = document.getElementById("events-track");
      const aboutEl = document.getElementById("about-section");
      const galleryEl = document.getElementById("gallery-section");
      const contactEl = document.getElementById("contact-section");

      if (contactEl && scrollY >= contactEl.offsetTop - 300) {
        setActiveSection("contact");
      } else if (galleryEl && scrollY >= galleryEl.offsetTop - 300) {
        setActiveSection("gallery");
      } else if (aboutEl && scrollY >= aboutEl.offsetTop - 300) {
        setActiveSection("about");
      } else if (eventsEl && scrollY >= eventsEl.offsetTop - 300) {
        setActiveSection("events");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const mobileNavItems = [
    { label: "HOME", action: scrollToTop },
    { label: "EVENTS EXHIBITION", action: () => scrollToId("events-track") },
    { label: "ABOUT SLIET", action: () => scrollToId("about-section") },
    { label: "GALLERY", action: () => scrollToId("gallery-section") },
    { label: "SPONSORS", action: () => scrollToId("sponsors-section") },
    { label: "FAQ", action: () => scrollToId("faq-section") },
    { label: "CONTACT & TRANSIT", action: () => scrollToId("contact-section") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 py-4 sm:py-5 px-6 sm:px-12 md:px-16 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={scrollToTop}
          data-cursor="TOP"
          className="text-xs font-mono font-medium tracking-[0.3em] text-white/90 hover:text-white uppercase transition-opacity cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 p-1"
          aria-label="TechFEST Home"
        >
          {FEST_DATA.shortTitle}
        </button>

        {/* Desktop Nav Items */}
        <nav
          className="hidden md:flex items-center gap-6 text-[11px] font-mono tracking-[0.25em] text-neutral-400"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => scrollToId("events-track")}
            data-cursor="GOTO"
            className={`transition-colors cursor-pointer flex items-center gap-1.5 py-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              activeSection === "events" ? "text-white" : "hover:text-white"
            }`}
          >
            {activeSection === "events" && (
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
            )}
            <span>EVENTS</span>
          </button>

          <button
            onClick={() => scrollToId("about-section")}
            data-cursor="GOTO"
            className={`transition-colors cursor-pointer flex items-center gap-1.5 py-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              activeSection === "about" ? "text-white" : "hover:text-white"
            }`}
          >
            {activeSection === "about" && (
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
            )}
            <span>ABOUT</span>
          </button>

          <button
            onClick={() => scrollToId("gallery-section")}
            data-cursor="GOTO"
            className={`transition-colors cursor-pointer flex items-center gap-1.5 py-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              activeSection === "gallery" ? "text-white" : "hover:text-white"
            }`}
          >
            {activeSection === "gallery" && (
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
            )}
            <span>GALLERY</span>
          </button>

          <button
            onClick={() => scrollToId("contact-section")}
            data-cursor="GOTO"
            className={`transition-colors cursor-pointer flex items-center gap-1.5 py-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              activeSection === "contact" ? "text-white" : "hover:text-white"
            }`}
          >
            {activeSection === "contact" && (
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
            )}
            <span>CONTACT</span>
          </button>

          {/* Clean Search Trigger Button */}
          <button
            onClick={() => eventStore.setSearchOpen(true)}
            data-cursor="SEARCH"
            className="px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 text-[10px] font-mono tracking-widest text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Open event search"
          >
            <span>⌕ SEARCH</span>
          </button>

          <MagneticButton dataCursor="OPEN">
            <a
              href={FEST_DATA.links.register}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cyan-300 transition-colors cursor-pointer pl-3 border-l border-white/15 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 inline-block py-1"
            >
              REGISTER →
            </a>
          </MagneticButton>
        </nav>

        {/* Mobile Buttons: Search + Menu */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => eventStore.setSearchOpen(true)}
            className="text-xs font-mono tracking-wider text-neutral-300 hover:text-white uppercase p-2 border border-white/15 rounded-xs bg-white/5 cursor-pointer"
            aria-label="Open Search"
          >
            ⌕
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-xs font-mono tracking-widest text-neutral-300 hover:text-white uppercase p-2 border border-white/10 rounded-xs bg-white/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "MENU"}
          </button>
        </div>
      </div>

      {/* Clean Fullscreen Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-[#070709] z-50 p-8 sm:p-12 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="text-xs font-mono tracking-[0.3em] text-white">
              {FEST_DATA.shortTitle}
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono tracking-widest text-neutral-400 hover:text-white uppercase p-2"
              aria-label="Close menu"
            >
              CLOSE [✕]
            </button>
          </div>

          <div className="flex flex-col gap-3 py-6 my-auto">
            {mobileNavItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-left text-base sm:text-xl font-light font-sans tracking-wide text-neutral-300 hover:text-white transition-colors py-0.5 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                eventStore.setSearchOpen(true);
              }}
              className="w-full text-center py-2.5 bg-white/10 border border-white/20 text-white font-mono text-xs font-medium tracking-widest uppercase hover:bg-white/20 transition-colors"
            >
              ⌕ SEARCH COMPETITIONS
            </button>
            <a
              href={FEST_DATA.links.register}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3.5 bg-white text-black font-mono text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-colors"
            >
              REGISTER NOW →
            </a>
            <p className="text-[10px] font-mono text-neutral-600 text-center tracking-widest uppercase">
              {FEST_DATA.datesFull} // SLIET
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
