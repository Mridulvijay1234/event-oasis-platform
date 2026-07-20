export const SITE = {
  name: "Outdoor Services Rental",
  short: "OSR",
  tagline: "Luxury Event Infrastructure. Delivered.",
  phone: "+91 98765 43210",
  whatsapp: "919876543210", // digits only, country code first
  email: "concierge@outdoorservicesrental.in",
  address: "Bengaluru · Mumbai · Delhi · Goa",
  hours: "Concierge available 24 / 7",
};

export function whatsappUrl(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}