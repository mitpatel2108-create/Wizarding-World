import { createFileRoute } from "@tanstack/react-router";
import { CastleScene } from "@/components/magic/CastleScene";
import { Particles } from "@/components/magic/Particles";
import { Stars } from "@/components/magic/Stars";
import { Fog } from "@/components/magic/Fog";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { EngravedLink } from "@/components/magic/EngravedButton";
import spellbookUrl from "@/assets/spellbook.jpg";
import { useInView } from "@/hooks/useInView";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wizarding World — Enter the Magic" },
      {
        name: "description",
        content:
          "Step into a cinematic wizarding world. Explore an ancient castle, four legendary houses, spells, potions, wands and more.",
      },
      { property: "og:title", content: "Wizarding World — Enter the Magic" },
      {
        property: "og:description",
        content: "A cinematic immersive journey into the wizarding world.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Whispers />
      <Pillars />
      <Spellbook />
      <Invitation />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <CastleScene />
      <Stars count={140} />
      <Particles variant="ember" count={45} />
      <Fog />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="font-serif-magical italic text-sm md:text-base text-[var(--gold)]/80 tracking-[0.4em] uppercase animate-flicker">
          The veil between worlds grows thin
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.95] text-gold drop-shadow-[0_0_40px_rgba(255,200,90,0.25)]">
          The Wizarding
          <br />
          World Awaits
        </h1>
        <p className="mx-auto mt-8 max-w-xl font-serif-magical text-lg text-[oklch(0.85_0.03_75)]/80 md:text-xl">
          Wander candle-lit corridors. Whisper ancient incantations. Find the house that has waited
          centuries for your name.
        </p>

        <div className="absolute top-20 left-20 animate-pulse text-gold text-6xl opacity-30">✦</div>

        <div className="absolute bottom-20 right-20 animate-bounce text-gold text-5xl opacity-20">
          ⚡
        </div>
        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row">
          <EngravedLink to="/hogwarts">Enter the Castle</EngravedLink>
          <EngravedLink to="/sorting-hat">Be Sorted</EngravedLink>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-display text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/70">
            Descend
          </span>
          <span className="block h-12 w-px bg-gradient-to-b from-[var(--gold)]/80 to-transparent animate-flicker" />
        </div>
      </div>
    </section>
  );
}

function Whispers() {
  const lines = [
    "Lumos.",
    "The flame remembers your name.",
    "There is a door behind the door.",
    "Magic is what you carry, not what you cast.",
  ];
  return (
    <section className="relative overflow-hidden py-32">
      <Particles variant="dust" count={30} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <RuneSeparator />
        <div className="mt-12 space-y-10">
          {lines.map((l, i) => (
            <p
              key={i}
              className="font-serif-magical text-2xl italic text-[oklch(0.82_0.05_75)]/80 md:text-3xl"
              style={{ animation: `flicker ${4 + i}s ease-in-out ${i * 0.5}s infinite` }}
            >
              &ldquo;{l}&rdquo;
            </p>
          ))}
        </div>
        <RuneSeparator className="mt-12" />
      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    {
      title: "The Castle",
      to: "/hogwarts",
      desc: "A thousand staircases, a thousand secrets. The walls breathe at midnight.",
      hue: "linear-gradient(135deg, oklch(0.18 0.04 260), oklch(0.06 0.02 260))",
    },
    {
      title: "Four Houses",
      to: "/houses",
      desc: "Lion, serpent, eagle, badger. One has whispered for you since birth.",
      hue: "linear-gradient(135deg, oklch(0.32 0.10 160), oklch(0.10 0.05 160))",
    },
    {
      title: "Ancient Spells",
      to: "/spells",
      desc: "Words remembered by stone. Trace the runes and watch them wake.",
      hue: "linear-gradient(135deg, oklch(0.30 0.12 70), oklch(0.10 0.04 50))",
    },
    {
      title: "Forbidden Arts",
      to: "/dark-arts",
      desc: "Some doors should not be opened. You will open them anyway.",
      hue: "linear-gradient(135deg, oklch(0.30 0.15 25), oklch(0.08 0.04 20))",
    },
  ];
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-[var(--gold)]/70">
            Begin Your Journey
          </p>
          <h2 className="mt-4 font-display text-4xl text-gold md:text-6xl">Choose Your Path</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          // REPLACE lines 144–179 with this:
          {pillars.map((p, i) => {
            const { ref, inView } = useInView();
            return (
              <div
                ref={ref}
                key={p.title}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : "translateY(40px)",
                  transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
                }}
              >
                <a
                  href={p.to}
                  className="group relative block overflow-hidden border border-[var(--gold)]/25 transition-all duration-500 hover:border-[var(--gold)]/70 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(255,200,90,0.18),0_30px_60px_-20px_rgba(0,0,0,0.9)]"
                  style={{ background: p.hue, boxShadow: "0 20px 60px -20px rgba(0,0,0,0.7)" }}
                >
                  <div className="relative z-10 flex h-80 flex-col justify-between p-8">
                    <div className="flex justify-between">
                      <span className="font-display text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]/70">
                        Chapter
                      </span>
                      <Rune />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl text-[var(--gold)] transition group-hover:text-[oklch(0.92_0.06_85)]">
                        {p.title}
                      </h3>
                      <p className="mt-3 font-serif-magical text-base italic text-[oklch(0.85_0.04_75)]/80">
                        {p.desc}
                      </p>
                      <div className="mt-6 flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">
                        <span className="h-px w-8 bg-[var(--gold)]/60 transition-all group-hover:w-16" />
                        Enter
                      </div>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 100%, rgba(255,200,90,0.18), transparent 60%)",
                    }}
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Rune() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className="text-[var(--gold)]/70 animate-rune-pulse"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 2 L10 18 M2 10 L18 10" opacity="0.5" />
        <path d="M6 6 L14 14 M14 6 L6 14" />
      </g>
    </svg>
  );
}

function Spellbook() {
  return (
    <section className="relative overflow-hidden py-32">
      <Particles variant="spark" count={25} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="relative">
          <div
            className="absolute -inset-8 rounded-full opacity-40 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(255,180,80,0.45), transparent 60%)",
            }}
          />
          <img
            src={spellbookUrl}
            alt="An ancient open spellbook with glowing golden runes rising from its pages by candlelight"
            width={1536}
            height={1024}
            loading="lazy"
            className="relative w-full border border-[var(--gold)]/20 shadow-arcane"
          />
        </div>
        <div>
          <p className="font-display text-xs uppercase tracking-[0.4em] text-[var(--gold)]/70">
            Volume I
          </p>
          <h2 className="mt-4 font-display text-4xl text-gold md:text-5xl">
            A Book That Reads You Back
          </h2>
          <RuneSeparator className="my-8" />
          <p className="font-serif-magical text-xl italic leading-relaxed text-[oklch(0.85_0.04_75)]/85">
            Each page glows for a different hand. Hover the runes and they ripple like water. Speak
            a word aloud — softly — and the candle leans toward you to listen.
          </p>
          <div className="mt-10">
            <EngravedLink to="/spells">Open the Spellbook</EngravedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section className="relative overflow-hidden py-40">
      <Stars count={80} />
      <Particles variant="ember" count={30} />
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="font-serif-magical italic text-[var(--gold)]/80 text-lg tracking-[0.3em] uppercase">
          Your Letter Is Late
        </p>
        <h2 className="mt-6 font-display text-5xl leading-tight text-gold md:text-7xl">
          But the owl
          <br />
          still waits.
        </h2>
        <p className="mx-auto mt-8 max-w-xl font-serif-magical text-xl italic text-[oklch(0.85_0.04_75)]/80">
          Take the seat at the long oak table. The Hat already knows.
        </p>
        <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <EngravedLink to="/sorting-hat">Speak to the Hat</EngravedLink>
          <EngravedLink to="/houses">Meet the Houses</EngravedLink>
        </div>
      </div>
    </section>
  );
}
