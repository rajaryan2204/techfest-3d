"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import IndiaHeroCanvas from "./IndiaHeroCanvas";
import IndiaTargetHUD from "./IndiaTargetHUD";
import SampleEventsModal from "@/components/prototype/SampleEventsModal";
import SampleCampusTourModal from "@/components/prototype/SampleCampusTourModal";
import SampleScheduleModal from "@/components/prototype/SampleScheduleModal";

type ModalType = "register" | "events" | "tour" | "schedule" | null;

export default function IndiaHeroMain() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedEventForReg, setSelectedEventForReg] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lockTargetIndia, setLockTargetIndia] = useState(true);

  // Toast notification helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const t = setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
    return () => clearTimeout(t);
  }, []);

  const handleLockIndia = () => {
    setLockTargetIndia(true);
    showToast("🎯 Observer vector aligned to India // SLIET Longowal");
  };

  const handleInspectCampus = () => {
    setActiveModal("tour");
    showToast("🧭 Opening 451-Acre SLIET Campus Tour");
  };

  const handleSelectEvent = (eventName: string) => {
    setSelectedEventForReg(eventName);
    setActiveModal("register");
    showToast(`🏆 Pre-filling registration: ${eventName}`);
  };

  const handleDownloadRulebook = () => {
    showToast("📄 TechFEST'26 Official Rulebook Downloaded!");
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden bg-[#020817] text-white select-none font-sans flex flex-col justify-between p-4 sm:p-8 md:p-12">
      {/* ========================================================================= */}
      {/* 1. REAL-TIME 3D CANVAS: EARTH CENTERED ON INDIA + OBSERVER GAZING AT IT   */}
      {/* ========================================================================= */}
      <IndiaHeroCanvas lockTargetIndia={lockTargetIndia} />

      {/* ========================================================================= */}
      {/* 2. CINEMATIC GRADIENT LIGHTING & VIGNETTES                                */}
      {/* ========================================================================= */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[50%] bg-gradient-to-r from-[#020817]/95 via-[#020817]/60 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#020817]/85 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817]/90 to-transparent pointer-events-none z-10" />

      {/* ========================================================================= */}
      {/* 4. TOP NAVIGATION HEADER                                                 */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
        {/* Brand Mark with Official TechFest Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/40 flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(0,217,255,0.3)] group-hover:scale-105 transition-transform">
            <Image
              src="/logo/techfest-emblem-transparent.webp"
              alt="TechFest'26 Emblem"
              width={32}
              height={32}
              unoptimized
              className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]"
              priority
            />
          </div>
          <Image
            src="/logo/techfest.webp"
            alt="TechFest'26"
            width={180}
            height={42}
            className="h-6 sm:h-7 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,217,255,0.4)] group-hover:scale-102 transition-transform"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-[0.2em] uppercase">
          <button
            onClick={() => setActiveModal("events")}
            className="text-neutral-300 hover:text-[#00D9FF] transition-colors cursor-pointer"
          >
            EVENTS
          </button>
          <button
            onClick={() => setActiveModal("schedule")}
            className="text-neutral-300 hover:text-[#00D9FF] transition-colors cursor-pointer"
          >
            SCHEDULE
          </button>
          <button
            onClick={() => setActiveModal("tour")}
            className="text-neutral-300 hover:text-[#00D9FF] transition-colors cursor-pointer"
          >
            CAMPUS TOUR
          </button>
          <button
            onClick={handleDownloadRulebook}
            className="text-neutral-300 hover:text-[#00D9FF] transition-colors cursor-pointer"
          >
            RULEBOOK
          </button>
        </nav>

        {/* Right CTA & Mobile Drawer Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedEventForReg("");
              setActiveModal("register");
            }}
            className="px-4 sm:px-6 py-2 rounded-full border border-[#00D9FF] bg-gradient-to-r from-[#00D9FF]/20 to-[#008CFF]/20 hover:from-[#00D9FF] hover:to-[#008CFF] text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase text-[#00D9FF] hover:text-[#020817] font-bold shadow-[0_0_20px_rgba(0,217,255,0.35)] transition-all cursor-pointer min-h-[38px] active:scale-95"
          >
            REGISTER ↗
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-lg border border-white/15 bg-white/5 flex flex-col items-center justify-center gap-1.5 text-white lg:hidden cursor-pointer active:bg-white/10"
            aria-label="Toggle Navigation Menu"
          >
            <span className={`w-4 h-[1.5px] bg-[#00D9FF] transition-all ${mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`w-4 h-[1.5px] bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-4 h-[1.5px] bg-[#00D9FF] transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] z-50 bg-[#020817]/95 backdrop-blur-2xl border-b border-[#00D9FF]/30 p-5 flex flex-col gap-3 shadow-2xl lg:hidden animate-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col gap-2 font-mono text-xs tracking-wider">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal("events");
              }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 text-neutral-200"
            >
              <span>🏆 COMPETITIONS &amp; EVENTS</span>
              <span className="text-[#00D9FF]">↗</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal("schedule");
              }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 text-neutral-200"
            >
              <span>📅 FESTIVAL SCHEDULE</span>
              <span className="text-[#00D9FF]">↗</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal("tour");
              }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 text-neutral-200"
            >
              <span>🧭 SLIET CAMPUS TOUR</span>
              <span className="text-[#00D9FF]">↗</span>
            </button>
          </nav>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CENTER HERO CONTENT: TYPOGRAPHY & INDIA FOCUS                          */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-2xl my-auto space-y-4 sm:space-y-6 pointer-events-none">
        {/* Orbital Beacon Status */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#06152D]/85 border border-[#00D9FF]/40 text-[9px] sm:text-[10px] font-mono tracking-widest text-[#00D9FF] backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.25)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]" />
          </span>
          <span className="uppercase font-bold">
            OBSERVER IN ORBIT // GAZING AT INDIA
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-sans drop-shadow-2xl">
            Where Ideas <br />
            Become{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#7dd3fc] to-[#38bdf8] drop-shadow-[0_0_35px_rgba(0,217,255,0.8)]">
              REALITY
            </span>
          </h1>
        </div>

        {/* Subtitle & Mission Statement */}
        <p className="text-xs sm:text-base font-light text-neutral-300 max-w-lg leading-relaxed drop-shadow-md">
          Join India&apos;s premier national technical festival. A convergence of robotics, space exploration, 36hr hackathons, and sustainable technologies.
        </p>

        {/* Date & Location */}
        <div className="space-y-0.5">
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#00D9FF] font-semibold uppercase">
            16 • 17 OCTOBER 2026
          </p>
          <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase">
            SLIET LONGOWAL, PUNJAB, INDIA
          </p>
        </div>

        {/* CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pointer-events-auto">
          <button
            onClick={() => {
              setSelectedEventForReg("");
              setActiveModal("register");
            }}
            className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#008CFF] hover:brightness-110 active:scale-95 text-[#020817] font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_35px_rgba(0,217,255,0.5)] transition-all cursor-pointer min-h-[48px]"
          >
            <span>REGISTER FOR TECHFEST</span>
            <span className="group-hover:translate-x-1 transition-transform font-extrabold">→</span>
          </button>

          <button
            onClick={() => setActiveModal("events")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 text-white font-mono text-xs sm:text-sm tracking-wider transition-all cursor-pointer backdrop-blur-sm min-h-[48px]"
          >
            <span>EXPLORE 3D DOMAINS</span>
            <span className="text-[#00D9FF]">↗</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM TELEMETRY HUD & RADAR WIDGET                                    */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full pt-4">
        <IndiaTargetHUD
          onLockIndia={handleLockIndia}
          onInspectCampus={handleInspectCampus}
          isLocked={lockTargetIndia}
        />
      </div>

      {/* ========================================================================= */}
      {/* 7. INTERACTIVE MODALS & TOAST                                             */}
      {/* ========================================================================= */}
      <SampleEventsModal
        isOpen={activeModal === "events"}
        onClose={() => setActiveModal(null)}
        onSelectEvent={handleSelectEvent}
      />

      <SampleCampusTourModal
        isOpen={activeModal === "tour"}
        onClose={() => setActiveModal(null)}
        onFocusAuditorium={() => {
          showToast("🎯 Focused on SLIET Central Auditorium");
          setActiveModal(null);
        }}
      />

      <SampleScheduleModal
        isOpen={activeModal === "schedule"}
        onClose={() => setActiveModal(null)}
      />

      {/* Pre-Registration Modal */}
      {activeModal === "register" && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-md max-h-[92dvh] overflow-y-auto p-5 sm:p-8 rounded-t-2xl sm:rounded-xl bg-[#06152D] border border-[#00D9FF]/40 shadow-[0_0_70px_rgba(0,217,255,0.35)] space-y-4 sm:space-y-5 overscroll-contain">
            <button
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-neutral-300 hover:text-white absolute top-4 right-4 text-sm font-mono cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1 sm:space-y-1.5 pr-8">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#00D9FF] uppercase block">
                // OFFICIAL REGISTRATION PORTAL
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase font-sans">
                TechFEST&apos;26 Pass
              </h3>
              {selectedEventForReg ? (
                <div className="p-2 rounded bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[11px] sm:text-xs font-mono text-[#00D9FF]">
                  🎯 Selected Event: <strong>{selectedEventForReg}</strong>
                </div>
              ) : (
                <p className="text-[11px] sm:text-xs text-neutral-400 font-light leading-relaxed">
                  Join 10,000+ innovators at SLIET Longowal, Punjab on 16-17 October 2026.
                </p>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast("🎉 Registration confirmed! Welcome to TechFEST'26.");
                setActiveModal(null);
              }}
              className="space-y-3 sm:space-y-3.5 text-xs font-mono"
            >
              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-1 text-[11px]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#020817] border border-white/15 text-white text-base sm:text-xs focus:outline-none focus:border-[#00D9FF] tracking-wider"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-1 text-[11px]">
                  College / Institute
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SLIET Longowal / IIT / NIT"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#020817] border border-white/15 text-white text-base sm:text-xs focus:outline-none focus:border-[#00D9FF] tracking-wider"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-1 text-[11px]">
                  Participation Domain
                </label>
                <select className="w-full px-3.5 py-2.5 rounded-lg bg-[#020817] border border-white/15 text-white text-base sm:text-xs focus:outline-none focus:border-[#00D9FF] tracking-wider">
                  <option>General Delegate / Attendee</option>
                  <option>RoboWars Heavyweight Combat</option>
                  <option>Hack-SLIET 36hr Hackathon</option>
                  <option>Drone Grand Prix</option>
                  <option>CodeSprint Competitive Coding</option>
                  <option>Green Tech &amp; Sustainability</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-1 text-[11px]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. aryan@sliet.ac.in"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#020817] border border-white/15 text-white text-base sm:text-xs focus:outline-none focus:border-[#00D9FF] tracking-wider"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#008CFF] hover:from-[#38bdf8] hover:to-[#0284c7] text-[#020817] font-bold uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(0,217,255,0.5)] transition-all cursor-pointer min-h-[44px]"
              >
                CONFIRM REGISTRATION →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cyber Toast */}
      {toastMessage && (
        <div className="fixed top-16 sm:top-20 left-4 right-4 sm:left-auto sm:right-6 z-50 flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg border border-[#00D9FF]/70 bg-[#06152D]/95 text-white font-mono text-xs shadow-[0_0_30px_rgba(0,217,255,0.35)] backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 max-w-sm sm:max-w-md ml-auto">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-ping shrink-0" />
            <span className="tracking-wider">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white cursor-pointer ml-2 text-sm"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
