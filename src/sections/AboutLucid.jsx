import { ArrowDown, ArrowUpRight } from "lucide-react";

const panels = [
  {
    title: "Coaching",
    subtitle: "Train with purpose",
    image: "/images/coaching-og-tee.png",
    link: "/coaching",
    imagePosition: "center center",
  },
  {
    title: "Training",
    subtitle: "Built for the work",
    image: "/images/training-og-tee.jpeg",
    link: "/training",
    imagePosition: "center 18%",
  },
  {
    title: "Explore",
    subtitle: "Make the world your gym",
    image: "/images/manitou-og-tee.jpeg",
    link: "/community",
    imagePosition: "center center",
  },
];

export const AboutLucid = () => {
  return (
    <section
      id="about-lucid"
      className="relative overflow-hidden bg-black"
    >
      {/* =====================================
          SECTION TRANSITION
      ====================================== */}
      <div className="relative flex min-h-[150px] items-center justify-between border-b border-white/10 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 sm:text-xs">
            Explore Lucid
          </p>

          <h2 className="text-xl font-black uppercase tracking-tight text-white sm:text-2xl md:text-3xl">
            More than what you wear.
          </h2>
        </div>

        <div className="hidden h-10 w-10 items-center justify-center border border-white/20 text-white/60 sm:flex">
          <ArrowDown className="h-4 w-4" />
        </div>
      </div>

      {/* =====================================
          CATEGORY PANELS
      ====================================== */}
      <div className="grid grid-cols-1 gap-[3px] bg-black md:grid-cols-3">
        {panels.map((panel) => (
          <a
            key={panel.title}
            href={panel.link}
            className="group relative min-h-[520px] overflow-hidden bg-black md:min-h-[680px]"
          >
            {/* Background Image */}
            <img
              src={panel.image}
              alt={panel.title}
              style={{ objectPosition: panel.imagePosition }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/45" />

            {/* Top Gradient */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />

            {/* Bottom Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/65">
                {panel.subtitle}
              </p>

              <div className="flex items-end justify-between gap-4">
                <h3 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {panel.title}
                </h3>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>

            {/* Hover Border */}
            <div className="pointer-events-none absolute inset-0 border border-white/0 transition-colors duration-500 group-hover:border-white/20" />
          </a>
        ))}
      </div>
    </section>
  );
};