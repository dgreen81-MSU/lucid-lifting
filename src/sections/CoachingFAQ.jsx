import { useState } from "react";

const faqs = [
  {
    question: "What happens before I start training?",
    answer:
      "We start by learning about you. Your onboarding process covers your health history, training experience, lifestyle, schedule, limitations, goals, and expectations so your program begins with context—not assumptions.",
  },
  {
    question: "Do I need to complete a PAR-Q?",
    answer:
      "Yes. Health and readiness information helps determine whether exercise is appropriate and whether anything should be addressed before beginning or modifying your training.",
  },
  {
    question: "How do we define my goals?",
    answer:
      "We discuss what you want to accomplish, what success looks like to you, previous challenges, your availability, and realistic expectations. Those conversations become measurable targets that give your training direction.",
  },
  {
    question: "What assessments will we do?",
    answer:
      "Assessments depend on the client. Appropriate baseline measurements, movement assessments, and relevant strength or fitness assessments may be used to understand your starting point and help guide programming.",
  },
  {
    question: "How is my program created?",
    answer:
      "Your program is built from what we learn about you. Goals, training experience, schedule, equipment access, assessment information, preferences, and starting ability all help determine exercise selection, training frequency, volume, intensity, mobility, conditioning, and progression.",
  },
  {
    question: "How do we track progress?",
    answer:
      "Training performance and relevant baseline measures are monitored over time. Depending on your goals, that may include exercises, sets, reps, loads, movement quality, conditioning, measurements, consistency, and other appropriate indicators.",
  },
  {
    question: "Will my program change over time?",
    answer:
      "Yes. Coaching is an ongoing process. We review performance, discuss challenges, repeat relevant assessments when appropriate, and adjust programming as your abilities, goals, schedule, or needs change.",
  },
  {
    question: "What if I have an injury or physical limitation?",
    answer:
      "Your health history, current symptoms, and limitations should be discussed before training. Exercise can be modified when appropriate, and situations outside a personal trainer's scope may require clearance or guidance from a qualified healthcare professional.",
  },
  {
    question: "Do I need access to a full gym?",
    answer:
      "Not necessarily. Your available equipment is one of the factors considered when building your program. The goal is to create a realistic plan around the resources you actually have.",
  },
];

export const CoachingFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#f3f1ec] text-black py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-[0.3em]">
            Questions
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold">
            Before We
            <span className="font-serif italic font-normal text-primary">
              {" "}Get Started.
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-black/10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center text-left p-6 md:p-8"
                >
                  <span className="font-semibold text-lg">
                    {faq.question}
                  </span>

                  <span
                    className={`text-primary text-2xl transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 md:px-8 pb-8">
                    <p className="text-black/60 leading-relaxed max-w-3xl">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};