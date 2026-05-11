import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Stars } from "@/components/magic/Stars";
import { Particles } from "@/components/magic/Particles";
import { Fog } from "@/components/magic/Fog";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { EngravedButton, EngravedLink } from "@/components/magic/EngravedButton";

export const Route = createFileRoute("/patronus")({
  head: () => ({
    meta: [
      { title: "Cast Your Patronus — Wizarding World" },
      { name: "description", content: "Reach for your happiest memory. A guardian of silver light may answer." },
      { property: "og:title", content: "Cast Your Patronus — Wizarding World" },
      { property: "og:description", content: "Discover the silver animal that guards you." },
    ],
  }),
  component: PatronusPage,
});

const PROMPTS = [
  "Describe a memory in which you felt completely safe.",
  "What sound, more than any other, calms you?",
  "Name a person, alive or gone, whose presence makes you brave.",
  "When you were a child, what did you most want to become?",
];

function PatronusPage() {
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ animal: string; description: string; memory_hint: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const next = () => {
    if (text.trim().length < 3) return;
    const all = [...answers, text.trim()];
    setAnswers(all); setText("");
    if (step + 1 < PROMPTS.length) setStep(step + 1);
    else submit(all);
  };

  const submit = async (all: string[]) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/patronus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: all.map((a, i) => ({ q: PROMPTS[i], a })) }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "The charm faltered.");
      }
      const data = await res.json();
      setResult(data);
      try {
        const raw = localStorage.getItem("wizarding-profile");
        const prof = raw ? JSON.parse(raw) : { name: "Wanderer", xp: 0 };
        localStorage.setItem("wizarding-profile", JSON.stringify({ ...prof, patronus: data.animal, xp: (prof.xp || 0) + 25 }));
      } catch {}
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setStep(0); setText(""); setAnswers([]); setResult(null); setError(null); };

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24"
      style={{ background: "radial-gradient(ellipse at 50% 30%, oklch(0.10 0.05 240) 0%, oklch(0.04 0.02 260) 70%)" }}>
      <Stars count={120} />
      <Fog />
      <Particles variant="snow" count={result ? 90 : 30} />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em]" style={{ color: "oklch(0.85 0.10 220)" }}>The Charm</p>
        <h1 className="mt-6 font-display text-5xl md:text-7xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.95 0.05 220), oklch(0.70 0.15 230), oklch(0.95 0.05 220))",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
              filter: "drop-shadow(0 0 30px oklch(0.70 0.18 220 / 0.5))",
            }}>
          Expecto Patronum
        </h1>
        <RuneSeparator className="my-10" />

        {!result && !loading && (
          <>
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]/60">
              Memory {step + 1} of {PROMPTS.length}
            </p>
            <h2 className="mx-auto mt-6 max-w-2xl font-serif-magical text-2xl italic text-[oklch(0.92_0.05_220)] md:text-3xl">
              "{PROMPTS[step]}"
            </h2>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4}
              placeholder="Reach for it slowly…"
              className="mx-auto mt-8 block w-full max-w-xl resize-none border border-[oklch(0.55_0.10_220)]/40 bg-[oklch(0.08_0.03_260)]/60 p-5 font-serif-magical text-lg italic text-[oklch(0.92_0.05_220)] placeholder:text-[oklch(0.60_0.08_220)]/50 outline-none focus:border-[oklch(0.85_0.10_220)]" />
            <div className="mt-8"><EngravedButton onClick={next} disabled={text.trim().length < 3}>Hold the Memory</EngravedButton></div>
          </>
        )}

        {loading && (
          <p className="mt-12 font-serif-magical text-xl italic text-[oklch(0.85_0.10_220)]/85">
            Silver mist gathers at the wand-tip…
          </p>
        )}

        {error && (
          <div className="mt-12">
            <p className="font-serif-magical italic text-[oklch(0.70_0.20_25)]">{error}</p>
            <div className="mt-6"><EngravedButton onClick={reset}>Try Again</EngravedButton></div>
          </div>
        )}

        {result && (
          <div className="relative">
            {/* Patronus glow orb */}
            <div className="relative mx-auto h-56 w-56">
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, oklch(0.95 0.06 220) 0%, oklch(0.70 0.15 220 / 0.4) 40%, transparent 70%)",
                  animation: "flicker 3s ease-in-out infinite",
                  filter: "blur(2px)",
                }} />
              <div className="absolute inset-8 rounded-full"
                style={{
                  background: "radial-gradient(circle, oklch(1 0 0) 0%, transparent 70%)",
                  animation: "float-slow 5s ease-in-out infinite",
                }} />
            </div>

            <p className="mt-6 font-display text-[10px] uppercase tracking-[0.5em]" style={{ color: "oklch(0.85 0.10 220)" }}>
              Your Patronus is
            </p>
            <h2 className="mt-3 font-display text-6xl capitalize md:text-7xl"
              style={{
                background: "linear-gradient(135deg, oklch(1 0 0), oklch(0.80 0.12 220), oklch(0.95 0.05 220))",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                filter: "drop-shadow(0 0 30px oklch(0.80 0.15 220 / 0.7))",
              }}>
              The {result.animal}
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-serif-magical text-xl italic text-[oklch(0.92_0.06_220)]/90">
              {result.description}
            </p>
            <p className="mt-4 font-serif-magical italic text-[oklch(0.78_0.10_220)]/70">
              {result.memory_hint}
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <EngravedLink to="/profile">View Your Ledger</EngravedLink>
              <EngravedButton onClick={reset}>Cast Again</EngravedButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
