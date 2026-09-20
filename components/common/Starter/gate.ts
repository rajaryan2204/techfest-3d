/**
 * Two-flag gate shared between the Starter UI and the intro animation:
 *  - landingLoaded: every landing-page asset has been downloaded (or errored)
 *  - introAtEnd:    the animation has reached its final "waiting" state
 *
 * The intro only dismisses itself once BOTH are true, and the Skip button
 * is only shown while the landing page is ready but the animation is still
 * running in the middle (so users can cut the rest of the intro short).
 */

type Listener = () => void;

let landingLoaded = false;
let introAtEnd = false;
const listeners = new Set<Listener>();

function notify() {
    listeners.forEach((cb) => cb());
}

export function markLandingLoaded() {
    if (landingLoaded) return;
    landingLoaded = true;
    notify();
}

export function markIntroAtEnd() {
    if (introAtEnd) return;
    introAtEnd = true;
    notify();
}

export function getGate() {
    return { landingLoaded, introAtEnd };
}

export function subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

/** Resolves as soon as the landing page is ready AND the intro is at its end. */
export function waitForGate(): Promise<void> {
    if (landingLoaded && introAtEnd) return Promise.resolve();
    return new Promise((resolve) => {
        let unsub: () => void = () => {};
        const check = () => {
            if (landingLoaded && introAtEnd) {
                unsub();
                resolve();
            }
        };
        unsub = subscribe(check);
    });
}
