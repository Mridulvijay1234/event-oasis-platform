import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MessageCircle } from "lucide-react";
import { products, getProduct } from "@/lib/products";
import { SITE, whatsappUrl } from "@/lib/site";

const search = z.object({ product: z.string().optional() });

export const Route = createFileRoute("/booking")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Book a rental — Outdoor Services Rental" },
      { name: "description", content: "Book luxury event equipment on rent — restroom trailers, VIP AC toilets, hangars, stages, sound and lighting. Concierge confirms within 15 minutes." },
      { property: "og:title", content: "Book a luxury event rental" },
      { property: "og:description", content: "Reserve your dates. Concierge confirms in 15 minutes." },
    ],
  }),
  component: Booking,
});

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(24),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  product: z.string().min(1),
  date: z.string().min(1),
  city: z.string().trim().min(2).max(80),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

function Booking() {
  const { product: selected } = Route.useSearch();
  const initial = selected && getProduct(selected) ? selected : products[0].slug;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: f.get("name"),
      phone: f.get("phone"),
      email: f.get("email") || "",
      product: f.get("product"),
      date: f.get("date"),
      city: f.get("city"),
      notes: f.get("notes") || "",
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    const p = getProduct(parsed.data.product);
    const msg = `New booking request for ${SITE.name}
• Rental: ${p?.name ?? parsed.data.product}
• Date: ${parsed.data.date}
• City: ${parsed.data.city}
• Name: ${parsed.data.name}
• Phone: ${parsed.data.phone}
${parsed.data.email ? `• Email: ${parsed.data.email}\n` : ""}${parsed.data.notes ? `Notes: ${parsed.data.notes}` : ""}`;
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <div className="pt-32">
      <section className="container-luxe py-12">
        <div className="max-w-2xl">
          <div className="eyebrow">Booking enquiry</div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl text-forest-deep leading-[1.05]">
            Reserve your dates.<br /><span className="italic text-gold">Concierge confirms in 15 minutes.</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal/80">
            Send us your details and we'll respond on WhatsApp with availability and a confirmed quote.
          </p>
        </div>
      </section>

      <section className="container-luxe pb-24">
        <form onSubmit={onSubmit} className="max-w-2xl rounded-xl border border-border bg-card p-8 shadow-soft">
          <div className="grid gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Which rental?</span>
              <select name="product" defaultValue={initial} className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold">
                {products.map((p) => <option key={p.slug} value={p.slug}>{p.categoryName} · {p.name}</option>)}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Event date</span>
                <input name="date" type="date" required className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
                {errors.date && <span className="mt-1 block text-xs text-destructive">{errors.date}</span>}
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">City</span>
                <input name="city" maxLength={80} required className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
                {errors.city && <span className="mt-1 block text-xs text-destructive">{errors.city}</span>}
              </label>
            </div>

            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your name</span>
              <input name="name" maxLength={80} required className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
              {errors.name && <span className="mt-1 block text-xs text-destructive">{errors.name}</span>}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</span>
                <input name="phone" maxLength={24} required className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
                {errors.phone && <span className="mt-1 block text-xs text-destructive">{errors.phone}</span>}
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email (optional)</span>
                <input name="email" type="email" maxLength={200} className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
                {errors.email && <span className="mt-1 block text-xs text-destructive">{errors.email}</span>}
              </label>
            </div>

            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Notes (optional)</span>
              <textarea name="notes" rows={4} maxLength={1000} placeholder="Guest count, setup preferences, timing…" className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
            </label>
          </div>

          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 text-sm font-semibold text-ivory hover:bg-forest-deep">
            <MessageCircle className="h-4 w-4" /> Send booking to WhatsApp
          </button>

          {sent && (
            <div className="mt-4 rounded-md bg-champagne/60 px-4 py-3 text-sm text-forest-deep">
              Opened WhatsApp with your booking. A concierge will confirm shortly.
            </div>
          )}
        </form>
      </section>
    </div>
  );
}