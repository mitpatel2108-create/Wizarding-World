import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { HOUSES, type House } from "@/data/houses";
import { Particles } from "@/components/magic/Particles";
import { Stars } from "@/components/magic/Stars";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { TiltCard } from "@/components/magic/TiltCard";
import { EngravedLink } from "@/components/magic/EngravedButton";

export const Route = createFileRoute("/houses")({
  head: () => ({
    meta: [
      { title: "The Four Houses — Wizarding World" },
      { name: "description", content: "Lion, Serpent, Eagle, Badger. Discover the four legendary houses and their ancient virtues." },
      { property: "og:title", content: "The Four Houses — Wizarding World" },
      { property: "og:description", content: "Discover Gryffindor, Slytherin, Ravenclaw, and Hufflepuff." },
    ],
  }),
  component: HousesPage,
});

function HousesPage() {
  const [hovered, setHovered] = useState<House | null>(null);
  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <Stars count={80} />
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-[var(--gold)]/70">The Sorting</p>
        <h1 className="mt-6 font-display text-5xl text-gold md:text-7xl">Four Houses, One Castle</h1>
        <RuneSeparator className="my-10" />
        <p className="mx-auto max-w-2xl font-serif-magical text-xl italic text-[oklch(0.86_0.04_75)]/85">
          Each house carries a thousand-year-old promise. Pass your hand over each crest — and feel which one warms.
        </p>
        <div className="mt-10"><EngravedLink to="/sorting-hat">Speak to the Sorting Hat</EngravedLink></div>
      </div>
      <div className="relative mx-auto mt-24 grid max-w-7xl gap-8 px-6 pb-24 md:grid-cols-2">
        {HOUSES.map((h) => (
          <HouseCard key={h.id} house={h} onHover={setHovered} active={hovered?.id === h.id} />
        ))}
      </div>
    </section>
  );
}

function HouseCard({ house, onHover, active }: { house: House; onHover: (h: House | null) => void; active: boolean }) {
  return (
    <TiltCard intensity={8}>
      <article onMouseEnter={() => onHover(house)} onMouseLeave={() => onHover(null)}
        className="relative h-[640px] overflow-hidden border border-[var(--gold)]/30 transition-all duration-500"
        style={{
          background: house.gradient,
          boxShadow: active ? `0 30px 100px -20px ${house.glow}, 0 0 60px -10px ${house.glow}` : "0 20px 60px -20px rgba(0,0,0,0.7)",
        }}>
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${house.image})`, opacity: active ? 0.85 : 0.55, transform: active ? "scale(1.06)" : "scale(1)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 30%, rgba(4,6,12,0.92) 100%)" }} />
        <Particles variant={house.particle} count={30} />
        <div className="absolute right-6 top-6 opacity-80 transition-all duration-700"
             style={{ transform: active ? "rotate(8deg) scale(1.1)" : "rotate(0) scale(1)" }}>
          <Emblem house={house} />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-10">
          <p className="font-display text-[10px] uppercase tracking-[0.5em]" style={{ color: house.glow }}>
            {house.element} · {house.animal}
          </p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl"
              style={{ color: house.text, textShadow: `0 0 30px ${house.glow}` }}>{house.name}</h2>
          <p className="mt-4 max-w-md font-serif-magical text-lg italic" style={{ color: house.text, opacity: 0.85 }}>
            {house.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[10px] uppercase tracking-[0.3em]"
               style={{ color: house.text, opacity: 0.7 }}>
            <span>Founder · {house.founder}</span>
            <span>Trait · {house.trait}</span>
            <span>Ghost · {house.ghost}</span>
          </div>
          <p className="mt-6 max-w-md font-serif-magical italic" style={{ color: house.glow }}>"{house.motto}"</p>
        </div>
      </article>
    </TiltCard>
  );
}

function Emblem({ house }: { house: House }) {
  const icons: Record<string, ReactNode> = {
    gryffindor: (<g>
      <path d="M50 30 C42 30 36 36 36 44 C36 52 40 56 40 60 L60 60 C60 56 64 52 64 44 C64 36 58 30 50 30 Z" />
      <path d="M40 60 L36 70 M50 60 L50 72 M60 60 L64 70" strokeWidth="1.5" />
      <circle cx="44" cy="42" r="1.5" fill="currentColor" />
      <circle cx="56" cy="42" r="1.5" fill="currentColor" />
    </g>),
    slytherin: (<g>
      <path d="M30 65 Q40 50 50 60 T70 50 Q60 45 50 50" />
      <circle cx="68" cy="50" r="1.5" fill="currentColor" />
    </g>),
    ravenclaw: (<g>
      <path d="M50 40 L35 55 Q50 50 65 55 L50 40 Z" />
      <path d="M50 40 L50 70" strokeWidth="1.5" />
      <path d="M40 70 L60 70" />
    </g>),
    hufflepuff: (<g>
      <ellipse cx="50" cy="55" rx="14" ry="10" />
      <path d="M40 50 L45 58 M60 50 L55 58 M50 50 L50 60" strokeWidth="1.2" />
      <circle cx="44" cy="52" r="1.2" fill="currentColor" />
      <circle cx="56" cy="52" r="1.2" fill="currentColor" />
    </g>),
  };
  return (
    <svg width="120" height="120" viewBox="0 0 100 100" style={{ color: house.glow, filter: `drop-shadow(0 0 12px ${house.glow})` }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d={house.emblemPath} />
        {icons[house.id]}
      </g>
    </svg>
  );
}
