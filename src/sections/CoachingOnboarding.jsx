export const CoachingOnboarding = () => {
  return (
    <section
      id="onboarding"
      className="relative py-24 md:py-32 overflow-hidden bg-black"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Side */}
          <div>
            <span className="text-primary text-sm font-medium tracking-[0.25em] uppercase">
              Start Your Journey
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-5 text-white leading-tight">
              Your Coaching Starts
              <span className="block font-serif italic font-normal text-primary">
                Before the First Workout.
              </span>
            </h2>

            <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-xl">
              Great coaching starts with understanding you. The Lucid Lifting
              Onboarding Packet helps establish your starting point, goals,
              training experience, lifestyle, nutrition, recovery, and other
              factors that can shape your coaching plan.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
              Complete the packet on your own time. We&apos;ll review it
              together during your consultation and use it to begin building a
              plan around you.
            </p>
          </div>

          {/* Right Side */}
          <div className="glass rounded-3xl border border-white/10 p-8 md:p-10">
            <span className="text-xs uppercase tracking-[0.25em] text-primary">
              Client Onboarding
            </span>

            <h3 className="text-2xl md:text-3xl font-semibold text-white mt-4">
              Lucid Lifting Onboarding Packet
            </h3>

            <p className="text-muted-foreground mt-4 leading-relaxed">
              Your first step toward personalized coaching.
            </p>

            <div className="mt-8 space-y-3 text-sm text-white/70">
              <p>✓ Health & exercise readiness</p>
              <p>✓ Goals & training experience</p>
              <p>✓ Lifestyle & recovery</p>
              <p>✓ Nutrition & current habits</p>
              <p>✓ Baseline & program planning information</p>
            </div>

            <a
              href="/documents/lucid-lifting-onboarding-packet.pdf"
              download
              className="mt-8 inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-primary text-black font-semibold uppercase tracking-wider rounded-full hover:opacity-90 transition"
            >
              Download Onboarding Packet ↓
            </a>

            <p className="mt-4 text-xs text-white/40">
              PDF • Complete at your own pace
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};