const placeholders = [
  {
    title: "Client Story",
    text: "Real Lucid Coaching client experiences will live here as the coaching community grows.",
  },
  {
    title: "Client Story",
    text: "Progress is personal. Future client stories will highlight the process, experience, and results.",
  },
  {
    title: "Client Story",
    text: "Building something real takes time. Authentic client feedback will replace these placeholders.",
  },
];

export const CoachingReviews = () => {
  return (
    <section className="bg-black text-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-primary text-sm uppercase tracking-[0.3em]">
            Client Stories
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold">
            Real People.
            <span className="block font-serif italic font-normal text-primary">
              Real Progress.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {placeholders.map((review, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-3xl p-8 bg-white/[0.04]"
            >
              <span className="text-primary text-4xl">“</span>

              <p className="mt-6 text-white/60 leading-relaxed">
                {review.text}
              </p>

              <div className="mt-10 pt-6 border-t border-white/10">
                <p className="font-semibold">{review.title}</p>
                <p className="text-sm text-white/30 mt-1">
                  Coming Soon
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};