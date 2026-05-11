import { RuneSeparator } from "@/components/magic/RuneSeparator";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-20">
      <RuneSeparator />
      <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center text-xs uppercase tracking-[0.3em] text-[oklch(0.6_0.04_80)] md:flex-row md:text-left">
        <p className="font-display">Mischief Managed</p>
        <p className="font-serif-magical text-[11px] tracking-[0.2em]">
          Lumos &middot; Nox &middot; Alohomora
        </p>
        <p className="font-display">© Anno {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
