import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Stars } from "@/components/magic/Stars";
import { Particles } from "@/components/magic/Particles";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { EngravedButton, EngravedLink } from "@/components/magic/EngravedButton";
import { HOUSES_BY_ID, type HouseId } from "@/data/houses";
import { useWizardProfile } from "@/hooks/useWizardProfile";

export const Route = createFileRoute("/sorting-hat")({
  head: () => ({
    meta: [
      { title: "The Sorting Hat — Wizarding World" },
      { name: "description", content: "Sit upon the stool. Six questions, and an ancient hat will whisper your house." },
      { property: "og:title", content: "The Sorting Hat — Wizarding World" },
      { property: "og:description", content: "Discover your true house." },
    ],
  }),
  component: SortingHatPage,
});

interface QA { q: string; options: string[]; }

const QUESTIONS: QA[] = [
  { q: "A long corridor splits in three. Which door calls to you?", options: ["The door behind which something growls", "The door warm with firelight and laughter", "The door carved with riddles in a script you cannot read", "The door from which a child is crying"] },
  { q: "You find a wand on the floor. What do you do first?", options: ["Pick it up and try a spell", "Search for the owner", "Examine the wood and core", "Ask the painting on the wall"] },
  { q: "What is the worst kind of person?", options: ["A coward", "A fool", "A liar", "A bully"] },
  { q: "If you could keep one thing forever:", options: ["A glory remembered for a thousand years", "A friend who would never leave you", "An answer to every question you have ever asked", "A power no one else could touch"] },
  { q: "A rule stands between you and what is right.", options: ["I break it without flinching", "I find a clever way through it", "I obey — rules exist for reasons", "I rewrite the rule"] },
  { q: "When you close your eyes, what do you see?", options: ["A battle waiting", "A library with no end", "A long table of warm food and faces", "A mirror that does not show you"] },
];

function SortingHatPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ house: HouseId; verdict: string; trait: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setHouse } = useWizardProfile();

  const choose = (opt: string) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else submit(next);
  };

  const submit = (final: string[]) => {
  setLoading(true);

  setTimeout(() => {
    const scores = {
      gryffindor: 0,
      slytherin: 0,
      ravenclaw: 0,
      hufflepuff: 0,
    };

    final.forEach((answer) => {

      if (
        answer.includes("growls") ||
        answer.includes("Pick it up and try a spell") ||
        answer.includes("A coward") ||
        answer.includes("A battle waiting")
      ) {
        scores.gryffindor += 2;
      }

      if (
        answer.includes("riddles") ||
        answer.includes("Examine the wood and core") ||
        answer.includes("An answer to every question") ||
        answer.includes("A library with no end")
      ) {
        scores.ravenclaw += 2;
      }

      if (
        answer.includes("child is crying") ||
        answer.includes("Search for the owner") ||
        answer.includes("A bully") ||
        answer.includes("A long table of warm food")
      ) {
        scores.hufflepuff += 2;
      }

      if (
        answer.includes("power no one else could touch") ||
        answer.includes("I rewrite the rule") ||
        answer.includes("A liar") ||
        answer.includes("mirror that does not show you")
      ) {
        scores.slytherin += 2;
      }
    });

    const winner = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])[0][0] as HouseId;

    const verdicts = {
      gryffindor: {
        verdict: "Ah... courage, nerve, and daring burn brightly within you.",
        trait: "Bravery",
      },
      ravenclaw: {
        verdict: "A mind hungry for wisdom and wonder... most intriguing.",
        trait: "Intelligence",
      },
      hufflepuff: {
        verdict: "Loyal heart, steady soul... Hufflepuff shall be your home.",
        trait: "Loyalty",
      },
      slytherin: {
        verdict: "Ambition and cunning whisper strongly through your spirit.",
        trait: "Ambition",
      },
    };

    setResult({
      house: winner,
      verdict: verdicts[winner].verdict,
      trait: verdicts[winner].trait,
    });

    setHouse(winner);

    setLoading(false);
  }, 1500);
};

  const reset = () => { setStep(0); setAnswers([]); setResult(null); setError(null); };
  const house = result ? HOUSES_BY_ID[result.house] : null;

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24">
      <Stars count={70} />
      <Particles variant={house?.particle ?? "ember"} count={result ? 80 : 30} />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-[var(--gold)]/70">The Stool Awaits</p>
        <h1 className="mt-6 font-display text-5xl text-gold md:text-7xl">The Sorting Hat</h1>
        <RuneSeparator className="my-10" />

        {/* Hat */}
        <div className="relative mx-auto mb-12 h-44 w-44">
          <svg viewBox="0 0 200 200" className="h-full w-full"
               style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }}>
            <defs>
              <linearGradient id="hatg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.30 0.05 70)" />
                <stop offset="100%" stopColor="oklch(0.10 0.03 60)" />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="170" rx="70" ry="14" fill="url(#hatg)" />
            <path d="M50 160 Q70 120 80 90 Q90 50 130 30 Q120 90 110 130 Q105 155 100 165 Z" fill="url(#hatg)"
                  stroke="oklch(0.50 0.10 75)" strokeWidth="0.8"
                  style={{ animation: result ? "float-slow 4s ease-in-out infinite" : "none" }} />
            <path d="M65 145 Q100 155 135 145" fill="none" stroke="oklch(0.55 0.12 60)" strokeWidth="1.2" />
            {result && (
              <>
                <ellipse cx="85" cy="148" rx="3" ry="2" fill="oklch(0.85 0.18 70)" opacity="0.9">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="115" cy="148" rx="3" ry="2" fill="oklch(0.85 0.18 70)" opacity="0.9">
                  <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                </ellipse>
              </>
            )}
          </svg>
        </div>

        {!result && !loading && (
          <div className="animate-[flicker_8s_ease-in-out_infinite]">
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]/60">
              Question {step + 1} of {QUESTIONS.length}
            </p>
            <h2 className="mx-auto mt-6 max-w-2xl font-serif-magical text-2xl italic text-[oklch(0.92_0.05_85)] md:text-3xl">
              "{QUESTIONS[step].q}"
            </h2>
            <div className="mx-auto mt-10 grid max-w-3xl gap-3">
              {QUESTIONS[step].options.map((opt) => (
                <button key={opt} onClick={() => choose(opt)}
                  className="group relative border border-[var(--gold)]/30 bg-[oklch(0.10_0.02_260)]/60 p-5 text-left font-serif-magical italic text-[oklch(0.88_0.05_85)]/85 transition-all hover:border-[var(--gold)] hover:bg-[oklch(0.16_0.04_60)]/40 hover:text-[var(--gold)]">
                  <span className="mr-3 font-display text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/60">◆</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-12 font-serif-magical text-xl italic text-[var(--gold)]/80">
            The Hat considers… "Hmm. Difficult. Very difficult."
          </div>
        )}

        {error && (
          <div className="mt-12 text-center">
            <p className="font-serif-magical italic text-[oklch(0.70_0.20_25)]">{error}</p>
            <div className="mt-6"><EngravedButton onClick={reset}>Try Again</EngravedButton></div>
          </div>
        )}

        {result && house && (
          <div className="relative mt-8">
            <div className="absolute inset-0 -z-10"
              style={{ background: `radial-gradient(ellipse at center, ${house.glow}33 0%, transparent 60%)`, filter: "blur(20px)" }} />
            <p className="font-display text-[10px] uppercase tracking-[0.5em]" style={{ color: house.glow }}>The Hat has spoken</p>
            <h2 className="mt-4 font-display text-7xl md:text-8xl"
                style={{ color: house.text, textShadow: `0 0 40px ${house.glow}` }}>
              {house.name.toUpperCase()}
            </h2>
            <p className="mx-auto mt-8 max-w-2xl font-serif-magical text-xl italic text-[oklch(0.90_0.04_85)]">
              "{result.verdict}"
            </p>
            <p className="mt-4 font-display text-[10px] uppercase tracking-[0.4em]" style={{ color: house.glow }}>
              The Hat noticed: {result.trait}
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <EngravedLink to="/profile">View Your Ledger</EngravedLink>
              <EngravedButton onClick={reset}>Sit Again</EngravedButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
