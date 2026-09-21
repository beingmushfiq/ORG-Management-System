"use client";

/**
 * Subtle Haptic & Audio Accents using the Web Audio API.
 * Completely zero external assets, lightweight, works reliably across all browsers.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = true;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("rsm-sound-enabled");
      this.enabled = stored !== null ? stored === "true" : true;
    }
  }

  private initCtx() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isEnabled() {
    return this.enabled;
  }

  public toggleSound(force?: boolean) {
    this.enabled = force !== undefined ? force : !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("rsm-sound-enabled", String(this.enabled));
    }
    return this.enabled;
  }

  /**
   * Crisp, soft micro-click chime for toggles, theme switches, or button taps
   */
  public playClick(freq = 600) {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore audio errors silently
    }
  }

  /**
   * Satisfying two-tone harmonic chime for successful drag-and-drop or reordering
   */
  public playReorderDrop() {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const now = ctx.currentTime;
      [523.25, 659.25].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.05, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.12);
      });
    } catch {}
  }

  /**
   * Harmonic resolution ratification chime (crystal chord)
   */
  public playRatification() {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const now = ctx.currentTime;
      // C5 - E5 - G5 - C6 celestial chord
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.06, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.5);
      });
    } catch {}
  }
}

export const soundEffects = new SoundEngine();
