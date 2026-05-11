import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Body = z.object({
  answers: z.array(z.object({ q: z.string(), a: z.string() })).min(1).max(20),
});

export const Route = createFileRoute("/api/sorting-hat")({
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

          const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "gpt-4.1-mini",
              messages: [
                {
                  role: "system",
                  content:
                    "You are the ancient, brooding Sorting Hat of Hogwarts. Read the candidate's answers and decide which house suits them best. Speak in the Hat's voice — wry, perceptive, a touch dramatic. Choose ONE: gryffindor, slytherin, ravenclaw, hufflepuff. Then return your verdict.",
                },
                { role: "user", content: summary },
              ],
              tools: [
                {
                  type: "function",
                  function: {
                    name: "sort_into_house",
                    description: "Return the chosen house and the Hat's spoken verdict.",
                    parameters: {
                      type: "object",
                      properties: {
                        house: { type: "string", enum: ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"] },
                        verdict: { type: "string", description: "1-3 sentences in the Sorting Hat's voice." },
                        trait: { type: "string", description: "A single defining trait the Hat noticed." },
                      },
                      required: ["house", "verdict", "trait"],
                      additionalProperties: false,
                    },
                  },
                },
              ],
              tool_choice: { type: "function", function: { name: "sort_into_house" } },
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
          let args = null;

try {
  args = call?.function?.arguments
    ? JSON.parse(call.function.arguments)
    : null;
} catch {
  return Response.json(
    { error: "The Hat could not understand the prophecy." },
    { status: 500 }
  );
}
          if (!args) return Response.json({ error: "Hat fell silent." }, { status: 500 });
          return Response.json(args);
        } catch (e) {
          console.error("sorting-hat error", e);
          return Response.json({ error: e instanceof Error ? e.message : "Unknown" }, { status: 500 });
        }
      },
    },
  },
});
