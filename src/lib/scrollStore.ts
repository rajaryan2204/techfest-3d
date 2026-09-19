// High-performance scroll state store for 60fps WebGL & Three.js synchronization
// Zero React re-renders during scroll scrubbing

export interface ScrollState {
  targetProgress: number; // Raw scroll progress from GSAP ScrollTrigger (0..1)
  currentProgress: number; // Smoothed/damped progress used by Three.js
  velocity: number;
}

export const scrollStore: ScrollState = {
  targetProgress: 0,
  currentProgress: 0,
  velocity: 0,
};

export function setScrollProgress(progress: number, velocity: number = 0) {
  scrollStore.targetProgress = Math.max(0, Math.min(1, progress));
  scrollStore.velocity = velocity;
}
