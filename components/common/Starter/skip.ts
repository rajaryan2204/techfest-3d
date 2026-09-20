export let skipped = false;

export function skipIntro() {
    skipped = true;
}

export function resetSkip() {
    skipped = false;
}