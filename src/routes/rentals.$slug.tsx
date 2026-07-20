import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { getProduct, formatINR, products } from "@/lib/products";
import { whatsappUrl, SITE } from "@/lib/site";

export const Route = createFileRoute("/rentals/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Rent from ${formatINR(p.price)} ${p.priceUnit} | OSR` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} on rent — Outdoor Services Rental` },
        { property: "og:description", content: p.tagline },
        { property: "og:image", content: p.image },
        { property: "twitter:image", content: p.image },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-luxe pt-40 pb-24 text-center">
      <h1 className="font-display text-4xl text-forest-deep">Product not found</h1>
      <Link to="/rentals" className="mt-6 inline-block text-gold underline">Back to rentals</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [days, setDays] = useState(1);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const total = product.price * qty * days;

  const whatsappMsg = `Hi ${SITE.name}, I'd like to book:
• ${product.name}
• Quantity: ${qty}
• Duration: ${days} day${days > 1 ? "s" : ""}
• Estimated: ${formatINR(total)}
Please share availability.`;

  return (
    <div className="pt-28">
      <section className="container-luxe pt-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-forest-deep">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/rentals" className="hover:text-forest-deep">Rentals</Link>
        <span className="mx-2">/</span>
        <span className="text-forest-deep">{product.name}</span>
      </section>

      <section className="container-luxe py-10 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-forest/10">
            <img
              src={gallery[active]}
              alt={product.name}
              width={1600}
              height={1200}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative aspect-[4/3] overflow-hidden rounded ${
                    active === i ? "ring-2 ring-gold" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={g} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{product.categoryName}</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-forest-deep">{product.name}</h1>
          <p className="mt-3 text-lg italic text-gold">{product.tagline}</p>
          <p className="mt-6 text-charcoal/80 leading-relaxed">{product.description}</p>

          <div className="mt-8 flex items-baseline gap-3 border-y border-border py-6">
            <div className="font-display text-4xl text-forest-deep">{formatINR(product.price)}</div>
            <div className="text-sm text-muted-foreground">{product.priceUnit}</div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Quantity</span>
              <input
                type="number"
                min={1}
                max={999}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(999, Number(e.target.value) || 1)))}
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Days</span>
              <input
                type="number"
                min={1}
                max={365}
                value={days}
                onChange={(e) => setDays(Math.max(1, Math.min(365, Number(e.target.value) || 1)))}
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-md bg-champagne/40 px-5 py-4">
            <span className="text-sm text-forest-deep">Indicative total</span>
            <span className="font-display text-2xl text-forest-deep">{formatINR(total)}</span>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={whatsappUrl(whatsappMsg)}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 text-sm font-semibold text-ivory hover:bg-forest-deep transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> Book on WhatsApp
            </a>
            <Link
              to="/booking"
              search={{ product: product.slug } as never}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 px-6 py-4 text-sm font-medium text-forest-deep hover:bg-champagne/50"
            >
              Request via enquiry form <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-2 text-sm text-forest-deep hover:text-gold"
            >
              <Sparkles className="h-3.5 w-3.5" /> Build a full package with our AI planner
            </Link>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl text-forest-deep">What's included</h2>
            <ul className="mt-4 space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 text-gold shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl text-forest-deep">Specifications</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              {product.specs.map((s) => (
                <div key={s.label} className="border-t border-border pt-3">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{s.label}</dt>
                  <dd className="mt-1 text-forest-deep">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-luxe py-20 border-t border-border">
          <h2 className="font-display text-3xl text-forest-deep">You may also like</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} to="/rentals/$slug" params={{ slug: p.slug }} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-display text-lg text-forest-deep">{p.name}</h3>
                <div className="text-sm text-gold">{formatINR(p.price)} <span className="text-muted-foreground">/ {p.priceUnit}</span></div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}