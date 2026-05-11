// src/components/DarkArtsRunes.tsx
// Replace the static rune symbols on your /dark-arts page with this.
// User must click all 5 runes in order — then a hidden section unlocks.

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RUNES = ["☥", "✶", "⚸", "☿", "♆"];

const HIDDEN_CONTENT = [
  {
    title: "The Horcrux",
    latin: "Horcrux",
    description:
      "A fragment of soul, sealed inside an object. The darkest magic known. To create one, the caster must commit an act that tears the soul — and endure what follows.",
  },
  {
    title: "The Dementor's Kiss",
    latin: "Osculum Inferni",
    description:
      "Not a spell. A feeding. The Dementor latches to the mouth and draws out the soul entirely. The body lives on — empty, breathing — but the person is gone.",
  },
  {
    title: "Priori Incantatem",
    latin: "Priori Incantatem",
    description:
      "When two wands share a core and are forced to duel, the last spells cast echo in reverse — the dead walk briefly backward into light.",
  },
];

export function DarkArtsRunes() {
  const [clicked, setClicked] = useState<boolean[]>(Array(RUNES.length).fill(false));
  const [sequence, setSequence] = useState<number[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleRune = useCallback(
    (index: number) => {
      if (unlocked) return;
      const nextExpected = sequence.length;
      if (index === nextExpected) {
        const newSeq = [...sequence, index];
        const newClicked = [...clicked];
        newClicked[index] = true;
        setClicked(newClicked);
        setSequence(newSeq);
        setFailed(false);
        if (newSeq.length === RUNES.length) {
          setUnlocked(true);
        }
      } else {
        // Wrong order — reset
        setFailed(true);
        setSequence([]);
        setClicked(Array(RUNES.length).fill(false));
        setTimeout(() => setFailed(false), 1000);
      }
    },
    [clicked, sequence, unlocked]
  );

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Instruction */}
      <p className="text-xs tracking-[0.3em] text-[#5a4a3a] uppercase">
        {unlocked
          ? "The seal is broken."
          : failed
          ? "The runes resist you."
          : "Trace each mark in order."}
      </p>

      {/* Rune buttons */}
      <div className="flex gap-6 text-3xl">
        {RUNES.map((rune, i) => (
          <motion.button
            key={i}
            onClick={() => handleRune(i)}
            whileHover={!clicked[i] ? { scale: 1.2 } : {}}
            whileTap={!clicked[i] ? { scale: 0.9 } : {}}
            animate={
              clicked[i]
                ? { color: "#9b8760", textShadow: "0 0 12px #9b876088" }
                : failed
                ? { color: "#8b1a1a", x: [0, -4, 4, -4, 0] }
                : { color: "#3a2a2a" }
            }
            transition={{ duration: 0.3 }}
            className="cursor-pointer select-none transition-colors"
            aria-label={`Rune ${i + 1}`}
          >
            {rune}
          </motion.button>
        ))}
      </div>

      {/* Unlock progress dots */}
      {!unlocked && (
        <div className="flex gap-2">
          {RUNES.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                sequence.length > i ? "bg-[#9b8760]" : "bg-[#2a2a3a]"
              }`}
            />
          ))}
        </div>
      )}

      {/* Hidden content — revealed on unlock */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            key="hidden"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-xl mt-4 border border-[#3a1a1a] bg-[#0d0608] p-6 space-y-8"
          >
            <p className="text-xs tracking-[0.4em] text-[#8b1a1a] uppercase text-center">
              ☠ Forbidden Knowledge — Enter at Your Own Peril ☠
            </p>
            {HIDDEN_CONTENT.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.2 }}
                className="border-t border-[#2a0808] pt-6 space-y-2"
              >
                <p className="text-xs tracking-widest text-[#8b1a1a] uppercase font-mono">
                  {item.latin}
                </p>
                <h3 className="text-xl font-serif text-[#c8a080]">{item.title}</h3>
                <p className="text-sm text-[#7a6050] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
