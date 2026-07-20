import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, Sparkles, MessageCircle } from "lucide-react";
import { generateQuote, type QuoteInput } from "@/lib/quote.functions";
import { whatsappUrl } from "@/lib/site";
import { loungeImage } from "@/lib/products";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "AI Quote Generator — Outdoor Services Rental" },
      { name: "description", content: "Tell us about your event and our AI planner will return a full inventory list, layout guidance and an investment estimate — in seconds." },
      { property: "og:title", content: "AI Event Quote Generator" },
      { property: "og:description", content: "A full package proposal in under a minute." },
      { property: "og:image", content: loungeImage },
    ],
  }),
  component: Quote,
});

const NEED_OPTIONS = [
  "Luxury Toilet Trailers",
  "VIP AC Portable Toilets",
  "Standard Portable Toilets",
  "German Hangars",
  "Pagoda Tents",
  "Furniture / Sofas",
  "Banquet Chairs",
  "Stage",
  "Lighting",
  "Sound",
  "Portable ACs / Coolers",
];

function Quote() {
  const runQuote = useServerFn(generateQuote);
  const mutation = useMutation({
    mutationFn: (payload: QuoteInput) => runQuote({ data: payload }),
  });

  const [needs, setNeeds] = useState<string[]>([]);

  function toggle(n: string) {
    setNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    mutation.mutate({
      eventType: String(f.get("eventType") || ""),
      guestCount: Number(f.get("guestCount") || 0),
      city: String(f.get("city") || ""),
      eventDate: String(f.get("eventDate") || ""),
      duration: String(f.get("duration") || "1 day"),
      budget: String(f.get("budget") || ""),
      vibe: String(f.get("vibe") || ""),
      needs,
    });
  }

  return (
    <div className="pt-32">
      <section className="container-luxe py-12">
        <div className="max-w-3xl">
          <div className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> AI Event Planner</div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl text-forest-deep leading-[1.05]">
            Your quote, <span className="italic text-gold">in seconds.</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal/80">
            Fill in the brief. Our AI planner returns a full package, an inventory table and an
            investment estimate — reviewed by our concierge before delivery.
          </p>
        </div>
      </section>

      <section className="container-luxe pb-24 grid gap-10 lg:grid-cols-[420px_1fr]">
        <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-8 shadow-soft h-fit">
          <div className="grid gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Event type</span>
              <input name="eventType" required maxLength={80} placeholder="Wedding reception" className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Guests</span>
                <input name="guestCount" type="number" min={1} max={50000} defaultValue={300} required className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">City</span>
                <input name="city" required maxLength={80} placeholder="Bengaluru" className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Date</span>
                <input name="eventDate" type="date" className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Duration</span>
                <input name="duration" defaultValue="1 day" maxLength={40} className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
              </label>
            </div>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Budget (optional)</span>
              <input name="budget" maxLength={40} placeholder="₹5,00,000" className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Vibe / theme</span>
              <textarea name="vibe" rows={3} maxLength={200} placeholder="Warm forest garden, gold accents, editorial photography" className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3" />
            </label>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What you need</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {NEED_OPTIONS.map((n) => (
                  <button type="button" key={n} onClick={() => toggle(n)} className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                    needs.includes(n) ? "bg-forest text-ivory" : "border border-border text-forest-deep hover:bg-champagne/40"
                  }`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button disabled={mutation.isPending} type="submit" className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-4 text-sm font-semibold text-forest-deep hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:pointer-events-none">
            {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {mutation.isPending ? "Building your package…" : "Generate my quote"}
          </button>
        </form>

        <div className="min-h-[500px] rounded-xl border border-border bg-card p-8 md:p-10 shadow-soft">
          {!mutation.data && !mutation.isPending && !mutation.error && (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-champagne">
                <Sparkles className="h-6 w-6 text-forest-deep" />
              </div>
              <h3 className="mt-6 font-display text-2xl text-forest-deep">Waiting on your brief</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">Fill in the form. Your quote will appear here.</p>
            </div>
          )}
          {mutation.isPending && (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <p className="mt-6 font-display text-xl text-forest-deep">Our planner is drafting your package…</p>
            </div>
          )}
          {mutation.error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {(mutation.error as Error).message}
            </div>
          )}
          {mutation.data && (
            <div>
              <QuoteMarkdown text={mutation.data.quote} />
              <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
                <a
                  href={whatsappUrl(`I'd like to proceed with this event package:\n\n${mutation.data.quote.slice(0, 800)}...`)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory hover:bg-forest-deep"
                >
                  <MessageCircle className="h-4 w-4" /> Send this to a planner
                </a>
                <button onClick={() => mutation.reset()} className="rounded-full border border-forest/30 px-6 py-3 text-sm font-medium text-forest-deep">
                  Try another brief
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Tiny markdown renderer — no external deps. Supports headings, bold, bullets and tables.
function QuoteMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const out: React.ReactElement[] = [];
  let i = 0;
  let key = 0;

  const renderInline = (s: string): React.ReactNode => {
    const parts: (string | React.ReactElement)[] = [];
    const re = /\*\*(.+?)\*\*/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(s)) !== null) {
      if (m.index > last) parts.push(s.slice(last, m.index));
      parts.push(<strong key={parts.length} className="text-forest-deep">{m[1]}</strong>);
      last = m.index + m[0].length;
    }
    if (last < s.length) parts.push(s.slice(last));
    return parts;
  };

  while (i < lines.length) {
    const line = lines[i];
    if (/^###\s/.test(line)) {
      out.push(<h3 key={key++} className="mt-8 first:mt-0 font-display text-2xl text-forest-deep">{line.replace(/^###\s/, "")}</h3>);
      i++;
    } else if (/^##\s/.test(line)) {
      out.push(<h2 key={key++} className="mt-8 font-display text-3xl text-forest-deep">{line.replace(/^##\s/, "")}</h2>);
      i++;
    } else if (/^\s*[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s/, ""));
        i++;
      }
      out.push(
        <ul key={key++} className="mt-3 space-y-2 pl-4 list-disc marker:text-gold">
          {items.map((it, k) => <li key={k} className="text-charcoal/85">{renderInline(it)}</li>)}
        </ul>
      );
    } else if (/^\|.+\|$/.test(line.trim())) {
      const rows: string[][] = [];
      while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) {
        const cells = lines[i].trim().slice(1, -1).split("|").map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [header, ...body] = rows;
      out.push(
        <div key={key++} className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>{header?.map((h, k) => <th key={k} className="border-b border-border bg-champagne/40 px-3 py-2 text-left font-medium text-forest-deep">{h}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, k) => (
                <tr key={k}>{r.map((c, kk) => <td key={kk} className="border-b border-border/60 px-3 py-2 text-charcoal/85">{renderInline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (line.trim() === "") {
      i++;
    } else {
      out.push(<p key={key++} className="mt-3 text-charcoal/85 leading-relaxed">{renderInline(line)}</p>);
      i++;
    }
  }

  return <div>{out}</div>;
}