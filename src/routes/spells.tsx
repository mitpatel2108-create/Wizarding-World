import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Stars } from "@/components/magic/Stars";
import { Particles } from "@/components/magic/Particles";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { EngravedButton } from "@/components/magic/EngravedButton";
import parchmentImg from "@/assets/parchment.jpg";
import { useWizardProfile } from "@/hooks/useWizardProfile";

export const Route = createFileRoute("/spells")({
  head: () => ({
    meta: [
      { title: "The Spellbook — Wizarding World" },
      { name: "description", content: "Turn the pages of an ancient spellbook. Trace incantations of light, fire, and forgetting." },
      { property: "og:title", content: "The Spellbook — Wizarding World" },
      { property: "og:description", content: "Turn the pages of an ancient spellbook." },
    ],
  }),
  component: SpellsPage,
});

interface Spell {
  name: string;
  pronounce: string;
  type: string;
  effect: string;
  motion: string;
  story: string;
  glow: string;
  rune: string;
}

const SPELLS: Spell[] = [
  { name: "Lumos", pronounce: "LOO-mos", type: "Charm · Light", effect: "Ignites the wand-tip with a steady silver light.", motion: "A small clockwise circle.", story: "The first spell every child remembers. The corridor bends around the light.", glow: "oklch(0.92 0.04 80)", rune: "✦" },
  { name: "Expelliarmus", pronounce: "EK-spell-ee-AR-muss", type: "Charm · Disarming", effect: "A scarlet bolt that tears the wand from an opponent's hand.", motion: "Sharp upward flick.", story: "The signature of a duelist who refuses to kill.", glow: "oklch(0.70 0.20 25)", rune: "⚡" },
  { name: "Expecto Patronum", pronounce: "ex-PEK-toh pah-TROH-num", type: "Charm · Patronus", effect: "Conjures a guardian of pure silver light against despair.", motion: "Slow figure-eight, drawn from memory.", story: "Think of the happiest moment you have ever had. Then think of it harder.", glow: "oklch(0.86 0.12 220)", rune: "✺" },
  { name: "Wingardium Leviosa", pronounce: "win-GAR-dee-um levi-OH-sa", type: "Charm · Levitation", effect: "Lifts an object gently into the air.", motion: "Swish and flick.", story: "A first-year spell that won a friendship in a girls' bathroom.", glow: "oklch(0.82 0.10 200)", rune: "❉" },
  { name: "Alohomora", pronounce: "ah-LOH-ho-MOR-ah", type: "Charm · Unlocking", effect: "A whispered key. Tumblers fall in any common lock.", motion: "Three taps and a pull.", story: "Useful, until the door wanted to remain shut.", glow: "oklch(0.78 0.13 80)", rune: "❖" },
  { name: "Avada Kedavra", pronounce: "ah-VAH-dah keh-DAV-rah", type: "Curse · Unforgivable", effect: "A flash of green light. There is no countercurse.", motion: "A single, terrible slash.", story: "Spoken with intent — never with regret.", glow: "oklch(0.65 0.22 145)", rune: "✶" },
];

function SpellsPage() {
  const [i, setI] = useState(0);
  const [turning, setTurning] = useState<"next" | "prev" | null>(null);
  const spell = SPELLS[i];
  const { trackPageVisit } = useWizardProfile();                    // ← add
  useEffect(() => { trackPageVisit("spells"); }, []);               // ← add

  const turn = (dir: "next" | "prev") => {
    if (turning) return;
    setTurning(dir);
    setTimeout(() => {
      setI((prev) => (dir === "next" ? (prev + 1) % SPELLS.length : (prev - 1 + SPELLS.length) % SPELLS.length));
      setTurning(null);
    }, 600);
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24">
      <Stars count={70} />
      <Particles variant="dust" count={30} />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-[var(--gold)]/70">Volume I</p>
        <h1 className="mt-6 font-display text-5xl text-gold md:text-7xl">The Spellbook</h1>
        <RuneSeparator className="my-10" />
      </div>

      <div className="relative mx-auto mt-8 max-w-5xl px-6 [perspective:2200px]">
        <div className="relative mx-auto aspect-[3/2] w-full">
          {/* Book shadow */}
          <div className="absolute inset-x-10 -bottom-8 h-12 rounded-full bg-black/70 blur-2xl" />
          {/* Spine */}
          <div
            className="absolute left-1/2 top-0 z-20 h-full w-2 -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, oklch(0.18 0.04 60), oklch(0.06 0.02 60))", boxShadow: "0 0 30px rgba(0,0,0,0.7)" }}
          />
          {/* Left page */}
          <article className="absolute inset-y-0 left-0 w-1/2 overflow-hidden border-y border-l border-[var(--gold)]/30 p-10"
            style={{ backgroundImage: `url(${parchmentImg})`, backgroundSize: "cover", boxShadow: "inset -30px 0 60px -10px rgba(0,0,0,0.6), inset 0 0 80px rgba(60,30,5,0.25)" }}>
            <div className="flex h-full flex-col text-[var(--ink)]">
              <p className="font-display text-[10px] uppercase tracking-[0.4em] opacity-70">{spell.type}</p>
              <h2 className="mt-6 font-display text-5xl" style={{ color: "oklch(0.18 0.06 30)" }}>{spell.name}</h2>
              <p className="mt-2 font-serif-magical italic opacity-75">/{spell.pronounce}/</p>
              <div className="my-6 h-px w-24 bg-[var(--ink)]/40" />
              <p className="font-serif-magical text-lg leading-relaxed">{spell.effect}</p>
              <p className="mt-6 font-serif-magical text-base italic opacity-80">Wand motion — {spell.motion}</p>
              <div className="mt-auto pt-6 font-display text-[10px] uppercase tracking-[0.3em] opacity-60">
                Page {i * 2 + 1}
              </div>
            </div>
          </article>
          {/* Right page (turning) */}
          <article
            className="absolute inset-y-0 right-0 w-1/2 origin-left overflow-hidden border-y border-r border-[var(--gold)]/30 p-10 transition-transform duration-700 [transform-style:preserve-3d]"
            style={{
              backgroundImage: `url(${parchmentImg})`,
              backgroundSize: "cover",
              boxShadow: "inset 30px 0 60px -10px rgba(0,0,0,0.6), inset 0 0 80px rgba(60,30,5,0.25)",
              transform: turning === "next" ? "rotateY(-170deg)" : turning === "prev" ? "rotateY(10deg)" : "rotateY(0deg)",
            }}
          >
            <div className="flex h-full flex-col items-center justify-center text-center text-[var(--ink)]">
              <div className="font-display text-7xl opacity-30" style={{ color: "oklch(0.30 0.10 30)" }}>{spell.rune}</div>
              <p className="mt-8 max-w-xs font-serif-magical text-xl italic leading-relaxed">"{spell.story}"</p>
              <div
                aria-hidden
                className="mt-10 h-24 w-24 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${spell.glow} 0%, transparent 65%)`,
                  filter: "blur(4px)",
                  animation: "flicker 3s ease-in-out infinite",
                }}
              />
              <div className="mt-auto pt-6 font-display text-[10px] uppercase tracking-[0.3em] opacity-60">
                Page {i * 2 + 2}
              </div>
            </div>
          </article>
        </div>

        {/* Glow halo when casting */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{ background: `radial-gradient(ellipse at center, ${spell.glow}33 0%, transparent 60%)` }} />

        {/* Controls */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <EngravedButton onClick={() => turn("prev")}>‹ Previous</EngravedButton>
          <span className="font-display text-xs uppercase tracking-[0.4em] text-[var(--gold)]/60">
            {i + 1} / {SPELLS.length}
          </span>
          <EngravedButton onClick={() => turn("next")}>Next ›</EngravedButton>
        </div>

        {/* Index */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {SPELLS.map((s, idx) => (
            <button
              key={s.name}
              onClick={() => !turning && setI(idx)}
              className="border px-3 py-1 font-display text-[10px] uppercase tracking-[0.3em] transition-all"
              style={{
                borderColor: idx === i ? "var(--gold)" : "color-mix(in oklab, var(--gold) 25%, transparent)",
                color: idx === i ? "var(--gold)" : "color-mix(in oklab, var(--gold) 60%, transparent)",
                background: idx === i ? "color-mix(in oklab, var(--gold) 10%, transparent)" : "transparent",
              }}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
