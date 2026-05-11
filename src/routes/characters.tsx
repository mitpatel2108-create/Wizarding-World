import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Particles } from "@/components/magic/Particles";
import { Stars } from "@/components/magic/Stars";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import headmasterImg from "@/assets/char-headmaster.jpg";
import deputyImg from "@/assets/char-deputy.jpg";
import potionsImg from "@/assets/char-potions.jpg";
import keeperImg from "@/assets/char-keeper.jpg";
import dreamerImg from "@/assets/char-dreamer.jpg";

export const Route = createFileRoute("/characters")({
  head: () => ({
    meta: [
      { title: "Wizards & Witches — Wizarding World" },
      { name: "description", content: "Meet the wizards and witches whose portraits stir at midnight. Each carries a story older than the stones." },
      { property: "og:title", content: "Wizards & Witches — Wizarding World" },
      { property: "og:description", content: "Magical portraits that watch you back." },
    ],
  }),
  component: CharactersPage,
});

interface Character { name: string; role: string; house: string; image: string; quote: string; bio: string; glow: string; }

const CHARACTERS: Character[] = [
  { name: "The Headmaster", role: "Sorcerer Supreme of the Castle", house: "Gryffindor", image: headmasterImg,
    quote: "It does not do to dwell on dreams and forget to live.",
    bio: "Half-moon spectacles, silver beard, and eyes that have read every chapter you have not yet written.",
    glow: "oklch(0.70 0.18 240)" },
  { name: "The Deputy", role: "Mistress of Transfiguration", house: "Gryffindor", image: deputyImg,
    quote: "There will be no foolish wand-waving here.",
    bio: "A stern witch in emerald, who can become a tabby cat between two heartbeats.",
    glow: "oklch(0.65 0.18 160)" },
  { name: "The Potions Master", role: "Keeper of the Dungeons", house: "Slytherin", image: potionsImg,
    quote: "I can teach you how to bottle fame, brew glory, and stopper death.",
    bio: "A man of long shadows and longer silences. His cauldron forgives no one.",
    glow: "oklch(0.55 0.20 25)" },
  { name: "The Keeper of Keys", role: "Gamekeeper of the Forbidden Forest", house: "Gryffindor", image: keeperImg,
    quote: "Yer a wizard.",
    bio: "Half-giant, all heart. Knows every creature in the forest by their first whisper.",
    glow: "oklch(0.68 0.16 60)" },
  { name: "The Dreamer", role: "Reader of Invisible Things", house: "Ravenclaw", image: dreamerImg,
    quote: "Things we lose have a way of coming back to us in the end.",
    bio: "Wears radish earrings and walks barefoot. Sees the creatures no one else can.",
    glow: "oklch(0.78 0.13 80)" },
];

function CharactersPage() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <Stars count={80} />
      <Particles variant="dust" count={25} />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-[var(--gold)]/70">The Portraits</p>
        <h1 className="mt-6 font-display text-5xl text-gold md:text-7xl">Wizards & Witches</h1>
        <RuneSeparator className="my-10" />
        <p className="mx-auto max-w-2xl font-serif-magical text-xl italic text-[oklch(0.86_0.04_75)]/85">
          The frames stir when no one watches. Each portrait remembers a name, a wand, a kindness, a wound.
        </p>
      </div>
      <div className="relative mx-auto mt-20 grid max-w-7xl gap-10 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {CHARACTERS.map((c) => <PortraitCard key={c.name} character={c} />)}
      </div>
    </section>
  );
}

function PortraitCard({ character }: { character: Character }) {
  const [open, setOpen] = useState(false);
  return (
    <article onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      className="group relative aspect-[3/4] overflow-hidden border-[1.5px] border-[var(--gold)]/40 transition-all duration-500"
      style={{
        boxShadow: open
          ? `0 30px 90px -20px ${character.glow}, inset 0 0 60px ${character.glow}33`
          : "0 20px 60px -20px rgba(0,0,0,0.7), inset 0 0 0 6px rgba(160,120,50,0.15)",
      }}>
      <div className="absolute inset-2 z-10 pointer-events-none border border-[var(--gold)]/30" />
      <img src={character.image} alt={character.name} loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-all duration-1000"
        style={{
          transform: open ? "scale(1.06)" : "scale(1)",
          filter: open ? "saturate(1.1) brightness(1.05)" : "saturate(0.85) brightness(0.85) contrast(1.1)",
        }} />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%), linear-gradient(180deg, transparent 50%, rgba(5,5,15,0.95) 100%)" }} />
      {open && <Particles variant="spark" count={20} />}
      <div className="absolute left-1/2 top-1/4 h-2 w-2 -translate-x-1/2 rounded-full transition-opacity duration-700"
        style={{ background: character.glow, boxShadow: `0 0 30px 8px ${character.glow}`, opacity: open ? 0.9 : 0,
                 animation: "float-slow 4s ease-in-out infinite" }} />
      <div className="absolute inset-x-0 bottom-0 z-10 p-6">
        <p className="font-display text-[10px] uppercase tracking-[0.4em]" style={{ color: character.glow }}>{character.house}</p>
        <h3 className="mt-2 font-display text-2xl text-[var(--gold)]">{character.name}</h3>
        <p className="font-serif-magical text-sm italic text-[oklch(0.85_0.04_75)]/80">{character.role}</p>
        <div className="grid overflow-hidden transition-all duration-500" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
          <div className="overflow-hidden">
            <p className="mt-4 font-serif-magical text-base italic" style={{ color: character.glow }}>"{character.quote}"</p>
            <p className="mt-2 font-serif-magical text-sm italic text-[oklch(0.85_0.04_75)]/70">{character.bio}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
