import { useEffect, useRef } from "react";

type Variant = "ember" | "dust" | "snow" | "spark";

interface Props {
  variant?: Variant;
  count?: number;
  className?: string;
}

const palette: Record<Variant, string[]> = {
  ember: ["#ff8a3d", "#ffb066", "#ff5a1f", "#ffd494"],
  dust: ["#f5e6b8", "#d4b66a", "#fff3c8"],
  snow: ["#e6efff", "#ffffff", "#bcd0ff"],
  spark: ["#ffe9a8", "#fff", "#ffd166"],
};

export function Particles({ variant = "ember", count = 60, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = palette[variant];
    const parts = Array.from({ length: count }).map(() => spawn());

    function spawn() {
      const baseSize = variant === "dust" ? 1.2 : variant === "snow" ? 2.2 : 1.6;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (variant === "snow" ? 0.4 : 0.3),
        vy: variant === "snow" ? Math.random() * 0.6 + 0.2 : -(Math.random() * 0.7 + 0.2),
        size: Math.random() * baseSize + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 1,
        ttl: Math.random() * 200 + 200,
      };
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;
        const alpha = Math.sin((p.life / p.ttl) * Math.PI);
        if (p.life > p.ttl || p.y < -10 || p.y > h + 10) {
          Object.assign(p, spawn());
          if (variant === "snow") p.y = -10;
          else p.y = h + 10;
        }
        ctx.beginPath();
        const r = p.size * (1 + alpha * 0.6);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.globalAlpha = Math.max(0, alpha) * 0.9;
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [variant, count]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
