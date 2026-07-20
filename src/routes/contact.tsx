import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Outdoor Services Rental" },
      { name: "description", content: "Speak to a concierge planner. Call, email or WhatsApp us — 24/7 across India." },
      { property: "og:title", content: "Contact Outdoor Services Rental" },
      { property: "og:description", content: "Concierge on call, 24/7." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(6).max(24),
  message: z.string().trim().min(10, "Tell us a bit more").max(2000),
});

function Contact() {
  const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema>, string>>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: form.get("message"),
    });
    if (!parsed.success) {
      const errs: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as keyof z.infer<typeof schema>;
        errs[path] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    const wa = whatsappUrl(
      `New enquiry from ${parsed.data.name} (${parsed.data.email}, ${parsed.data.phone}):\n\n${parsed.data.message}`
    );
    window.open(wa, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <div className="pt-32">
      <section className="container-luxe py-16 grid gap-16 lg:grid-cols-2">
        <div>
          <div className="eyebrow">Contact</div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl text-forest-deep leading-[1.05]">
            One conversation.<br /><span className="italic text-gold">Every answer.</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal/80 max-w-md">
            Reach us any way you prefer. A concierge planner responds within 15 minutes during working hours.
          </p>

          <div className="mt-10 space-y-5">
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-4 group">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne text-forest-deep"><Phone className="h-5 w-5" /></span>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Call</div>
                <div className="font-display text-xl text-forest-deep group-hover:text-gold">{SITE.phone}</div>
              </div>
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 group">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne text-forest-deep"><Mail className="h-5 w-5" /></span>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Email</div>
                <div className="font-display text-xl text-forest-deep group-hover:text-gold">{SITE.email}</div>
              </div>
            </a>
            <a href={whatsappUrl("Hi Outdoor Services Rental, I'd like to talk.")} target="_blank" rel="noreferrer noopener" className="flex items-center gap-4 group">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne text-forest-deep"><MessageCircle className="h-5 w-5" /></span>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">WhatsApp</div>
                <div className="font-display text-xl text-forest-deep group-hover:text-gold">Message us instantly</div>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne text-forest-deep"><MapPin className="h-5 w-5" /></span>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Cities</div>
                <div className="font-display text-xl text-forest-deep">{SITE.address}</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-8 shadow-soft">
          <h2 className="font-display text-3xl text-forest-deep">Send us a note</h2>
          <p className="mt-2 text-sm text-muted-foreground">We'll route it to the right planner and reply on WhatsApp.</p>

          <div className="mt-6 grid gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your name</span>
              <input name="name" maxLength={80} required className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold" />
              {errors.name && <span className="mt-1 block text-xs text-destructive">{errors.name}</span>}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</span>
                <input name="email" type="email" maxLength={200} required className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold" />
                {errors.email && <span className="mt-1 block text-xs text-destructive">{errors.email}</span>}
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</span>
                <input name="phone" maxLength={24} required className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold" />
                {errors.phone && <span className="mt-1 block text-xs text-destructive">{errors.phone}</span>}
              </label>
            </div>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your message</span>
              <textarea name="message" rows={5} maxLength={2000} required className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold" />
              {errors.message && <span className="mt-1 block text-xs text-destructive">{errors.message}</span>}
            </label>
          </div>

          <button type="submit" className="mt-6 w-full rounded-full bg-forest px-6 py-4 text-sm font-semibold text-ivory hover:bg-forest-deep transition-colors">
            Send message
          </button>
          {sent && <div className="mt-4 rounded-md bg-champagne/60 px-4 py-3 text-sm text-forest-deep">Opened WhatsApp with your message. We'll reply within 15 minutes.</div>}
        </form>
      </section>
    </div>
  );
}