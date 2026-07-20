import { createFileRoute } from "@tanstack/react-router";
import { heroImage, loungeImage, hangarImage, stageImage, vipInteriorImage, products } from "@/lib/products";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Outdoor Services Rental" },
      { name: "description", content: "A curated look at recent luxury outdoor events — weddings, galas, corporate launches and film shoots across India." },
      { property: "og:title", content: "Event gallery — Outdoor Services Rental" },
      { property: "og:description", content: "See our recent installs across India." },
      { property: "og:image", content: heroImage },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const images = [
    { src: heroImage, caption: "Emerald Pagoda Wedding · Bengaluru", size: "row-span-2 col-span-2" },
    { src: vipInteriorImage, caption: "Marble Trailer Interior · Goa", size: "" },
    { src: loungeImage, caption: "Chesterfield Lounge · Delhi", size: "col-span-2" },
    { src: hangarImage, caption: "40m German Hangar · Mumbai", size: "row-span-2" },
    { src: stageImage, caption: "Mandap Stage · Udaipur", size: "" },
    ...products.slice(3).map((p) => ({ src: p.image, caption: p.name, size: "" })),
  ];

  return (
    <div className="pt-32">
      <section className="container-luxe py-16">
        <div className="max-w-3xl">
          <div className="eyebrow">Gallery</div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl text-forest-deep leading-[1.05]">
            Real events. <span className="italic text-gold">No stock photos.</span>
          </h1>
        </div>
      </section>

      <section className="container-luxe pb-24">
        <div className="grid auto-rows-[220px] grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <figure key={i} className={`group relative overflow-hidden rounded-md bg-forest/10 ${img.size}`}>
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/40 to-transparent p-4 text-xs uppercase tracking-[0.2em] text-ivory opacity-0 transition-opacity group-hover:opacity-100">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}