export function Fog({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-x-0 -bottom-1/4 h-2/3 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 30% 80%, rgba(180,200,255,0.18), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(120,140,200,0.16), transparent 65%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(8,12,28,0.75) 60%, rgba(5,8,20,1))",
        }}
      />
    </div>
  );
}
