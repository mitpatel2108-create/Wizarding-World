import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Particles } from "@/components/magic/Particles";
import { Stars } from "@/components/magic/Stars";
import { Fog } from "@/components/magic/Fog";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { EngravedLink } from "@/components/magic/EngravedButton";
import greatHallUrl from "@/assets/great-hall.jpg";
import castleUrl from "@/assets/castle-hero.jpg";

export const Route = createFileRoute("/hogwarts")({
  head: () => ({
    meta: [
      { title: "Hogwarts — The Castle" },
      { name: "description", content: "Walk the candle-lit corridors of an ancient magical castle. Towers, libraries, dungeons, and secrets." },
      { property: "og:title", content: "Hogwarts — The Castle" },
      { property: "og:description", content: "Explore an interactive map of the castle's halls and towers." },
    ],
  }),
  component: HogwartsPage,
});

interface Room { id: string; name: string; blurb: string; x: number; y: number; }

const ROOMS: Room[] = [
  { id: "tower",    name: "Astronomy Tower",     blurb: "Where stars confide secrets to those who climb.", x: 50, y: 12 },
  { id: "hall",     name: "The Great Hall",      blurb: "A thousand candles. A thousand seats waiting.",   x: 50, y: 56 },
  { id: "library",  name: "Restricted Library",  blurb: "Books that whisper. Books that bite.",            x: 78, y: 40 },
  { id: "stairs",   name: "Moving Staircases",   blurb: "They like to change their minds.",                 x: 28, y: 50 },
  { id: "dungeon",  name: "The Dungeons",        blurb: "Cold stone. Greener cold.",                        x: 22, y: 78 },
  { id: "forest",   name: "Forbidden Forest",    blurb: "Step softly. The trees are listening.",            x: 82, y: 78 },
];

function HogwartsPage() {
  return (<><Hero /><CastleMap /><GreatHall /><Corridors /></>);
}

function Hero() {
  return (
    <section className="relative h-[80svh] min-h-[520px] overflow-hidden pt-24">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${castleUrl})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.05_0.02_260)]/70 via-transparent to-[oklch(0.05_0.02_260)]" />
      <Stars count={120} />
      <Particles variant="ember" count={35} />
      <Fog />
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-[var(--gold)]/70">Founded 990 A.D.</p>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] text-gold">
          Hogwarts<br/>School of Witchcraft & Wizardry
        </h1>
        <RuneSeparator className="my-10" />
        <p className="max-w-2xl font-serif-magical text-xl italic text-[oklch(0.86_0.04_75)]/85">
          A castle older than memory. Hover the towers below — each window holds a story.
        </p>
      </div>
    </section>
  );
}

function CastleMap() {
  const [active, setActive] = useState<Room | null>(null);
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-[var(--gold)]/70">The Architecture</p>
          <h2 className="mt-4 font-display text-4xl text-gold md:text-5xl">A Living Map</h2>
        </div>
        <div className="relative mt-16 grid gap-12 md:grid-cols-[1.6fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden border border-[var(--gold)]/30 shadow-arcane">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${castleUrl})`, filter: "brightness(0.7) contrast(1.05)" }} />
            <div className="absolute inset-0 bg-[oklch(0.06_0.02_260)]/40" />
            <Particles variant="ember" count={20} />
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              {ROOMS.map((r) => (
                <g key={r.id} onMouseEnter={() => setActive(r)} onMouseLeave={() => setActive(null)} className="cursor-pointer">
                  <circle cx={r.x} cy={r.y} r="6" fill="transparent" />
                  <circle cx={r.x} cy={r.y} r="1.4" fill="oklch(0.78 0.16 60)"
                    style={{ filter: "drop-shadow(0 0 4px oklch(0.78 0.16 60))", animation: `flicker ${2 + (r.x % 3)}s ease-in-out infinite` }} />
                  <circle cx={r.x} cy={r.y} r={active?.id === r.id ? 5 : 3} fill="none" stroke="oklch(0.78 0.13 80)" strokeWidth="0.3"
                    style={{ transition: "r 0.4s ease-out" }} />
                </g>
              ))}
            </svg>
            {active && (
              <div className="pointer-events-none absolute z-10 max-w-[55%] -translate-x-1/2 -translate-y-[120%] border border-[var(--gold)]/50 bg-[oklch(0.05_0.02_260)]/95 px-4 py-3 text-left backdrop-blur"
                   style={{ left: `${active.x}%`, top: `${active.y}%` }}>
                <p className="font-display text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{active.name}</p>
                <p className="mt-1 font-serif-magical text-sm italic text-[oklch(0.86_0.04_75)]/85">{active.blurb}</p>
              </div>
            )}
          </div>
          <ul className="space-y-3">
            {ROOMS.map((r) => (
              <li key={r.id}>
                <button onMouseEnter={() => setActive(r)} onMouseLeave={() => setActive(null)}
                  className={`group flex w-full items-center justify-between border border-[var(--gold)]/20 px-5 py-4 text-left transition-all ${active?.id === r.id ? "border-[var(--gold)] bg-[var(--gold)]/5" : "hover:border-[var(--gold)]/60"}`}>
                  <div>
                    <p className="font-display text-sm uppercase tracking-[0.25em] text-[var(--gold)]">{r.name}</p>
                    <p className="mt-1 font-serif-magical text-sm italic text-[oklch(0.85_0.04_75)]/70">{r.blurb}</p>
                  </div>
                  <span className="font-display text-xs text-[var(--gold)] opacity-50 transition-opacity group-hover:opacity-100">→</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function GreatHall() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[100svh] min-h-[600px] bg-cover bg-center" style={{ backgroundImage: `url(${greatHallUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.05_0.02_260)]/95 via-[oklch(0.05_0.02_260)]/40 to-transparent" />
        <Particles variant="spark" count={40} />
        <div className="relative z-10 flex h-full items-center px-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-xl">
              <p className="font-display text-xs uppercase tracking-[0.4em] text-[var(--gold)]/70">Chapter II</p>
              <h2 className="mt-4 font-display text-5xl text-gold md:text-6xl">The Great Hall</h2>
              <RuneSeparator className="my-8" />
              <p className="font-serif-magical text-xl italic text-[oklch(0.88_0.04_75)]/90">
                A thousand candles drift in midair like soft amber stars. The ceiling forgets it is a ceiling, and remembers it is sky. The long tables wait for footsteps, and remember every name they hear.
              </p>
              <div className="mt-10"><EngravedLink to="/houses">Find Your Table</EngravedLink></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Corridors() {
  const cards = [
    { t: "Moving Staircases", d: "They turn while you climb. The trick is not to argue.", to: "/spells" as const },
    { t: "Restricted Section", d: "Books with chains. Books that listen back.", to: "/spells" as const },
    { t: "The Dungeons", d: "Cold stone, colder cauldrons. Greenest of greens.", to: "/potions" as const },
  ];
  return (
    <section className="relative px-6 py-32">
      <Particles variant="dust" count={20} />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-[var(--gold)]/70">Hidden Halls</p>
          <h2 className="mt-4 font-display text-4xl text-gold md:text-5xl">Wander Further</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.t} to={c.to}
              className="group relative block overflow-hidden border border-[var(--gold)]/25 p-8 transition hover:-translate-y-1 hover:border-[var(--gold)]/70"
              style={{ background: "linear-gradient(135deg, oklch(0.10 0.03 260), oklch(0.06 0.02 260))" }}>
              <h3 className="font-display text-xl text-[var(--gold)]">{c.t}</h3>
              <p className="mt-3 font-serif-magical text-base italic text-[oklch(0.85_0.04_75)]/80">{c.d}</p>
              <div className="mt-6 font-display text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]/70">Enter →</div>
              <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 100%, rgba(255,200,90,0.15), transparent 60%)" }} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
