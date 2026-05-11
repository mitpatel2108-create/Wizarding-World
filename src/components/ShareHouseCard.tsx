// src/components/ShareHouseCard.tsx
// Drop this into your sorting hat result page (or profile page).
// Renders a canvas card and lets users download it as a PNG.

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { House } from "@/hooks/useWizardProfile";

const HOUSE_CONFIG: Record<
  NonNullable<House>,
  { name: string; colours: [string, string]; sigil: string; motto: string }
> = {
  gryffindor: {
    name: "Gryffindor",
    colours: ["#740001", "#D3A625"],
    sigil: "🦁",
    motto: "Nerve, Bravery, Chivalry",
  },
  slytherin: {
    name: "Slytherin",
    colours: ["#1a472a", "#AAAAAA"],
    sigil: "🐍",
    motto: "Ambition, Cunning, Resourcefulness",
  },
  ravenclaw: {
    name: "Ravenclaw",
    colours: ["#0e1a40", "#946B2D"],
    sigil: "🦅",
    motto: "Wit, Wisdom, Learning",
  },
  hufflepuff: {
    name: "Hufflepuff",
    colours: ["#ecb939", "#372e29"],
    sigil: "🦡",
    motto: "Loyalty, Patience, Hard Work",
  },
};

interface Props {
  house: House;
  wizardName?: string;
}

export function ShareHouseCard({ house, wizardName = "Witch / Wizard" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!house || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 800, H = 450;
    canvas.width = W;
    canvas.height = H;

    const cfg = HOUSE_CONFIG[house];

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#080b16");
    bg.addColorStop(1, cfg.colours[0] + "55");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Star field
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const r = Math.random() * 1.2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Border
    ctx.strokeStyle = cfg.colours[1] + "88";
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, W - 32, H - 32);

    // Inner border
    ctx.strokeStyle = cfg.colours[1] + "33";
    ctx.lineWidth = 1;
    ctx.strokeRect(24, 24, W - 48, H - 48);

    // Sigil
    ctx.font = "100px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(cfg.sigil, W / 2, H / 2 - 60);

    // House name
    ctx.font = "bold 56px Georgia, serif";
    ctx.fillStyle = cfg.colours[1];
    ctx.textAlign = "center";
    ctx.fillText(cfg.name, W / 2, H / 2 + 40);

    // Wizard name
    ctx.font = "22px Georgia, serif";
    ctx.fillStyle = "rgba(232,224,204,0.8)";
    ctx.fillText(wizardName, W / 2, H / 2 + 82);

    // Motto
    ctx.font = "italic 16px Georgia, serif";
    ctx.fillStyle = cfg.colours[1] + "99";
    ctx.fillText(cfg.motto, W / 2, H / 2 + 120);

    // Watermark
    ctx.font = "12px monospace";
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.textAlign = "right";
    ctx.fillText("wizardingworld.mitpatel2108.workers.dev", W - 32, H - 32);
  }, [house, wizardName]);

  function download() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${house}-house-card.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  if (!house) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 mt-8"
    >
      <canvas
        ref={canvasRef}
        className="w-full max-w-lg rounded border border-[#2a2a3a]"
        style={{ aspectRatio: "16/9" }}
      />
      <button
        onClick={download}
        className="px-6 py-3 border border-[#9b8760] text-[#9b8760] text-sm tracking-widest uppercase hover:bg-[#9b8760]/10 transition-all duration-300"
      >
        ↓ Download House Card
      </button>
    </motion.div>
  );
}
