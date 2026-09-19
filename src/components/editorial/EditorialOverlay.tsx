"use client";

import React, { useEffect } from "react";
import { EDITORIAL_EVENTS } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import HeroSection from "./HeroSection";
import EventSectionItem from "./EventSectionItem";
import WorkshopsEditorial from "./WorkshopsEditorial";
import PronitesEditorial from "./PronitesEditorial";
import AboutEditorial from "./AboutEditorial";
import HorizontalGallery from "./HorizontalGallery";
import SponsorsEditorial from "./SponsorsEditorial";
import FAQEditorial from "./FAQEditorial";
import TeamEditorial from "./TeamEditorial";
import ContactSection from "./ContactSection";
import FinalRegistration from "./FinalRegistration";
import Footer from "./Footer";
import EventDirectoryBar from "@/components/events/EventDirectoryBar";

interface EditorialOverlayProps {
  progress: number;
}

export default function EditorialOverlay({ progress }: EditorialOverlayProps) {
  // Check for deep-linking URL parameter on initial mount (e.g. ?event=robozar)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const eventId = params.get("event");
      if (eventId) {
        eventStore.selectEventById(eventId);
      }
    }
  }, []);

  // Discrete, perfectly sequenced event envelopes for the 3D Exhibition (0.0 to 0.84)
  const eventRanges = [
    { start: 0.12, peakStart: 0.15, peakEnd: 0.21, end: 0.24 }, // 01 ROBOZAR
    { start: 0.24, peakStart: 0.27, peakEnd: 0.33, end: 0.36 }, // 02 PLEXUS
    { start: 0.36, peakStart: 0.39, peakEnd: 0.45, end: 0.48 }, // 03 KARYARACHNA
    { start: 0.48, peakStart: 0.51, peakEnd: 0.57, end: 0.60 }, // 04 KERMIS
    { start: 0.60, peakStart: 0.63, peakEnd: 0.69, end: 0.72 }, // 05 ELECTRICA
    { start: 0.72, peakStart: 0.75, peakEnd: 0.81, end: 0.84 }, // 06 MECHANICA
  ];

  const getEventOpacity = (index: number) => {
    // When user scrolls into document flow, never show fixed 3D overlays
    if (progress >= 0.84) return 0;

    const r = eventRanges[index];
    if (progress < r.start || progress > r.end) return 0;
    if (progress >= r.peakStart && progress <= r.peakEnd) return 1;
    if (progress < r.peakStart) {
      return (progress - r.start) / (r.peakStart - r.start);
    }
    return (r.end - progress) / (r.end - r.peakEnd);
  };

  return (
    <div className="relative w-full z-10">
      {/* Search & Category Filter Directory */}
      <EventDirectoryBar />

      {/* 1. Minimal Centered Hero (0.0 to 0.12) */}
      <HeroSection progress={progress} />

      {/* 2. 6 Sequential 3D Exhibition Event Sections (0.12 to 0.84) */}
      {EDITORIAL_EVENTS.map((event, idx) => {
        const opacity = getEventOpacity(idx);
        return (
          <EventSectionItem
            key={event.id}
            event={event}
            isActive={opacity > 0.5}
            opacity={opacity}
          />
        );
      })}

      {/* 3. Document Flow Sections: Starts ONLY after all 6 events are complete (mt-[700vh]) */}
      <div className="relative z-20 mt-[700vh] bg-[#070709] border-t border-white/10 space-y-32">
        <WorkshopsEditorial />
        <PronitesEditorial />
        <AboutEditorial />
        <HorizontalGallery />
        <SponsorsEditorial />
        <FAQEditorial />
        <TeamEditorial />
        <ContactSection />
        <FinalRegistration />
        <Footer />
      </div>

      {/* Bottom Telemetry Tracker */}
      <div className="fixed bottom-6 left-6 sm:left-12 z-30 pointer-events-none text-[9px] font-mono tracking-[0.3em] text-neutral-600 uppercase hidden sm:block">
        <span>SLIET TECHFEST'26 // SUSTAINABLE EARTH</span>
      </div>

      <div className="fixed bottom-6 right-6 sm:right-12 z-30 pointer-events-none text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase flex items-center gap-3">
        <span className="hidden sm:inline">INDEX //</span>
        <span className="text-white font-medium">
          {progress < 0.12
            ? "HERO"
            : progress < 0.24
            ? "01 ROBOZAR"
            : progress < 0.36
            ? "02 PLEXUS"
            : progress < 0.48
            ? "03 KARYARACHNA"
            : progress < 0.60
            ? "04 KERMIS"
            : progress < 0.72
            ? "05 ELECTRICA"
            : progress < 0.84
            ? "06 MECHANICA"
            : progress < 0.88
            ? "WORKSHOPS"
            : progress < 0.91
            ? "PRONITES"
            : progress < 0.94
            ? "ABOUT & GALLERY"
            : progress < 0.97
            ? "SPONSORS & FAQ"
            : progress < 0.99
            ? "TEAM & CONTACT"
            : "FINALE"}
        </span>
      </div>
    </div>
  );
}
