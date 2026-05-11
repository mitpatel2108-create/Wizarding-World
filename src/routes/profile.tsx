import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Stars } from "@/components/magic/Stars";
import { Particles } from "@/components/magic/Particles";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { EngravedLink } from "@/components/magic/EngravedButton";
import { HOUSES_BY_ID, type HouseId } from "@/data/houses";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Wizarding Profile — Wizarding World" },
      { name: "description", content: "Your house, your wand, your patronus, your accumulated magic." },
      { property: "og:title", content: "Your Wizarding Profile — Wizarding World" },
      { property: "og:description", content: "Your house, your wand, your patronus." },
    ],
  }),
  component: ProfilePage,
});

interface Profile {
  name: string;
  house: HouseId | null;
  wand: string | null;
  patronus: string | null;
  xp: number;
}

const KEY = "wizarding-profile";

function loadProfile(): Profile {
  if (typeof window === "undefined") return { name: "Wanderer", house: null, wand: null, patronus: null, xp: 0 };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { name: "Wanderer", house: null, wand: null, patronus: null, xp: 0 };
}

function ProfilePage() {
  const [p, setP] = useState<Profile>(() => loadProfile());
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const save = (next: Profile) => { setP(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {} };
  const house = p.house ? HOUSES_BY_ID[p.house] : null;

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24">
      <Stars count={70} />
      <Particles variant={house?.particle ?? "dust"} count={30} />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-[var(--gold)]/70">Your Record</p>
        <h1 className="mt-6 font-display text-5xl text-gold md:text-7xl">The Student Ledger</h1>
        <RuneSeparator className="my-10" />
      </div>

      <div className="relative mx-auto mt-8 max-w-4xl px-6">
        <article className="relative overflow-hidden border border-[var(--gold)]/40 p-10 shadow-arcane md:p-14"
          style={{
            background: house
              ? `linear-gradient(160deg, ${house.glow}22, oklch(0.07 0.02 260) 60%)`
              : "linear-gradient(160deg, oklch(0.12 0.03 260), oklch(0.06 0.02 260))",
          }}>
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start">
            {/* Crest / Sigil */}
            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 rounded-full"
                  style={{
                    background: house ? `radial-gradient(circle, ${house.glow}55, transparent 70%)` : "radial-gradient(circle, var(--gold), transparent 70%)",
                    filter: "blur(8px)",
                    animation: "flicker 4s ease-in-out infinite",
                  }} />
                <svg viewBox="0 0 100 100" className="relative h-full w-full" style={{ color: house?.glow ?? "var(--gold)" }}>
                  <g fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M50 8 C30 8 20 24 20 40 C20 60 35 78 50 92 C65 78 80 60 80 40 C80 24 70 8 50 8 Z" />
                    <text x="50" y="56" textAnchor="middle" fontSize="14" fontFamily="Cinzel, serif" fill="currentColor">
                      {(house?.name[0] ?? "?")}
                    </text>
                  </g>
                </svg>
              </div>
              <p className="mt-4 font-display text-[10px] uppercase tracking-[0.4em]"
                 style={{ color: house?.glow ?? "var(--gold)" }}>
                {house?.name ?? "Unsorted"}
              </p>
            </div>

            {/* Details */}
            <div>
              <label className="font-display text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]/70">Witch / Wizard</label>
              <input
                value={p.name}
                onChange={(e) => save({ ...p, name: e.target.value })}
                className="mt-2 w-full bg-transparent border-b border-[var(--gold)]/30 pb-2 font-display text-3xl text-[var(--gold)] outline-none focus:border-[var(--gold)]"
              />

              <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Stat label="House" value={house?.name ?? "Unsorted"} link={house ? null : "/sorting-hat"} linkLabel="Be sorted" />
                <Stat label="Wand" value={p.wand ?? "Unchosen"} link={p.wand ? null : "/wands"} linkLabel="Choose a wand" />
                <Stat label="Patronus" value={p.patronus ?? "Unrevealed"} link={p.patronus ? null : "/patronus"} linkLabel="Cast Patronus" />
                <Stat label="Magic Earned" value={`${p.xp} ✦`} />
              </dl>

              {mounted && (
                <div className="mt-10">
                  <p className="mb-3 font-display text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]/70">Quick Sort (preview)</p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(HOUSES_BY_ID) as HouseId[]).map((id) => (
                      <button
                        key={id}
                        onClick={() => save({ ...p, house: id, xp: p.xp + 5 })}
                        className="border px-4 py-1 font-display text-[10px] uppercase tracking-[0.3em] transition-all"
                        style={{
                          color: HOUSES_BY_ID[id].glow,
                          borderColor: p.house === id ? HOUSES_BY_ID[id].glow : "color-mix(in oklab, var(--gold) 25%, transparent)",
                          background: p.house === id ? `${HOUSES_BY_ID[id].glow}22` : "transparent",
                        }}
                      >
                        {HOUSES_BY_ID[id].name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <EngravedLink to="/houses">Explore the Houses</EngravedLink>
          <EngravedLink to="/spells">Open the Spellbook</EngravedLink>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, link, linkLabel }: { label: string; value: string; link?: string | null; linkLabel?: string }) {
  return (
    <div>
      <dt className="font-display text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]/60">{label}</dt>
      <dd className="mt-2 font-serif-magical text-2xl italic text-[oklch(0.92_0.05_85)]">{value}</dd>
      {link && (
        <Link to={link} className="mt-1 inline-block font-display text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/80 underline-offset-4 hover:underline">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
