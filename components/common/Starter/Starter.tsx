"use client";

import { useEffect, useRef, useState } from "react";
import { startNoise } from "./noise";
import { startTimeline, skipTimeline } from "./timeline";
import { skipIntro } from "./skip";
import { getGate, markLandingLoaded, subscribe } from "./gate";
import { preloadLandingAssets } from "@/lib/preloadLandingAssets";
import Image from "next/image";

import './starter.css';

// Safety net: if an image stalls (never fires load/error), start the
// timeline anyway so the intro can never get stuck on a broken request.
const START_FALLBACK_MS = 5000;

export default function Starter() {
    const tvFrameRef = useRef<HTMLImageElement>(null);
    const linuxLogoRef = useRef<HTMLImageElement>(null);
    const previewRef = useRef<HTMLImageElement>(null);
    const startedRef = useRef(false);
    const [gate, setGate] = useState(getGate());

    useEffect(() => {
        // Warm the landing page's cache while the intro plays, and tell the
        // gate when it's done so the intro can finish.
        preloadLandingAssets().then(markLandingLoaded);
        return subscribe(() => setGate(getGate()));
    }, []);

    useEffect(() => {
        // The noise texture is a CSS background, not an <img>, so it can't be
        // gated via a DOM element — preload it explicitly with Image() and
        // treat it like the other critical assets (tv frame, linux logo,
        // website preview). The animation never starts before it's ready.
        const noisePreload = typeof window !== "undefined" ? new window.Image() : null;
        if (noisePreload) noisePreload.src = "/starter/noise.webp";

        const noiseEl = document.querySelector<HTMLElement>(".noise");

        let cleanupNoise: () => void = () => {};

        const criticalImages = [tvFrameRef.current, linuxLogoRef.current, previewRef.current]
            .filter((img): img is HTMLImageElement => img !== null);

        const allReady = () =>
            criticalImages.every((img) => img.complete) &&
            (noisePreload === null || noisePreload.complete);

        const start = () => {
            if (startedRef.current) return;
            startedRef.current = true;

            // Noise texture is downloaded — reveal the static and animate it.
            if (noiseEl) {
                noiseEl.style.opacity = "0.5";
                cleanupNoise = startNoise();
            }

            startTimeline();
        };

        // Images already in cache (or finished loading during preload) — go immediately.
        if (allReady()) {
            start();
            return () => cleanupNoise();
        }

        // Otherwise wait until every critical image has fired load/error.
        let settled = false;
        const check = () => {
            if (settled || !allReady()) return;
            settled = true;
            start();
        };

        criticalImages.forEach((img) => {
            img.addEventListener("load", check);
            img.addEventListener("error", check);
        });
        noisePreload?.addEventListener("load", check);
        noisePreload?.addEventListener("error", check);

        const fallback = window.setTimeout(() => {
            if (settled) return;
            settled = true;
            start();
        }, START_FALLBACK_MS);

        return () => {
            settled = true;
            criticalImages.forEach((img) => {
                img.removeEventListener("load", check);
                img.removeEventListener("error", check);
            });
            noisePreload?.removeEventListener("load", check);
            noisePreload?.removeEventListener("error", check);
            window.clearTimeout(fallback);
            cleanupNoise();
        };
    }, []);

    const handleSkip = () => {
        sessionStorage.setItem("intro-seen", "true");
        skipIntro();      // Stop terminal typing
        skipTimeline();   // Jump GSAP timeline to the end
    };

    // The Skip button only appears once the landing page is fully loaded
    // AND the animation is still playing — if the intro has already reached
    // its end, it auto-enters as soon as the landing page is ready.
    const showSkip = gate.landingLoaded && !gate.introAtEnd;

    return (
        <div className="starter">

            {showSkip && (
                <button
                    className="skip-intro"
                    onClick={handleSkip}
                >
                    Skip Intro
                </button>
            )}

            <div className="world">

                <div className="tv">

                    <div className="screen">

                        <div className="noise" style={{ opacity: 0 }}></div>

                        <div className="channels">
                            <div className="channel channel1"></div>
                            <div className="channel channel2"></div>
                            <div className="channel channel3"></div>
                        </div>

                        <div className="connected">
                            SYNC ACQUIRED
                        </div>

                        <div className="linux">

                            <Image
                                src="/starter/l.svg"
                                alt="Linux"
                                width={700}
                                height={686}
                                className="linux-logo"
                                ref={linuxLogoRef}
                                priority
                            />

                            <div className="linux-text">
                                Ubuntu 26.04 LTS
                            </div>

                        </div>

                        <div className="terminal">

                            <div className="terminal-header">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>

                                <span className="title">
                                    sagar@techfest:~/website
                                </span>
                            </div>

                            <div className="terminal-body">
                                <div className="line line1"></div>
                                <div className="line line2"></div>
                                <div className="line line3"></div>
                                <div className="line line4"></div>
                                <div className="line line5"></div>
                            </div>

                        </div>

                        <div className="browser">

                            <div className="browser-header">

                                <div className="browser-buttons">
                                    <span className="red"></span>
                                    <span className="yellow"></span>
                                    <span className="green"></span>
                                </div>

                                <div className="address-bar">
                                    https://techfest26.com
                                </div>

                            </div>

                            <div className="browser-content">

                                <Image
                                    src="/starter/home.webp"
                                    className="browser-preview"
                                    width={700}
                                    height={686}
                                    alt=""
                                    draggable={false}
                                    ref={previewRef}
                                    priority
                                />

                            </div>

                        </div>

                        <div className="scanlines"></div>

                        <div className="no-signal">
                            NO SIGNAL
                        </div>

                    </div>

                    <Image
                        src="/starter/tv.svg"
                        alt=""
                        width={700}
                        height={686}
                        className="tv-frame"
                        ref={tvFrameRef}
                        priority
                    />

                </div>

            </div>

        </div>
    );
}
