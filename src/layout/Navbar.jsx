import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/#featured-apparel", label: "SHOP" },
  { href: "/#about-lucid", label: "ABOUT" },
  { href: "/#training-experience", label: "TRAINING" },
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

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      {/* =====================================================
          ANNOUNCEMENT BAR
      ====================================================== */}
      <div className="lucid-announcement-bar relative overflow-hidden border-b border-white/[0.08] bg-[#171717]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-950/10 via-transparent to-teal-950/10" />

        <div className="lucid-marquee-track relative z-10">
          <div className="lucid-marquee-content">
            {announcements.map((announcement, index) => (
              <span
                key={`first-${index}`}
                className="lucid-announcement-item inline-flex items-center"
              >
                <span>{announcement}</span>

                <span
                  aria-hidden="true"
                  className="ml-8 text-[9px] text-[#c5a84b]/80 sm:ml-10"
                >
                  ✦
                </span>
              </span>
            ))}
          </div>

          <div className="lucid-marquee-content" aria-hidden="true">
            {announcements.map((announcement, index) => (
              <span
                key={`second-${index}`}
                className="lucid-announcement-item inline-flex items-center"
              >
                <span>{announcement}</span>

                <span
                  aria-hidden="true"
                  className="ml-8 text-[9px] text-[#c5a84b]/80 sm:ml-10"
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN NAVIGATION
      ====================================================== */}
      <nav
        className={`relative isolate overflow-visible border-b transition-all duration-500 ${
          isScrolled
            ? "border-white/[0.10] shadow-[0_12px_40px_rgba(0,0,0,0.30)] backdrop-blur-xl"
            : "border-white/[0.04] backdrop-blur-[3px]"
        }`}
      >
        {/* ===================================================
            ELEPHANT-PRINT TEXTURE
            This is the texture — NOT the gorilla emblem.
        ==================================================== */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-30 transition-opacity duration-500 ${
            isScrolled ? "opacity-[0.10]" : "opacity-[0.035]"
          }`}
          style={{
            backgroundImage: "url('/images/elephant-print.jpg')",
            backgroundSize: "420px auto",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
          }}
        />

        {/* Dark glass surface */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-20 transition-colors duration-500 ${
            isScrolled ? "bg-black/[0.90]" : "bg-black/[0.38]"
          }`}
        />

        {/* Restrained atmospheric color */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-40"
          }`}
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(111,61,143,0.13), transparent 36%), radial-gradient(circle at 82% 50%, rgba(37,181,174,0.045), transparent 28%)",
          }}
        />

        <div className="relative mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-10">
          {/* =================================================
              LEFT DESKTOP NAVIGATION
          ================================================== */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative py-3 text-[11px] font-semibold tracking-[0.16em] text-white/80 transition-colors duration-300 hover:text-white"
              >
                <span>{link.label}</span>

                {/* Animated teal underline */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-[7px] left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
                />

                {/* Tiny teal endpoint */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-[1px] left-0 h-[3px] w-[3px] scale-0 rounded-full bg-primary opacity-0 shadow-[0_0_8px_rgba(37,181,174,0.8)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>

          {/* =================================================
              MOBILE HAMBURGER
          ================================================== */}
          <button
            type="button"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-white transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.08] hover:text-primary lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X
                size={23}
                strokeWidth={1.6}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
            ) : (
              <Menu size={23} strokeWidth={1.6} />
            )}
          </button>

          {/* =================================================
              CENTER LUCID GORILLA EMBLEM
              Universal Home button.
          ================================================== */}
          <a
            href="/"
            aria-label="Lucid Lifting home"
            className="group absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
          >
            {/* Purple atmospheric glow behind gorilla */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute h-14 w-14 rounded-full bg-purple-600/0 blur-2xl transition-all duration-500 group-hover:h-20 group-hover:w-20 group-hover:bg-purple-600/25"
            />

            {/* Teal secondary glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute h-10 w-10 rounded-full bg-primary/0 blur-xl transition-all duration-500 group-hover:bg-primary/15"
            />

            <img
              src="/images/lucid-small-emblem.png"
              alt="Lucid Lifting"
              className="relative z-10 h-[76px] w-auto object-contain transition-all duration-300 ease-out group-hover:scale-[1.055] group-hover:drop-shadow-[0_0_12px_rgba(126,60,170,0.65)] sm:h-20"
            />
          </a>

          {/* =================================================
              RIGHT NAVIGATION
          ================================================== */}
          <div className="flex items-center gap-2.5 text-white sm:gap-3">
            {/* Contact CTA */}
            <a
              href="/#contact"
              className="group relative hidden overflow-hidden rounded-full border border-white/25 bg-black/10 px-5 py-2.5 text-[10px] font-semibold tracking-[0.17em] text-white/90 transition-all duration-300 hover:border-primary/70 hover:bg-primary/[0.08] hover:text-white hover:shadow-[0_0_18px_rgba(37,181,174,0.12)] xl:inline-flex"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-0 bg-primary/[0.06] transition-all duration-300 group-hover:w-full"
              />

              <span className="relative z-10">CONTACT</span>
            </a>

            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="group hidden h-9 w-9 items-center justify-center rounded-full border border-transparent text-white/80 transition-all duration-300 hover:border-primary/20 hover:bg-primary/[0.07] hover:text-primary md:flex"
            >
              <Search
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </button>

            {/* Account */}
            <button
              type="button"
              aria-label="Account"
              className="group hidden h-9 w-9 items-center justify-center rounded-full border border-transparent text-white/80 transition-all duration-300 hover:border-primary/20 hover:bg-primary/[0.07] hover:text-primary md:flex"
            >
              <User
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </button>

            {/* Shopping Bag */}
            <button
              type="button"
              aria-label="Shopping bag"
              className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-white/85 transition-all duration-300 hover:border-primary/20 hover:bg-primary/[0.07] hover:text-primary"
            >
              <ShoppingBag
                size={19}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:scale-105"
              />

              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-black/20 bg-white px-1 text-[8px] font-bold text-black shadow-sm transition-colors duration-300 group-hover:bg-primary">
                0
              </span>
            </button>
          </div>
        </div>

        {/* ===================================================
            MOBILE NAVIGATION MENU
        ==================================================== */}
        <div
          className={`relative overflow-hidden border-t transition-all duration-500 ease-out lg:hidden ${
            isMobileMenuOpen
              ? "max-h-[430px] border-white/10 opacity-100"
              : "pointer-events-none max-h-0 border-transparent opacity-0"
          }`}
        >
          {/* Mobile elephant-print texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage: "url('/images/elephant-print.jpg')",
              backgroundSize: "420px auto",
              backgroundRepeat: "repeat",
              backgroundPosition: "center",
            }}
          />

          {/* Mobile dark overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black/[0.94] backdrop-blur-xl"
          />

          {/* Mobile purple/teal atmosphere */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 10% 20%, rgba(111,61,143,0.18), transparent 35%), radial-gradient(circle at 90% 80%, rgba(37,181,174,0.07), transparent 30%)",
            }}
          />

          <div className="relative z-10 flex flex-col px-6 py-5">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#c5a84b]/80">
              Explore Lucid
            </p>

            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center justify-between border-b border-white/[0.08] py-4 text-sm font-semibold tracking-[0.15em] text-white/85 transition-colors duration-300 hover:text-primary"
              >
                <span>{link.label}</span>

                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-normal tracking-[0.12em] text-white/20">
                    0{index + 1}
                  </span>

                  <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-6" />
                </div>
              </a>
            ))}

            {/* Mobile Contact */}
            <a
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group mt-5 flex items-center justify-center rounded-full border border-white/20 bg-white/[0.025] px-5 py-3.5 text-xs font-semibold tracking-[0.16em] text-white transition-all duration-300 hover:border-primary/70 hover:bg-primary/[0.08] hover:text-primary"
            >
              GET IN TOUCH
            </a>

            {/* Small brand sign-off */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white/25">
                Lucid Lifting
              </span>

              <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-primary/60">
                Make The World Your Gym
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM ACCENT
        ==================================================== */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent transition-all duration-500 ${
            isScrolled ? "w-2/3 opacity-100" : "w-1/3 opacity-30"
          }`}
        />
      </nav>
    </header>
  );
};