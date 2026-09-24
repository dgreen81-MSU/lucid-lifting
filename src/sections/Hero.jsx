import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const introVideoRef = useRef(null);
  const meowWolfVideoRef = useRef(null);

  const COLLAGE_DURATION = 12000;

  /* =========================================
     BRAND COLORS
  ========================================== */
  const PURPLE = "#8E72A3";
  const GOLD = "#C5A253";

  const outlinedText = {
    WebkitTextStroke: "0.75px rgba(255,255,255,0.85)",
    paintOrder: "stroke fill",
    textShadow: "0 2px 8px rgba(0,0,0,0.65)",
  };

  /* =========================================
     PARTICLES
     Generate once so they don't jump around
  ========================================== */
  const particles = useMemo(
    () =>
      [...Array(32)].map(() => ({
        width: 5 + Math.random() * 5,
        height: 5 + Math.random() * 5,
        opacity: 0.55 + Math.random() * 0.25,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 18 + Math.random() * 18,
        delay: Math.random() * 6,
      })),
    []
  );

  const goToSlide = (slideIndex) => {
    setProgress(0);
    setActiveSlide(slideIndex);
  };

  /* =========================================
     COLLAGE TIMER
     Slide 2 -> Slide 3
  ========================================== */
  useEffect(() => {
    if (activeSlide !== 1) return;

    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const percentage = Math.min(
        (elapsed / COLLAGE_DURATION) * 100,
        100
      );

      setProgress(percentage);
    }, 50);

    const slideTimer = setTimeout(() => {
      setProgress(0);
      setActiveSlide(2);
    }, COLLAGE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [activeSlide]);

  /* =========================================
     VIDEO HANDLING

     Slide 1 = Intro Video
     Slide 3 = Meow Wolf Video
  ========================================== */
  useEffect(() => {
    let video = null;

    if (activeSlide === 0) {
      video = introVideoRef.current;
    }

    if (activeSlide === 2) {
      video = meowWolfVideoRef.current;
    }

    if (!video) return;

    video.currentTime = 0;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay prevented:", error);
      }
    };

    playVideo();

    const updateVideoProgress = () => {
      if (!video.duration) return;

      const percentage = Math.min(
        (video.currentTime / video.duration) * 100,
        100
      );

      setProgress(percentage);
    };

    video.addEventListener("timeupdate", updateVideoProgress);

    return () => {
      video.removeEventListener(
        "timeupdate",
        updateVideoProgress
      );

      video.pause();
    };
  }, [activeSlide]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* =====================================
          SLIDE 1 — LUCID COACHING
      ====================================== */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          activeSlide === 0
            ? "z-10 opacity-100"
            : "pointer-events-none z-0 opacity-0"
        }`}
      >
        <video
          ref={introVideoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          onEnded={() => {
            setProgress(0);
            setActiveSlide(1);
          }}
        >
          <source
            src="/videos/lucid-intro.mp4"
            type="video/mp4"
          />
        </video>

        {/* Light overall overlay */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Bottom gradient for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        {/* =====================================
            COACHING HERO CONTENT
        ====================================== */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="w-full px-6 pb-20 sm:px-10 md:pb-24 lg:px-16 xl:px-24">
            <div className="max-w-3xl">

              {/* Eyebrow */}
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-white/90 sm:text-sm">
                Lucid Coaching
              </p>

              {/* Main Headline */}
              <h1 className="font-black uppercase leading-[0.92] tracking-[-0.04em]">
                <span
                  className="block text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{
                    textShadow: "0 2px 8px rgba(0,0,0,0.65)",
                  }}
                >
                  Train with
                </span>

                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{
                    color: PURPLE,
                    ...outlinedText,
                  }}
                >
                  purpose.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white/85 sm:text-base">
                Personalized coaching built around your goals, your lifestyle,
                and the person you want to become.
              </p>

              {/* CTA */}
              <div className="mt-7">
                <a
                  href="/coaching"
                  className="inline-flex items-center gap-3 bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-black transition-all duration-300 hover:bg-[#766284] hover:text-white"
                >
                  Explore Coaching
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          SLIDE 2 — COLLAGE
      ====================================== */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          activeSlide === 1
            ? "z-10 opacity-100"
            : "pointer-events-none z-0 opacity-0"
        }`}
      >
        {/* Background Collage */}
        <div className="absolute inset-0">
          <img
            src="/images/hero/lucid-hero-collage.png"
            alt="Lucid Lifting campaign"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        {/* =====================================
            FLOATING LUCID PARTICLES
        ====================================== */}
        <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                backgroundColor: GOLD,
                opacity: particle.opacity,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                boxShadow:
                  "0 0 8px rgba(197, 162, 83, 0.40)",
                animation: `slow-drift ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        {/* =====================================
            COLLAGE HERO CONTENT
        ====================================== */}
        <div className="relative z-10 flex min-h-screen items-end">
          <div className="w-full px-6 pb-16 pt-40 sm:px-10 md:pb-20 lg:px-16 xl:px-24">
            <div className="max-w-3xl">
              {/* Brand Eyebrow */}
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
                Lucid Lifting
              </p>

              {/* Main Headline */}
              <h1 className="text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                <span
                  className="text-white"
                  style={{
                    textShadow:
                      "0 2px 8px rgba(0,0,0,0.65)",
                  }}
                >
                  Build{" "}
                </span>

                <span
                  style={{
                    color: PURPLE,
                    ...outlinedText,
                  }}
                >
                  in the{" "}
                </span>

                <span
                  style={{
                    color: GOLD,
                    ...outlinedText,
                  }}
                >
                  gym.
                </span>

                <br />

                <span
                  style={{
                    color: PURPLE,
                    ...outlinedText,
                  }}
                >
                  Live{" "}
                </span>

                <span
                  style={{
                    color: GOLD,
                    ...outlinedText,
                  }}
                >
                  everywhere.
                </span>
              </h1>

              {/* Brand Description */}
              <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white/80 sm:text-base">
                Training is the foundation. Life is the proving
                ground. Build the strength, confidence, and
                capability to go wherever life takes you.
              </p>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href="#featured-apparel"
                  className="inline-flex items-center gap-3 bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-black transition-all duration-300 hover:bg-[#766284] hover:text-white"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          SLIDE 3 — MEOW WOLF VIDEO
      ====================================== */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          activeSlide === 2
            ? "z-10 opacity-100"
            : "pointer-events-none z-0 opacity-0"
        }`}
      >
        <video
          ref={meowWolfVideoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          onEnded={() => {
            setProgress(0);
            setActiveSlide(0);
          }}
        >
          <source
            src="/videos/lucid-meow-wolf.mp4"
            type="video/mp4"
          />
        </video>

        {/* Slight dark overlay */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Bottom gradient for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* =====================================
            VIDEO HERO CONTENT
        ====================================== */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="w-full px-6 pb-20 sm:px-10 md:pb-24 lg:px-16 xl:px-24">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-white sm:text-sm">
                Best Seller:
              </p>

              {/* Product Title */}
              <h1 className="font-black uppercase leading-[0.9] tracking-[-0.04em]">
                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{ color: PURPLE }}
                >
                  Purple
                </span>

                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{
                    color: GOLD,
                    ...outlinedText,
                  }}
                >
                  OG Tee
                </span>
              </h1>

              {/* Product Description */}
              <p className="mt-5 max-w-lg text-sm font-medium leading-relaxed text-white/85 sm:text-base">
                The original Lucid Lifting piece. Built for
                training, movement, and everything after.
              </p>

              {/* CTA */}
              <div className="mt-7">
                <a
                  href="#featured-apparel"
                  className="inline-flex items-center gap-3 bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-black transition-all duration-300 hover:bg-[#766284] hover:text-white"
                >
                  Shop Purple Tee
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          YOUNGLA-STYLE SLIDE CONTROLS
      ====================================== */}
      <div className="absolute bottom-10 right-8 z-40 flex items-center gap-3 md:right-12">
        {[0, 1, 2].map((slideIndex) => {
          const isActive = activeSlide === slideIndex;

          return (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="group relative flex h-5 w-5 items-center justify-center"
              aria-label={`Go to slide ${slideIndex + 1}`}
            >
              {/* Center dot */}
              <span
                className={`absolute h-2 w-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "scale-125 border-white"
                    : "border-white/50 bg-white/40 group-hover:bg-white/70"
                }`}
              />

              {/* Active progress ring */}
              {isActive && (
                <svg
                  className="absolute h-5 w-5 -rotate-90"
                  viewBox="0 0 20 20"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1.5"
                  />

                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    pathLength="100"
                    strokeDasharray="100"
                    strokeDashoffset={100 - progress}
                    className="transition-[stroke-dashoffset] duration-75 ease-linear"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};