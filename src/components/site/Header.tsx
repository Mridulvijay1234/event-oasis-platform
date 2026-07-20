import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/rentals", label: "Rentals" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-background/80 border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-forest text-ivory">
            <span className="font-display text-lg leading-none">O</span>
            <span className="absolute -inset-0.5 rounded-full border border-gold/60 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg text-forest-deep">{SITE.name}</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Luxury Event Infrastructure</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-forest-deep" }}
              inactiveProps={{ className: "text-charcoal/70 hover:text-forest-deep" }}
              className="text-sm font-medium transition-colors relative py-1"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/quote" className="text-sm font-medium text-forest-deep hover:text-gold transition-colors">
            AI Quote
          </Link>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-ivory hover:bg-forest-deep transition-colors"
          >
            Book Now
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-forest-deep"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-md">
          <div className="container-luxe py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-forest-deep"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Link
                to="/quote"
                onClick={() => setOpen(false)}
                className="flex-1 text-center rounded-full border border-forest/30 px-4 py-2.5 text-sm font-medium text-forest-deep"
              >
                AI Quote
              </Link>
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="flex-1 text-center rounded-full bg-forest px-4 py-2.5 text-sm font-medium text-ivory"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}