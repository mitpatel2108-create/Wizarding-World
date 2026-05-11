import castleUrl from "@/assets/castle-hero.jpg";
import { useEffect, useRef } from "react";

/**
 * Cinematic parallax castle scene.
 * Uses the generated castle image with multi-layer parallax (mouse + scroll),
 * floating lanterns, owl silhouette, and atmospheric glow.
 */
export function CastleScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const sky = useRef<HTMLDivElement>(null);
  const castle = useRef<HTMLDivElement>(null);
  const fog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      if (sky.current) sky.current.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0) scale(1.06)`;
      if (castle.current) castle.current.style.transform = `translate3d(${x * -18}px, ${y * -10}px, 0) scale(1.04)`;
      if (fog.current) fog.current.style.transform = `translate3d(${x * -28}px, ${y * -4}px, 0)`;
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (wrap.current) wrap.current.style.setProperty("--sy", `${y * 0.3}px`);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden">
      {/* Deep sky gradient */}
      <div
        ref={sky}
        className="absolute -inset-8"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.16 0.04 260) 0%, oklch(0.06 0.02 260) 70%)",
          willChange: "transform",
        }}
      />

      {/* Castle image */}
      <div
        ref={castle}
        className="absolute -inset-6"
        style={{
          backgroundImage: `url(${castleUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center 55%",
          transform: "translate3d(0,0,0) scale(1.04)",
          willChange: "transform",
          translate: "0 var(--sy, 0)",
        }}
      />

      {/* Atmospheric vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(5,8,20,0.55) 70%, rgba(2,4,10,0.95) 100%)",
        }}
      />

      {/* Foreground fog */}
      <div
        ref={fog}
        className="absolute -inset-x-12 bottom-0 h-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(140,160,210,0.28), transparent 70%)",
          filter: "blur(28px)",
          willChange: "transform",
        }}
      />

      {/* Floating lanterns */}
      {[
        { l: "12%", t: "55%", d: 0 },
        { l: "22%", t: "70%", d: 1.4 },
        { l: "78%", t: "60%", d: 2.2 },
        { l: "88%", t: "75%", d: 0.8 },
        { l: "8%", t: "82%", d: 3 },
      ].map((p, i) => (
        <div
          key={i}
          className="pointer-events-none absolute"
          style={{ left: p.l, top: p.t, animation: `float-slow ${6 + i}s ease-in-out ${p.d}s infinite` }}
        >
          <div
            className="h-2 w-2 rounded-full bg-[var(--candle)] animate-flicker"
            style={{ boxShadow: "0 0 22px 6px rgba(255,170,80,0.85), 0 0 60px 12px rgba(255,140,40,0.4)" }}
          />
        </div>
      ))}

      {/* Owl silhouette flying across */}
      <Owl />
    </div>
  );
}

function Owl() {
  return (
    <svg
      viewBox="0 0 100 30"
      className="pointer-events-none absolute h-6 w-24 opacity-70"
      style={{
        top: "22%",
        left: "-10%",
        animation: "owl-fly 22s linear infinite",
      }}
    >
      <style>{`
        @keyframes owl-fly { 0% { transform: translateX(0) translateY(0); } 100% { transform: translateX(120vw) translateY(-30px); } }
        @keyframes wing { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(0.4); } }
        .wing { transform-origin: 50% 50%; animation: wing 0.7s ease-in-out infinite; }
      `}</style>
      <g fill="black" opacity="0.9">
        <ellipse cx="50" cy="15" rx="6" ry="3" />
        <path className="wing" d="M50 15 Q35 2 20 14 Q35 10 50 15 Z" />
        <path className="wing" d="M50 15 Q65 2 80 14 Q65 10 50 15 Z" />
      </g>
    </svg>
  );
}
