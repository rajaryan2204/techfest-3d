"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import SampleEventsModal from "./SampleEventsModal";
import SampleCampusTourModal from "./SampleCampusTourModal";
import SampleScheduleModal from "./SampleScheduleModal";
import HeroClipartBadges from "@/components/hero/HeroClipartBadges";
import OrbitalSatelliteView from "@/components/hero/OrbitalSatelliteView";
import EarthGlobe3D from "@/components/hero/EarthGlobe3D";

type ModalType = "register" | "events" | "tour" | "schedule" | null;

export default function CinematicPortalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneWrapRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const topNavRef = useRef<HTMLElement>(null);
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Toast notification helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const t = setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
    return () => clearTimeout(t);
  }, []);

  // Transition from Satellite Orbit to Hyper-Zoom into India
  const handleInitiateZoom = useCallback(() => {
    setIsZooming(true);
    setCurrentStage(2);
    setHasUserInteracted(true);

    const vid = droneVideoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.muted = !audioActive;
      vid.play().catch(() => setIsPaused(true));
    }

    if (altitudeTextRef.current) {
      altitudeTextRef.current.textContent = "35,786 KM";
    }
    if (stageBadgeRef.current) {
      stageBadgeRef.current.textContent = "HYPER-ZOOM TO INDIA";
    }

    showToast("🚀 Initiating Hyper-Descent to India (SLIET Longowal)");
  }, [audioActive, showToast]);

  // Auto-initiate zoom to India after 6s of satellite orbit if user hasn't interacted yet
  useEffect(() => {
    if (currentStage === 1 && !hasUserInteracted) {
      const timer = setTimeout(() => {
        handleInitiateZoom();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [currentStage, hasUserInteracted, handleInitiateZoom]);

  // Video playback & 4-Stage Telemetry tracking
  const handleDroneTimeUpdate = () => {
    const vid = droneVideoRef.current;
    if (!vid) return;

    if (isPaused) setIsPaused(false);

    const t = vid.currentTime;

    // Stage 1 & Zoom: Earth Orbit to India Subcontinent (0.0s - 1.8s)
    if (t < 1.8) {
      if (currentStage !== 2) setCurrentStage(2);
      if (altitudeTextRef.current) {
        const alt = Math.round(35786 - (t / 1.8) * 34500);
        altitudeTextRef.current.textContent = `${alt.toLocaleString()} KM`;
      }
      if (stageBadgeRef.current) {
        stageBadgeRef.current.textContent = "HYPER-ZOOM TO INDIA";
      }
    }
    // Stage 2: Cosmic Portal / Observer gazing at Earth with Waterfall (1.8s - 3.2s)
    else if (t < 3.2) {
      if (currentStage !== 2) setCurrentStage(2);
      if (altitudeTextRef.current) {
        const progress = (t - 1.8) / 1.4;
        const alt = Math.round(1286 - progress * 1036);
        altitudeTextRef.current.textContent = `${alt.toLocaleString()} M`;
      }
      if (stageBadgeRef.current) {
        stageBadgeRef.current.textContent = "COSMIC PORTAL";
      }
    }
    // Stage 3: Match-cut to SLIET Auditorium Campus Approach (3.2s - 4.6s)
    else if (t < 4.6) {
      if (currentStage !== 3) setCurrentStage(3);
      if (altitudeTextRef.current) {
        const progress = (t - 3.2) / 1.4;
        const alt = Math.round(250 - progress * 155);
        altitudeTextRef.current.textContent = `${alt.toLocaleString()} M AGL`;
      }
      if (stageBadgeRef.current) {
        stageBadgeRef.current.textContent = "CAMPUS REVEAL";
      }
    }
    // Stage 4: Live Sweeping Campus Airspace (4.6s - 6.5s)
    else {
      if (currentStage !== 4) setCurrentStage(4);
      if (altitudeTextRef.current) {
        altitudeTextRef.current.textContent = "45M AGL";
      }
      if (stageBadgeRef.current) {
        stageBadgeRef.current.textContent = "LIVE CAMPUS NEXUS";
      }
    }

    // Seamless campus aerial loop: 6.40s -> 4.60s (smooth continuous campus drone flight)
    if (t >= 6.4) {
      vid.currentTime = 4.6;
      vid.play().catch(() => {});
    }
  };

  const handleDroneEnded = () => {
    const vid = droneVideoRef.current;
    if (!vid) return;
    vid.currentTime = 4.6;
    vid.play().catch(() => {});
  };

  const STORY_STAGES = [
    {
      stage: 1 as const,
      time: 0,
      label: "01 // SATELLITE ORBIT",
      short: "01 ORBIT",
      alt: "35,786 KM",
      caption: "🛰️ Satellite Orbit: Scanning continental vector towards India (30.22°N, 75.83°E).",
    },
    {
      stage: 2 as const,
      time: 0.1,
      label: "02 // ZOOM TO INDIA",
      short: "02 ZOOM",
      alt: "1,286 M",
      caption: "🚀 Hyper-Descent: Plunging from space orbit to India & Cosmic Portal.",
    },
    {
      stage: 3 as const,
      time: 3.4,
      label: "03 // CAMPUS REVEAL",
      short: "03 CAMPUS",
      alt: "250 M AGL",
      caption: "🏛️ SLIET Longowal: 451-acre campus of national technical excellence.",
    },
    {
      stage: 4 as const,
      time: 4.8,
      label: "04 // FESTIVAL ARENA",
      short: "04 NEXUS",
      alt: "45 M AGL",
      caption: "⚡ TechFEST'26 Live: Competitions, Robowars, Hackathons & Innovation.",
    },
  ];

  const jumpToStage = (stageNum: 1 | 2 | 3 | 4) => {
    setHasUserInteracted(true);
    if (stageNum === 1) {
      const droneVid = droneVideoRef.current;
      if (droneVid) droneVid.pause();
      setCurrentStage(1);
      setIsZooming(false);
      if (altitudeTextRef.current) {
        altitudeTextRef.current.textContent = "35,786 KM";
      }
      if (stageBadgeRef.current) {
        stageBadgeRef.current.textContent = "SATELLITE ORBIT";
      }
      showToast("🛰️ Chapter 1: Earth Orbit & India Lock");
      return;
    }

    if (stageNum === 2) {
      handleInitiateZoom();
      return;
    }

    const vid = droneVideoRef.current;
    if (!vid) return;
    const target = STORY_STAGES.find((s) => s.stage === stageNum);
    if (target) {
      vid.currentTime = target.time;
      vid.play().catch(() => {});
      setCurrentStage(stageNum);
      setIsPaused(false);
      showToast(`🎬 Story Chapter ${stageNum}: ${target.short}`);
    }
  };

  const nextStage = () => {
    const next = (currentStage === 4 ? 1 : currentStage + 1) as 1 | 2 | 3 | 4;
    jumpToStage(next);
  };

  const prevStage = () => {
    const prev = (currentStage === 1 ? 4 : currentStage - 1) as 1 | 2 | 3 | 4;
    jumpToStage(prev);
  };

  const replayZoom = () => {
    setHasUserInteracted(true);
    jumpToStage(1);
    showToast("🛰️ Reset to Orbit: Commencing Satellite Scan & Zoom");
    setTimeout(() => {
      handleInitiateZoom();
    }, 2400);
  };

  const handleResumePlayback = () => {
    const vid = droneVideoRef.current;
    if (!vid) return;
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
    vid.currentTime = 4.6;
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
    window.addEventListener("touchmove", onTouchMove, { passive: true });
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

      const finalX = targetX + driftX;
      const finalY = targetY + driftY;

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
        {currentStage === 1 && (
          <div className="absolute inset-0 w-full h-full transition-opacity duration-700 opacity-100">
            <EarthGlobe3D
              onInitiateZoom={handleInitiateZoom}
              isZooming={isZooming}
            />
          </div>
        )}

        {/* Stages 2-4: Master Story Video (Hyper-Zoom into India -> Cosmic Portal -> SLIET Campus) */}
        <video
          ref={droneVideoRef}
          autoPlay={false}
          muted={!audioActive}
          playsInline
          preload="auto"
          onTimeUpdate={handleDroneTimeUpdate}
          onEnded={handleDroneEnded}
          poster="/videos/hero/techfest-story-poster.jpg?v=3"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            currentStage !== 1 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Mobile receives ultra-lightweight 720p master stream (~1.9 MB) */}
          <source
            src="/videos/hero/techfest-story-master-720p.mp4?v=3"
            media="(max-width: 768px)"
            type="video/mp4"
          />
          {/* Desktop receives crisp 1080p master stream (~5.2 MB) */}
          <source src="/videos/hero/techfest-story-master-1080p.mp4?v=3" type="video/mp4" />
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
      <div className="absolute inset-y-0 left-0 w-full sm:w-[52%] md:w-[44%] bg-gradient-to-r from-[#020817]/90 via-[#020817]/40 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#020817]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020817]/85 to-transparent pointer-events-none z-10" />

      {/* Stage 1: Active Satellite Orbiting Earth & Scanning India */}
      {currentStage === 1 && (
        <OrbitalSatelliteView
          onInitiateZoom={handleInitiateZoom}
          isZooming={isZooming}
        />
      )}

      {/* Stages 2-4: Clipart Badges (ISRO Satellite, Bharat Chakra, Tech Badges) */}
      {currentStage !== 1 && <HeroClipartBadges />}

      {/* ========================================================================= */}
      {/* 3. MOBILE-OPTIMIZED PROFESSIONAL NAVBAR & DRAWER                          */}
      {/* ========================================================================= */}
      <header
        ref={topNavRef}
        className="absolute top-0 left-0 right-0 z-30 px-4 sm:px-12 py-3 sm:py-4 flex items-center justify-between border-b border-white/10 bg-[#020817]/60 backdrop-blur-md transition-all duration-700 opacity-100 translate-y-0"
      >
        {/* Brand Mark */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.2)]">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 8.5L21.5 9.5L16.5 14.5L18 21.5L12 17.5L6 21.5L7.5 14.5L2.5 9.5L9.5 8.5L12 2Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] text-white uppercase font-mono">
              techFEST&apos;26
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] text-[#00D9FF]/80 uppercase font-mono">
              SLIET LONGOWAL
            </span>
          </div>
        </div>

        {/* Center: Desktop Nav Links (Hidden on Mobile) */}
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

        {/* Right Actions: Audio Toggle, Register CTA, & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Button */}
          <button
            onClick={toggleAudio}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer min-h-[36px]"
            title="Toggle Live Audio"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                audioActive ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"
              }`}
            />
            <span className="hidden xs:inline">{audioActive ? "SOUND ON" : "AUDIO"}</span>
            <span className="xs:hidden">{audioActive ? "🔊" : "🔇"}</span>
          </button>

          {/* Quick Register CTA */}
          <button
            onClick={() => {
              setSelectedEventForReg("");
              setActiveModal("register");
            }}
            className="px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full border border-[#00D9FF]/80 bg-[#06152D]/80 hover:bg-[#008CFF]/30 text-[11px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#00D9FF] hover:text-white shadow-[0_0_15px_rgba(0,217,255,0.25)] transition-all cursor-pointer min-h-[36px]"
          >
            REGISTER ↗
          </button>

          {/* Mobile Hamburger Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-lg border border-white/15 bg-white/5 flex flex-col items-center justify-center gap-1.5 text-white lg:hidden cursor-pointer active:bg-white/10"
            aria-label="Toggle Navigation Menu"
          >
            <span
              className={`w-4 h-[1.5px] bg-[#00D9FF] transition-all duration-200 ${
                mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-white transition-all duration-200 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-[#00D9FF] transition-all duration-200 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Slide-out Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[52px] sm:top-[60px] z-40 bg-[#020817]/95 backdrop-blur-2xl border-b border-[#00D9FF]/30 p-5 flex flex-col gap-3.5 shadow-2xl lg:hidden animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-[9px] font-mono tracking-widest text-[#00D9FF] uppercase">
            <span>// TECHFEST QUICK ACCESS</span>
            <span>09 • 10 OCT 2026</span>
          </div>

          <nav className="flex flex-col gap-2 font-mono text-xs tracking-wider">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal("events");
              }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 active:bg-[#00D9FF]/20 text-left text-neutral-200 hover:text-white"
            >
              <span>🏆 COMPETITIONS &amp; EVENTS</span>
              <span className="text-[#00D9FF]">↗</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal("schedule");
              }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 active:bg-[#00D9FF]/20 text-left text-neutral-200 hover:text-white"
            >
              <span>📅 FESTIVAL SCHEDULE</span>
              <span className="text-[#00D9FF]">↗</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal("tour");
              }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 active:bg-[#00D9FF]/20 text-left text-neutral-200 hover:text-white"
            >
              <span>🧭 SLIET CAMPUS TOUR</span>
              <span className="text-[#00D9FF]">↗</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownloadRulebook();
              }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 active:bg-[#00D9FF]/20 text-left text-neutral-200 hover:text-white"
            >
              <span>📄 OFFICIAL RULEBOOK</span>
              <span className="text-[10px] text-neutral-400">PDF</span>
            </button>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setSelectedEventForReg("");
              setActiveModal("register");
            }}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#008CFF] text-[#020817] font-mono text-xs font-bold tracking-[0.2em] shadow-[0_0_20px_rgba(0,217,255,0.4)] text-center mt-1"
          >
            REGISTER FOR TECHFEST&apos;26 →
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MAIN HERO CONTENT & STREAMLINED TELEMETRY PILL                         */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between pt-[max(4.5rem,env(safe-area-inset-top))] sm:pt-24 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-7 px-4 sm:px-12 pointer-events-none">
        {/* Top Floating Telemetry Pill (Minimalist Aerospace Status) */}
        <div className="w-full flex justify-end pointer-events-auto mt-1 sm:mt-0">
          <div
            ref={telemetryPillRef}
            className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/10 bg-[#020817]/80 backdrop-blur-md text-[8px] sm:text-[10px] font-mono text-neutral-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-700 opacity-100 translate-y-0"
          >
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500" />
            </span>
            <span
              ref={stageBadgeRef}
              className="text-emerald-400 font-bold tracking-wider"
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
              className="text-[#00D9FF] font-semibold tracking-wider"
            >
              {currentStage === 1 ? "35,786 KM" : "1,286 M"}
            </span>
          </div>
        </div>

        {/* Hero Left Column Typography & Primary Action */}
        <div
          ref={textGroupRef}
          style={{ willChange: "transform" }}
          className="max-w-xl space-y-2.5 sm:space-y-4 my-auto transition-all duration-700 opacity-100 translate-y-0"
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
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] font-sans drop-shadow-2xl">
              Where Ideas <br />
              Become{" "}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#7dd3fc] to-[#008CFF] drop-shadow-[0_0_25px_rgba(0,217,255,0.7)]">
                REALITY
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="hero-anim-item">
            <p className="text-xs sm:text-sm md:text-base font-light text-neutral-300 max-w-sm sm:max-w-md leading-relaxed drop-shadow-md">
              Technology and Sciences for a Sustainable Earth.
            </p>
          </div>

          {/* Date & Location */}
          <div className="hero-anim-item space-y-0.5">
            <p className="text-[11px] sm:text-sm font-mono tracking-[0.2em] sm:tracking-[0.3em] text-[#00D9FF] uppercase font-semibold">
              09 • 10 OCTOBER 2026
            </p>
            <p className="text-[9px] sm:text-xs font-mono tracking-[0.18em] sm:tracking-[0.2em] text-neutral-400 uppercase">
              SLIET LONGOWAL, PUNJAB
            </p>
          </div>

          {/* Clean Streamlined CTAs (Full-width on mobile for easy tapping) */}
          <div className="hero-anim-item pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pointer-events-auto">
            {currentStage === 1 ? (
              <>
                {/* Primary: Zoom to India Button */}
                <button
                  onClick={handleInitiateZoom}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#008CFF] active:scale-[0.98] hover:brightness-110 text-[#020817] font-mono text-xs sm:text-sm font-bold tracking-[0.16em] sm:tracking-[0.2em] shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-200 cursor-pointer min-h-[46px] sm:min-h-[48px] animate-pulse"
                >
                  <span>▶ ZOOM TO INDIA (SLIET)</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200 font-extrabold">
                    →
                  </span>
                </button>

                {/* Secondary: Register */}
                <button
                  onClick={() => {
                    setSelectedEventForReg("");
                    setActiveModal("register");
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-white/20 bg-white/5 active:scale-[0.98] hover:bg-white/10 text-white font-mono text-xs sm:text-sm tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-sm min-h-[46px] sm:min-h-[48px]"
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
                  className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#008CFF] active:scale-[0.98] hover:brightness-110 text-[#020817] font-mono text-xs sm:text-sm font-bold tracking-[0.16em] sm:tracking-[0.2em] shadow-[0_0_25px_rgba(0,217,255,0.4)] transition-all duration-200 cursor-pointer min-h-[46px] sm:min-h-[48px]"
                >
                  <span>REGISTER FOR TECHFEST&apos;26</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200 font-extrabold">
                    →
                  </span>
                </button>

                {/* Secondary Action Button */}
                <button
                  onClick={() => setActiveModal("events")}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-white/20 bg-white/5 active:scale-[0.98] hover:bg-white/10 text-white font-mono text-xs sm:text-sm tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-sm min-h-[46px] sm:min-h-[48px]"
                >
                  <span>EXPLORE EVENTS</span>
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

        {/* ========================================================================= */}
        {/* INTERACTIVE STORY MODE CONTROLLER (Chapters, Navigation & Captions)       */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-col gap-1.5 sm:gap-2 pointer-events-auto py-1 sm:py-2">
          {/* Story Narrative Caption & Current Chapter Status */}
          <div className="flex items-center justify-between gap-3 text-[10px] sm:text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
              <span className="text-[#00D9FF] font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                🎬 STORY MODE:
              </span>
              <span className="text-neutral-200 hidden sm:inline text-xs">
                {STORY_STAGES[currentStage - 1].caption}
              </span>
              <span className="text-neutral-200 sm:hidden text-[10px]">
                {STORY_STAGES[currentStage - 1].short} • {STORY_STAGES[currentStage - 1].alt}
              </span>
            </div>

            {/* Next & Prev Chapter Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevStage}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 border border-white/15 flex items-center justify-center text-xs text-neutral-300 hover:text-white cursor-pointer transition-all"
                title="Previous Story Chapter"
              >
                ◀
              </button>
              <button
                onClick={nextStage}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 border border-white/15 flex items-center justify-center text-xs text-[#00D9FF] hover:text-white cursor-pointer transition-all"
                title="Next Story Chapter"
              >
                ▶
              </button>
            </div>
          </div>

          {/* 4 Interactive Story Chapter Cards / Progress Trackers */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
            {STORY_STAGES.map((s) => {
              const isActive = currentStage === s.stage;
              return (
                <button
                  key={s.stage}
                  onClick={() => jumpToStage(s.stage)}
                  className={`group flex flex-col p-1.5 sm:p-2.5 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#00D9FF]/15 border-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.3)]"
                      : "bg-black/40 hover:bg-white/5 border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Progress Indicator Bar */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1 sm:mb-1.5">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isActive
                          ? "w-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]"
                          : currentStage > s.stage
                          ? "w-full bg-white/40"
                          : "w-0"
                      }`}
                    />
                  </div>

                  <span
                    className={`font-mono text-[8px] sm:text-[10px] font-bold tracking-wider truncate ${
                      isActive ? "text-[#00D9FF]" : "text-neutral-400 group-hover:text-white"
                    }`}
                  >
                    <span className="sm:inline hidden">{s.label}</span>
                    <span className="sm:hidden">{s.short}</span>
                  </span>

                  <span className="text-[7px] sm:text-[9px] font-mono text-neutral-400 hidden xs:inline">
                    {s.alt}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Clean Scroll Prompt & Watermark */}
        <div className="w-full flex items-center justify-between pt-2.5 sm:pt-4 border-t border-white/5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <div
            ref={scrollIndicatorRef}
            className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.3em] text-neutral-400 uppercase transition-opacity duration-700 opacity-100"
          >
            <span className="w-3 sm:w-4 h-[1px] bg-[#00D9FF]/60" />
            <span>SCROLL TO EXPLORE ↓</span>
          </div>

          <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase hidden sm:block">
            SANT LONGOWAL INSTITUTE OF ENGINEERING &amp; TECHNOLOGY
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
                  Join 10,000+ innovators at SLIET Longowal, Punjab on 09-10 October 2026.
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
    </div>
  );
}
