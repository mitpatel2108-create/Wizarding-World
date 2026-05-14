// NEW FILE: src/routes/journal.tsx

import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Stars } from "@/components/magic/Stars";
import { Particles } from "@/components/magic/Particles";
import { RuneSeparator } from "@/components/magic/RuneSeparator";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Wizarding Journal — Wizarding World" },
      { name: "description", content: "Write your story. The castle reads every word." },
    ],
  }),
  component: JournalPage,
});

interface JournalEntry {
  id: string;
  date: string;
  text: string;
}

const JOURNAL_KEY = "ww-journal-entries";

function loadEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: JournalEntry[]) {
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
  } catch {}
}

const PROMPTS = [
  "The candle flickered and you saw something in the flame...",
  "A letter arrived with no name, only a wax seal...",
  "You found a door in the castle that had not been there yesterday...",
  "The portrait whispered your name as you passed...",
  "Something disappeared from your room. You suspect who took it...",
  "You heard music from the dungeon at midnight...",
  "The Sorting Hat spoke to you in a dream. It said...",
];

function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [draft, setDraft] = useState("");
  const [prompt] = useState(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEntries(loadEntries());
  }, []);

  const save = () => {
    if (!draft.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      text: draft.trim(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveEntries(updated);
    setDraft("");
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveEntries(updated);
    setActiveId(null);
  };

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24">
      <Stars count={80} />
      <Particles variant="dust" count={20} />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/70">
            Your Chronicle
          </p>
          <h1 className="mt-6 font-display text-5xl text-gold md:text-6xl">
            Wizarding Journal
          </h1>
          <p className="mt-4 font-serif-magical text-lg italic text-[oklch(0.85_0.04_75)]/70">
            The castle reads every word you write here.
          </p>
        </div>

        <RuneSeparator className="my-10" />

        {/* Writing area */}
        <div
          className="border border-[var(--gold)]/25 p-8 parchment-bg"
          style={{ background: "oklch(0.88 0.06 75)" }}
        >
          <p className="font-serif-magical text-sm italic text-[oklch(0.20_0.05_30)]/60 mb-3">
            Today's prompt: <span className="text-[oklch(0.20_0.05_30)]/80">{prompt}</span>
          </p>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={7}
            placeholder="Begin writing..."
            className="w-full bg-transparent resize-none font-serif-magical text-lg leading-relaxed text-[var(--ink)] outline-none placeholder:text-[oklch(0.40_0.05_30)]/40"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          />
          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[oklch(0.30_0.05_30)]/50">
              {draft.length} characters
            </span>
            <button
              onClick={save}
              disabled={!draft.trim()}
              className="border border-[oklch(0.30_0.08_60)] px-6 py-2 font-display text-[10px] uppercase tracking-[0.3em] text-[var(--ink)] transition-all hover:bg-[oklch(0.30_0.08_60)]/10 disabled:opacity-30"
            >
              Seal Entry ✦
            </button>
          </div>
        </div>

        {/* Past entries */}
        {entries.length > 0 && (
          <div className="mt-12">
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]/60 mb-6 text-center">
              Past Entries — {entries.length} recorded
            </p>
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="border border-[var(--gold)]/20 p-6 cursor-pointer transition-all duration-300 hover:border-[var(--gold)]/50"
                  style={{ background: "oklch(0.07 0.025 260 / 0.7)" }}
                  onClick={() => setActiveId(activeId === entry.id ? null : entry.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/60">
                      {entry.date}
                    </span>
                    <div className="flex gap-3 items-center">
                      <span className="font-display text-[9px] uppercase tracking-[0.2em] text-[var(--gold)]/40">
                        {activeId === entry.id ? "▲ Close" : "▼ Read"}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteEntry(entry.id); }}
                        className="font-display text-[9px] uppercase tracking-[0.2em] text-[oklch(0.55_0.22_25)]/60 hover:text-[oklch(0.55_0.22_25)] transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  {activeId !== entry.id ? (
                    <p className="mt-2 font-serif-magical text-base italic text-[oklch(0.85_0.04_75)]/70 line-clamp-2">
                      {entry.text}
                    </p>
                  ) : (
                    <p className="mt-4 font-serif-magical text-lg italic leading-relaxed text-[oklch(0.90_0.05_80)]">
                      {entry.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {entries.length === 0 && (
          <p className="text-center mt-12 font-serif-magical italic text-[var(--gold)]/40">
            No entries yet. The pages wait.
          </p>
        )}
      </div>
    </section>
  );
}