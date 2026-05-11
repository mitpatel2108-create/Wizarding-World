import { useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard({ children, className = "", intensity = 12 }: Props) {
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50, on: false });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        setT({
          rx: (0.5 - y) * intensity,
          ry: (x - 0.5) * intensity,
          mx: x * 100,
          my: y * 100,
          on: true,
        });
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0, mx: 50, my: 50, on: false })}
      className={`relative transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
      }}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: t.on ? 1 : 0,
          background: `radial-gradient(circle at ${t.mx}% ${t.my}%, rgba(255,210,120,0.18), transparent 50%)`,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
