import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { loungeImage } from "@/lib/products";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Outdoor Services Rental" },
      { name: "description", content: "What clients say about India's premium event rental partner. 4.9 star average across 500+ events." },
      { property: "og:title", content: "Reviews — Outdoor Services Rental" },
      { property: "og:description", content: "4.9 ★ average across 500+ events." },
      { property: "og:image", content: loungeImage },
    ],
  }),
  component: Reviews,
});

const reviews = [
  { name: "Aditi & Rohan", event: "Wedding · Udaipur", body: "The restroom trailer alone had guests asking where we hired it from. The whole install was silent — we didn't see the crew once during the ceremony.", rating: 5 },
  { name: "Meera Kapoor", event: "Corporate Launch · Mumbai", body: "Our launch had 900 guests and we didn't lose a single beat. The sound system was concert-grade and the lounge zone looked like a magazine set.", rating: 5 },
  { name: "Netflix India", event: "Wrap Party · Goa", body: "Rapid rig on 4 hours notice, spotless VIP zone, and zero drama. We'll work with them on every project this year.", rating: 5 },
  { name: "The Leela Palace", event: "Gala Dinner · Bengaluru", body: "OSR's Pagoda tents matched our palette to the shade. Extraordinary attention to detail.", rating: 5 },
  { name: "Priya Sinha", event: "Sangeet · Delhi", body: "Guests still talk about the bathrooms. Genuinely. That says everything.", rating: 5 },
  { name: "Sunil Grover Productions", event: "Music Festival · Jaipur", body: "Three-day festival, 22,000 attendees, zero sanitation complaints. That's what we needed.", rating: 5 },
];

function Reviews() {
  return (
    <div className="pt-32">
      <section className="container-luxe py-16">
        <div className="max-w-3xl">
          <div className="eyebrow">Reviews</div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl text-forest-deep leading-[1.05]">
            4.9 ★ <span className="italic text-gold">across 500+ events.</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal/80">Read what our clients say — no filtering, no edits.</p>
        </div>
      </section>

      <section className="container-luxe pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <figure key={i} className="rounded-lg border border-border bg-card p-8">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-charcoal/85 leading-relaxed">"{r.body}"</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="font-display text-lg text-forest-deep">{r.name}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.event}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}