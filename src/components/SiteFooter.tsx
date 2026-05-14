import { RuneSeparator } from "@/components/magic/RuneSeparator";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-20">
      <RuneSeparator />
      <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center text-xs uppercase tracking-[0.3em] text-[oklch(0.6_0.04_80)] md:flex-row md:text-left">
        <p className="font-display">Mischief Managed</p>
        // REPLACE lines 9–11 with:
        <p className="font-serif-magical text-[11px] tracking-[0.2em] flex items-center gap-2">
          <button
            onClick={() => (document.body.style.filter = "brightness(1.3) contrast(0.95)")}
            className="hover:text-[var(--gold)] transition-colors duration-300 cursor-pointer"
            title="Cast Lumos"
          >
            Lumos
          </button>
          <span className="opacity-40">&middot;</span>
          <button
            onClick={() => (document.body.style.filter = "brightness(1) contrast(1)")}
            className="hover:text-[var(--gold)] transition-colors duration-300 cursor-pointer"
            title="Cast Nox"
          >
            Nox
          </button>
          <span className="opacity-40">&middot;</span>
          <button
            onClick={() => {
              document.body.animate(
                [{ filter: "blur(0px)" }, { filter: "blur(2px)" }, { filter: "blur(0px)" }],
                { duration: 800, easing: "ease-in-out" },
              );
            }}
            className="hover:text-[var(--gold)] transition-colors duration-300 cursor-pointer"
            title="Cast Alohomora"
          >
            Alohomora
          </button>
        </p>
        <p className="font-display">© Anno {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
