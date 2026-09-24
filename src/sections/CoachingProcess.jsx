import { useState } from "react";

const experiences = [
  {
    number: "01",
    role: "Discover",
    tagline: "Understand Your Starting Point",
    description:
      "Before we build your program, we start by understanding you—your health, lifestyle, training experience, limitations, and what brought you here.",

    clientActions: [
      "Complete the onboarding packet",
      "Complete the PAR-Q and health history",
      "Share previous training experience",
      "Discuss lifestyle, schedule, and limitations",
    ],

    coachActions: [
      "Review health and exercise history",
      "Identify relevant limitations or precautions",
      "Understand current activity and experience level",
      "Determine appropriate next steps",
    ],

    outcome:
      "A clear picture of where you're starting and what we need to consider moving forward.",

    tags: ["Health History", "PAR-Q", "Lifestyle"],

    action: {
      label: "Download Onboarding Packet",
      href: "/documents/lucid-lifting-onboarding-packet.pdf",
    },
  },

  {
    number: "02",
    role: "Define",
    tagline: "Define What Success Looks Like",
    description:
      "Your goals give the program direction. Together, we'll turn what you want to accomplish into a realistic plan built around your life.",

    clientActions: [
      "Discuss short- and long-term goals",
      "Identify what success looks like to you",
      "Talk through previous challenges",
      "Establish realistic availability and expectations",
    ],

    coachActions: [
      "Clarify your primary goals",
      "Identify barriers and opportunities",
      "Help establish measurable targets",
      "Align expectations with your schedule and starting point",
    ],

    outcome:
      "Clear goals and expectations that give your training a purpose and direction.",

    tags: ["Consultation", "Goals", "Expectations"],
  },

  {
    number: "03",
    role: "Assess",
    tagline: "Learn How You Move",
    description:
      "Appropriate baseline assessments help establish your current abilities and identify areas that may deserve additional attention.",

    clientActions: [
      "Complete appropriate baseline measurements",
      "Perform selected movement assessments",
      "Complete relevant strength or fitness assessments",
      "Provide feedback about comfort, difficulty, and limitations",
    ],

    coachActions: [
      "Observe movement quality",
      "Evaluate relevant mobility and stability",
      "Establish baseline performance data",
      "Identify areas to prioritize during program design",
    ],

    outcome:
      "Baseline information we can use to guide your program and compare against future progress.",

    tags: ["Movement", "Baseline", "Assessment"],
  },

  {
    number: "04",
    role: "Design",
    tagline: "Build a Plan Around You",
    description:
      "Your program is built from what we've learned—not pulled from a generic template. Goals, experience, schedule, equipment, and starting point all shape the plan.",

    clientActions: [
      "Review the proposed training schedule",
      "Discuss exercise preferences",
      "Confirm equipment and gym access",
      "Ask questions before training begins",
    ],

    coachActions: [
      "Select appropriate exercises",
      "Structure training frequency and split",
      "Plan volume, intensity, and progression",
      "Incorporate appropriate mobility and conditioning",
    ],

    outcome:
      "A personalized starting program with a clear structure and progression strategy.",

    tags: ["Program Design", "Progression", "Individualized"],
  },

  {
    number: "05",
    role: "Train",
    tagline: "Train With Purpose",
    description:
      "This is where the plan becomes action. Training is logged, performance is monitored, and feedback helps guide what happens next.",

    clientActions: [
      "Complete scheduled training sessions",
      "Track exercises, sets, reps, and loads",
      "Communicate difficulty and feedback",
      "Practice consistency and proper technique",
    ],

    coachActions: [
      "Monitor training performance",
      "Provide technique and exercise guidance",
      "Review workout feedback",
      "Adjust when the program needs to adapt",
    ],

    outcome:
      "Consistent, intentional training with information we can use to measure progress.",

    tags: ["Training", "Technique", "Accountability"],
  },

  {
    number: "06",
    role: "Evolve",
    tagline: "Measure. Adapt. Improve.",
    description:
      "Coaching doesn't end when the program is written. We review what's working, reassess where appropriate, and evolve the plan as you progress.",

    clientActions: [
      "Review progress and challenges",
      "Repeat relevant assessments",
      "Discuss changes in goals or lifestyle",
      "Set the next target",
    ],

    coachActions: [
      "Compare progress with baseline data",
      "Evaluate training performance",
      "Adjust programming where appropriate",
      "Establish the next phase of training",
    ],

    outcome:
      "An updated direction based on what you've accomplished and where you want to go next.",

    tags: ["Progress", "Reassessment", "Adaptation"],
  },
];

export const CoachingProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  const toggleStep = (index) => {
    setActiveStep((current) => (current === index ? null : index));
  };

  return (
    <section
      id="coaching-process"
      className="py-24 md:py-32 relative overflow-hidden bg-black"
    >
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary text-sm font-medium tracking-[0.25em] uppercase">
            Your Coaching Journey
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-white">
            More Than a Workout.
            <span className="block font-serif italic font-normal text-primary">
              A Process Built Around You.
            </span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Every client starts somewhere different. The Lucid coaching process
            helps us understand where you are, define where you want to go, and
            build a path between the two.
          </p>
        </div>

        {/* Journey Progress */}
        <div className="hidden lg:grid grid-cols-6 gap-2 mb-20">
          {experiences.map((experience, index) => {
            const isActive = activeStep === index;

            return (
              <button
                key={experience.number}
                type="button"
                onClick={() => {
                  setActiveStep(index);

                  document
                    .getElementById(`coaching-step-${index}`)
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                }}
                className="group text-left"
              >
                <div className="flex items-center mb-3">
                  <div
                    className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                      isActive
                        ? "bg-primary border-primary shadow-[0_0_18px_rgba(32,178,166,0.9)] scale-125"
                        : "bg-black border-white/30 group-hover:border-primary"
                    }`}
                  />

                  {index < experiences.length - 1 && (
                    <div
                      className={`h-px flex-1 ml-2 transition-colors duration-300 ${
                        activeStep !== null && index < activeStep
                          ? "bg-primary"
                          : "bg-white/15"
                      }`}
                    />
                  )}
                </div>

                <span
                  className={`text-xs tracking-[0.2em] transition-colors ${
                    isActive ? "text-primary" : "text-white/40"
                  }`}
                >
                  {experience.number}
                </span>

                <p
                  className={`mt-1 text-sm font-semibold uppercase transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-white/50 group-hover:text-white"
                  }`}
                >
                  {experience.role}
                </p>
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[6px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2">
            <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-primary/80 via-primary/30 to-transparent shadow-[0_0_25px_rgba(32,178,166,0.35)]" />
          </div>

          <div className="space-y-12 md:space-y-20">
            {experiences.map((experience, index) => {
              const isActive = activeStep === index;

              return (
                <div
                  id={`coaching-step-${index}`}
                  key={experience.number}
                  className="relative grid md:grid-cols-2 gap-8"
                >
                  {/* Timeline Dot */}
                  <button
                    type="button"
                    aria-label={`Open ${experience.role}`}
                    onClick={() => toggleStep(index)}
                    className={`absolute left-[7px] md:left-1/2 top-8 w-4 h-4 rounded-full -translate-x-1/2 z-20 border transition-all duration-300 ${
                      isActive
                        ? "bg-primary border-primary scale-125 shadow-[0_0_22px_rgba(32,178,166,0.95)]"
                        : "bg-black border-primary/60 hover:bg-primary/30"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                    )}
                  </button>

                  {/* Card */}
                  <div
                    className={`pl-10 md:pl-0 ${
                      index % 2 === 0
                        ? "md:pr-16"
                        : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleStep(index)}
                      className="w-full text-left group"
                    >
                      <div
                        className={`relative overflow-hidden rounded-2xl border p-6 md:p-8 transition-all duration-500 ${
                          isActive
                            ? "border-primary/70 bg-white/[0.06] -translate-y-1 shadow-[0_20px_70px_rgba(0,0,0,0.45),0_0_35px_rgba(32,178,166,0.12)]"
                            : "border-white/10 bg-white/[0.03] hover:border-primary/40 hover:bg-white/[0.05] hover:-translate-y-1"
                        }`}
                      >
                        {/* Large Background Number */}
                        <span
                          className={`absolute -right-2 -top-8 text-[9rem] font-black leading-none select-none transition-all duration-500 ${
                            isActive
                              ? "text-primary/[0.08] scale-110"
                              : "text-white/[0.025]"
                          }`}
                        >
                          {experience.number}
                        </span>

                        <div className="relative z-10">
                          <div className="flex items-start justify-between gap-6">
                            <div>
                              <span className="text-primary text-sm font-medium tracking-[0.2em]">
                                {experience.number}
                              </span>

                              <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 uppercase">
                                {experience.role}
                              </h3>

                              <p className="text-primary/90 mt-1">
                                {experience.tagline}
                              </p>
                            </div>

                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center text-xl transition-all duration-300 ${
                                isActive
                                  ? "border-primary bg-primary text-black rotate-45"
                                  : "border-white/20 text-white group-hover:border-primary group-hover:text-primary"
                              }`}
                            >
                              +
                            </div>
                          </div>

                          <p className="text-muted-foreground mt-6 leading-relaxed">
                            {experience.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-6">
                            {experience.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full border border-white/10 bg-black/30 text-xs text-white/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {!isActive && (
                            <p className="text-xs uppercase tracking-[0.2em] text-white/30 mt-6 group-hover:text-primary transition-colors">
                              Explore Step →
                            </p>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Details */}
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100 mt-4"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="rounded-2xl border border-primary/20 bg-primary/[0.03] p-6 md:p-8">
                          <div className="grid lg:grid-cols-2 gap-8">
                            {/* Client Side */}
                            <div>
                              <span className="text-xs text-primary font-semibold tracking-[0.2em] uppercase">
                                Your Part
                              </span>

                              <h4 className="text-lg font-semibold text-white mt-2">
                                What You'll Do
                              </h4>

                              <ul className="mt-4 space-y-3">
                                {experience.clientActions.map((item) => (
                                  <li
                                    key={item}
                                    className="flex gap-3 text-sm text-muted-foreground"
                                  >
                                    <span className="text-primary">→</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Coach Side */}
                            <div>
                              <span className="text-xs text-primary font-semibold tracking-[0.2em] uppercase">
                                My Part
                              </span>

                              <h4 className="text-lg font-semibold text-white mt-2">
                                What I'll Do
                              </h4>

                              <ul className="mt-4 space-y-3">
                                {experience.coachActions.map((item) => (
                                  <li
                                    key={item}
                                    className="flex gap-3 text-sm text-muted-foreground"
                                  >
                                    <span className="text-primary">→</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Outcome */}
                          <div className="mt-8 pt-6 border-t border-white/10">
                            <span className="text-xs text-primary font-semibold tracking-[0.2em] uppercase">
                              We Leave With
                            </span>

                            <p className="text-white mt-2 leading-relaxed">
                              {experience.outcome}
                            </p>
                          </div>

                          {/* Optional Stage Action */}
                          {experience.action && (
                            <div className="mt-8">
                              <a
                                href={experience.action.href}
                                download
                                onClick={(event) => event.stopPropagation()}
                                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary hover:text-white transition-colors"
                              >
                                {experience.action.label} ↓
                              </a>
                            </div>
                          )}

                          {/* Previous / Next Navigation */}
                          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => {
                                if (index > 0) {
                                  setActiveStep(index - 1);

                                  document
                                    .getElementById(
                                      `coaching-step-${index - 1}`
                                    )
                                    ?.scrollIntoView({
                                      behavior: "smooth",
                                      block: "center",
                                    });
                                }
                              }}
                              className="text-xs uppercase tracking-[0.15em] text-white/50 hover:text-primary transition disabled:opacity-20 disabled:hover:text-white/50"
                            >
                              ← Previous
                            </button>

                            <span className="text-xs text-white/30 tracking-[0.2em]">
                              {experience.number} / 06
                            </span>

                            <button
                              type="button"
                              disabled={index === experiences.length - 1}
                              onClick={() => {
                                if (index < experiences.length - 1) {
                                  setActiveStep(index + 1);

                                  document
                                    .getElementById(
                                      `coaching-step-${index + 1}`
                                    )
                                    ?.scrollIntoView({
                                      behavior: "smooth",
                                      block: "center",
                                    });
                                }
                              }}
                              className="text-xs uppercase tracking-[0.15em] text-white/50 hover:text-primary transition disabled:opacity-20 disabled:hover:text-white/50"
                            >
                              Next →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};