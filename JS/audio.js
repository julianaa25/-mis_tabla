/**
 * audio.js - Sintetizador de efectos de sonido usando Web Audio API
 * Funciona de forma 100% nativa sin archivos externos, garantizando compatibilidad total offline.
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('misTablas_muted') === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('misTablas_muted', this.muted);
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.2, startDelay = 0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime + startDelay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(gainVal, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playClick() {
    this.playTone(600, 'sine', 0.08, 0.15);
  }

  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const startTime = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, startTime);
    osc.frequency.exponentialRampToValueAtTime(800, startTime + 0.1);

    gain.gain.setValueAtTime(0.2, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.1);
  }

  playCorrect() {
    // Acorde alegre brillante (Do - Mi - Sol - Do)
    this.playTone(523.25, 'triangle', 0.15, 0.2, 0.0);
    this.playTone(659.25, 'triangle', 0.15, 0.2, 0.08);
    this.playTone(783.99, 'triangle', 0.18, 0.22, 0.16);
    this.playTone(1046.50, 'triangle', 0.35, 0.25, 0.24);
  }

  playStar() {
    this.playTone(659.25, 'sine', 0.12, 0.2, 0.0);
    this.playTone(880.00, 'sine', 0.12, 0.2, 0.08);
    this.playTone(1174.66, 'sine', 0.3, 0.25, 0.16);
  }

  playWrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const startTime = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, startTime);
    osc.frequency.linearRampToValueAtTime(140, startTime + 0.25);

    gain.gain.setValueAtTime(0.18, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.28);
  }

  playFanfare() {
    // Melodía triunfal de victoria
    const notes = [
      { f: 523.25, d: 0.15, t: 0.00 },
      { f: 659.25, d: 0.15, t: 0.15 },
      { f: 783.99, d: 0.15, t: 0.30 },
      { f: 1046.50, d: 0.45, t: 0.45 }
    ];
    notes.forEach(n => this.playTone(n.f, 'triangle', n.d, 0.25, n.t));
  }
}

const sounds = new SoundManager();
