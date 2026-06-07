"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { useScrolled } from "@/lib/useClientStore";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(12);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/95 backdrop-blur shadow-[0_1px_0_rgba(184,155,94,0.25)]"
          : "bg-cream/80 backdrop-blur-sm",
      )}
    >
      <nav className="container-luxe flex items-center justify-between py-5">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-xl text-emerald sm:text-2xl">
            Kristina Medicina
          </span>
          <span className="eyebrow mt-1 text-[0.6rem] text-gold">
            Botanical Apothecary
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm tracking-wide transition-colors hover:text-rose-deep",
                pathname === item.href ? "text-rose-deep" : "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href="/consultations" size="sm">
            Book a Consultation
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-emerald lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span
              className={cn(
                "block h-px w-6 bg-emerald transition-transform",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-emerald transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-emerald transition-transform",
                open && "-translate-y-[7px] -rotate-45",
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-gold/20 bg-cream transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[420px]" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-base text-ink transition-colors hover:bg-rose-soft/40"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/shop" className="mt-3" fullWidth onClick={closeMenu}>
            Shop the Collection
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
