import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Stars } from "@/components/magic/Stars";
import { Particles } from "@/components/magic/Particles";
import { RuneSeparator } from "@/components/magic/RuneSeparator";
import parchmentImg from "@/assets/parchment.jpg";
import headmasterImg from "@/assets/char-headmaster.jpg";
import deputyImg from "@/assets/char-deputy.jpg";
import potionsImg from "@/assets/char-potions.jpg";
import keeperImg from "@/assets/char-keeper.jpg";
import dreamerImg from "@/assets/char-dreamer.jpg";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Speak with the Portraits — Wizarding World" },
      { name: "description", content: "The frames stir at midnight. Choose a portrait, and ask what you would never dare ask in daylight." },
      { property: "og:title", content: "Speak with the Portraits — Wizarding World" },
      { property: "og:description", content: "Real-time conversations with the magical portraits of Hogwarts." },
    ],
  }),
  component: ChatPage,
});

interface Persona { id: string; name: string; role: string; image: string; greet: string; glow: string; }

const PERSONAS: Persona[] = [
  { id: "headmaster", name: "The Headmaster", role: "Sorcerer Supreme", image: headmasterImg,
    greet: "Ah. There you are. Lemon sweet?", glow: "oklch(0.70 0.18 240)" },
  { id: "deputy", name: "The Deputy", role: "Mistress of Transfiguration", image: deputyImg,
    greet: "Sit up straight. Then speak.", glow: "oklch(0.65 0.18 160)" },
  { id: "potions", name: "The Potions Master", role: "Keeper of the Dungeons", image: potionsImg,
    greet: "Try not to waste my time.", glow: "oklch(0.55 0.20 25)" },
  { id: "keeper", name: "The Keeper of Keys", role: "Gamekeeper", image: keeperImg,
    greet: "Come in, come in! Mind the kettle.", glow: "oklch(0.68 0.16 60)" },
  { id: "dreamer", name: "The Dreamer", role: "Reader of Invisible Things", image: dreamerImg,
    greet: "Oh… you found me. The wrackspurts said you would.", glow: "oklch(0.78 0.13 80)" },
];

interface Msg { role: "user" | "assistant"; content: string; }

function ChatPage() {
  const [persona, setPersona] = useState<Persona>(PERSONAS[0]);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: PERSONAS[0].greet }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const switchPersona = (p: Persona) => {
    if (loading) return;
    setPersona(p);
    setMessages([{ role: "assistant", content: p.greet }]);
    setError(null);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/character-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character: persona.id, messages: next }),
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "The portrait fell silent.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      let done = false;
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((m) => m.map((x, i) => (i === m.length - 1 ? { ...x, content: acc } : x)));
            }
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-12">
      <Stars count={60} />
      <Particles variant="dust" count={20} />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="font-display text-xs uppercase tracking-[0.5em] text-[var(--gold)]/70">Midnight Conversations</p>
          <h1 className="mt-6 font-display text-5xl text-gold md:text-6xl">Speak with the Portraits</h1>
          <RuneSeparator className="my-8" />
        </div>

        {/* Persona selector */}
        <div className="flex flex-wrap justify-center gap-3">
          {PERSONAS.map((p) => {
            const on = p.id === persona.id;
            return (
              <button key={p.id} onClick={() => switchPersona(p)}
                className="group relative flex items-center gap-3 border px-3 py-2 transition-all"
                style={{
                  borderColor: on ? p.glow : "color-mix(in oklab, var(--gold) 25%, transparent)",
                  background: on ? `${p.glow}22` : "transparent",
                  boxShadow: on ? `0 0 20px ${p.glow}55` : "none",
                }}>
                <img src={p.image} alt="" className="h-9 w-9 object-cover" loading="lazy" />
                <div className="text-left">
                  <p className="font-display text-[10px] uppercase tracking-[0.25em]" style={{ color: on ? p.glow : "var(--gold)" }}>{p.name}</p>
                  <p className="font-serif-magical text-[11px] italic text-[oklch(0.85_0.04_75)]/60">{p.role}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Chat parchment */}
        <div className="relative mt-10 grid gap-8 md:grid-cols-[260px_1fr]">
          {/* Portrait */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden border-[1.5px] border-[var(--gold)]/40"
              style={{ boxShadow: `0 30px 80px -20px ${persona.glow}, inset 0 0 60px ${persona.glow}33` }}>
              <div className="absolute inset-2 z-10 pointer-events-none border border-[var(--gold)]/30" />
              <img src={persona.image} alt={persona.name}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ animation: loading ? "flicker 2s ease-in-out infinite" : "none" }} />
              <div className="absolute inset-0"
                   style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)" }} />
            </div>
            <p className="mt-3 text-center font-display text-[10px] uppercase tracking-[0.3em]" style={{ color: persona.glow }}>{persona.name}</p>
          </div>

          {/* Messages */}
          <div className="relative flex h-[60vh] flex-col overflow-hidden border border-[var(--gold)]/40 shadow-arcane"
               style={{ backgroundImage: `url(${parchmentImg})`, backgroundSize: "cover" }}>
            <div className="absolute inset-0"
                 style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(60,30,5,0.45) 100%)" }} />
            <div ref={scrollRef} className="relative flex-1 space-y-5 overflow-y-auto p-6 md:p-8">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                  <p className="font-display text-[9px] uppercase tracking-[0.4em]"
                     style={{ color: m.role === "user" ? "oklch(0.30 0.10 30)" : persona.glow }}>
                    {m.role === "user" ? "You" : persona.name}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap font-serif-magical text-lg leading-relaxed text-[var(--ink)]">
                    {m.content || (loading && i === messages.length - 1 ? "…" : "")}
                  </p>
                </div>
              ))}
              {error && <p className="font-serif-magical italic text-[oklch(0.40_0.20_25)]">{error}</p>}
            </div>

            {/* Quill input */}
            <div className="relative border-t border-[oklch(0.30_0.10_30)]/30 bg-[oklch(0.85_0.07_75)]/40 p-4 backdrop-blur">
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-3">
                <span aria-hidden className="font-display text-2xl text-[oklch(0.30_0.10_30)]/60">✒</span>
                <input value={input} onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  placeholder="Speak softly…"
                  className="flex-1 bg-transparent font-serif-magical text-lg italic text-[var(--ink)] placeholder:text-[oklch(0.30_0.10_30)]/50 outline-none disabled:opacity-50" />
                <button type="submit" disabled={loading || !input.trim()}
                  className="border border-[oklch(0.30_0.10_30)]/60 bg-[oklch(0.20_0.10_30)]/10 px-4 py-2 font-display text-[10px] uppercase tracking-[0.3em] text-[oklch(0.25_0.12_30)] transition-all hover:bg-[oklch(0.20_0.10_30)]/25 disabled:opacity-40">
                  {loading ? "…" : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
