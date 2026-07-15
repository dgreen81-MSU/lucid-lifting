import {
  Shirt,
  Dumbbell,
  ClipboardCheck,
  Users,
} from "lucide-react";

const highlights = [
  {
    icon: Shirt,
    title: "Premium Apparel",
    description:
      "Designed to perform in the gym while looking just as good everywhere else.",
  },
  {
    icon: Dumbbell,
    title: "Personal Training",
    description:
      "Evidence-based coaching tailored to your goals, movement quality, and long-term success.",
  },
  {
    icon: ClipboardCheck,
    title: "Structured Coaching",
    description:
      "A personalized process built around assessments, purposeful programming, and measurable progress.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "A culture built on discipline, accountability, and becoming stronger together.",
  },
];

export const AboutLucid = () => {
  return (
    <section id="about-lucid" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Lucid Lifting
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Built through discipline,
              <span className="font-serif italic font-normal text-white">
                {" "}
                defined by purpose.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                Lucid Lifting is a fitness and lifestyle brand created at the
                intersection of strength, creativity, and culture. It represents
                more than what you wear in the gym—it reflects the confidence,
                discipline, and identity developed through every stage of the
                journey.
              </p>

              <p>
                What began as an apparel concept is evolving into a complete
                fitness experience. From premium apparel and personal training
                to structured coaching and community support, every part of
                Lucid Lifting is designed to help people become stronger inside
                and outside the gym.
              </p>

              <p>
                Whether you&apos;re chasing a new personal record, beginning a
                healthier lifestyle, or striving to become your best self,
                Lucid Lifting is built to move with you and connect you with a
                community that values purpose, consistency, and growth.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                &quot;We believe strength isn&apos;t measured by a life without
                struggle, but by the courage to rise after every setback. Every
                challenge is an opportunity to grow stronger, push forward, and
                become the person you&apos;re capable of being.&quot;
              </p>
            </div>
          </div>

          {/* Right Column - Highlights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={item.title}
                className="group glass p-6 rounded-2xl animate-fade-in"
                style={{
                  animationDelay: `${(idx + 1) * 100}ms`,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};