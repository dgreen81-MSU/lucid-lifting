import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#featured-apparel", label: "SHOP" },
  { href: "#about-lucid", label: "ABOUT" },
  { href: "#training-experience", label: "TRAINING" },
  { href: "#community", label: "COMMUNITY" },
];

const announcements = [
  "IN GYM WE TRUST",
  "LUCID LIFTING — FIRST DROP AVAILABLE NOW",
  "BUILT FOR THE GYM. WORN EVERYWHERE.",
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="lucid-announcement-bar">
        <div className="lucid-marquee-track">
          <div className="lucid-marquee-content">
            {announcements.map((announcement, index) => (
              <span
                key={`first-${index}`}
                className="lucid-announcement-item"
              >
                {announcement}
              </span>
            ))}
          </div>

          <div className="lucid-marquee-content" aria-hidden="true">
            {announcements.map((announcement, index) => (
              <span
                key={`second-${index}`}
                className="lucid-announcement-item"
              >
                {announcement}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md border-b border-white/10"
            : "bg-black/20"
        }`}
      >
        <div className="relative mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-10">
          {/* Left Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] font-semibold tracking-[0.16em] text-white/90 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger Menu */}
          <button
            type="button"
            className="flex lg:hidden items-center justify-center text-white"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Center Logo */}
          <a
            href="#"
            aria-label="Lucid Lifting home"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            <img
              src="/images/lucid-small-emblem.png"
              alt="Lucid Lifting"
              className="h-[76px] w-auto object-contain sm:h-20"
            />
          </a>

          {/* Right Navigation */}
          <div className="flex items-center gap-4 text-white sm:gap-5">
            <a
              href="#contact"
              className="hidden text-[11px] font-semibold tracking-[0.16em] text-white/90 transition-colors hover:text-white xl:block"
            >
              CONTACT
            </a>

            <button
              type="button"
              aria-label="Search"
              className="hidden transition-opacity hover:opacity-60 md:block"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              aria-label="Account"
              className="hidden transition-opacity hover:opacity-60 md:block"
            >
              <User size={18} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              aria-label="Shopping bag"
              className="relative transition-opacity hover:opacity-60"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />

              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[8px] font-bold text-black">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Collapsed Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-white/10 bg-black/95 backdrop-blur-md lg:hidden">
            <div className="flex flex-col px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="border-b border-white/10 py-4 text-sm font-semibold tracking-[0.15em] text-white transition-colors hover:text-white/70"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-4 text-sm font-semibold tracking-[0.15em] text-white transition-colors hover:text-white/70"
              >
                CONTACT
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};