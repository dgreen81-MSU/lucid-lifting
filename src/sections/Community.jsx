import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Getting back into the gym felt intimidating, but the personalized workouts were great and made the experience feel encouraging instead of overwhelming. The guidance and support helped me rebuild my confidence, and now I'm stronger, healthier, and genuinely excited to keep progressing.",
    author: "Jenna",
    role: "The One and Only ❤️",
    avatar: "/images/community/jenna.jpg",
  },
  {
    quote:
      "The Lucid tank flips a switch. I throw it on and suddenly every workout feels personal. I walk into the gym feeling like I could run through a wall—and possibly bench the car parked outside.",
    author: "Jeremiah",
    role: "Veteran • Lifter • Returning Customer",
    avatar: "/images/community/jeremiah.jpg",
  },
  {
    quote:
      "Coming back from an injury made training feel uncertain, but every session was adapted around what my body could handle. I can keep making progress without feeling pressured to rush my recovery.",
    author: "Bryon",
    role: "Training Through Recovery",
    avatar: "/images/community/bryon.jpg",
  },
  {
    quote:
      "The purple Lucid tee fits right into my rotation. I can match it with some of my favorite kicks, wear it to the gym, and still keep it on when I go out afterward. It is training apparel without sacrificing style.",
    author: "Donavon",
    role: "@PBRDon • Sneakerhead",
    avatar: "/images/community/donavon.jpg",
  },
  {
    quote:
      "I'd absolutely rock a Lucid Lifting shirt... but I'm a dog, and apparently nobody makes gym apparel in my size. Belly rubs and treats will do for now.",
    author: "Shadow",
    role: "Chief Barketing Officer",
    avatar: "/images/community/shadow.jpg",
  },
];

export const Community = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setActiveIdx(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="community" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase animate-fade-in">
            The Lucid Community
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Built by people who{" "}
            <span className="font-serif italic font-normal text-white">
              keep showing up.
            </span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            From returning to training to expressing yourself through apparel,
            Lucid Lifting is about progress, confidence, and the people beside
            you along the way.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div
              key={activeIdx}
              className="glass p-8 rounded-3xl md:p-12 glow-border animate-fade-in animation-delay-200"
            >
              <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>

              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 pt-2">
                “{testimonials[activeIdx].quote}”
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[activeIdx].avatar}
                  alt={testimonials[activeIdx].author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/40"
                />

                <div>
                  <div className="font-semibold text-secondary-foreground">
                    {testimonials[activeIdx].author}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {testimonials[activeIdx].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous testimonial"
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <ChevronLeft />
              </button>

              <div className="flex gap-2">
                {testimonials.map((testimonial, idx) => (
                  <button
                    key={testimonial.author}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`View testimonial from ${testimonial.author}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeIdx
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};