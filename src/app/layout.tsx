import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070709",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "TechFEST'26 — SLIET",
  description:
    "Official website for TechFEST'26 at Sant Longowal Institute of Engineering & Technology (SLIET). Technology and Sciences for Sustainable Earth. 16—17 October 2026.",
  keywords: [
    "TechFEST'26",
    "TechFEST 2026",
    "SLIET TechFEST",
    "SLIET Longowal",
    "RoboZar",
    "Plexus",
    "Karyarachna",
    "Kermis",
    "Electrica",
    "Mechanica",
    "National Technical Fest India",
  ],
  authors: [{ name: "SLIET TechFEST Team" }],
  openGraph: {
    title: "TechFEST'26 — SLIET",
    description:
      "Welcome to TechFEST'26 at SLIET Longowal. A national-level celebration of technology, innovation, and sustainable engineering. 16—17 October 2026.",
    url: "https://www.techfest26.com",
    siteName: "TechFEST'26 SLIET",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechFEST'26 — SLIET",
    description:
      "Join us for TechFEST'26 – the ultimate technical and innovation fest of SLIET. 16—17 October 2026.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import RoboticCursor from "~/components/common/RoboticCursor/RoboticCursor";
import CyberTerminal from "~/components/common/CyberTerminal/CyberTerminal";
import CyberMatrixBackground from "@/components/common/CyberMatrixBackground";
import CyberNavbar from "@/components/navigation/CyberNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#01040f] scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full bg-[#01040f] text-white antialiased overflow-x-hidden relative`}
      >
        {/* Global Viewport-Locked Earth & Space Cosmic Background */}
        <CyberMatrixBackground
          opacity={0.95}
          showAtmosphere={true}
          showOrbits={true}
          showStars={true}
          showSatellites={true}
          showNebula={true}
        />
        {/* Global Unified CyberNavbar (Active on all pages) */}
        <CyberNavbar />
        <RoboticCursor />
        {children}
        <CyberTerminal />
      </body>
    </html>
  );
}


