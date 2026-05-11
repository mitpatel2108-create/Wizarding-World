import { useMemo } from "react";

export function Stars({ count = 120, className = "" }: { count?: number; className?: string }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.6 + 0.4,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.6 + 0.3,
      })),
    [count]
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 3}px rgba(255,255,255,0.7)`,
            animation: `flicker ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
