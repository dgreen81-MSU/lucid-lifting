export const CoachingAbout = () => {
  return (
    <section className="bg-[#f3f1ec] text-black py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* COACH PHOTO */}
          <div className="relative min-h-[500px] rounded-3xl overflow-hidden bg-black/10">
            <img
              src="/images/davon-coaching.png"
              alt="Davon Green - Lucid Lifting Coach"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Subtle gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* COACH INFORMATION */}
          <div>
            <p className="text-primary text-sm uppercase tracking-[0.3em]">
              Meet Your Coach
            </p>

            <h2 className="mt-4 text-5xl md:text-7xl font-bold">
              Davon
              <span className="block font-serif italic font-normal text-primary">
                Green.
              </span>
            </h2>

            <p className="mt-6 text-black/60 text-lg leading-relaxed">
              Lucid Coaching combines structured training, individualized
              programming, accountability, and an active approach to fitness
              designed to help you build sustainable progress.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {[
                "NASM Certified Personal Trainer",
                "CPR / AED Certified",
                "Strength Training",
                "Muscle Development",
                "General Fitness",
                "Accountability",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 border border-black/15 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};