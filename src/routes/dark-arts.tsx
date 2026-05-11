import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Stars } from "@/components/magic/Stars";
import { Particles } from "@/components/magic/Particles";
import { Fog } from "@/components/magic/Fog";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { EngravedButton } from "@/components/magic/EngravedButton";

export const Route = createFileRoute("/dark-arts")({
  head: () => ({
    meta: [
      { title: "The Dark Arts — Wizarding World" },
      { name: "description", content: "A forbidden chamber. Trace the rune to enter — or turn back while the candles still burn." },
      { property: "og:title", content: "The Dark Arts — Wizarding World" },
      { property: "og:description", content: "Cross this threshold at your own peril. Black smoke gathers." },
    ],
  }),
  component: DarkArtsPage,
});

const RUNE_SEGMENTS = 5;

interface Curse { name: string; latin: string; whisper: string; warning: string; }

const CURSES: Curse[] = [
  { name: "The Cruciatus", latin: "Crucio", whisper: "A pain that has no bottom and no name.", warning: "It requires intent. The kindest hand cannot perform it." },
  { name: "The Imperius", latin: "Imperio", whisper: "A voice in your skull that wears your own face.", warning: "Resistance is possible — and rare." },
  { name: "The Killing Curse", latin: "Avada Kedavra", whisper: "A flash of green. The room forgets to breathe.", warning: "There is no countercurse. There is no second chance." },
];

function DarkArtsPage() {
  const [traced, setTraced] = useState<Set<number>>(new Set());
  const unlocked = traced.size === RUNE_SEGMENTS;

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24"
      style={{ background: "radial-gradient(ellipse at 50% 30%, oklch(0.10 0.06 25) 0%, oklch(0.03 0.02 0) 70%)" }}>
      <Stars count={40} />
      <Fog />

      {/* Lightning flickers */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 70% 10%, oklch(0.95 0.10 280 / 0.08), transparent 40%)",
          animation: "flicker 6s ease-in-out infinite",
        }} />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-[oklch(0.70_0.20_25)]/80">Forbidden</p>
        <h1 className="mt-6 font-display text-5xl md:text-7xl"
          style={{
            background: "linear-gradient(135deg, oklch(0.85 0.05 25), oklch(0.45 0.20 25), oklch(0.85 0.05 25))",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            filter: "drop-shadow(0 0 20px oklch(0.55 0.22 25 / 0.6))",
          }}>
          The Dark Arts
        </h1>
        <RuneSeparator className="my-10" />
        <p className="mx-auto max-w-2xl font-serif-magical text-xl italic text-[oklch(0.80_0.06_25)]/80">
          {unlocked ? "The seal is broken. The chamber listens." : "Five marks ring the door. Trace each one — if your hand is steady."}
        </p>
      </div>

      {/* Rune circle */}
      <div className="relative mx-auto mt-16 h-[420px] w-[420px] max-w-full">
        {/* Outer pulse */}
        <div className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, transparent 55%, oklch(0.35 0.20 25 / 0.35) 70%, transparent 80%)",
            animation: "rune-pulse 3s ease-in-out infinite",
          }} />
        <svg viewBox="0 0 400 400" className="relative h-full w-full">
          <g fill="none" stroke="oklch(0.55 0.20 25)" strokeWidth="1.4">
            <circle cx="200" cy="200" r="180" opacity="0.5" />
            <circle cx="200" cy="200" r="150" opacity="0.7" />
            <circle cx="200" cy="200" r="120" opacity="0.3" strokeDasharray="3 6" />
          </g>
          {Array.from({ length: RUNE_SEGMENTS }).map((_, i) => {
            const angle = (i / RUNE_SEGMENTS) * Math.PI * 2 - Math.PI / 2;
            const x = 200 + Math.cos(angle) * 165;
            const y = 200 + Math.sin(angle) * 165;
            const on = traced.has(i);
            return (
              <g key={i} transform={`translate(${x},${y})`}
                 style={{ cursor: "pointer" }}
                 onClick={() => !unlocked && setTraced((s) => new Set(s).add(i))}>
                <circle r="22" fill={on ? "oklch(0.45 0.22 25 / 0.4)" : "oklch(0.10 0.04 25 / 0.6)"}
                        stroke={on ? "oklch(0.85 0.18 25)" : "oklch(0.50 0.20 25)"} strokeWidth="1.5">
                  {on && <animate attributeName="r" values="22;28;22" dur="2s" repeatCount="indefinite" />}
                </circle>
                <text textAnchor="middle" y="6" fontFamily="serif" fontSize="20"
                      fill={on ? "oklch(0.95 0.12 25)" : "oklch(0.65 0.18 25)"}
                      style={{ filter: on ? "drop-shadow(0 0 8px oklch(0.65 0.22 25))" : "none" }}>
                  {["☥", "✶", "⚸", "☿", "♆"][i]}
                </text>
              </g>
            );
          })}
          {unlocked && (
            <text x="200" y="210" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="22"
                  fill="oklch(0.90 0.18 25)" style={{ filter: "drop-shadow(0 0 12px oklch(0.55 0.22 25))" }}>
              ENTER
            </text>
          )}
        </svg>
        <Particles variant="ember" count={unlocked ? 80 : 30} />
      </div>

      {/* Revealed curses */}
      <div className="relative mx-auto mt-20 max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-3"
             style={{ opacity: unlocked ? 1 : 0.15, filter: unlocked ? "none" : "blur(6px)", transition: "all 1.2s" }}>
          {CURSES.map((c, idx) => (
            <article key={c.name}
              className="relative overflow-hidden border border-[oklch(0.55_0.20_25)]/40 p-8"
              style={{
                background: "linear-gradient(180deg, oklch(0.10 0.06 25 / 0.85), oklch(0.04 0.02 25 / 0.95))",
                boxShadow: unlocked ? "0 30px 80px -20px oklch(0.30 0.20 25 / 0.6), inset 0 0 40px oklch(0.30 0.20 25 / 0.2)" : "none",
                animation: unlocked ? `flicker ${4 + idx}s ease-in-out infinite` : "none",
              }}>
              <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[oklch(0.70_0.20_25)]">Unforgivable {idx + 1}</p>
              <h3 className="mt-4 font-display text-3xl"
                  style={{ color: "oklch(0.92 0.10 25)", textShadow: "0 0 18px oklch(0.55 0.22 25)" }}>
                {c.name}
              </h3>
              <p className="mt-2 font-serif-magical italic text-[oklch(0.70_0.18_25)]/80">{c.latin}</p>
              <div className="my-5 h-px w-12 bg-[oklch(0.55_0.20_25)]/50" />
              <p className="font-serif-magical text-base italic text-[oklch(0.85_0.06_25)]/80">"{c.whisper}"</p>
              <p className="mt-4 font-display text-[10px] uppercase tracking-[0.3em] text-[oklch(0.65_0.18_25)]/70">
                {c.warning}
              </p>
            </article>
          ))}
        </div>

        {!unlocked && (
          <div className="mt-12 text-center">
            <EngravedButton onClick={() => setTraced(new Set())}>Step Back</EngravedButton>
          </div>
        )}
        {unlocked && (
          <div className="mt-12 text-center">
            <EngravedButton onClick={() => setTraced(new Set())}>Reseal the Door</EngravedButton>
          </div>
        )}
      </div>
    </section>
  );
}
