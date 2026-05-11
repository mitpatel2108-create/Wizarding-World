import { useEffect, useRef } from "react";

export function WandCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("wand-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const canvas = trailRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const trail: { x: number; y: number; life: number }[] = [];

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      trail.push({ x: mx, y: my, life: 1 });
      if (trail.length > 40) trail.shift();
    };
    const click = (e: MouseEvent) => {
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2;
        trail.push({ x: e.clientX + Math.cos(a) * 8, y: e.clientY + Math.sin(a) * 8, life: 1.4 });
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      ring.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      for (const p of trail) {
        p.life -= 0.04;
        if (p.life <= 0) continue;
        const r = 8 * p.life;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        g.addColorStop(0, `rgba(255, 220, 130, ${p.life * 0.9})`);
        g.addColorStop(0.4, `rgba(255, 170, 60, ${p.life * 0.4})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      while (trail.length && trail[0].life <= 0) trail.shift();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      window.removeEventListener("resize", resize);
      document.documentElement.classList.remove("wand-cursor");
    };
  }, []);

  return (
    <>
      <canvas ref={trailRef} className="pointer-events-none fixed inset-0 z-[9998]" />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-7 w-7 rounded-full border border-[var(--gold)]/60"
        style={{ boxShadow: "0 0 18px rgba(255,200,90,0.6)" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
        style={{ boxShadow: "0 0 10px 2px rgba(255,200,90,0.9)" }}
      />
    </>
  );
}
