// NEW FILE: src/routes/daily.tsx

import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Stars } from "@/components/magic/Stars";
import { Particles } from "@/components/magic/Particles";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { useWizardProfile } from "@/hooks/useWizardProfile";

export const Route = createFileRoute("/daily")({
  head: () => ({
    meta: [
      { title: "Daily Challenge — Wizarding World" },
      { name: "description", content: "One trial. One day. Prove your worth to the castle." },
    ],
  }),
  component: DailyChallengePage,
});

interface Challenge {
  question: string;
  answer: string;
  hint: string;
  reward: number;
}

// One question per day — cycles by day-of-month
const CHALLENGES: Challenge[] = [
  { question: "What is the incantation that conjures light from a wand tip?", answer: "lumos", hint: "It is the opposite of darkness.", reward: 25 },
  { question: "Which potion grants the drinker perfect luck?", answer: "felix felicis", hint: "Named for felicity itself.", reward: 30 },
  { question: "What does 'Expecto Patronum' conjure?", answer: "patronus", hint: "A guardian of silver light.", reward: 25 },
  { question: "Name the charm that unlocks any common lock.", answer: "alohomora", hint: "It opens what is closed.", reward: 20 },
  { question: "Which house values loyalty and hard work above all?", answer: "hufflepuff", hint: "Yellow and black. A badger.", reward: 20 },
  { question: "What magical object shows you only your deepest desire?", answer: "mirror of erised", hint: "Erised is a reflection.", reward: 35 },
  { question: "Name the incantation that disarms an opponent.", answer: "expelliarmus", hint: "Harry's signature spell.", reward: 25 },
  { question: "Which creature guards Gringotts vaults?", answer: "dragon", hint: "It breathes fire. Obviously.", reward: 20 },
  { question: "What plant causes uncontrollable laughter when touched?", answer: "tickling", hint: "Not an official spell — think plant.", reward: 15 },
  { question: "Name the house whose ghost is the Bloody Baron.", answer: "slytherin", hint: "Serpents, ambition, green.", reward: 20 },
  { question: "What is the killing curse?", answer: "avada kedavra", hint: "One of three Unforgivable Curses.", reward: 30 },
  { question: "Which charm makes an object fly?", answer: "wingardium leviosa", hint: "Swish and flick.", reward: 20 },
  { question: "What is the incantation to produce a Patronus?", answer: "expecto patronum", hint: "Expect a guardian.", reward: 25 },
  { question: "Name the invisibility spell.", answer: "disillusionment", hint: "Not a cloak, but a charm.", reward: 25 },
  { question: "Which magical map shows all of Hogwarts?", answer: "marauder's map", hint: "Mischief managed.", reward: 30 },
  { question: "What is the name of Harry's owl?", answer: "hedwig", hint: "White as snow, loyal as stone.", reward: 15 },
  { question: "Which house values wit and learning?", answer: "ravenclaw", hint: "Blue and bronze. An eagle.", reward: 20 },
  { question: "What ingredient is NOT in Polyjuice Potion?", answer: "phoenix feather", hint: "Think transformation, not cores.", reward: 30 },
  { question: "Which charm makes an object repel water?", answer: "impervius", hint: "Used on Harry's glasses.", reward: 25 },
  { question: "Name the three Deathly Hallows.", answer: "elder wand resurrection stone cloak", hint: "Wand, stone, cloak.", reward: 40 },
  { question: "What is the term for a non-magical person?", answer: "muggle", hint: "Completely ordinary.", reward: 10 },
  { question: "Which spell reveals hidden writing?", answer: "aparecium", hint: "From 'appear'.", reward: 25 },
  { question: "What is the incantation for the Summoning Charm?", answer: "accio", hint: "Short and simple.", reward: 20 },
  { question: "Which house founder was known for his bravery?", answer: "godric gryffindor", hint: "The lion's founder.", reward: 25 },
  { question: "What does the Cruciatus Curse do?", answer: "torture", hint: "One of the Unforgivables.", reward: 30 },
  { question: "Name the charm that mends broken objects.", answer: "reparo", hint: "Harry used it on his glasses.", reward: 20 },
  { question: "Which creature is said to be born from a serpent's egg?", answer: "basilisk", hint: "Its gaze kills.", reward: 25 },
  { question: "What is the name of Hagrid's three-headed dog?", answer: "fluffy", hint: "Guarded the Sorcerer's Stone.", reward: 20 },
  { question: "Which spell causes levitation?", answer: "wingardium leviosa", hint: "Swish and flick.", reward: 20 },
  { question: "What is the incantation for the Shield Charm?", answer: "protego", hint: "Protection in one word.", reward: 20 },
  { question: "Name the spell that reveals enemies nearby.", answer: "homenum revelio", hint: "Reveals humans.", reward: 25 },
];

const STORAGE_KEY = "ww-daily-challenge";

function DailyChallengePage() {
  const { addMagic } = useWizardProfile();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong" | "done">("idle");
  const [wrongCount, setWrongCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [mounted, setMounted] = useState(false);

  const today = new Date().toDateString();
  const dayIndex = new Date().getDate() % CHALLENGES.length;
  const challenge = CHALLENGES[dayIndex];

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === today) setStatus("done");
  }, [today]);

  const submit = () => {
    const typed = value.toLowerCase().trim();
    // Accept partial match — if typed is contained in answer or vice versa
    const isCorrect = challenge.answer.includes(typed) || typed.includes(challenge.answer.split(" ")[0]);
    if (isCorrect) {
      setStatus("correct");
      localStorage.setItem(STORAGE_KEY, today);
      addMagic(challenge.reward);
    } else {
      setStatus("wrong");
      setWrongCount((n) => n + 1);
      setValue("");
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24">
      <Stars count={90} />
      <Particles variant="spark" count={20} />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="font-display text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/70">
          Today's Trial
        </p>
        <h1 className="mt-6 font-display text-5xl text-gold md:text-6xl">
          Daily Challenge
        </h1>
        <p className="mt-3 font-serif-magical text-sm italic text-[var(--gold)]/50">
          One question. One day. Answer correctly to earn {challenge.reward} ✦
        </p>

        <RuneSeparator className="my-10" />

        {status === "done" ? (
          // Already completed
          <div
            className="border border-[var(--gold)]/30 p-10"
            style={{ background: "color-mix(in oklab, var(--gold) 6%, transparent)" }}
          >
            <span className="text-4xl">✦</span>
            <h2 className="mt-4 font-display text-2xl text-gold">Trial Complete</h2>
            <p className="mt-3 font-serif-magical text-lg italic text-[oklch(0.85_0.04_75)]/80">
              You have already proven yourself today. Return tomorrow for the next trial.
            </p>
            <p className="mt-4 font-display text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/50">
              +{challenge.reward} ✦ earned
            </p>
          </div>
        ) : (
          // Challenge active
          <div
            className="border border-[var(--gold)]/25 p-10"
            style={{ background: "oklch(0.07 0.025 260 / 0.8)" }}
          >
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]/60 mb-4">
              Question for {today}
            </p>
            <p className="font-serif-magical text-2xl italic leading-relaxed text-[oklch(0.90_0.05_80)]">
              &ldquo;{challenge.question}&rdquo;
            </p>

            {wrongCount >= 2 && !showHint && (
              <button
                onClick={() => setShowHint(true)}
                className="mt-5 font-display text-[9px] uppercase tracking-[0.3em] text-[var(--gold)]/50 hover:text-[var(--gold)] transition-colors"
              >
                Reveal a hint ↓
              </button>
            )}
            {showHint && (
              <p className="mt-4 font-serif-magical text-base italic text-[var(--gold)]/60">
                Hint: {challenge.hint}
              </p>
            )}

            <div className="mt-8 flex items-center justify-center gap-4">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Your answer..."
                className="w-64 bg-transparent border-b border-[var(--gold)]/30 pb-2 text-center font-serif-magical text-xl italic text-[var(--gold)] outline-none focus:border-[var(--gold)] placeholder:text-[var(--gold)]/25 transition-colors duration-300"
              />
              <button
                onClick={submit}
                className="border border-[var(--gold)]/40 px-5 py-2 font-display text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-300"
              >
                Answer
              </button>
            </div>

            {status === "correct" && (
              <p className="mt-5 font-display text-base uppercase tracking-[0.3em] text-[var(--gold)] animate-flicker">
                ✦ Correct — +{challenge.reward} magic earned ✦
              </p>
            )}
            {status === "wrong" && (
              <p className="mt-5 font-serif-magical text-base italic text-[oklch(0.55_0.22_25)]">
                The castle does not recognise that answer. Try again.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}