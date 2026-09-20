"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import SampleEventsModal from "./SampleEventsModal";
import SampleCampusTourModal from "./SampleCampusTourModal";
import SampleScheduleModal from "./SampleScheduleModal";
import OrbitalSatelliteView from "@/components/hero/OrbitalSatelliteView";
import EarthGlobe3D from "@/components/hero/EarthGlobe3D";
import FestCountdownTimer from "@/components/hero/FestCountdownTimer";

type ModalType = "register" | "events" | "tour" | "schedule" | null;

export default function CinematicPortalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneWrapRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const telemetryPillRef = useRef<HTMLDivElement>(null);
  const altitudeTextRef = useRef<HTMLSpanElement>(null);
  const stageBadgeRef = useRef<HTMLSpanElement>(null);

  // Video references
  const droneVideoRef = useRef<HTMLVideoElement>(null);

  // Narrative Lifecycle States
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4>(1);
  const [isZooming, setIsZooming] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // UI States
  const [audioActive, setAudioActive] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedEventForReg, setSelectedEventForReg] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Toast notification helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const t = setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
    return () => clearTimeout(t);
  }, []);

  // Transition from Satellite Orbit to Hyper-Zoom into India and Campus Reveal
  const handleInitiateZoom = useCallback(() => {
    setIsZooming(true);
    setHasUserInteracted(true);

    if (altitudeTextRef.current) {
      altitudeTextRef.current.textContent = "35,786 KM";
    }
    if (stageBadgeRef.current) {
      stageBadgeRef.current.textContent = "HYPER-DESCENT TO INDIA";
    }

    showToast("🚀 Target Locked: Descending into India [SLIET Longowal]");

    // Allow 1.1s for the satellite dive and 3D Earth zoom animation before cutting to atmospheric descent video
    setTimeout(() => {
      setCurrentStage(2);
      const vid = droneVideoRef.current;
      if (vid) {
        vid.currentTime = 0;
        vid.muted = !audioActive;
        vid.play().catch(() => setIsPaused(true));
      }
    }, 1100);
  }, [audioActive, showToast]);

  // Auto-initiate zoom to India after 7s of satellite orbit if user hasn't interacted yet
  useEffect(() => {
    if (currentStage === 1 && !hasUserInteracted) {
      const timer = setTimeout(() => {
        handleInitiateZoom();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [currentStage, hasUserInteracted, handleInitiateZoom]);

  // Video playback & Telemetry tracking
  const handleDroneTimeUpdate = () => {
    const vid = droneVideoRef.current;
    if (!vid) return;

    if (isPaused) setIsPaused(false);

    const t = vid.currentTime;

    // Stage 2: Hyper-Zoom to India (0.0s - 2.8s)
    if (t < 2.8) {
      if (currentStage !== 2) setCurrentStage(2);
      if (altitudeTextRef.current) {
        const progress = Math.min(1, Math.max(0, t / 2.8));
        const altKm = Math.round(35786 * Math.pow(1 - progress, 2.5) + (1 - progress) * 1500);
        if (altKm > 1000) {
          altitudeTextRef.current.textContent = `${altKm.toLocaleString()} KM`;
        } else {
          const altM = Math.round(500 + (1 - progress) * 2000);
          altitudeTextRef.current.textContent = `${altM.toLocaleString()} M AGL`;
        }
      }
      if (stageBadgeRef.current) {
        stageBadgeRef.current.textContent = "HYPER-ZOOM TO INDIA";
      }
    }
    // Stage 3: Campus Reveal & Aerial Approach (2.8s - 3.8s)
    else if (t >= 2.8 && t < 3.8) {
      if (currentStage !== 3) setCurrentStage(3);
      if (altitudeTextRef.current) {
        const progress = (t - 2.8) / 1.0;
        const alt = Math.round(500 - progress * 400);
        altitudeTextRef.current.textContent = `${alt.toLocaleString()} M AGL`;
      }
      if (stageBadgeRef.current) {
        stageBadgeRef.current.textContent = "CAMPUS REVEAL";
      }
    }
    // Stage 4: Still Majestic Campus View (Hold still on campus auditorium at 4.8s)
    else if (t >= 3.8) {
      if (currentStage !== 4) setCurrentStage(4);
      if (altitudeTextRef.current) {
        altitudeTextRef.current.textContent = "45M AGL";
      }
      if (stageBadgeRef.current) {
        stageBadgeRef.current.textContent = "CAMPUS AIRSPACE";
      }

      // Freeze video still on the majestic campus auditorium frame (NO LOOPING)
      if (t >= 4.8) {
        vid.pause();
        vid.currentTime = 4.8;
      }
    }
  };

  const handleDroneEnded = () => {
    const vid = droneVideoRef.current;
    if (!vid) return;
    vid.pause();
    vid.currentTime = 4.8;
    setCurrentStage(4);
  };

  const replayZoom = () => {
    setHasUserInteracted(true);
    const droneVid = droneVideoRef.current;
    if (droneVid) {
      droneVid.pause();
      droneVid.currentTime = 0;
    }
    setCurrentStage(1);
    setIsZooming(false);
    if (altitudeTextRef.current) {
      altitudeTextRef.current.textContent = "35,786 KM";
    }
    if (stageBadgeRef.current) {
      stageBadgeRef.current.textContent = "SATELLITE ORBIT";
    }
    showToast("🛰️ Reset to Orbit: Commencing Satellite Scan & Zoom");
    setTimeout(() => {
      handleInitiateZoom();
    }, 2400);
  };

  const handleResumePlayback = () => {
    const vid = droneVideoRef.current;
    if (!vid) return;
    if (vid.currentTime >= 4.8) {
      vid.currentTime = 0;
    }
    vid.play().then(() => setIsPaused(false)).catch(() => {});
  };

  // Audio Toggle
  const toggleAudio = () => {
    const newActive = !audioActive;
    setAudioActive(newActive);

    const vid = droneVideoRef.current;
    if (vid) {
      vid.muted = !newActive;
      if (newActive) {
        vid.volume = 0.85;
        vid.play().catch(() => {});
      }
    }
    showToast(newActive ? "🔊 Audio Active" : "🔇 Audio Muted");
  };

  const handleDownloadRulebook = () => {
    showToast("📄 TechFEST'26 Official Rulebook Downloaded!");
  };

  const handleSelectEvent = (eventName: string) => {
    setSelectedEventForReg(eventName);
    setActiveModal("register");
    showToast(`🏆 Pre-filling registration: ${eventName}`);
  };

  const handleFocusAuditorium = () => {
    const vid = droneVideoRef.current;
    if (!vid) return;
    vid.currentTime = 3.0;
    vid.play().catch(() => {});
    showToast("🎯 Focused Drone Camera on SLIET Auditorium");
  };

  // =========================================================================
  // ZERO RE-RENDER HARDWARE-ACCELERATED PARALLAX LOOP (60-120 FPS)
  // Supports Desktop Mouse + Mobile Touch + Mobile Gyroscope + Ambient Drift!
  // =========================================================================
  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animId: number;
    let clock = 0;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetX = (touch.clientX / window.innerWidth - 0.5) * 1.5;
        targetY = (touch.clientY / window.innerHeight - 0.5) * 1.5;
      }
    };

    const onTouchEnd = () => {
      targetX = 0;
      targetY = 0;
    };

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        targetX = Math.max(-1, Math.min(1, e.gamma / 25));
        targetY = Math.max(-1, Math.min(1, (e.beta - 40) / 25));
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    // Note: touchmove is not attached to avoid interfering with mobile vertical scrolling
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });

    const timer = setTimeout(() => {
      if (droneVideoRef.current && droneVideoRef.current.paused && currentStage !== 1) {
        setIsPaused(true);
      }
    }, 1500);

    const lerp = () => {
      clock += 0.02;
      const driftX = Math.sin(clock * 0.6) * 0.12;
      const driftY = Math.cos(clock * 0.45) * 0.09;

      // When campus is revealed (currentStage >= 3), keep view STILL without continuous drift
      const finalX = currentStage >= 3 ? targetX * 0.15 : targetX + driftX;
      const finalY = currentStage >= 3 ? targetY * 0.15 : targetY + driftY;

      currentX += (finalX - currentX) * 0.05;
      currentY += (finalY - currentY) * 0.05;

      if (sceneWrapRef.current) {
        sceneWrapRef.current.style.transform = `perspective(1000px) rotateX(${
          currentY * -1.0
        }deg) rotateY(${currentX * 1.3}deg) scale(1.02) translate3d(${
          currentX * -5
        }px, ${currentY * -4}px, 0)`;
      }

      if (textGroupRef.current) {
        textGroupRef.current.style.transform = `translate3d(${
          currentX * -10
        }px, ${currentY * -7}px, 0)`;
      }

      animId = requestAnimationFrame(lerp);
    };

    animId = requestAnimationFrame(lerp);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      cancelAnimationFrame(animId);
    };
  }, [currentStage]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[100dvh] h-[100dvh] overflow-hidden bg-[#020817] text-white select-none font-sans"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC STORY VIDEO BACKGROUND (Dual Master Streams)                  */}
      {/* ========================================================================= */}
      <div
        ref={sceneWrapRef}
        style={{ willChange: "transform" }}
        className="absolute inset-0 w-full h-full origin-center pointer-events-none overflow-hidden"
      >
        {/* Stage 1: 3D Earth Globe Rotating to India & Locking Target */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            currentStage === 1 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <EarthGlobe3D
            onInitiateZoom={handleInitiateZoom}
            isZooming={isZooming}
          />
        </div>

        {/* Stages 2-4: Master Story Video (Hyper-Zoom into India -> SLIET Campus) */}
        <video
          ref={droneVideoRef}
          autoPlay={false}
          muted={!audioActive}
          playsInline
          preload="auto"
          onTimeUpdate={handleDroneTimeUpdate}
          onEnded={handleDroneEnded}
          poster="/videos/hero/earth-zoom-drone-poster.jpg"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            currentStage !== 1 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Mobile receives ultra-lightweight 720p master stream */}
          <source
            src="/videos/hero/earth-zoom-drone.mp4"
            media="(max-width: 768px)"
            type="video/mp4"
          />
          {/* Desktop receives crisp 1080p master stream */}
          <source src="/videos/hero/earth-zoom-drone-1080p.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Low-Power Mode / Autoplay Blocked Fallback Tap-To-Play Button */}
      {isPaused && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-xs">
          <button
            onClick={handleResumePlayback}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#00D9FF]/90 text-[#020817] font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_35px_rgba(0,217,255,0.7)] animate-bounce cursor-pointer"
          >
            <span>▶</span>
            <span>TAP TO START LIVE STREAM</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CINEMATIC GRADIENT OVERLAYS (Protects Contrast & Typography)             */}
      {/* ========================================================================= */}
      {/* Desktop: Left-to-right gradient to protect left-aligned typography */}
      <div className="hidden sm:block absolute inset-y-0 left-0 sm:w-[52%] md:w-[44%] bg-gradient-to-r from-[#020817]/90 via-[#020817]/40 to-transparent pointer-events-none z-10" />
      {/* Mobile: Bottom gradient to protect typography while keeping upper half clear for Earth/Drone */}
      <div className="sm:hidden absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#020817] via-[#020817]/85 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-b from-[#020817]/80 to-transparent pointer-events-none z-10" />
      <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020817]/85 to-transparent pointer-events-none z-10" />

      {/* Stage 1: Active Satellite Orbiting Earth & Scanning India */}
      {currentStage === 1 && (
        <OrbitalSatelliteView
          onInitiateZoom={handleInitiateZoom}
          isZooming={isZooming}
        />
      )}

      {/* ========================================================================= */}
      {/* 4. MAIN HERO CONTENT & STREAMLINED TELEMETRY PILL                         */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between pt-[max(4.5rem,env(safe-area-inset-top))] sm:pt-24 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-7 px-4 sm:px-12 pointer-events-none">
        {/* Top Control Bar: Audio Toggle + Aerospace Status Telemetry */}
        <div className="w-full flex items-center justify-between gap-2 pointer-events-auto mt-1 sm:mt-0">
          {/* Audio Button */}
          <button
            onClick={toggleAudio}
            className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-cyan-400/40 bg-[#061226]/85 backdrop-blur-md text-[9px] sm:text-[10px] font-mono tracking-wider text-cyan-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,217,255,0.25)] shrink-0"
            title="Toggle Drone Video Audio"
          >
            <div className="flex items-end gap-[2px] h-3 w-3">
              <span className={`w-[2px] rounded-full bg-cyan-400 transition-all ${audioActive ? "h-3 animate-pulse" : "h-1 opacity-50"}`} />
              <span className={`w-[2px] rounded-full bg-cyan-400 transition-all ${audioActive ? "h-3.5 animate-bounce" : "h-2 opacity-50"}`} />
              <span className={`w-[2px] rounded-full bg-cyan-400 transition-all ${audioActive ? "h-2 animate-pulse" : "h-1.5 opacity-50"}`} />
              <span className={`w-[2px] rounded-full bg-cyan-400 transition-all ${audioActive ? "h-3 animate-bounce" : "h-2.5 opacity-50"}`} />
            </div>
            <span className="hidden xs:inline font-bold">{audioActive ? "AUDIO ACTIVE" : "AUDIO MUTED"}</span>
            <span className="xs:hidden font-bold">{audioActive ? "ON" : "OFF"}</span>
          </button>

          {/* Telemetry Pill */}
          <div
            ref={telemetryPillRef}
            className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/10 bg-[#020817]/80 backdrop-blur-md text-[8px] sm:text-[10px] font-mono text-neutral-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-700 opacity-100 translate-y-0 max-w-[70%] sm:max-w-none"
          >
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500" />
            </span>
            <span
              ref={stageBadgeRef}
              className="text-emerald-400 font-bold tracking-wider truncate"
            >
              {currentStage === 1
                ? "SATELLITE ORBIT"
                : currentStage === 2
                ? "HYPER-ZOOM TO INDIA"
                : currentStage === 3
                ? "CAMPUS REVEAL"
                : "LIVE CAMPUS NEXUS"}
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-neutral-400 hidden md:inline">
              30.7391° N, 76.6888° E
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span
              ref={altitudeTextRef}
              className="text-[#00D9FF] font-semibold tracking-wider shrink-0"
            >
              {currentStage === 1 ? "35,786 KM" : "1,286 M"}
            </span>
          </div>
        </div>

        {/* Hero Left Column Typography & Primary Action */}
        <div
          ref={textGroupRef}
          style={{ willChange: "transform" }}
          className="max-w-xl space-y-2 sm:space-y-4 mt-auto sm:my-auto mb-2 sm:mb-0 transition-all duration-700 opacity-100 translate-y-0"
        >
          {/* Eyebrow */}
          <div className="hero-anim-item flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />
            <span className="text-[9px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.3em] text-neutral-300 uppercase">
              {currentStage === 1 ? "🛰️ SATELLITE ORBIT // TECHFEST'26" : "SLIET PRESENTS // TECHFEST'26"}
            </span>
          </div>

          {/* Headline */}
          <div className="hero-anim-item space-y-0.5">
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] sm:leading-[1.1] font-sans drop-shadow-2xl">
              Where Ideas <span className="hidden sm:inline"><br /></span>Become{" "}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#7dd3fc] to-[#008CFF] drop-shadow-[0_0_25px_rgba(0,217,255,0.7)]">
                REALITY
              </span>
            </h1>
          </div>

          {/* Subtitle / Dynamic Fest Stats */}
          <div className="hero-anim-item">
            {currentStage === 1 ? (
              <p className="text-xs sm:text-sm md:text-base font-light text-neutral-300 max-w-sm sm:max-w-md leading-relaxed drop-shadow-md">
                Technology and Sciences for a Sustainable Earth.
              </p>
            ) : (
              <div className="space-y-2 max-w-md">
                <p className="text-xs sm:text-sm font-light text-neutral-300 leading-relaxed drop-shadow-md">
                  Northern India&apos;s Largest Technical Festival at SLIET Longowal.
                </p>
                {/* Key Fest Stat Badges */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
                  <span className="px-2.5 py-1 rounded-md bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[9px] sm:text-[10px] font-mono text-[#00D9FF] font-semibold">
                    🏆 ₹5,00,000+ PRIZES
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/15 text-[9px] sm:text-[10px] font-mono text-neutral-200">
                    ⚡ 61 COMPETITIONS
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/15 text-[9px] sm:text-[10px] font-mono text-neutral-200 hidden xs:inline-block">
                    👥 10,000+ INNOVATORS
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Date & Location */}
          <div className="hero-anim-item space-y-0.5">
            <p className="text-[11px] sm:text-sm font-mono tracking-[0.2em] sm:tracking-[0.3em] text-[#00D9FF] uppercase font-semibold">
              16 • 17 OCTOBER 2026
            </p>
            <p className="text-[9px] sm:text-xs font-mono tracking-[0.18em] sm:tracking-[0.2em] text-neutral-400 uppercase">
              SLIET LONGOWAL, PUNJAB • 451-ACRE CAMPUS
            </p>
          </div>

          {/* Live Sci-Fi Countdown to TechFest'26 */}
          <div className="hero-anim-item pt-1 pointer-events-auto">
            <FestCountdownTimer />
          </div>

          {/* Clean Streamlined CTAs: Side-by-side on mobile grid, row on desktop */}
          <div className="hero-anim-item pt-1 sm:pt-2 grid grid-cols-2 sm:flex sm:flex-row items-center gap-2 sm:gap-3 pointer-events-auto">
            {currentStage === 1 ? (
              <>
                {/* Primary: Zoom to India Button */}
                <button
                  onClick={handleInitiateZoom}
                  className="group inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#008CFF] active:scale-[0.98] hover:brightness-110 text-[#020817] font-mono text-[11px] sm:text-sm font-bold tracking-[0.08em] sm:tracking-[0.2em] shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-200 cursor-pointer min-h-[40px] sm:min-h-[48px] animate-pulse"
                >
                  <span className="truncate">▶ ZOOM INDIA</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200 font-extrabold hidden xs:inline">
                    →
                  </span>
                </button>

                {/* Secondary: Register */}
                <button
                  onClick={() => {
                    setSelectedEventForReg("");
                    setActiveModal("register");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-white/20 bg-white/5 active:scale-[0.98] hover:bg-white/10 text-white font-mono text-[11px] sm:text-sm tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-sm min-h-[40px] sm:min-h-[48px]"
                >
                  <span>REGISTER</span>
                  <span className="text-[#00D9FF]">↗</span>
                </button>
              </>
            ) : (
              <>
                {/* Primary Action Button */}
                <button
                  onClick={() => {
                    setSelectedEventForReg("");
                    setActiveModal("register");
                  }}
                  className="group inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#008CFF] active:scale-[0.98] hover:brightness-110 text-[#020817] font-mono text-[11px] sm:text-sm font-bold tracking-[0.08em] sm:tracking-[0.2em] shadow-[0_0_25px_rgba(0,217,255,0.4)] transition-all duration-200 cursor-pointer min-h-[40px] sm:min-h-[48px]"
                >
                  <span className="truncate">REGISTER</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200 font-extrabold hidden xs:inline">
                    →
                  </span>
                </button>

                {/* Secondary Action Button */}
                <button
                  onClick={() => {
                    const el = document.getElementById("events-section");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    } else {
                      setActiveModal("events");
                    }
                  }}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-white/20 bg-white/5 active:scale-[0.98] hover:bg-white/10 text-white font-mono text-[11px] sm:text-sm tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-sm min-h-[40px] sm:min-h-[48px]"
                >
                  <span className="truncate">61 EVENTS</span>
                  <span className="text-[#00D9FF]">↗</span>
                </button>
              </>
            )}
          </div>

          {/* Space Zoom Replay Link */}
          <div className="hero-anim-item pt-0.5 pointer-events-auto">
            <button
              onClick={replayZoom}
              className="text-[10px] sm:text-[11px] font-mono text-neutral-400 hover:text-[#00D9FF] transition-colors cursor-pointer flex items-center gap-1.5 py-1"
            >
              <span>↺</span>
              <span className="hover:underline">Replay Satellite Orbit &amp; Hyper-Descent</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Clean Aerospace Telemetry & Scroll Prompt */}
        <div className="w-full flex items-center justify-between pt-2 sm:pt-4 border-t border-white/10 pb-[max(0.75rem,env(safe-area-inset-bottom))] gap-2">
          {/* Left: Tactical Campus Coordinates & System Status */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-400 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-cyan-400 font-bold">
              <span className="hidden xs:inline">SLIET LONGOWAL</span>
              <span className="xs:hidden">SLIET &apos;26</span>
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="hidden sm:inline">30.22° N, 75.83° E</span>
            <span className="text-white/20 hidden md:inline">•</span>
            <span className="text-emerald-400 hidden md:inline">SYSTEMS NOMINAL</span>
          </div>

          {/* Center: Scroll Explore Prompt */}
          <button
            onClick={() => {
              const el = document.getElementById("events-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="flex items-center gap-1.5 sm:gap-3 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.3em] text-neutral-300 hover:text-[#00D9FF] uppercase transition-all duration-300 cursor-pointer pointer-events-auto group truncate"
          >
            <span className="w-2.5 sm:w-4 h-[1px] bg-[#00D9FF]/60 group-hover:w-6 transition-all shrink-0" />
            <span className="hidden sm:inline">SCROLL TO EXPLORE FESTIVAL ↓</span>
            <span className="sm:hidden">EXPLORE FEST ↓</span>
          </button>

          {/* Right: Fest Prize Pool Telemetry */}
          <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-cyan-300/90 uppercase hidden sm:flex items-center gap-1.5">
            <span className="text-white/40">PRIZE POOL:</span>
            <span className="font-bold text-cyan-400">₹5,00,000+</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE MODALS (Clean & Responsive)                                  */}
      {/* ========================================================================= */}
      {/* Events Catalog Modal */}
      <SampleEventsModal
        isOpen={activeModal === "events"}
        onClose={() => setActiveModal(null)}
        onSelectEvent={handleSelectEvent}
      />

      {/* Campus Tour Modal */}
      <SampleCampusTourModal
        isOpen={activeModal === "tour"}
        onClose={() => setActiveModal(null)}
        onFocusAuditorium={handleFocusAuditorium}
      />

      {/* Schedule Modal */}
      <SampleScheduleModal
        isOpen={activeModal === "schedule"}
        onClose={() => setActiveModal(null)}
      />

      {/* Pre-Registration Modal (Mobile Bottom Sheet / Desktop Modal) */}
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
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.3em] text-[#00D9FF] uppercase block">
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
                showToast("🎉 Pre-Registration confirmed! Welcome to TechFEST'26.");
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
                  Participation Role
                </label>
                <select className="w-full px-3.5 py-2.5 rounded-lg bg-[#020817] border border-white/15 text-white text-base sm:text-xs focus:outline-none focus:border-[#00D9FF] tracking-wider">
                  <option>General Delegate / Attendee</option>
                  <option>Hack-SLIET 36hr Hacker</option>
                  <option>RoboWars Heavyweight Combatant</option>
                  <option>CodeSprint Competitor</option>
                  <option>Drone Grand Prix Pilot</option>
                  <option>CyberClash Esports Gamer</option>
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

      {/* ========================================================================= */}
      {/* 6. SUBTLE CYBER TOAST NOTIFICATION                                        */}
      {/* ========================================================================= */}
      {toastMessage && (
        <div className="fixed top-14 sm:top-20 inset-x-4 sm:inset-x-auto sm:right-6 z-50 flex items-center justify-between gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-[#00D9FF]/70 bg-[#06152D]/95 text-white font-mono text-[11px] sm:text-xs shadow-[0_0_30px_rgba(0,217,255,0.35)] backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 max-w-sm sm:max-w-md mx-auto sm:mx-0 sm:ml-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00D9FF] animate-ping shrink-0" />
            <span className="tracking-wider truncate">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white cursor-pointer ml-1 text-sm shrink-0"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
