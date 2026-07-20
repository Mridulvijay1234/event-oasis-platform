import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-32 bg-forest-deep text-ivory">
      <div className="container-luxe py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="font-display text-3xl">{SITE.name}</div>
            <p className="mt-4 max-w-md text-sm text-ivory/70 leading-relaxed">
              India's specialist in luxury event infrastructure — marble-and-brass restrooms,
              clear-span hangars, stages, sound and lighting. One partner, delivered end to end.
            </p>
            <div className="mt-8 space-y-3 text-sm text-ivory/80">
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 hover:text-gold">
                <Phone className="h-4 w-4 text-gold" /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-gold">
                <Mail className="h-4 w-4 text-gold" /> {SITE.email}
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold" /> {SITE.address}
              </div>
            </div>
          </div>

          <div>
            <div className="eyebrow text-gold">Explore</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/rentals" className="text-ivory/80 hover:text-gold">Rentals</Link></li>
              <li><Link to="/services" className="text-ivory/80 hover:text-gold">Services</Link></li>
              <li><Link to="/gallery" className="text-ivory/80 hover:text-gold">Gallery</Link></li>
              <li><Link to="/reviews" className="text-ivory/80 hover:text-gold">Reviews</Link></li>
              <li><Link to="/about" className="text-ivory/80 hover:text-gold">About</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-gold">Plan an event</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/quote" className="text-ivory/80 hover:text-gold">AI Quote Generator</Link></li>
              <li><Link to="/booking" className="text-ivory/80 hover:text-gold">Book a rental</Link></li>
              <li><Link to="/contact" className="text-ivory/80 hover:text-gold">Contact concierge</Link></li>
              <li>
                <a
                  href={whatsappUrl("Hi Outdoor Services Rental, I'd like to plan an event.")}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ivory/80 hover:text-gold"
                >
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/50">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>{SITE.hours}</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" className="hover:text-gold inline-flex items-center gap-1">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}