export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  products: Product[];
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  tagline: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
  gallery?: string[];
};

import hero from "@/assets/hero-event.jpg";
import vipExterior from "@/assets/vip-toilet-exterior.jpg";
import vipInterior from "@/assets/vip-toilet-interior.jpg";
import lounge from "@/assets/luxury-lounge.jpg";
import hangar from "@/assets/german-hangar.jpg";
import stage from "@/assets/stage-lighting.jpg";

export const heroImage = hero;
export const loungeImage = lounge;
export const hangarImage = hangar;
export const stageImage = stage;
export const vipInteriorImage = vipInterior;

const P = (p: Product): Product => p;

export const products: Product[] = [
  P({
    slug: "luxury-toilet-trailer-pearl",
    name: "Pearl White Luxury Toilet Trailer",
    category: "luxury-trailers",
    categoryName: "Luxury Toilet Trailers",
    tagline: "Five-star restrooms on wheels.",
    description:
      "A fully air-conditioned trailer with marble interiors, brass fixtures and hotel-grade fragrance. Built for weddings and gala events that expect nothing less than perfect.",
    price: 24999,
    priceUnit: "per event / day",
    image: vipExterior,
    gallery: [vipExterior, vipInterior],
    features: [
      "Fully air-conditioned cabins",
      "Italian marble & wood finish",
      "Warm LED backlit mirrors",
      "Sensor taps & premium fragrance",
      "Attendant service included",
    ],
    specs: [
      { label: "Cabins", value: "3 + 1 wash lounge" },
      { label: "Capacity", value: "up to 400 guests" },
      { label: "Power", value: "Silent genset included" },
      { label: "Setup time", value: "90 minutes" },
    ],
  }),
  P({
    slug: "vip-ac-portable-toilet-champagne",
    name: "VIP AC Portable Toilet — Champagne Gold",
    category: "vip-toilets",
    categoryName: "VIP AC Portable Toilets",
    tagline: "Compact luxury for intimate gatherings.",
    description:
      "Single-cabin AC unit finished in champagne gold with mirror, wash basin, sensor lights and a discreet fragrance system.",
    price: 8999,
    priceUnit: "per unit / day",
    image: vipInterior,
    features: ["Silent inverter AC", "Sensor lighting", "Mirror + basin", "Fragrance system"],
    specs: [
      { label: "Footprint", value: "1.2m × 1.4m" },
      { label: "Power", value: "1 kVA" },
      { label: "Water", value: "80 L reservoir" },
    ],
  }),
  P({
    slug: "standard-portable-toilet",
    name: "Standard Portable Toilet",
    category: "standard-toilets",
    categoryName: "Standard Portable Toilets",
    tagline: "Reliable, clean, event-ready.",
    description:
      "Sturdy single-cabin portable toilets with ventilation, hand sanitiser and daily servicing. Ideal for construction sites and large public events.",
    price: 1499,
    priceUnit: "per unit / day",
    image: vipExterior,
    features: ["Roof vent + skylight", "Hand sanitiser dispenser", "Non-slip flooring", "Daily servicing"],
    specs: [
      { label: "Footprint", value: "1.1m × 1.1m" },
      { label: "Weight", value: "82 kg" },
    ],
  }),
  P({
    slug: "german-hangar-tent",
    name: "German Hangar Tent",
    category: "tents",
    categoryName: "German Hangars",
    tagline: "Column-free spans up to 40 metres.",
    description:
      "Aluminium-framed clear-span hangars with white PVC roofing. Weather-tight, wind rated, and configurable from 10m to 40m width.",
    price: 49999,
    priceUnit: "per day (10×20m)",
    image: hangar,
    features: ["Clear-span aluminium frame", "Weather-tight PVC roof", "Modular walls & windows", "Wind rated 80 km/h"],
    specs: [
      { label: "Widths", value: "10m / 15m / 20m / 25m / 30m / 40m" },
      { label: "Bay length", value: "5m per bay" },
    ],
  }),
  P({
    slug: "pagoda-tent-forest",
    name: "Pagoda Tent — Forest Green",
    category: "tents",
    categoryName: "Pagoda Tents",
    tagline: "Elegant peaked canopies for luxury zones.",
    description:
      "5m × 5m pagoda tents in deep forest green with gold trim. Perfect for entrance archways, F&B zones and VIP lounges.",
    price: 12999,
    priceUnit: "per tent / day",
    image: hero,
    features: ["5m × 5m footprint", "Custom fabric colours", "Chandelier compatible", "Interlockable"],
    specs: [
      { label: "Peak height", value: "5.2m" },
      { label: "Side height", value: "2.4m" },
    ],
  }),
  P({
    slug: "wedding-sofa-ivory",
    name: "Ivory Chesterfield Wedding Sofa",
    category: "furniture",
    categoryName: "Luxury Furniture",
    tagline: "Hand-tufted seating for the moment.",
    description:
      "Deep-buttoned ivory chesterfield sofas with brass legs. Sold as a set with side tables and brass ottomans.",
    price: 6999,
    priceUnit: "per set / day",
    image: lounge,
    features: ["Hand-tufted upholstery", "Brass hairpin legs", "Stain-guarded fabric"],
    specs: [
      { label: "Seats", value: "3-seater + 2 armchairs" },
      { label: "Includes", value: "Brass coffee table" },
    ],
  }),
  P({
    slug: "banquet-chair-gold",
    name: "Chiavari Banquet Chair — Gold",
    category: "furniture",
    categoryName: "Banquet Chairs",
    tagline: "Iconic gold Chiavari for banquets.",
    description:
      "Solid wood Chiavari chairs with a hand-finished gold lacquer and ivory cushioned seat.",
    price: 149,
    priceUnit: "per chair / day",
    image: lounge,
    features: ["Solid beech wood", "Hand-lacquered gold", "Ivory cushion pad"],
    specs: [
      { label: "Min order", value: "50 chairs" },
      { label: "Stackable", value: "Yes" },
    ],
  }),
  P({
    slug: "stage-system-modular",
    name: "Modular Stage System",
    category: "stage",
    categoryName: "Stage Systems",
    tagline: "Any size, any height, in hours.",
    description:
      "Aluminium truss-frame stages with carpet, skirt and rear backdrop. Configurable from 4×3m to 20×12m with tiered risers.",
    price: 19999,
    priceUnit: "per event (4×3m)",
    image: stage,
    features: ["Aluminium truss frame", "Carpet + skirt included", "Tiered risers available"],
    specs: [
      { label: "Height", value: "0.6m / 0.9m / 1.2m" },
      { label: "Load", value: "750 kg / m²" },
    ],
  }),
  P({
    slug: "warm-uplighting-package",
    name: "Warm Uplighting Package",
    category: "lighting",
    categoryName: "Lighting",
    tagline: "Cinematic warmth from dusk to dawn.",
    description:
      "Wireless DMX uplights in warm amber and champagne. Package includes 24 fixtures with programmed scenes.",
    price: 14999,
    priceUnit: "per night (24 fixtures)",
    image: stage,
    features: ["Wireless DMX", "Battery + mains", "Programmed scenes", "Silent operation"],
    specs: [
      { label: "Fixtures", value: "24 × 15W RGBWA" },
      { label: "Runtime", value: "12h battery" },
    ],
  }),
  P({
    slug: "line-array-sound",
    name: "Line-Array Sound System",
    category: "sound",
    categoryName: "Sound Systems",
    tagline: "Concert-grade clarity for 500–2000 guests.",
    description:
      "Line-array PA with dedicated subwoofers, wireless mics and a certified sound engineer on site.",
    price: 34999,
    priceUnit: "per event",
    image: stage,
    features: ["Line-array PA", "Wireless mics × 4", "Certified sound engineer", "Full monitor mix"],
    specs: [
      { label: "Coverage", value: "up to 2000 guests" },
      { label: "Includes", value: "Engineer + setup" },
    ],
  }),
  P({
    slug: "portable-ac-tent",
    name: "Portable AC — Tent Cooling",
    category: "climate",
    categoryName: "Portable ACs",
    tagline: "Silent cooling for enclosed tents.",
    description:
      "5-ton silent duct-based portable AC units for tent cooling with insulated ducting.",
    price: 8999,
    priceUnit: "per unit / day",
    image: hangar,
    features: ["5-ton capacity", "Silent operation", "Insulated ducting"],
    specs: [{ label: "Coverage", value: "up to 100m²" }],
  }),
  P({
    slug: "mist-fan",
    name: "Outdoor Mist Fan",
    category: "climate",
    categoryName: "Mist Fans",
    tagline: "Cool outdoor zones without water on the floor.",
    description:
      "High-velocity mist fans with fine atomisation — cools ambient temperature by up to 8°C.",
    price: 2499,
    priceUnit: "per unit / day",
    image: hangar,
    features: ["Fine atomisation", "Oscillating head", "Sealed motor"],
    specs: [{ label: "Coverage", value: "50m² per fan" }],
  }),
];

export const categories: { slug: string; name: string; description: string; image: string }[] = [
  { slug: "luxury-trailers", name: "Luxury Toilet Trailers", description: "Marble-and-brass restroom trailers for weddings and galas.", image: vipExterior },
  { slug: "vip-toilets", name: "VIP AC Portable Toilets", description: "Single-cabin AC units in premium finishes.", image: vipInterior },
  { slug: "standard-toilets", name: "Standard Portable Toilets", description: "Reliable, clean, event-ready portable toilets.", image: vipExterior },
  { slug: "tents", name: "Tents & Hangars", description: "Pagoda tents and clear-span German hangars.", image: hangar },
  { slug: "furniture", name: "Furniture", description: "Wedding sofas, Chiavari chairs, brass tables.", image: lounge },
  { slug: "stage", name: "Stage Systems", description: "Modular truss-frame stages with risers.", image: stage },
  { slug: "lighting", name: "Lighting", description: "Warm uplighting, chandeliers and pin-spots.", image: stage },
  { slug: "sound", name: "Sound Systems", description: "Concert-grade PA with engineers on site.", image: stage },
  { slug: "climate", name: "Climate Control", description: "Portable ACs, air coolers and mist fans.", image: hangar },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}