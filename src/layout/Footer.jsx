import { Dumbbell } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/dgreen81-MSU",
    label: "GitHub",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/lucidliftingco/",
    label: "Instagram",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/davon-green/",
    label: "LinkedIn",
  },
];

const footerLinks = [
  {
    href: "/#about-lucid",
    label: "About",
  },
  {
    href: "/#featured-apparel",
    label: "Shop",
  },
  {
    href: "/#training-experience",
    label: "Training",
  },
  {
    href: "/#contact",
    label: "Contact",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#050706]">
      {/* =====================================================
          ELEPHANT PRINT
      ====================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "url('/images/elephant-print.jpg')",
          backgroundSize: "420px auto",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      />

      {/* Strong black surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/[0.9]"
      />

      {/* Restrained Lucid atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 14% 35%, rgba(111,61,143,0.09), transparent 27%), radial-gradient(circle at 84% 45%, rgba(37,181,174,0.045), transparent 25%)",
        }}
      />

      {/* Top accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      {/* =====================================================
          MASTER FOOTER CONTAINER
      ====================================================== */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* ===================================================
            UPPER FOOTER
        ==================================================== */}
        <div
          className="
            grid
            gap-10
            py-10
            md:grid-cols-2
            lg:grid-cols-[1.65fr_1fr_1fr]
            lg:gap-12
            lg:py-12
          "
        >
          {/* =================================================
              COLUMN 1 — BRAND
          ================================================== */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4">
              {/* Gorilla Emblem */}
              <a
                href="/"
                aria-label="Lucid Lifting home"
                className="group relative flex shrink-0 items-center justify-center"
              >
                {/* Purple hover atmosphere */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    h-12
                    w-12
                    rounded-full
                    bg-purple-600/0
                    blur-xl
                    transition-all
                    duration-500
                    group-hover:bg-purple-600/20
                  "
                />

                {/* Teal secondary atmosphere */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    h-8
                    w-8
                    rounded-full
                    bg-primary/0
                    blur-lg
                    transition-all
                    duration-500
                    group-hover:bg-primary/10
                  "
                />

                <img
                  src="/images/lucid-small-emblem.png"
                  alt="Lucid Lifting"
                  className="
                    relative
                    z-10
                    h-[64px]
                    w-auto
                    cursor-pointer
                    object-contain
                    transition-all
                    duration-300
                    ease-out
                    group-hover:scale-[1.05]
                    group-hover:drop-shadow-[0_0_9px_rgba(126,60,170,0.55)]
                  "
                />
              </a>

              {/* Brand Lockup */}
              <div className="flex flex-col">
                <a
                  href="/"
                  aria-label="Lucid Lifting home"
                  className="group inline-flex w-fit items-center"
                >
                  <span className="text-lg font-bold tracking-[0.08em] text-white transition-colors duration-300 group-hover:text-primary">
                    LUCID LIFTING
                  </span>

                  <span className="ml-1 text-primary">.</span>
                </a>

                <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/65">
                  Make The World Your Gym
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-[280px] text-sm leading-relaxed text-white/40">
              More than apparel. Built by lifters.
            </p>
          </div>

          {/* =================================================
              COLUMN 2 — EXPLORE
          ================================================== */}
          <div className="flex flex-col items-start">
            {/* Column Label */}
            <div className="flex h-[24px] items-center gap-3">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#c5a84b]/80">
                Explore
              </span>

              <span className="h-px w-8 bg-[#c5a84b]/30" />
            </div>

            {/* Navigation */}
            <nav
              className="mt-5 grid grid-cols-2 gap-x-10 gap-y-4"
              aria-label="Footer navigation"
            >
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="
                    group
                    relative
                    w-fit
                    text-sm
                    text-white/45
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  <span>{link.label}</span>

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      -bottom-1
                      left-0
                      h-px
                      w-full
                      origin-left
                      scale-x-0
                      bg-primary
                      transition-transform
                      duration-300
                      ease-out
                      group-hover:scale-x-100
                    "
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* =================================================
              COLUMN 3 — FOLLOW
          ================================================== */}
          <div className="flex flex-col items-start md:col-span-2 lg:col-span-1">
            {/* Column Label */}
            <div className="flex h-[24px] items-center gap-3">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#c5a84b]/80">
                Follow Lucid
              </span>

              <span className="h-px w-8 bg-[#c5a84b]/30" />
            </div>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.label}`}
                    className="
                      group
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/[0.12]
                      bg-white/[0.02]
                      text-white/45
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-primary/50
                      hover:bg-primary/[0.06]
                      hover:text-primary
                      hover:shadow-[0_0_16px_rgba(37,181,174,0.08)]
                    "
                  >
                    <Icon className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-105" />
                  </a>
                );
              })}
            </div>

            {/* Supporting Copy */}
            <p className="mt-4 text-xs leading-5 text-white/30">
              Training. Apparel. Lifestyle.
              <br />
              Follow the build.
            </p>
          </div>
        </div>

        {/* ===================================================
            SHARED DIVIDER
        ==================================================== */}
        <div className="relative h-px w-full bg-white/[0.08]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-px w-28 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          />

          <span
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              bg-[#050706]
              px-3
              text-[8px]
              text-[#c5a84b]/65
            "
          >
            ✦
          </span>
        </div>

        {/* ===================================================
            LOWER FOOTER
            SAME COLUMN SYSTEM AS UPPER FOOTER
        ==================================================== */}
        <div
          className="
            grid
            gap-5
            py-6
            md:grid-cols-2
            lg:grid-cols-[1.65fr_1fr_1fr]
            lg:gap-12
          "
        >
          {/* Copyright */}
          <div className="flex items-center">
            <p className="text-xs text-white/30">
              © {currentYear} Lucid Lifting. All rights reserved.
            </p>
          </div>

          {/* Forged With Discipline */}
          <div className="flex items-center">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-4 bg-primary/30" />

              <p className="flex items-center gap-2 whitespace-nowrap text-xs text-white/35">
                Forged with discipline
                <Dumbbell className="h-3.5 w-3.5 text-primary/70" />
              </p>
            </div>
          </div>

          {/* In Gym We Trust */}
          <div className="flex items-center md:col-span-2 lg:col-span-1">
            <p className="text-sm font-semibold tracking-[0.04em] text-white/85">
              In Gym We Trust
              <span className="text-primary">.</span>
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM ACCENT
      ====================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
      />
    </footer>
  );
};