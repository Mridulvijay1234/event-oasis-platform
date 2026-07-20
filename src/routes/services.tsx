import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { loungeImage } from "@/lib/products";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Outdoor Services Rental" },
      { name: "description", content: "End-to-end event services: planning, rentals, installation, on-site management and bump-out. Weddings, corporate events, film shoots." },
      { property: "og:title", content: "Event services from planning to bump-out" },
      { property: "og:description", content: "One concierge partner for luxury outdoor events across India." },
      { property: "og:image", content: loungeImage },
    ],
  }),
  component: Services,
});

const services = [
  { title: "Weddings & receptions", body: "Full outfit for 200–2000 guest weddings — luxury restrooms, hangars, stages, sound, lighting and lounge furniture.", bullets: ["Concierge planner", "Design mock-ups", "On-site attendants", "24/7 support"] },
  { title: "Corporate & brand events", body: "Product launches, offsites and conferences with cinema-grade sound, lighting and green rooms.", bullets: ["AV engineering", "Green room fit-out", "Branded signage", "Broadcast-ready stages"] },
  { title: "Film & production", body: "Location-agnostic infrastructure for shoots — silent gensets, luxury restrooms, cast lounges.", bullets: ["Silent gensets", "Cast trailers", "Rapid rig / de-rig", "Discreet placements"] },
  { title: "Public & government events", body: "Large-scale portable sanitation and crowd infrastructure with compliance documentation.", bullets: ["Volume sanitation", "Compliance docs", "Trained staff", "Insurance included"] },
  { title: "Private galas & VIP", body: "Discreet, high-touch service for private hosts — including staff, security liaison and NDAs.", bullets: ["NDA available", "Uniformed crew", "White-glove setup"] },
  { title: "Festival & concert", body: "Multi-day festival infrastructure — luxury artist zones, staging, sound and full sanitation grids.", bullets: ["Artist compounds", "Line-array PA", "Sanitation grid", "Waste management"] },
];

function Services() {
  return (
    <div className="pt-32">
      <section className="container-luxe py-16">
        <div className="max-w-3xl">
          <div className="eyebrow">Services</div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl text-forest-deep leading-[1.05]">
            One partner. <span className="italic text-gold">Every requirement.</span>
          </h1>
          <p className="mt-8 text-lg text-charcoal/80 max-w-2xl">
            From the first mood board to the last truck leaving the venue, we handle every layer of
            infrastructure. Below is what we build best.
          </p>
        </div>
      </section>

      <section className="container-luxe pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="rounded-lg border border-border bg-card p-8 hover:shadow-soft transition-shadow">
              <h3 className="font-display text-2xl text-forest-deep">{s.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
              <ul className="mt-6 grid gap-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link to="/quote" className="rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-forest-deep">Get an instant AI quote</Link>
          <Link to="/rentals" className="rounded-full border border-forest/30 px-6 py-3 text-sm font-medium text-forest-deep">Browse rentals</Link>
        </div>
      </section>
    </div>
  );
}