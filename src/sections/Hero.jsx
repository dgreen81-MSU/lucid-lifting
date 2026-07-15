import { AnimatedBorderButton } from "../components/AnimatedBorderButton";
import { Button } from "../components/Button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const skills = [
  "Mindset",
  "Purpose",
  "Discipline",
  "Strength",
  "Growth",
  "Leadership",
  "Inspiration",
  "Community",
  "Resilience",
  "Legacy",
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt="Lucid Lifting gym background"
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
      </div>

      {/* Floating Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${
                15 + Math.random() * 20
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Apparel • Personal Training • Community
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                More than
                <span className="text-primary glow-text"> apparel.</span>
                <br />
                Built by
                <br />
                <span className="font-serif italic font-normal text-white">
                  lifters.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                Built for those chasing more than personal records. Lucid
                Lifting combines premium apparel, personalized coaching, and a
                community inspired by the relentless pursuit of
                self-improvement. This is where discipline defeats doubt, pain
                becomes progress, and visions become reality. In Gym We Trust.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-in animation-delay-300">
              <Button size="lg">
                Contact Me
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <AnimatedBorderButton>
                Explore Lucid Lifting
                <ArrowRight className="w-5 h-5" />
              </AnimatedBorderButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              <span className="text-sm text-muted-foreground">
                Join the Movement:
              </span>

              {[
                {
                  icon: FaGithub,
                  href: "https://github.com/dgreen81-MSU",
                  label: "GitHub",
                },
                {
                  icon: FaLinkedin,
                  href: "https://www.linkedin.com/in/davon-green/",
                  label: "LinkedIn",
                },
                {
                  icon: FaInstagram,
                  href: "https://www.instagram.com/lucid_lifter/",
                  label: "Instagram",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Brand Image */}
          <div className="relative animate-fade-in animation-delay-300">
            <div className="relative max-w-md mx-auto">
              {/* Animated Glow */}
              <div
                className="
                  absolute inset-0 rounded-3xl
                  bg-gradient-to-br
                  from-primary/30
                  via-transparent
                  to-primary/10
                  blur-2xl
                  animate-pulse-glow
                "
              />

              {/* Lucid Lifting Emblem */}
              <div className="relative glass rounded-3xl p-4 glow-border">
                <img
                  src="/images/lucid-lifting-emblem.png"
                  alt="Lucid Lifting emblem"
                  className="w-full aspect-[4/5] object-contain rounded-2xl"
                />
              </div>

              {/* Launch Badge */}
              <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />

                  <span className="text-sm font-medium">
                    Building the Vision
                  </span>
                </div>
              </div>

              {/* Established Badge */}
              <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  EST.
                </div>

                <div className="text-2xl font-bold text-primary">2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Values */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Lucid Lifting Is Built On:
          </p>

          <div className="relative overflow-hidden">
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, idx) => (
                <div key={`${skill}-${idx}`} className="flex-shrink-0 px-8 py-4">
                  <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-700">
        <a
          href="#about-lucid"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>

          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};