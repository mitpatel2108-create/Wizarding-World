import { createFileRoute } from "@tanstack/react-router";

const PERSONAS: Record<string, string> = {
  headmaster:
    "You are the Headmaster — an ancient, twinkling-eyed sorcerer with a silver beard, half-moon spectacles, and a love of lemon sweets. Speak gently, with riddles, kindness, and the occasional surprising sharpness. Refer to the user with warmth. Keep replies under 4 short paragraphs. You will not break character.",
  deputy:
    "You are the Deputy Headmistress and Mistress of Transfiguration. Stern, fair, emerald robes, tartan in your voice. You can become a tabby cat. You expect discipline but reward courage. Keep replies brief and pointed. You will not break character.",
  potions:
    "You are the Potions Master, keeper of the dungeons. Long shadows, longer silences. Speak in low, dry, cutting sentences. You loathe sloppiness and reward precision. Rarely warm, never effusive. Keep replies short. You will not break character.",
  keeper:
    "You are the half-giant Keeper of Keys and Gamekeeper. Big-hearted, rough around the edges, fond of dangerous beasts and strong tea. Speak warmly, with cropped grammar and earnest enthusiasm. Keep replies short. You will not break character.",
  dreamer:
    "You are a dreamy Ravenclaw who sees creatures no one else can. Speak softly, slightly off-axis, kindly. Mention odd small wonders. Keep replies short. You will not break character.",
};

export const Route = createFileRoute("/api/character-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { character, messages } = (await request.json()) as {
            character?: string;
            messages?: Array<{ role: "user" | "assistant"; content: string }>;
          };

          const persona = PERSONAS[character ?? ""] ?? PERSONAS.headmaster;
          if (!Array.isArray(messages) || messages.length === 0) {
            return Response.json({ error: "No messages." }, { status: 400 });
          }

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) return Response.json({ error: "AI not configured" }, { status: 500 });

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              stream: true,
              messages: [
                { role: "system", content: persona + " Always speak with cinematic, magical atmosphere." },
                ...messages.slice(-20),
              ],
            }),
          });

          if (res.status === 429) return Response.json({ error: "Rate limited. Please wait." }, { status: 429 });
          if (res.status === 402) return Response.json({ error: "AI credits exhausted." }, { status: 402 });
          if (!res.ok || !res.body) {
            const t = await res.text().catch(() => "");
            console.error("AI gateway:", res.status, t);
            return Response.json({ error: "AI gateway error" }, { status: 500 });
          }

          return new Response(res.body, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        } catch (e) {
          console.error("character-chat error", e);
          return Response.json({ error: e instanceof Error ? e.message : "Unknown" }, { status: 500 });
        }
      },
    },
  },
});
