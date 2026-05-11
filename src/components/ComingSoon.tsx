import { createFileRoute } from "@tanstack/react-router";
import { Particles } from "@/components/magic/Particles";
import { Stars } from "@/components/magic/Stars";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import { EngravedLink } from "@/components/magic/EngravedButton";

interface ComingSoonProps {
  eyebrow: string;
  title: string;
  blurb: string;
  variant?: "ember" | "dust" | "snow" | "spark";
}

export function ComingSoon({ eyebrow, title, blurb, variant = "dust" }: ComingSoonProps) {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-24">
      <Stars count={100} />
      <Particles variant={variant} count={45} />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.16 0.05 260) 0%, oklch(0.05 0.02 260) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-[var(--gold)]/70">{eyebrow}</p>
        <h1 className="mt-6 font-display text-5xl text-gold md:text-7xl">{title}</h1>
        <RuneSeparator className="my-10" />
        <p className="font-serif-magical text-xl italic text-[oklch(0.85_0.04_75)]/85">{blurb}</p>
        <p className="mt-10 font-serif-magical italic text-[var(--gold)]/70">
          The portrait stirs… this hall is being painted.
        </p>
        <div className="mt-12">
          <EngravedLink to="/">Return Home</EngravedLink>
        </div>
      </div>
    </section>
  );
}

export const _route = createFileRoute as never; // type helper (unused)
