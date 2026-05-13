import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Stars } from "@/components/magic/Stars";
import { Particles } from "@/components/magic/Particles";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { EngravedButton } from "@/components/magic/EngravedButton";
import parchmentImg from "@/assets/parchment.jpg";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "The Marauder's Map — Wizarding World" },
      { name: "description", content: "I solemnly swear that I am up to no good. Watch ink bloom across the parchment and reveal the castle." },
      { property: "og:title", content: "The Marauder's Map — Wizarding World" },
      { property: "og:description", content: "An enchanted parchment that reveals every corridor and every footstep." },
    ],
  }),
  component: MapPage,
});

interface Footstep { id: number; name: string; x: number; y: number; }

const FOOTSTEPS: Footstep[] = [
  { id: 1, name: "Headmaster", x: 78, y: 22 },
  { id: 2, name: "Deputy", x: 30, y: 35 },
  { id: 3, name: "Potions Master", x: 22, y: 78 },
  { id: 4, name: "Keeper", x: 85, y: 80 },
  { id: 5, name: "Dreamer", x: 55, y: 50 },
];

function MapPage() {
  const [revealed, setRevealed] = useState(false);
  const [drift, setDrift] = useState(0);

  useEffect(() => {
    if (!revealed) return;
    const t = setInterval(() => setDrift((d) => d + 1), 1800);
    return () => clearInterval(t);
  }, [revealed]);

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24">
      <Stars count={60} />
      <Particles variant="dust" count={25} />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-[var(--gold)]/70">Messrs Moony, Wormtail, Padfoot & Prongs</p>
        <h1 className="mt-6 font-display text-5xl text-gold md:text-7xl">The Marauder's Map</h1>
        <RuneSeparator className="my-10" />
      </div>

      <div className="relative mx-auto mt-8 max-w-5xl px-6">
        <div className="relative aspect-[16/10] overflow-hidden border border-[var(--gold)]/40 shadow-arcane"
          style={{ backgroundImage: `url(${parchmentImg})`, backgroundSize: "cover" }}>
          {/* Aged overlay */}
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(60,30,5,0.5) 100%)" }} />

          {/* Folded creases */}
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[oklch(0.30_0.10_30)]/30" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[oklch(0.30_0.10_30)]/30" />

          {/* Map ink — animated reveal */}
          <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full"
            style={{
              clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 4s cubic-bezier(0.7, 0, 0.3, 1)",
              filter: "drop-shadow(0 0 1px oklch(0.20 0.10 30))",
            }}>
            <g fill="none" stroke="oklch(0.22 0.10 30)" strokeWidth="1.6" strokeLinecap="round">
              {/* Castle outline */}
              <path d="M120 380 L120 220 L200 220 L200 160 L260 160 L260 100 L340 100 L340 60 L460 60 L460 100 L540 100 L540 160 L600 160 L600 220 L680 220 L680 380 Z" />
              {/* Towers */}
              <rect x="140" y="260" width="40" height="100" />
              <rect x="220" y="200" width="40" height="160" />
              <rect x="380" y="120" width="40" height="240" />
              <rect x="540" y="200" width="40" height="160" />
              <rect x="620" y="260" width="40" height="100" />
              {/* Tower tops */}
              <path d="M140 260 L160 230 L180 260 M220 200 L240 170 L260 200 M380 120 L400 80 L420 120 M540 200 L560 170 L580 200 M620 260 L640 230 L660 260" />
              {/* Windows */}
              {[155, 235, 395, 555, 635].map((x, i) =>
                Array.from({ length: 4 }).map((_, k) => (
                  <rect key={`${i}-${k}`} x={x} y={290 + k * 18} width="10" height="8" fill="oklch(0.30 0.12 30)" />
                ))
              )}
              {/* Bridge */}
              <path d="M120 380 Q400 460 680 380" />
              {/* Lake */}
              <path d="M60 440 Q400 500 740 440 Q740 480 400 480 Q60 480 60 440" fill="oklch(0.30 0.08 30)" opacity="0.15" />
              {/* Path lines */}
              <path d="M260 100 L260 60 L380 30 L500 30 L540 60" strokeDasharray="4 6" />
              {/* Compass */}
              <g transform="translate(720,90)">
                <circle r="22" />
                <path d="M0 -18 L4 0 L0 6 L-4 0 Z" fill="oklch(0.22 0.10 30)" />
                <text textAnchor="middle" y="-26" fontSize="10" fill="oklch(0.22 0.10 30)" fontFamily="serif">N</text>
              </g>
              {/* Title */}
              <text x="400" y="430" textAnchor="middle" fontSize="22" fontFamily="serif" fontStyle="italic" fill="oklch(0.22 0.10 30)">
                Hogwarts School of Witchcraft & Wizardry
              </text>
            </g>
          </svg>
          <div className="absolute top-20 left-20 cursor-pointer hover:scale-110 transition duration-300">
  <div className="rounded-full border border-[var(--gold)]/40 bg-black/40 px-4 py-2 backdrop-blur-md">
    <p className="font-display text-sm uppercase tracking-[0.3em] text-[var(--gold)]">
      Great Hall
    </p>
  </div>
</div>

<div className="absolute bottom-20 right-20 cursor-pointer hover:scale-110 transition duration-300">
  <div className="rounded-full border border-[var(--gold)]/40 bg-black/40 px-4 py-2 backdrop-blur-md">
    <p className="font-display text-sm uppercase tracking-[0.3em] text-[var(--gold)]">
      Forbidden Forest
    </p>
  </div>
          {/* Footsteps (after reveal) */}  
          
          {revealed && FOOTSTEPS.map((f) => {
            const dx = Math.sin((drift + f.id) * 1.3) * 1.2;
            const dy = Math.cos((drift + f.id) * 0.9) * 1.2;
            return (
              <div
                key={f.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-[1800ms] ease-in-out"
                style={{ left: `${f.x + dx}%`, top: `${f.y + dy}%` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 -z-10 h-8 w-8 -translate-x-2 -translate-y-2 rounded-full"
                       style={{ background: "radial-gradient(circle, oklch(0.30 0.18 30 / 0.4), transparent 70%)" }} />
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="oklch(0.20 0.12 30)">
                    <ellipse cx="8" cy="14" rx="5" ry="6" />
                    <ellipse cx="8" cy="4" rx="2.5" ry="2.5" />
                    <circle cx="3" cy="9" r="1.2" />
                    <circle cx="13" cy="9" r="1.2" />
                  </svg>
                  <p className="mt-1 whitespace-nowrap font-serif-magical text-[11px] italic" style={{ color: "oklch(0.22 0.12 30)" }}>
                    {f.name}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Cover until revealed */}
          {!revealed && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
              <div className="text-center">
                <p className="font-serif-magical text-2xl italic text-[oklch(0.22_0.10_30)]/80">
                  Speak the words.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          {!revealed ? (
            <EngravedButton onClick={() => setRevealed(true)}>
              I solemnly swear that I am up to no good
            </EngravedButton>
          ) : (
            <EngravedButton onClick={() => setRevealed(false)}>Mischief Managed</EngravedButton>
          )}
        </div>
      </div>
    </section>
  );
}
