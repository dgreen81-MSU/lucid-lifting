export const CoachingHero = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/lucid-coaching.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Left Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <span className="text-primary text-sm font-medium tracking-[0.25em] uppercase">
            Lucid Lifting Coaching
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] mt-6 text-white">
            Train With
            <span className="block font-serif italic font-normal text-primary">
              Purpose.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/75 leading-relaxed">
            Personalized coaching built around your goals, your starting point,
            your lifestyle, and what you want to accomplish.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={() => scrollToSection("onboarding")}
              className="px-8 py-4 bg-primary text-black font-semibold uppercase tracking-wider rounded-full hover:scale-[1.02] hover:opacity-90 transition-all duration-300"
            >
              Get Started
            </button>

            <button
              onClick={() => scrollToSection("coaching-process")}
              className="px-8 py-4 border border-white/30 bg-black/10 backdrop-blur-sm text-white font-semibold uppercase tracking-wider rounded-full hover:border-primary hover:text-primary transition-all duration-300"
            >
              How It Works ↓
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("coaching-process")}
        aria-label="Scroll to coaching process"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/60 hover:text-primary transition-colors duration-300"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Discover
          </span>

          <span className="text-xl animate-bounce">↓</span>
        </div>
      </button>
    </section>
  );
};