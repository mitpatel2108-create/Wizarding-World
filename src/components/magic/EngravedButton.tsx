import { Link, type LinkProps } from "@tanstack/react-router";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

const baseClass =
  "group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 font-display text-sm uppercase tracking-[0.25em] text-[var(--gold)] transition-all duration-300 hover:text-[oklch(0.92_0.05_85)] focus-visible:outline-none";

const decoration = (
  <>
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.04 70 / 0.4), oklch(0.08 0.02 60 / 0.6))",
        boxShadow:
          "inset 0 1px 0 color-mix(in oklab, var(--gold) 35%, transparent), inset 0 -1px 0 color-mix(in oklab, var(--gold) 25%, transparent)",
      }}
    />
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 border border-[var(--gold)]/60"
    />
    <span
      aria-hidden
      className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        boxShadow:
          "0 0 30px color-mix(in oklab, var(--gold) 50%, transparent), inset 0 0 30px color-mix(in oklab, var(--gold) 25%, transparent)",
      }}
    />
    {/* corners */}
    {[
      "left-0 top-0 border-l border-t",
      "right-0 top-0 border-r border-t",
      "left-0 bottom-0 border-l border-b",
      "right-0 bottom-0 border-r border-b",
    ].map((p, i) => (
      <span
        key={i}
        aria-hidden
        className={`pointer-events-none absolute h-3 w-3 border-[var(--gold)] ${p}`}
      />
    ))}
  </>
);

interface BaseProps {
  children: ReactNode;
  className?: string;
}

export const EngravedButton = forwardRef<
  HTMLButtonElement,
  BaseProps & ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className = "", ...rest }, ref) => (
  <button ref={ref} className={`${baseClass} ${className}`} {...rest}>
    {decoration}
    <span className="relative">{children}</span>
  </button>
));
EngravedButton.displayName = "EngravedButton";

export function EngravedLink({
  children,
  className = "",
  ...props
}: BaseProps & Omit<LinkProps, "children">) {
  return (
    <Link className={`${baseClass} ${className}`} {...props}>
      {decoration}
      <span className="relative">{children}</span>
    </Link>
  );
}
