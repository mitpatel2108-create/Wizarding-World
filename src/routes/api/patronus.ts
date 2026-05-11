import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Body = z.object({
  answers: z.array(z.object({ q: z.string(), a: z.string() })).min(1).max(20),
});

export const Route = createFileRoute("/api/patronus")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const parsed = Body.safeParse(json);
          if (!parsed.success) return Response.json({ error: "Invalid input" }, { status: 400 });

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) return Response.json({ error: "AI not configured" }, { status: 500 });

          const summary = parsed.data.answers.map((x) => `Q: ${x.q}\nA: ${x.a}`).join("\n\n");

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                {
                  role: "system",
                  content:
                    "You are an old, kind professor teaching the Patronus Charm. Based on the student's reflections, divine the silver animal that would burst from their wand. Choose a real animal (not a fantasy creature unless clearly fitting). Speak gently and reverently.",
                },
                { role: "user", content: summary },
              ],
              tools: [
                {
                  type: "function",
                  function: {
                    name: "reveal_patronus",
                    description: "Reveal the student's Patronus.",
                    parameters: {
                      type: "object",
                      properties: {
                        animal: { type: "string", description: "Single animal name, lowercase, e.g. 'stag', 'otter', 'lynx'." },
                        description: { type: "string", description: "2-3 sentences in the professor's reverent voice describing how the Patronus appears and what it means about the caster." },
                        memory_hint: { type: "string", description: "A short, evocative line about the kind of happy memory that summoned it." },
                      },
                      required: ["animal", "description", "memory_hint"],
                      additionalProperties: false,
                    },
                  },
                },
              ],
              tool_choice: { type: "function", function: { name: "reveal_patronus" } },
            }),
          });

          if (res.status === 429) return Response.json({ error: "Rate limited. Please wait." }, { status: 429 });
          if (res.status === 402) return Response.json({ error: "AI credits exhausted." }, { status: 402 });
          if (!res.ok) {
            const t = await res.text();
            console.error("AI gateway:", res.status, t);
            return Response.json({ error: "AI gateway error" }, { status: 500 });
          }

          const data = await res.json();
          const call = data?.choices?.[0]?.message?.tool_calls?.[0];
          const args = call?.function?.arguments ? JSON.parse(call.function.arguments) : null;
          if (!args) return Response.json({ error: "The charm faltered." }, { status: 500 });
          return Response.json(args);
        } catch (e) {
          console.error("patronus error", e);
          return Response.json({ error: e instanceof Error ? e.message : "Unknown" }, { status: 500 });
        }
      },
    },
  },
});
