/**
 * Warms the browser cache for every asset the landing page (/) needs, so
 * that by the time the intro animation finishes, the page underneath can
 * paint instantly without any further network requests.
 *
 * The intro waits for `landingAssetsReady` before dismissing itself; the
 * Skip button is only shown once this has resolved (or timed out).
 */

const IMAGE_ASSETS: string[] = [
    // Navbar
    "/logo/techfest.webp",
    // Logo reveal (CSS mask images)
    "/logo/techfest-mobile.svg",
    "/logo/26-mobile.svg",
    "/logo/techfest26.svg",
    "/logo/techfest26-mobile.svg",
    // Event domains
    "/domain/robozar.webp",
    "/domain/plexus.webp",
    "/domain/karyarachna.webp",
    "/domain/kermis.webp",
    "/domain/electrica.webp",
    "/domain/mechanica.webp",
    // Sponsor marquee
    "/sponsor/current/oppo.svg",
    "/sponsor/current/unstop.svg",
    "/sponsor/current/rrp.svg",
    "/sponsor/current/amysoul.svg",
    "/sponsor/current/techcadd.svg",
    "/sponsor/current/iotawater.svg",
    "/sponsor/current/burrah.svg",
    "/sponsor/previous/bonn.svg",
    "/sponsor/previous/microsoft.svg",
    "/sponsor/previous/coca-cola.svg",
    "/sponsor/previous/unacademy.svg",
    "/sponsor/previous/proton.svg",
    "/sponsor/previous/beyond-snack.svg",
    "/sponsor/previous/hero.svg",
    "/sponsor/previous/red-fm.svg",
    // FAQ section
    "/header/about.webp",
    // Footer
    "/events/header/sliet.svg",
    "/logo/techfest-text.svg",
    "/header/footer.svg",
];

const VIDEO_ASSETS: string[] = [
    "/home/background.mp4",
];

// If anything stalls (never loads/errors), stop waiting after this long so
// the site can never be blocked by a hung request.
const FALLBACK_MS = 20_000;

let ready = false;
let readyPromise: Promise<void> | null = null;

function preloadImages(): Promise<void> {
    return Promise.all(
        IMAGE_ASSETS.map(
            (src) =>
                new Promise<void>((resolve) => {
                    const img = new window.Image();
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // a 404 shouldn't block the gate
                    img.src = src;
                })
        )
    ).then(() => undefined);
}

function preloadVideos(): Promise<void> {
    return Promise.all(
        VIDEO_ASSETS.map((src) =>
            fetch(src)
                .then((res) => {
                    if (!res.ok) throw new Error(src);
                    return res.arrayBuffer();
                })
                .then(() => undefined)
                .catch(() => undefined)
        )
    ).then(() => undefined);
}

/**
 * Starts warming the cache. Safe to call more than once — it's a no-op
 * after the first call. Resolves when every asset has loaded or errored,
 * or after the fallback timeout.
 */
export function preloadLandingAssets(): Promise<void> {
    if (readyPromise) return readyPromise;

    const work = Promise.all([preloadImages(), preloadVideos()]).then(() => {
        ready = true;
    });

    readyPromise = Promise.race([
        work,
        new Promise<void>((resolve) => {
            window.setTimeout(() => {
                ready = true;
                resolve();
            }, FALLBACK_MS);
        }),
    ]);

    return readyPromise;
}

export function isLandingReady(): boolean {
    return ready;
}
