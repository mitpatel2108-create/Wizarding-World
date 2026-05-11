export function RuneSeparator({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-60" />
      <svg width="48" height="20" viewBox="0 0 48 20" className="text-[var(--gold)] animate-rune-pulse">
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M2 10 L10 10 M10 4 L10 16 M16 4 L22 16 L28 4 M34 16 L34 4 L40 10 L34 10 M44 4 L44 16" />
          <circle cx="24" cy="10" r="0.8" fill="currentColor" />
        </g>
      </svg>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-60" />
    </div>
  );
}
