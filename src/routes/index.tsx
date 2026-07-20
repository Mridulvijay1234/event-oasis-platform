import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Star } from "lucide-react";
import { heroImage, categories, products, loungeImage } from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = products.slice(0, 6);
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <img
          src={heroImage}
          alt="Luxury outdoor wedding under a forest-green pagoda tent with warm gold lighting"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-forest-deep/20" />

        <div className="container-luxe relative flex min-h-screen flex-col justify-end pb-24 pt-40 text-ivory">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-gold">
              <span className="h-px w-8 bg-gold" /> India · Est. 2016
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-[88px]">
              Luxury Event Infrastructure.<br />
              <span className="italic text-gold">Delivered end to end.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-ivory/85 leading-relaxed">
              Marble-and-brass restroom trailers. Clear-span German hangars. Stages, sound, lighting
              and lounge furniture — planned by concierges, installed by specialists.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/quote"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-4 text-sm font-semibold text-forest-deep shadow-luxe transition-transform hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4" />
                Get an AI quote in 30s
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/rentals"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-6 py-4 text-sm font-medium text-ivory hover:bg-ivory/10"
              >
                Browse rentals
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-ivory/15 pt-8 md:grid-cols-4">
            {[
              { k: "500+", v: "Events delivered" },
              { k: "24 / 7", v: "Concierge on call" },
              { k: "12 cities", v: "Pan-India reach" },
              { k: "4.9 ★", v: "Average client rating" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl text-gold">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-ivory/60">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-28 md:py-36">
        <div className="container-luxe">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <div className="eyebrow">Rental categories</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl text-forest-deep">
                Every detail of your event, on lease.
              </h2>
            </div>
            <Link to="/rentals" className="inline-flex items-center gap-2 text-sm font-medium text-forest-deep hover:text-gold">
              View full catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                to="/rentals"
                search={{ category: c.slug } as never}
                className="group relative aspect-[4/5] overflow-hidden rounded-md bg-forest-deep"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory">
                  <h3 className="font-display text-2xl">{c.name}</h3>
                  <p className="mt-2 text-sm text-ivory/75">{c.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-gold">
                    Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-28 bg-champagne/40">
        <div className="container-luxe">
          <div className="max-w-2xl">
            <div className="eyebrow">Signature inventory</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-forest-deep">
              Hand-picked pieces our clients ask for again.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
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
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{p.categoryName}</div>
                    <h3 className="mt-1 font-display text-xl text-forest-deep">{p.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg text-gold">₹{p.price.toLocaleString("en-IN")}</div>
                    <div className="text-[11px] text-muted-foreground">{p.priceUnit}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI QUOTE CTA */}
      <section className="py-28">
        <div className="container-luxe">
          <div className="relative overflow-hidden rounded-xl bg-forest-deep p-10 md:p-16 shadow-luxe">
            <img
              src={loungeImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-25"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/90 to-forest-deep/40" />
            <div className="relative max-w-2xl text-ivory">
              <div className="eyebrow text-gold"><Sparkles className="h-3.5 w-3.5" /> AI Event Planner</div>
              <h2 className="mt-5 font-display text-4xl md:text-5xl">
                Tell us about your event.<br />
                <span className="italic text-gold">We'll build the package.</span>
              </h2>
              <p className="mt-5 text-ivory/80 max-w-lg">
                Our AI planner reads your brief and returns a full inventory list, layout suggestions
                and an investment estimate in seconds — reviewed by our concierge before delivery.
              </p>
              <Link
                to="/quote"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold text-forest-deep hover:-translate-y-0.5 transition-transform"
              >
                Generate my quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-28">
        <div className="container-luxe grid gap-16 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Insured & serviced", body: "Every unit is deep-cleaned, insured and inspected before dispatch. On-site attendants for VIP zones." },
            { icon: Truck, title: "Pan-India logistics", body: "Fleet across 12 cities. GPS-tracked, timed delivery — no missed cues, no delays." },
            { icon: Star, title: "Concierge planning", body: "One planner from brief to bump-out. You approve; we execute end to end." },
          ].map((f) => (
            <div key={f.title}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-champagne text-forest-deep">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-2xl text-forest-deep">{f.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
