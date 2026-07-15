const experiences = [
  {
    period: "Step 1",
    role: "Health History & PAR-Q",
    company: "Understand Your Starting Point",
    description:
      "Complete a health and lifestyle questionnaire covering medical history, previous injuries, training experience, current activity level, and readiness for exercise.",
    technologies: ["Health History", "PAR-Q", "Lifestyle"],
    current: true,
  },
  {
    period: "Step 2",
    role: "Consultation & Goal Setting",
    company: "Define What Success Looks Like",
    description:
      "Discuss your goals, schedule, training history, preferences, and previous challenges so we can create a realistic path forward.",
    technologies: ["Consultation", "Goals", "Expectations"],
    current: false,
  },
  {
    period: "Step 3",
    role: "Initial Assessments",
    company: "Learn How You Move",
    description:
      "Complete appropriate posture, movement, balance, pushing, pulling, and overhead squat assessments to establish baseline data and identify areas of focus.",
    technologies: ["OHSA", "Movement Screens", "Baseline Data"],
    current: false,
  },
  {
    period: "Step 4",
    role: "Personalized Program Design",
    company: "Build a Plan Around You",
    description:
      "Use your goals, assessment results, experience level, schedule, and available equipment to create an individualized training program.",
    technologies: ["Program Design", "Progression", "Personalized"],
    current: false,
  },
  {
    period: "Step 5",
    role: "Guided Training Sessions",
    company: "Train With Purpose",
    description:
      "Work through structured sessions focused on proper technique, appropriate progression, accountability, and building confidence in the gym.",
    technologies: ["Technique", "Coaching", "Accountability"],
    current: false,
  },
  {
    period: "Step 6",
    role: "Progress Tracking & Program Adjustments",
    company: "Measure, Adapt, Improve",
    description:
      "Review your progress, repeat relevant assessments, celebrate wins, and adjust the program as your strength, movement, and goals evolve.",
    technologies: ["Progress", "Reassessment", "Adjustments"],
    current: false,
  },
];

export const TrainingExperience = () => {
  return (
    <section
      id="training-experience"
      className="py-32 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Your Training Journey
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            A Training Experience
            <span className="font-serif italic font-normal text-white">
              {" "}
              Built Around You.
            </span>
          </h2>

          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Every client begins with an assessment—not a workout. Here&apos;s
            what you can expect when training with Lucid Lifting.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Glowing Timeline Line */}
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((experience, idx) => (
              <div
                key={experience.role}
                className="relative grid md:grid-cols-2 gap-8 animate-fade-in"
                style={{
                  animationDelay: `${(idx + 1) * 150}ms`,
                }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 shadow-[0_0_18px_rgba(32,178,166,0.9)]">
                  {experience.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`pl-8 md:pl-0 ${
                    idx % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                  }`}
                >
                  <div className="glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-300">
                    <span className="text-sm text-primary font-medium">
                      {experience.period}
                    </span>

                    <h3 className="text-xl font-semibold mt-2 text-secondary-foreground">
                      {experience.role}
                    </h3>

                    <p className="text-muted-foreground">
                      {experience.company}
                    </p>

                    <p className="text-sm text-muted-foreground mt-4">
                      {experience.description}
                    </p>

                    <div
                      className={`flex flex-wrap gap-2 mt-4 ${
                        idx % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {experience.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};