import { Link } from "@tanstack/react-router";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/hogwarts", label: "Hogwarts" },
  { to: "/houses", label: "Houses" },
  { to: "/sorting-hat", label: "Sorting Hat" },
  { to: "/patronus", label: "Patronus" },
  { to: "/spells", label: "Spells" },
  { to: "/potions", label: "Potions" },
  { to: "/characters", label: "Characters" },
  { to: "/wands", label: "Wands" },
  { to: "/map", label: "Map" },
  { to: "/profile", label: "Profile" },
  { to: "/daily", label: "Daily" },
  { to: "/journal", label: "Journal" },
  { to: "/dark-arts", label: "Dark Arts" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,7,18,0.85) 0%, rgba(5,7,18,0.35) 70%, transparent 100%)",
          backdropFilter: "blur(8px)",
        }}
      />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <Sigil />
          <span className="font-display text-sm uppercase tracking-[0.4em] text-[var(--gold)]">
            Wizarding World
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                className="group relative font-display text-[11px] uppercase tracking-[0.28em] text-[oklch(0.78_0.04_80)] transition hover:text-[var(--gold)]"
                activeProps={{ className: "text-[var(--gold)]" }}
              >
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-500 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <button
          aria-label="menu"
          onClick={() => setOpen((o) => !o)}
          className="relative z-10 flex h-10 w-10 items-center justify-center border border-[var(--gold)]/40 text-[var(--gold)] lg:hidden"
        >
          <span className="block h-px w-5 bg-current" />
          <span className="absolute h-px w-5 -translate-y-2 bg-current" />
          <span className="absolute h-px w-5 translate-y-2 bg-current" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--gold)]/20 bg-[oklch(0.06_0.02_260)]/95 px-6 py-6 lg:hidden">
          <ul className="grid grid-cols-2 gap-4">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-xs uppercase tracking-[0.25em] text-[oklch(0.85_0.05_80)]"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Sigil() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" className="text-[var(--gold)] transition group-hover:rotate-12">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="16" cy="16" r="14" />
        <circle cx="16" cy="16" r="10" opacity="0.5" />
        <path d="M16 2 V30 M2 16 H30 M6 6 L26 26 M26 6 L6 26" opacity="0.5" />
        <path d="M16 8 L20 16 L16 24 L12 16 Z" fill="currentColor" opacity="0.85" />
      </g>
    </svg>
  );
}
