"use client";

import React from "react";
import CinematicPortalHero from "@/components/prototype/CinematicPortalHero";
import EventsExhibition from "@/components/editorial/EventsExhibition";
import EventDetailsModal from "@/components/editorial/EventDetailsModal";
import WorkshopsEditorial from "@/components/editorial/WorkshopsEditorial";
import PronitesEditorial from "@/components/editorial/PronitesEditorial";
import AboutEditorial from "@/components/editorial/AboutEditorial";
import HorizontalGallery from "@/components/editorial/HorizontalGallery";
import TeamEditorial from "@/components/editorial/TeamEditorial";
import FAQEditorial from "@/components/editorial/FAQEditorial";
import SponsorsEditorial from "@/components/editorial/SponsorsEditorial";
import Footer from "@/components/editorial/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-transparent text-white select-none relative">
      {/* 0. Interactive Domain & Event Details Modal (Opens on Click) */}
      <EventDetailsModal />

      {/* 1. Interactive 3D Orbit & Cinematic Story Hero (100vh) */}
      <CinematicPortalHero />

      {/* 2. Full Festival Content Below the Fold (100% Official Real Data Only) */}
      <div className="relative z-20 w-full bg-transparent overflow-hidden">
        {/* Events & Competitions Exhibition (13 Official Domains & 60+ Real Arenas) */}
        <section id="events-section" className="relative z-10">
          <EventsExhibition />
        </section>

        {/* Certified Technical Masterclasses & Hands-on Workshops */}
        <section id="workshops-section" className="relative z-10">
          <WorkshopsEditorial />
        </section>

        {/* Headline Pronites, Star Concerts & Comedy Gala */}
        <section id="pronites-section" className="relative z-10">
          <PronitesEditorial />
        </section>

        {/* About SLIET & TechFEST Legacy (100% Official Institution Facts) */}
        <div className="relative z-10">
          <AboutEditorial />
        </div>

        {/* Moments from TechFEST / Archival Gallery */}
        <div className="relative z-10">
          <HorizontalGallery />
        </div>

        {/* Organizing Team & Leadership (100% Official Faculty Patrons & Student Coordinators) */}
        <div className="relative z-10">
          <TeamEditorial />
        </div>

        {/* Frequently Asked Questions (Official Festival Guidelines & FAQs) */}
        <div className="relative z-10">
          <FAQEditorial />
        </div>

        {/* Corporate & Tech Alliances (Official Partners & Sponsors) */}
        <div className="relative z-10">
          <SponsorsEditorial />
        </div>

        {/* Official SLIET TechFEST Footer */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </main>
  );
}
