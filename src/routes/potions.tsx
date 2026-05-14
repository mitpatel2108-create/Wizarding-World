import { createFileRoute } from "@tanstack/react-router";
import { useState , useRef } from "react";
import { Stars } from "@/components/magic/Stars";
import { Particles } from "@/components/magic/Particles";
import { Fog } from "@/components/magic/Fog";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { EngravedButton } from "@/components/magic/EngravedButton";

export const Route = createFileRoute("/potions")({
  head: () => ({
    meta: [
      { title: "Potions — Wizarding World" },
      { name: "description", content: "Choose three ingredients. Stir the cauldron. Discover what brews from your intention." },
      { property: "og:title", content: "Potions — Wizarding World" },
      { property: "og:description", content: "Brew a potion from luminous, living ingredients." },
    ],
  }),
  component: PotionsPage,
});

interface Ingredient { id: string; name: string; color: string; tag: "love" | "courage" | "wit" | "shadow" | "luck" | "calm"; note: string; }

const INGREDIENTS: Ingredient[] = [
  { id: "moondew", name: "Moondew", color: "oklch(0.85 0.10 220)", tag: "calm", note: "Gathered at the third night." },
  { id: "phoenix", name: "Phoenix Ash", color: "oklch(0.70 0.20 35)", tag: "courage", note: "Still warm to the touch." },
  { id: "veela", name: "Veela Hair", color: "oklch(0.86 0.13 85)", tag: "love", note: "Refuses to be held by the unkind." },
  { id: "raven", name: "Raven's Feather", color: "oklch(0.30 0.05 260)", tag: "wit", note: "Whispers when ground." },
  { id: "nightshade", name: "Nightshade", color: "oklch(0.40 0.18 320)", tag: "shadow", note: "Do not breathe the fume." },
  { id: "clover", name: "Four-Leaf Clover", color: "oklch(0.72 0.18 145)", tag: "luck", note: "Picked under a Tuesday rain." },
  { id: "starlight", name: "Bottled Starlight", color: "oklch(0.92 0.06 240)", tag: "wit", note: "Pours like cold honey." },
  { id: "ember", name: "Salamander Ember", color: "oklch(0.78 0.18 50)", tag: "courage", note: "Burns only the dishonest." },
];

const RECIPES: { match: Ingredient["tag"][]; name: string; line: string; color: string }[] = [
  { match: ["love"], name: "Amortentia", line: "It smells like everything you have ever wanted.", color: "oklch(0.78 0.14 0)" },
  { match: ["courage"], name: "Wiggenweld", line: "Warmth blooms in the chest. The world feels possible.", color: "oklch(0.72 0.18 60)" },
  { match: ["wit"], name: "Wit-Sharpener", line: "Three thoughts arrive where one used to live.", color: "oklch(0.78 0.10 220)" },
  { match: ["shadow"], name: "Draught of Living Death", line: "The cauldron stills. Even the candles forget to flicker.", color: "oklch(0.30 0.10 280)" },
  { match: ["luck"], name: "Felix Felicis", line: "Liquid luck. The room tilts kindly toward you.", color: "oklch(0.84 0.16 90)" },
  { match: ["calm"], name: "Calming Draught", line: "Your shoulders lower. The night opens its hand.", color: "oklch(0.84 0.10 200)" },
];

function PotionsPage() {
  const [picked, setPicked] = useState<string[]>([]);
  const [brewed, setBrewed] = useState<typeof RECIPES[0] | null>(null);
  const [brewing, setBrewing] = useState(false);

  const toggle = (id: string) => {
    if (brewing) return;
    setBrewed(null);
    setPicked((p) => p.includes(id) ? p.filter((x) => x !== id) : p.length >= 3 ? p : [...p, id]);
  };

  const brew = () => {
    if (picked.length !== 3) return;
    setBrewing(true);
    setTimeout(() => {
      const tags = picked.map((id) => INGREDIENTS.find((i) => i.id === id)!.tag);
      const counts = tags.reduce<Record<string, number>>((a, t) => ((a[t] = (a[t] || 0) + 1), a), {});
      const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Ingredient["tag"];
      setBrewed(RECIPES.find((r) => r.match.includes(dominant))!);
      setBrewing(false);
    }, 1800);
  };

  const reset = () => { setPicked([]); setBrewed(null); };

  const cauldronColor = brewed?.color
    ?? (picked.length > 0 ? INGREDIENTS.find((i) => i.id === picked[picked.length - 1])!.color : "oklch(0.35 0.10 160)");

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24">
      <Stars count={60} />
      <Fog />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-[var(--gold)]/70">Laboratory</p>
        <h1 className="mt-6 font-display text-5xl text-gold md:text-7xl">The Cauldron Room</h1>
        <RuneSeparator className="my-10" />
        <p className="mx-auto max-w-2xl font-serif-magical text-xl italic text-[oklch(0.86_0.04_75)]/85">
          Choose three ingredients. The cauldron will tell you what your hands meant.
        </p>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Cauldron */}
        <div className="relative">
          <div className="relative mx-auto h-[460px] w-full max-w-md">
            {/* Glow */}
            <div className="absolute inset-0 -z-10 opacity-70"
              style={{ background: `radial-gradient(ellipse at center 60%, ${cauldronColor}55 0%, transparent 60%)`, filter: "blur(20px)", transition: "background 1s" }} />
            {/* Cauldron shape */}
            <svg viewBox="0 0 400 460" className="absolute inset-0 h-full w-full">
              <defs>
                <radialGradient id="liquid" cx="50%" cy="35%" r="55%">
                  <stop offset="0%" stopColor={cauldronColor} stopOpacity="1" />
                  <stop offset="100%" stopColor={cauldronColor} stopOpacity="0.5" />
                </radialGradient>
                <linearGradient id="iron" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.22 0.02 60)" />
                  <stop offset="100%" stopColor="oklch(0.05 0.01 60)" />
                </linearGradient>
              </defs>
              {/* Liquid surface ellipse */}
              <ellipse cx="200" cy="170" rx="150" ry="22" fill="url(#liquid)">
                <animate attributeName="ry" values="22;26;22" dur="3s" repeatCount="indefinite" />
              </ellipse>
              {/* Cauldron body */}
              <path d="M50 170 Q50 380 200 410 Q350 380 350 170 L340 170 Q330 360 200 388 Q70 360 60 170 Z" fill="url(#iron)" stroke="oklch(0.10 0.01 60)" strokeWidth="2" />
              {/* Rim */}
              <ellipse cx="200" cy="170" rx="160" ry="20" fill="none" stroke="oklch(0.30 0.04 60)" strokeWidth="3" />
              {/* Rivets */}
              {[80, 200, 320].map((x) => <circle key={x} cx={x} cy="200" r="4" fill="oklch(0.40 0.05 60)" />)}
            </svg>
            {/* Bubbles & smoke */}
            <div className="pointer-events-none absolute inset-x-0 top-[120px] h-[80px] overflow-visible">
              <Particles variant={brewing ? "spark" : "dust"} count={brewing ? 60 : 25} />
            </div>
            {brewing && (
              <div className="pointer-events-none absolute inset-x-0 -top-20 h-40">
                <Fog />
              </div>
            )}
          </div>

          {/* Result */}
          <div className="mx-auto mt-8 max-w-md text-center">
            {brewed ? (
              <div className="animate-[flicker_4s_ease-in-out_infinite]">
                <p className="font-display text-[10px] uppercase tracking-[0.5em]" style={{ color: brewed.color }}>Brewed</p>
                <h3 className="mt-3 font-display text-4xl" style={{ color: brewed.color, textShadow: `0 0 30px ${brewed.color}` }}>{brewed.name}</h3>
                <p className="mt-3 font-serif-magical text-lg italic text-[oklch(0.86_0.04_75)]/85">"{brewed.line}"</p>
                <div className="mt-6"><EngravedButton onClick={reset}>Empty the Cauldron</EngravedButton></div>
              </div>
            ) : (
              <>
                <p className="font-serif-magical italic text-[var(--gold)]/60">
                  {picked.length === 0 ? "The cauldron waits." : `${picked.length} of 3 chosen.`}
                </p>
                <div className="mt-6">
                  <EngravedButton onClick={brew} disabled={picked.length !== 3 || brewing}>
                    {brewing ? "Brewing…" : "Stir & Brew"}
                  </EngravedButton>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Shelf */}
        <div>
          <p className="mb-6 font-display text-xs uppercase tracking-[0.4em] text-[var(--gold)]/70">The Shelf</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {INGREDIENTS.map((ing) => {
              const on = picked.includes(ing.id);
              return (
                <button
                  key={ing.id}
                  onClick={() => toggle(ing.id)}
                  className="group relative flex aspect-[2/3] flex-col items-center justify-end overflow-hidden border p-3 text-center transition-all duration-300"
                  style={{
                    borderColor: on ? ing.color : "color-mix(in oklab, var(--gold) 25%, transparent)",
                    background: "linear-gradient(180deg, oklch(0.10 0.02 260), oklch(0.06 0.02 260))",
                    boxShadow: on ? `0 0 30px ${ing.color}, inset 0 0 20px ${ing.color}55` : "none",
                    transform: on ? "translateY(-4px)" : "none",
                  }}
                >
                  {/* Bottle */}
                  <svg viewBox="0 0 60 100" className="h-3/5 w-auto">
                    <rect x="24" y="6" width="12" height="14" fill="oklch(0.20 0.03 60)" />
                    <path d="M18 24 Q18 40 14 50 Q12 80 30 90 Q48 80 46 50 Q42 40 42 24 Z"
                      fill={ing.color} opacity="0.85" stroke="oklch(0.85 0.05 80)" strokeWidth="0.6" />
                    <ellipse cx="22" cy="55" rx="3" ry="6" fill="white" opacity="0.25" />
                  </svg>
                  <p className="mt-2 font-display text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">{ing.name}</p>
                  <p className="font-serif-magical text-[11px] italic text-[oklch(0.85_0.04_75)]/60">{ing.note}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <BrewingGame />
    </section>
  );
}
// ADD AT THE BOTTOM OF potions.tsx, after line 184:

const BREW_STEPS = [
  { id: "heat", label: "Heat the Cauldron", icon: "🔥", color: "oklch(0.70 0.20 35)" },
  { id: "stir", label: "Stir Clockwise", icon: "🌀", color: "oklch(0.78 0.13 80)" },
  { id: "add", label: "Add Core Ingredient", icon: "✦", color: "oklch(0.85 0.10 220)" },
  { id: "wait", label: "Wait & Observe", icon: "⏳", color: "oklch(0.65 0.18 145)" },
  { id: "seal", label: "Seal the Vial", icon: "🧪", color: "oklch(0.84 0.16 90)" },
];

function BrewingGame() {
  const [shuffled, setShuffled] = useState(() =>
    [...BREW_STEPS].sort(() => Math.random() - 0.5)
  );
  const [order, setOrder] = useState<string[]>([]);
  const [result, setResult] = useState<"idle" | "success" | "fail">("idle");
  const [dragging, setDragging] = useState<string | null>(null);
  const [cauldronBubble, setCauldronBubble] = useState(false);
  const dragOver = useRef<string | null>(null);

  const reset = () => {
    setShuffled([...BREW_STEPS].sort(() => Math.random() - 0.5));
    setOrder([]);
    setResult("idle");
    setCauldronBubble(false);
  };

  const addStep = (id: string) => {
    if (order.includes(id) || result !== "idle") return;
    const newOrder = [...order, id];
    setOrder(newOrder);
    setCauldronBubble(true);
    setTimeout(() => setCauldronBubble(false), 600);

    if (newOrder.length === BREW_STEPS.length) {
      const correct = BREW_STEPS.map((s) => s.id);
      const isCorrect = newOrder.every((id, i) => id === correct[i]);
      setResult(isCorrect ? "success" : "fail");
    }
  };

  const removeStep = (id: string) => {
    const idx = order.indexOf(id);
    setOrder(order.slice(0, idx));
    setResult("idle");
  };

  return (
    <div className="mx-auto mt-16 max-w-3xl px-6">
      <div className="border border-[var(--gold)]/20 p-8" style={{ background: "oklch(0.06 0.025 260 / 0.8)" }}>
        <p className="font-display text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/60 text-center mb-2">
          Brewing Challenge
        </p>
        <h2 className="font-display text-2xl text-gold text-center">Order the Steps</h2>
        <p className="mt-2 font-serif-magical italic text-sm text-[var(--gold)]/50 text-center">
          Tap the steps in the correct brewing order
        </p>

        {/* Cauldron visual */}
        <div className="my-8 flex justify-center">
          <svg
            viewBox="0 0 120 90"
            className="w-36 h-28 transition-all duration-300"
            style={{ filter: cauldronBubble ? "drop-shadow(0 0 18px var(--gold))" : "none" }}
          >
            <ellipse cx="60" cy="30" rx="45" ry="10" fill="oklch(0.20 0.04 260)" stroke="var(--gold-soft)" strokeWidth="1" />
            <path d="M15 30 Q12 75 60 78 Q108 75 105 30 Z" fill="oklch(0.12 0.04 260)" stroke="var(--gold-soft)" strokeWidth="1" />
            {order.length > 0 && (
              <ellipse
                cx="60" cy="32" rx="40" ry="8"
                fill={BREW_STEPS.find(s => s.id === order[order.length - 1])?.color ?? "var(--gold)"}
                opacity="0.6"
              />
            )}
            {cauldronBubble && (
              <>
                <circle cx="45" cy="22" r="4" fill={BREW_STEPS.find(s => s.id === order[order.length - 1])?.color ?? "var(--gold)"} opacity="0.8" />
                <circle cx="70" cy="18" r="3" fill={BREW_STEPS.find(s => s.id === order[order.length - 1])?.color ?? "var(--gold)"} opacity="0.6" />
              </>
            )}
            <line x1="10" y1="28" x2="10" y2="65" stroke="var(--gold-soft)" strokeWidth="3" strokeLinecap="round" />
            <line x1="110" y1="28" x2="110" y2="65" stroke="var(--gold-soft)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Available steps */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {shuffled.map((step) => {
            const added = order.includes(step.id);
            return (
              <button
                key={step.id}
                onClick={() => added ? removeStep(step.id) : addStep(step.id)}
                className="flex flex-col items-center gap-2 border p-3 text-center transition-all duration-300"
                style={{
                  borderColor: added ? step.color : "color-mix(in oklab, var(--gold) 25%, transparent)",
                  background: added ? `${step.color}22` : "transparent",
                  opacity: added && order.indexOf(step.id) < order.length - 1 ? 0.4 : 1,
                }}
              >
                <span className="text-2xl">{step.icon}</span>
                <span className="font-display text-[9px] uppercase tracking-[0.2em]" style={{ color: added ? step.color : "var(--gold)" }}>
                  {step.label}
                </span>
                {added && (
                  <span className="font-display text-[8px] text-[var(--gold)]/50">
                    Step {order.indexOf(step.id) + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mt-6 flex items-center gap-2 justify-center">
          {BREW_STEPS.map((_, i) => (
            <div
              key={i}
              className="h-1 w-8 rounded-full transition-all duration-500"
              style={{
                background: i < order.length ? "var(--gold)" : "color-mix(in oklab, var(--gold) 15%, transparent)",
              }}
            />
          ))}
        </div>

        {/* Result */}
        {result === "success" && (
          <div className="mt-6 text-center">
            <p className="font-display text-base uppercase tracking-[0.3em] text-[var(--gold)] animate-flicker">
              ✦ Perfect Brew — The potion shimmers ✦
            </p>
            <button onClick={reset} className="mt-3 font-display text-[9px] uppercase tracking-[0.3em] text-[var(--gold)]/50 hover:text-[var(--gold)] transition-colors">
              Brew Again
            </button>
          </div>
        )}
        {result === "fail" && (
          <div className="mt-6 text-center">
            <p className="font-serif-magical text-base italic text-[oklch(0.55_0.22_25)]">
              The cauldron darkens. The order was wrong.
            </p>
            <button onClick={reset} className="mt-3 font-display text-[9px] uppercase tracking-[0.3em] text-[var(--gold)]/50 hover:text-[var(--gold)] transition-colors">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}