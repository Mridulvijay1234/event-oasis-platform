import { createFileRoute, Link } from "@tanstack/react-router";
import { loungeImage, hangarImage } from "@/lib/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Outdoor Services Rental" },
      { name: "description", content: "India's specialist in luxury event infrastructure. 500+ events, 12 cities, one concierge partner from brief to bump-out." },
      { property: "og:title", content: "About Outdoor Services Rental" },
      { property: "og:description", content: "Meet the team behind India's premium event rental partner." },
      { property: "og:image", content: loungeImage },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="pt-32">
      <section className="container-luxe py-20">
        <div className="max-w-3xl">
          <div className="eyebrow">About us</div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl text-forest-deep leading-[1.05]">
            Ten years of building beautiful <span className="italic text-gold">temporary places.</span>
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-charcoal/80">
            Outdoor Services Rental was founded in Bengaluru in 2016 by a group of event producers who
            were tired of unreliable subcontractors. We built our own inventory, hired our own crews,
            and set out to deliver events with the same craft you'd expect from a five-star hotel.
          </p>
        </div>
      </section>

      <section className="relative">
        <img src={hangarImage} alt="German hangar at night" className="h-[60vh] w-full object-cover" loading="lazy" />
      </section>

      <section className="container-luxe py-24 grid md:grid-cols-3 gap-16">
        {[
          { title: "Crafted, not sourced", body: "We own our fleet — from marble-lined trailers to modular stages. Every piece is inspected, serviced and photographed after each event." },
          { title: "One planner. Zero handoffs.", body: "You'll speak to the same concierge from your first WhatsApp to the last truck leaving the venue." },
          { title: "Discreet, on time, insured", body: "Uniformed crews, timed installs and full public-liability cover on every deployment." },
        ].map((v) => (
          <div key={v.title}>
            <h3 className="font-display text-2xl text-forest-deep">{v.title}</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">{v.body}</p>
          </div>
        ))}
      </section>

      <section className="container-luxe pb-24">
        <div className="rounded-xl bg-forest-deep p-12 text-ivory">
          <div className="grid gap-10 md:grid-cols-4 text-center md:text-left">
            {[["500+", "Events"], ["12", "Cities"], ["4.9 ★", "Client rating"], ["10 yrs", "In the field"]].map(([k, v]) => (
              <div key={v}>
                <div className="font-display text-4xl text-gold">{k}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-ivory/60">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/quote" className="rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-forest-deep">Plan with our AI</Link>
            <Link to="/contact" className="rounded-full border border-ivory/30 px-6 py-3 text-sm font-medium">Talk to a planner</Link>
          </div>
        </div>
      </section>
    </div>
  );
}