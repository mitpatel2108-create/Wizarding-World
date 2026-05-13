import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Particles } from "@/components/magic/Particles";
import { Stars } from "@/components/magic/Stars";
import { Fog } from "@/components/magic/Fog";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import wandShopUrl from "@/assets/wand-shop.jpg";
import { useWizardProfile } from "@/hooks/useWizardProfile";
import WandGenerator from '@/components/magic/WandGenerator'

export const Route = createFileRoute("/wands")({
  head: () => ({
    meta: [
      { title: "Ollivanders — The Wand Shop" },
      { name: "description", content: "The wand chooses the wizard. Browse legendary wands of ancient wood and luminous magical cores." },
      { property: "og:title", content: "Ollivanders — The Wand Shop" },
      { property: "og:description", content: "Browse legendary wands of ancient wood and magical cores." },
    ],
  }),
  component: WandsPage,
});

interface Wand { name: string; wood: string; core: string; length: string; flex: string; description: string; hue: string; }

const WANDS: Wand[] = [
  { name: "The Elder", wood: "Elder", core: "Thestral Tail Hair", length: "15\"", flex: "Unyielding",
    description: "A wand of ancient power. It chooses only those who have stared death in the eye.", hue: "oklch(0.78 0.13 80)" },
  { name: "Holly Phoenix", wood: "Holly", core: "Phoenix Feather", length: "11\"", flex: "Pliable",
    description: "Warm to the touch, faintly humming. Brothers with another, far less kind.", hue: "oklch(0.68 0.16 60)" },
  { name: "Vine Dragon", wood: "Vine", core: "Dragon Heartstring", length: "10¾\"", flex: "Springy",
    description: "Reserved for those of hidden depths. Sparks green when truly pleased.", hue: "oklch(0.62 0.14 145)" },
  { name: "Hawthorn", wood: "Hawthorn", core: "Unicorn Hair", length: "10\"", flex: "Reasonably Springy",
    description: "Mysterious and contradictory. Loyal until the moment it isn't.", hue: "oklch(0.62 0.14 25)" },
  { name: "Walnut Dragon", wood: "Walnut", core: "Dragon Heartstring", length: "12¾\"", flex: "Unbending",
    description: "A wand for the cunning. Adapts to its master like still water.", hue: "oklch(0.55 0.10 80)" },
  { name: "Cherry Phoenix", wood: "Cherry", core: "Phoenix Feather", length: "12½\"", flex: "Solid",
    description: "Rare and proud. Believed to grant uncommon focus to those who can master it.", hue: "oklch(0.65 0.20 20)" },
];

function WandsPage() {
  const [active, setActive] = useState<Wand>(WANDS[0]);
  const { setWand } = useWizardProfile();  // ← add here
  return (
    <>
      <section className="relative h-[70svh] min-h-[480px] overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${wandShopUrl})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.05_0.02_260)]/60 via-transparent to-[oklch(0.05_0.02_260)]" />
        <Particles variant="spark" count={50} />
        <Stars count={40} />
        <Fog />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-xs uppercase tracking-[0.5em] text-[var(--gold)]/70">Est. 382 B.C.</p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,8vw,6rem)] text-gold">Ollivanders</h1>
          <p className="mt-6 max-w-xl font-serif-magical text-xl italic text-[oklch(0.88_0.04_75)]/90">
            "It is not the wizard who chooses the wand."
          </p>
        </div>
      </section>

      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-[var(--gold)]/70">The Collection</p>
            <h2 className="mt-4 font-display text-4xl text-gold md:text-5xl">Legendary Wands</h2>
            <RuneSeparator className="mx-auto my-10 max-w-md" />
            <WandGenerator />
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1.4fr]">
            <div className="relative aspect-square overflow-hidden border border-[var(--gold)]/30"
              style={{
                background: "radial-gradient(circle at 50% 50%, oklch(0.14 0.04 60) 0%, oklch(0.05 0.02 260) 70%)",
                boxShadow: `0 30px 80px -20px ${active.hue}66, inset 0 0 80px ${active.hue}22`,
              }}>
              <Particles variant="spark" count={30} />
              <WandSvg key={active.name} hue={active.hue} />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 border border-[var(--gold)]/50 px-6 py-3 text-center backdrop-blur"
                   style={{ background: "oklch(0.05 0.02 260 / 0.7)" }}>
                <p className="font-display text-[10px] uppercase tracking-[0.4em]" style={{ color: active.hue }}>
                  {active.wood} · {active.core}
                </p>
                <p className="mt-1 font-display text-xl text-[var(--gold)]">{active.name}</p>
              </div>
            </div>
            <div className="space-y-3">
              {WANDS.map((w) => (
                <button key={w.name} onClick={() => { setActive(w); setWand(`${w.name} · ${w.wood} · ${w.core}`); }} onMouseEnter={() => setActive(w)}
                  className={`group flex w-full items-start gap-5 border px-5 py-5 text-left transition-all ${
                    active.name === w.name ? "border-[var(--gold)] bg-[var(--gold)]/5 shadow-arcane" : "border-[var(--gold)]/20 hover:border-[var(--gold)]/60"
                  }`}>
                  <div className="relative mt-1 h-1 w-20 flex-shrink-0 rounded-full"
                    style={{ background: `linear-gradient(90deg, oklch(0.20 0.06 60), oklch(0.45 0.10 60), ${w.hue})`, boxShadow: `0 0 14px ${w.hue}` }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display text-base text-[var(--gold)]">{w.name}</p>
                      <p className="font-display text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/60">{w.length}</p>
                    </div>
                    <p className="mt-1 font-serif-magical text-sm italic text-[oklch(0.85_0.04_75)]/80">{w.description}</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-display text-[9px] uppercase tracking-[0.3em] text-[var(--gold)]/60">
                      <span>{w.wood}</span><span>·</span><span>{w.core}</span><span>·</span><span>{w.flex}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function WandSvg({ hue }: { hue: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative" style={{ animation: "float-slow 4s ease-in-out infinite" }}>
        <svg width="420" height="60" viewBox="0 0 420 60" className="drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="wandG" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="oklch(0.18 0.06 50)" />
              <stop offset="0.15" stopColor="oklch(0.30 0.08 60)" />
              <stop offset="0.6" stopColor="oklch(0.40 0.10 70)" />
              <stop offset="0.95" stopColor="oklch(0.55 0.12 75)" />
              <stop offset="1" stopColor={hue} />
            </linearGradient>
            <radialGradient id="tipG">
              <stop offset="0" stopColor={hue} stopOpacity="1" />
              <stop offset="1" stopColor={hue} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="10" y="26" width="40" height="8" rx="3" fill="oklch(0.18 0.06 50)" />
          <circle cx="14" cy="30" r="5" fill="oklch(0.25 0.08 60)" stroke={hue} strokeWidth="0.6" />
          <path d="M50 26 L405 28 L405 32 L50 34 Z" fill="url(#wandG)" />
          <circle cx="408" cy="30" r="22" fill="url(#tipG)" />
          <circle cx="408" cy="30" r="3" fill={hue} />
        </svg>
        <span className="absolute -right-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full"
          style={{ background: `radial-gradient(circle, ${hue}66, transparent 70%)`, animation: "flicker 2s ease-in-out infinite" }} />
      </div>
    </div>
  );
}
