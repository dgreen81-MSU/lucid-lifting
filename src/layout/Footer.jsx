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
    href: "#about-lucid",
    label: "About",
  },
  {
    href: "#featured-apparel",
    label: "Shop",
  },
  {
    href: "#platform",
    label: "Training",
  },
  {
    href: "#community",
    label: "Community",
  },
  {
    href: "#contact",
    label: "Contact",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and Brand */}
          <div className="text-center md:text-left">
            <a
              href="#"
              className="text-2xl font-bold tracking-tight"
              aria-label="Return to the top of the Lucid Lifting website"
            >
              LL<span className="text-primary">.</span>
            </a>

            <p className="text-muted-foreground text-sm mt-2">
              More than apparel. Built by lifters.
            </p>
          </div>

          {/* Footer Navigation */}
          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-3"
            aria-label="Footer navigation"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.label}`}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-10 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Lucid Lifting. All rights reserved.
            </p>

            <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
              Forged with discipline
              <Dumbbell className="w-4 h-4 text-primary" />
            </p>

            <p className="text-sm font-semibold tracking-wide">
              In Gym We Trust<span className="text-primary">.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};