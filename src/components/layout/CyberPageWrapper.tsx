"use client";

import React from "react";
import Footer from "@/components/editorial/Footer";

interface CyberPageWrapperProps {
  children: React.ReactNode;
  activeBadge?: string;
  title?: string;
  subtitle?: string;
}

export default function CyberPageWrapper({
  children,
  activeBadge,
  title,
  subtitle,
}: CyberPageWrapperProps) {
  return (
    <div className="w-full min-h-screen bg-transparent text-white flex flex-col justify-between selection:bg-[#00D9FF] selection:text-[#020817] relative z-10">
      {/* Main Page Content */}

      <main className="relative z-10 w-full flex-1 pt-24 sm:pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
        {(title || activeBadge) && (
          <div className="mb-8 sm:mb-12 space-y-3">
            {activeBadge && (
              <div className="cyber-badge">
                <span className="cyber-badge-dot" />
                <span>{activeBadge}</span>
              </div>
            )}
            {title && (
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase font-sans cyber-heading-gradient">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm sm:text-base text-neutral-300 max-w-3xl font-mono leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

