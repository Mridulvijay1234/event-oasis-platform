import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  eventType: z.string().trim().min(2).max(80),
  guestCount: z.number().int().min(1).max(50000),
  city: z.string().trim().min(2).max(80),
  eventDate: z.string().trim().max(40).optional().default(""),
  duration: z.string().trim().max(40).optional().default("1 day"),
  budget: z.string().trim().max(40).optional().default(""),
  vibe: z.string().trim().max(200).optional().default(""),
  needs: z.array(z.string().max(60)).max(30).optional().default([]),
});

export type QuoteInput = z.infer<typeof Input>;

export const generateQuote = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => Input.parse(raw))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const system = `You are the senior event planner at Outdoor Services Rental, an India-based luxury outdoor event infrastructure company. You quote in INR (₹). Be concise, decisive and premium.

Return STRICT markdown with these sections in this exact order:
### Recommended Package
A one-paragraph pitch for the package (2-3 sentences).
### Inventory
A markdown table with columns: Item | Quantity | Notes.
### Estimated Investment
A short breakdown in ₹ with a single bold total range (e.g. **₹4,50,000 – ₹5,80,000**). Add a one-line note that final pricing depends on site visit and dates.
### Next Steps
Three short bullet points inviting the client to confirm the date, share the venue location and book a site visit.

Never invent prices outside a reasonable Indian event market range. Never mention that you are an AI.`;

    const user = `Event: ${data.eventType}
Guests: ${data.guestCount}
City: ${data.city}
Date: ${data.eventDate || "TBD"}
Duration: ${data.duration}
Budget: ${data.budget || "flexible"}
Vibe / theme: ${data.vibe || "luxury, warm, editorial"}
Requested categories: ${data.needs.join(", ") || "planner's choice"}

Available categories we can rent: Luxury Toilet Trailers, VIP AC Portable Toilets, Standard Portable Toilets, German Hangars, Pagoda Tents, Chesterfield Sofas, Chiavari Chairs, Modular Stages, Warm Uplighting, Line-Array Sound, Portable ACs, Mist Fans, Air Coolers.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      if (res.status === 429) throw new Error("Our AI planner is busy — please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please contact us directly for a quote.");
      throw new Error(`AI planner error (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = json.choices?.[0]?.message?.content?.trim() ?? "";
    return { quote: content };
  });