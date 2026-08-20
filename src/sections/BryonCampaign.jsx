export const BryonCampaign = () => {
  return (
    <section className="relative h-[78vh] min-h-[620px] overflow-hidden bg-black">
      {/* Full-Bleed Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-[center_55%]
        "
      >
        <source
          src="/videos/bryon-lucid-training.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Left-Side Readability Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-white/80 sm:text-sm">
              Lucid Lifting
            </p>

            <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Latest Drops
              <br />
              & Restocks
            </h2>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-white/85 sm:text-base">
              Shop our newest releases.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-black transition-all duration-300 hover:bg-white/85"
            >
              Receive Alerts
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};