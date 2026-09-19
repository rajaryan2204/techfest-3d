"use client";

import React from "react";
import CinematicPortalHero from "@/components/prototype/CinematicPortalHero";
import EventsExhibition from "@/components/editorial/EventsExhibition";
import AboutEditorial from "@/components/editorial/AboutEditorial";
import WorkshopsEditorial from "@/components/editorial/WorkshopsEditorial";
import PronitesEditorial from "@/components/editorial/PronitesEditorial";
import SponsorsEditorial from "@/components/editorial/SponsorsEditorial";
import Footer from "@/components/editorial/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#020817] text-white select-none">
      {/* 1. Interactive 3D Orbit & Cinematic Story Hero (100vh) */}
      <CinematicPortalHero />

      {/* 2. Full Festival Content Below the Fold (Smoothly Scrollable) */}
      <div className="relative z-20 w-full bg-[#020817]">
        {/* Events & Competitions Exhibition */}
        <section id="events-section">
          <EventsExhibition />
        </section>

        {/* About SLIET & TechFEST Legacy */}
        <AboutEditorial />

        {/* Workshops & Technical Bootcamps */}
        <WorkshopsEditorial />

        {/* Pronites & Star Cultural Nights */}
        <PronitesEditorial />

        {/* Corporate & Tech Alliances */}
        <SponsorsEditorial />

        {/* Official SLIET TechFEST Footer */}
        <Footer />
      </div>
    </main>
  );
}
