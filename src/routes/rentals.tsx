import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { categories, products, formatINR } from "@/lib/products";

const search = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/rentals")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Rentals — Luxury Event Equipment on Lease | Outdoor Services Rental" },
      { name: "description", content: "Browse luxury toilet trailers, VIP AC portable toilets, German hangars, pagoda tents, stages, sound, lighting and lounge furniture. Pan-India delivery." },
      { property: "og:title", content: "Luxury event rentals — India" },
      { property: "og:description", content: "Full catalogue of premium event rentals with concierge planning." },
    ],
  }),
  component: Rentals,
});

function Rentals() {
  const { category } = Route.useSearch();
  const [active, setActive] = useState<string | undefined>(category);
  const filtered = active ? products.filter((p) => p.category === active) : products;

  return (
    <div className="pt-32">
      <section className="container-luxe py-16">
        <div className="max-w-3xl">
          <div className="eyebrow">Rentals catalogue</div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl text-forest-deep leading-[1.05]">
            The full inventory, <span className="italic text-gold">on lease.</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal/80">
            Every piece we own — filterable by category. Prices are indicative; final quotes account
            for dates, city and setup complexity.
          </p>
        </div>
      </section>

      <section className="container-luxe">
        <div className="flex flex-wrap gap-2 border-y border-border py-6">
          <button
            onClick={() => setActive(undefined)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              !active ? "bg-forest text-ivory" : "border border-border text-forest-deep hover:bg-champagne/40"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                active === c.slug ? "bg-forest text-ivory" : "border border-border text-forest-deep hover:bg-champagne/40"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      <section className="container-luxe py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              to="/rentals/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-forest/10">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-ivory/95 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-forest-deep">
                  {p.categoryName}
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl text-forest-deep group-hover:text-gold transition-colors">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.tagline}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display text-lg text-gold">{formatINR(p.price)}</div>
                  <div className="text-[11px] text-muted-foreground">{p.priceUnit}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center text-muted-foreground">No products in this category yet.</div>
        )}
      </section>
    </div>
  );
}