import { ArrowUpRight, Eye, ShoppingBag } from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";

const apparel = [
  {
    title: "Black Muscle Tank",
    description:
      "Our flagship muscle tank featuring the signature Lucid Lifting gorilla emblem. Built for heavy training with premium comfort and everyday wear.",
    image: "/images/apparel/black-muscle-tank.png",
    className: "scale-[1.45] translate-y-10 group-hover:scale-[1.52]",
    tags: ["Apparel", "Gym", "Premium"],
    link: "#",
    github: "#",
  },
  {
    title: "Purple Logo Tee",
    description:
      "A premium everyday tee that blends gym performance with streetwear style.",
    image: "/images/apparel/purple-logo-tee.png",
    tags: ["Lifestyle", "Training", "Classic"],
    link: "#",
    github: "#",
  },
  {
    title: "Weekend Duffel",
    description:
      "A spacious gym bag designed for training sessions, weekend trips, and everyday carry.",
    image: "/images/apparel/weekender-duffel.png",
    tags: ["Accessories", "Travel", "Gym"],
    link: "#",
    github: "#",
  },
  {
    title: "Canvas Tote",
    description:
      "A durable canvas tote built for everyday essentials while representing the Lucid Lifting lifestyle.",
    image: "/images/apparel/canvas-tote.png",
    tags: ["Lifestyle", "Everyday", "Accessories"],
    link: "#",
    github: "#",
  },
  {
    title: "Signature Pen",
    description:
      "A sleek Lucid Lifting pen for journaling workouts, planning goals, and taking notes.",
    image: "/images/apparel/signature-pen.png",
    tags: ["Office", "Lifestyle", "Accessories"],
    link: "#",
    github: "#",
  },
];

export const FeaturedApparel = () => {
  return (
    <section id="featured-apparel" className="py-32 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Apparel
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Apparel built to
            <span className="font-serif italic font-normal text-white">
              {" "}
              make an impact.
            </span>
          </h2>

          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Explore the first Lucid Lifting collection, created for training,
            everyday wear, and the pursuit of becoming stronger.
          </p>
        </div>

        {/* Featured Apparel Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {apparel.map((item, idx) => (
            <div
              key={item.title}
              className="group glass rounded-2xl overflow-hidden animate-fade-in"
              style={{
                animationDelay: `${(idx + 1) * 100}ms`,
              }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-contain transition-transform duration-700 ${
                    item.className || "group-hover:scale-105"
                  }`}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60 pointer-events-none" />

                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={item.link}
                    aria-label={`Shop ${item.title}`}
                    className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </a>

                  <a
                    href={item.link}
                    aria-label={`View ${item.title}`}
                    className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-secondary-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>

                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="flex justify-center mt-12 animate-fade-in animation-delay-500">
          <AnimatedBorderButton>
            View Full Collection
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};