// src/components/SoundToggle.tsx
// Place this in your layout/root component so it persists across pages.
// Uses Web Audio API — no external audio files needed.
// Generates a procedural fireplace ambience (crackling + low rumble).

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

// Generates soft crackling fire using Web Audio
function createFireAmbience(ctx: AudioContext): { stop: () => void } {
  const nodes: AudioNode[] = [];

  // Low rumble — filtered noise
  const rumbleBuffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  const rumbleData = rumbleBuffer.getChannelData(0);
  for (let i = 0; i < rumbleData.length; i++) {
    rumbleData[i] = (Math.random() * 2 - 1) * 0.4;
  }
  const rumbleSource = ctx.createBufferSource();
  rumbleSource.buffer = rumbleBuffer;
  rumbleSource.loop = true;
  const rumbleFilter = ctx.createBiquadFilter();
  rumbleFilter.type = "lowpass";
  rumbleFilter.frequency.value = 180;
  const rumbleGain = ctx.createGain();
  rumbleGain.gain.value = 0.06;
  rumbleSource.connect(rumbleFilter);
  rumbleFilter.connect(rumbleGain);
  rumbleGain.connect(ctx.destination);
  rumbleSource.start();
  nodes.push(rumbleSource);

  // Mid crackle — band-pass noise
  const crackleBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const crackleData = crackleBuffer.getChannelData(0);
  for (let i = 0; i < crackleData.length; i++) {
    crackleData[i] = Math.random() * 2 - 1;
  }
  const crackleSource = ctx.createBufferSource();
  crackleSource.buffer = crackleBuffer;
  crackleSource.loop = true;
  const crackleFilter = ctx.createBiquadFilter();
  crackleFilter.type = "bandpass";
  crackleFilter.frequency.value = 900;
  crackleFilter.Q.value = 0.8;
  const crackleGain = ctx.createGain();
  crackleGain.gain.value = 0.04;
  crackleSource.connect(crackleFilter);
  crackleFilter.connect(crackleGain);
  crackleGain.connect(ctx.destination);
  crackleSource.start();
  nodes.push(crackleSource);

  // Occasional pops
  function schedulePop() {
    const delay = 0.8 + Math.random() * 2.5;
    const osc = ctx.createOscillator();
    const popGain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = 80 + Math.random() * 120;
    popGain.gain.setValueAtTime(0, ctx.currentTime + delay);
    popGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + delay + 0.01);
    popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.12);
    osc.connect(popGain);
    popGain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.15);
    nodes.push(osc);
  }
  const popInterval = setInterval(schedulePop, 1200);

  return {
    stop: () => {
      clearInterval(popInterval);
      nodes.forEach((n) => {
        try { (n as AudioBufferSourceNode).stop?.(); } catch {}
        n.disconnect();
      });
    },
  };
}

export function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const fireRef = useRef<{ stop: () => void } | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !window.AudioContext) {
      setSupported(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (on) {
      fireRef.current?.stop();
      fireRef.current = null;
      ctxRef.current?.close();
      ctxRef.current = null;
      setOn(false);
    } else {
      try {
        const ctx = new AudioContext();
        ctxRef.current = ctx;
        fireRef.current = createFireAmbience(ctx);
        setOn(true);
      } catch {
        setSupported(false);
      }
    }
  }, [on]);

  if (!supported) return null;

  return (
    <motion.button
      onClick={toggle}
      title={on ? "Silence the fire" : "Light the fire"}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center border border-[#2a2a3a] hover:border-[#9b8760]/60 bg-[#080b16]/80 backdrop-blur-sm transition-colors duration-300 text-base"
    >
      {on ? (
        <motion.span
          key="on"
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          className="text-[#9b8760]"
        >
          🔥
        </motion.span>
      ) : (
        <motion.span
          key="off"
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          className="text-[#3a3020]"
        >
          🕯️
        </motion.span>
      )}
    </motion.button>
  );
}
