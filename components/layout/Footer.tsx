import Link from "next/link";
import { site } from "@/lib/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20 bg-cream-50 text-ink">
      <div className="container-luxe py-16">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex flex-col items-center leading-none">
            <span className="font-display text-3xl text-emerald">
              Kristina Medicina
            </span>
            <span className="eyebrow mt-2 text-gold">Botanical Apothecary</span>
          </Link>

          <nav className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-wide text-ink-soft transition-colors hover:text-rose-deep"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kristina Medicina on Instagram"
            className="mt-9 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-emerald transition-all hover:-translate-y-0.5 hover:border-gold hover:text-rose-deep"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>

        <div className="mt-12 border-t border-gold/15 pt-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs text-ink-soft/80">
              &copy; {year} {site.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {site.footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-ink-soft/80 transition-colors hover:text-emerald"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-[0.7rem] leading-relaxed text-ink-soft/60">
            These statements have not been evaluated by the FDA. Products are not
            intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}
