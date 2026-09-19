"use client";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private listeners: Set<(muted: boolean) => void> = new Set();

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isMuted));
  }

  public toggleSound(): boolean {
    if (this.isMuted) {
      this.startSound();
    } else {
      this.stopSound();
    }
    return this.isMuted;
  }

  public startSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      if (!this.masterGain) {
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 2.5);

        this.filter = this.ctx.createBiquadFilter();
        this.filter.type = "lowpass";
        this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);

        this.droneOsc1 = this.ctx.createOscillator();
        this.droneOsc1.type = "sine";
        this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

        this.droneOsc2 = this.ctx.createOscillator();
        this.droneOsc2.type = "triangle";
        this.droneOsc2.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 note

        this.droneOsc1.connect(this.filter);
        this.droneOsc2.connect(this.filter);
        this.filter.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);

        this.droneOsc1.start();
        this.droneOsc2.start();
      } else {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 1.5);
      }

      this.isMuted = false;
      this.notify();
    } catch {
      this.isMuted = true;
    }
  }

  public stopSound() {
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
    }
    this.isMuted = true;
    this.notify();
  }

  public playBeep(freq = 440, duration = 0.08) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }
}

export const audioEngine = new AudioEngine();
