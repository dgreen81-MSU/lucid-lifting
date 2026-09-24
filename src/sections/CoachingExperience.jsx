import { useState } from "react";

const profileItems = [
  ["Goal", "Build Muscle"],
  ["Experience", "Intermediate"],
  ["Training", "5 Days / Week"],
  ["Equipment", "Gym + Home"],
  ["PAR-Q", "Complete ✓"],
];

const program = [
  {
    day: "MON",
    workout: "Chest + Triceps",
    detail: "Strength · Hypertrophy",
    warmup: [
      "Treadmill · 5–10 min",
      "Arm Circles · 10 each direction",
      "Band Pull-Aparts · 2 × 15",
      "Band Push-Throughs · 2 × 10",
    ],
    exercises: [
      "Barbell Bench Press · 4 × 5–6",
      "Incline DB Press · 3 × 8–10",
      "Machine Chest Press · 3 × 8–12",
      "Cable Fly / Pec Deck · 3 × 12–15",
      "Overhead Cable Triceps Extension · 3 × 10–15",
      "Dips · 2 × 8–12",
    ],
    cooldown: [
      "Upper-Body Stretching · 3 × 30 sec",
      "Foam Roll · Lower Back / Upper Back",
      "Dead Hang",
    ],
  },
  {
    day: "TUE",
    workout: "Legs · Quad Focus",
    detail: "Squat · Lower Body",
    warmup: [
      "Treadmill · 5–10 min",
      "Knee-to-Wall Ankle Rocks · 10 / side",
      "Hip 90/90 · 8 / side",
      "Leg Swings · 10 / side",
      "Bodyweight Squats · 10",
    ],
    exercises: [
      "Back Squat · 4 × 5–6",
      "Romanian Deadlift · 3 × 8–10",
      "Leg Press · 3 × 10–12",
      "Calf Raises · 4 × 12–15",
      "Leg Curl · 3 × 10–12",
      "Leg Extension · 3 × 12–15",
    ],
    cooldown: [
      "Hip Flexor Stretch · 30 sec / side",
      "Quad Stretch · 30 sec / side",
      "Hamstring Stretch · 30 sec / side",
      "Calf Stretch · 30 sec / side",
    ],
  },
  {
    day: "WED",
    workout: "Back + Biceps",
    detail: "Strength · 20–30 min Cardio",
    warmup: [],
    exercises: [],
    cooldown: [],
    comingSoon: true,
  },
  {
    day: "THU",
    workout: "Shoulders + Core",
    detail: "Strength · Core",
    warmup: [],
    exercises: [],
    cooldown: [],
    comingSoon: true,
  },
  {
    day: "FRI",
    workout: "Posterior Chain",
    detail: "Lower Accessories · 20–30 min Cardio",
    warmup: [],
    exercises: [],
    cooldown: [],
    comingSoon: true,
  },
];

const progressPoints = [
  { x: 0, y: 86 },
  { x: 14, y: 73 },
  { x: 28, y: 68 },
  { x: 42, y: 56 },
  { x: 57, y: 49 },
  { x: 71, y: 39 },
  { x: 85, y: 31 },
  { x: 100, y: 17 },
];

const progressPath = progressPoints
  .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
  .join(" ");

const days = [
  { day: "M", complete: true },
  { day: "T", complete: true },
  { day: "W", complete: false },
  { day: "T", complete: true },
  { day: "F", complete: true },
];

export const CoachingExperience = () => {
  const [openDay, setOpenDay] = useState(null);

  const toggleDay = (day) => {
    setOpenDay((currentDay) => (currentDay === day ? null : day));
  };

  return (
    <section
      id="coaching-experience"
      className="relative overflow-hidden bg-[#4B1F6F] text-white py-20 md:py-28"
    >
      {/* =========================================================
          ELEPHANT PRINT BACKGROUND
          Source: /public/images/elephant-print.jpg
      ========================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(75, 31, 111, 0.82),
              rgba(75, 31, 111, 0.82)
            ),
            url("/images/elephant-print.jpg")
          `,
          backgroundSize: "700px auto",
          backgroundRepeat: "repeat",
          backgroundPosition: "center top",
          backgroundBlendMode: "color, normal",
        }}
      />

      {/* Old-gold atmospheric accents */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle at 15% 10%, #C9A227 0%, transparent 28%), radial-gradient(circle at 90% 55%, #C9A227 0%, transparent 24%)",
        }}
      />

      {/* Purple readability wash */}
      <div className="absolute inset-0 bg-[#4B1F6F]/35 pointer-events-none" />

      {/* =========================================================
          PAGE CONTENT
      ========================================================== */}
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        {/* INTRO */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-14 md:mb-20">
          <div>
            <p className="text-primary text-xs md:text-sm font-bold tracking-[0.35em] uppercase">
              The Lucid Experience
            </p>

            <h2 className="mt-5 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.88] tracking-tight text-white">
              Coaching Built
              <span className="block font-serif italic font-normal text-primary">
                Around You.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-lg md:text-xl text-white/80 leading-relaxed lg:pb-2">
            Your training should fit your goals, your life, and what you want
            to accomplish. Lucid Coaching combines personalized programming,
            hands-on guidance, and ongoing support to help you make real,
            lasting progress.
          </p>
        </div>

        {/* =========================================================
            BENTO GRID
        ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">

          {/* =======================================================
              01 — BUILT AROUND YOU
          ======================================================== */}
          <article className="group relative overflow-hidden rounded-[28px] bg-[#090d0d] text-white lg:col-span-7 min-h-[600px] border border-[#C9A227]/20 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(21,184,166,0.12),transparent_35%)]" />

            <div className="relative z-10 grid md:grid-cols-[0.9fr_1.1fr] gap-8 h-full p-7 md:p-10">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 text-[#C9A227] text-xs font-bold tracking-[0.2em]">
                  <span>01</span>
                  <span className="w-12 h-px bg-[#C9A227]/50" />
                </div>

                <h3 className="mt-7 text-4xl md:text-5xl font-bold leading-[0.95]">
                  Built
                  <span className="block font-serif italic font-normal text-primary">
                    Around You.
                  </span>
                </h3>

                <p className="mt-6 text-white/65 leading-relaxed">
                  We start by understanding your health, lifestyle, training
                  experience, limitations, goals, and schedule so your program
                  actually fits your life.
                </p>

                <div className="mt-auto pt-10">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A227]/70">
                    Discover · Define · Assess
                  </p>
                </div>
              </div>

              {/* Sample Client Profile */}
              <div className="self-center rounded-[24px] border border-[#C9A227]/20 bg-[#111817]/95 p-5 md:p-6 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-primary font-bold tracking-[0.18em] text-xs">
                      LUCID
                    </p>

                    <p className="mt-1 text-white font-semibold">
                      Sample Client Profile
                    </p>

                    <p className="text-white/40 text-xs mt-1">
                      Illustrative onboarding preview
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary font-bold">
                    L
                  </div>
                </div>

                <div className="space-y-2">
                  {profileItems.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.045] border border-white/[0.06] px-4 py-3"
                    >
                      <span className="text-white/45 text-sm">
                        {label}
                      </span>

                      <span className="text-white text-sm font-medium text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* =======================================================
              02 — PLAN WITH PURPOSE
          ======================================================== */}
          <article className="group rounded-[28px] bg-[#eeeae2] text-black lg:col-span-5 p-7 md:p-10 min-h-[600px] overflow-hidden border border-[#C9A227]/30 shadow-xl">
            <div className="flex items-center gap-4 text-[#8C6E16] text-xs font-bold tracking-[0.2em]">
              <span>02</span>
              <span className="w-12 h-px bg-[#8C6E16]/50" />
            </div>

            <h3 className="mt-7 text-4xl md:text-5xl font-bold leading-[0.95]">
              A Plan
              <span className="block font-serif italic font-normal text-primary">
                With Purpose.
              </span>
            </h3>

            <p className="mt-5 text-black/60 max-w-md leading-relaxed">
              Your goals, experience, schedule, and available resources come
              together to create structured training built specifically for you.
            </p>

            <div className="mt-8 rounded-[22px] bg-white border border-black/[0.06] shadow-sm p-5 transition-transform duration-500 group-hover:-translate-y-1">
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div>
                  <p className="font-bold">
                    Sample Program
                  </p>

                  <p className="text-xs text-black/40 mt-1">
                    Explore a week of Lucid training
                  </p>
                </div>

                <span className="text-xs text-black/40">
                  WEEK 1
                </span>
              </div>

              <div>
                {program.map((item) => {
                  const isOpen = openDay === item.day;
                  const canExpand = !item.comingSoon;

                  return (
                    <div
                      key={item.day}
                      className="border-b last:border-0 border-black/[0.07]"
                    >
                      <button
                        type="button"
                        onClick={() => canExpand && toggleDay(item.day)}
                        className={`w-full grid grid-cols-[64px_1fr_auto] gap-3 py-4 text-left items-center ${
                          canExpand
                            ? "cursor-pointer group/day"
                            : "cursor-default"
                        }`}
                        aria-expanded={canExpand ? isOpen : undefined}
                      >
                        <div className="min-h-[48px] rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                          {item.day}
                        </div>

                        <div>
                          <p className="font-semibold text-sm">
                            {item.workout}
                          </p>

                          <p className="text-black/45 text-xs mt-1">
                            {item.detail}
                          </p>
                        </div>

                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                            canExpand
                              ? "bg-black/[0.04] text-black/50 group-hover/day:bg-primary/10 group-hover/day:text-primary"
                              : "text-black/20"
                          } ${
                            isOpen
                              ? "rotate-45 bg-primary/10 text-primary"
                              : ""
                          }`}
                        >
                          {canExpand ? "+" : "•"}
                        </div>
                      </button>

                      {isOpen && canExpand && (
                        <div className="pb-5 pl-[76px] pr-2">
                          <div className="rounded-xl bg-[#f5f3ee] border border-black/[0.06] p-4 space-y-5">
                            {item.warmup.length > 0 && (
                              <div>
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2">
                                  Warm-Up
                                </p>

                                <div className="space-y-1.5">
                                  {item.warmup.map((exercise) => (
                                    <p
                                      key={exercise}
                                      className="text-xs text-black/55 leading-relaxed"
                                    >
                                      {exercise}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}

                            {item.exercises.length > 0 && (
                              <div>
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2">
                                  Training
                                </p>

                                <div className="space-y-1.5">
                                  {item.exercises.map((exercise) => (
                                    <p
                                      key={exercise}
                                      className="text-xs text-black/70 leading-relaxed"
                                    >
                                      {exercise}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}

                            {item.cooldown.length > 0 && (
                              <div>
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2">
                                  Cooldown
                                </p>

                                <div className="space-y-1.5">
                                  {item.cooldown.map((exercise) => (
                                    <p
                                      key={exercise}
                                      className="text-xs text-black/55 leading-relaxed"
                                    >
                                      {exercise}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          {/* =======================================================
              03 — COACHING
          ======================================================== */}
          <article className="relative overflow-hidden rounded-[28px] bg-[#111] text-white lg:col-span-5 min-h-[570px] group border border-[#C9A227]/20 shadow-xl">

            {/* Dark Lucid background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#171c1b] via-[#101313] to-black" />

            {/* Teal atmospheric glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(21,184,166,0.14),transparent_38%)]" />

            {/* Decorative circles */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute -right-20 top-16 w-72 h-72 rounded-full border border-primary/40" />
              <div className="absolute -right-10 top-28 w-52 h-52 rounded-full border border-primary/30" />
            </div>

            {/* Bottom depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />

            <div className="relative z-10 h-full flex flex-col p-7 md:p-10">
              <div className="flex items-center gap-4 text-[#C9A227] text-xs font-bold tracking-[0.2em]">
                <span>03</span>
                <span className="w-12 h-px bg-[#C9A227]/50" />
              </div>

              <h3 className="mt-7 text-4xl md:text-5xl font-bold leading-[0.95]">
                Coaching,
                <br />
                Not Just
                <span className="block font-serif italic font-normal text-primary">
                  Programming.
                </span>
              </h3>

              <p className="mt-5 text-white/75 max-w-sm leading-relaxed">
                You&apos;re not just getting a plan. You&apos;re getting
                ongoing support, feedback, and a coach invested in the process.
              </p>

              <div className="mt-auto space-y-3 pt-12">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.06] backdrop-blur-md border border-white/10 p-4">
                  <p className="text-xs text-primary font-semibold mb-1">
                    DAVON · COACH
                  </p>

                  <p className="text-sm">
                    How did that last set feel?
                  </p>
                </div>

                <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-primary text-black p-4 shadow-lg">
                  <p className="text-sm">
                    Strong. Last couple reps were tough, but clean.
                  </p>
                </div>

                <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-white/[0.06] backdrop-blur-md border border-white/10 p-4">
                  <p className="text-xs text-primary font-semibold mb-1">
                    DAVON · COACH
                  </p>

                  <p className="text-sm">
                    Perfect. We&apos;ll keep the load and build from there.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* =======================================================
              04 — TRAIN ANYWHERE
          ======================================================== */}
          <article className="relative overflow-hidden rounded-[28px] bg-[#d9e5e2] text-black lg:col-span-3 min-h-[570px] group border border-[#C9A227]/30 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/40" />

            <div className="absolute inset-x-0 bottom-0 h-[55%] opacity-30">
              <svg
                viewBox="0 0 500 300"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 300 L0 230 L90 130 L145 195 L230 65 L305 175 L360 110 L500 235 L500 300 Z"
                  fill="currentColor"
                  className="text-black"
                />
              </svg>
            </div>

            <div className="relative z-10 h-full flex flex-col p-7 md:p-9">
              <div className="flex items-center gap-4 text-[#8C6E16] text-xs font-bold tracking-[0.2em]">
                <span>04</span>
                <span className="w-10 h-px bg-[#8C6E16]/50" />
              </div>

              <h3 className="mt-7 text-4xl font-bold leading-[0.95]">
                Train
                <span className="block font-serif italic font-normal text-primary">
                  Anywhere.
                </span>
              </h3>

              <p className="mt-5 text-black/60 leading-relaxed">
                Gym, home, or outdoors — your program is adapted to your
                equipment, environment, and real life.
              </p>

              <div className="mt-auto relative z-10">
                <p className="text-xs font-bold tracking-[0.35em] uppercase">
                  Make The World
                  <span className="block">
                    Your Gym.
                  </span>
                </p>

                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-black/40">
                  Outdoor photo coming soon
                </p>
              </div>
            </div>
          </article>

          {/* =======================================================
              05 — PROGRESS
          ======================================================== */}
          <article className="rounded-[28px] bg-[#09100f] text-white lg:col-span-4 min-h-[570px] p-7 md:p-9 overflow-hidden border border-[#C9A227]/20 shadow-xl">
            <div className="flex items-center gap-4 text-[#C9A227] text-xs font-bold tracking-[0.2em]">
              <span>05</span>
              <span className="w-10 h-px bg-[#C9A227]/50" />
            </div>

            <h3 className="mt-7 text-4xl font-bold leading-[0.95]">
              Progress
              <span className="block font-serif italic font-normal text-primary">
                You Can See.
              </span>
            </h3>

            <p className="mt-5 text-white/60 leading-relaxed">
              We track what matters to your goals so you can see your work
              turning into measurable progress.
            </p>

            <div className="mt-7 flex gap-2 text-[10px]">
              <span className="flex-1 text-center rounded-full bg-primary text-black font-bold py-2">
                STRENGTH
              </span>

              <span className="flex-1 text-center rounded-full border border-white/10 text-white/45 py-2">
                CONSISTENCY
              </span>

              <span className="flex-1 text-center rounded-full border border-white/10 text-white/45 py-2">
                CONDITIONING
              </span>
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs text-white/40 uppercase tracking-wider">
                  Strength Progress
                </p>

                <p className="text-[10px] text-[#C9A227]/70">
                  Sample Data
                </p>
              </div>

              <div className="h-48 relative">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[1, 2, 3, 4, 5].map((line) => (
                    <div
                      key={line}
                      className="border-t border-white/[0.07]"
                    />
                  ))}
                </div>

                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="lucidProgress"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="currentColor"
                        stopOpacity="0.35"
                      />

                      <stop
                        offset="100%"
                        stopColor="currentColor"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d={`${progressPath} L 100 100 L 0 100 Z`}
                    fill="url(#lucidProgress)"
                    className="text-primary"
                  />

                  <path
                    d={progressPath}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    className="text-primary"
                  />

                  {progressPoints.map((point, index) => (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="1.6"
                      fill="currentColor"
                      className="text-primary"
                    />
                  ))}
                </svg>
              </div>

              <div className="flex justify-between mt-3 text-[10px] text-white/35">
                <span>W1</span>
                <span>W3</span>
                <span>W5</span>
                <span>W7</span>
                <span>W9</span>
                <span>W12</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-white/[0.05] border border-white/[0.07] p-4 flex justify-between">
              <div>
                <p className="font-semibold text-sm">
                  Bench Press
                </p>

                <p className="text-white/40 text-xs mt-1">
                  Illustrative progress
                </p>
              </div>

              <span className="text-primary font-bold">
                ↑
              </span>
            </div>
          </article>

          {/* =======================================================
              06 — CONSISTENCY
          ======================================================== */}
          <article className="rounded-[28px] bg-[#ebe8e1] text-black lg:col-span-5 min-h-[380px] p-7 md:p-10 border border-[#C9A227]/30 shadow-xl">
            <div className="flex items-center gap-4 text-[#8C6E16] text-xs font-bold tracking-[0.2em]">
              <span>06</span>
              <span className="w-12 h-px bg-[#8C6E16]/50" />
            </div>

            <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-8 mt-7 items-center">
              <div>
                <h3 className="text-4xl font-bold leading-[0.95]">
                  Consistency
                  <span className="block font-serif italic font-normal text-primary">
                    Builds Results.
                  </span>
                </h3>

                <p className="mt-5 text-black/60 leading-relaxed">
                  Accountability, structure, and ongoing support help you stay
                  consistent and make real progress over time.
                </p>
              </div>

              <div className="rounded-[22px] bg-white border border-black/[0.06] p-5 shadow-sm">
                <div className="flex justify-between">
                  <p className="font-bold">
                    This Week
                  </p>

                  <p className="text-sm text-black/45">
                    4 / 5 sessions
                  </p>
                </div>

                <div className="grid grid-cols-5 gap-3 mt-6">
                  {days.map((item, index) => (
                    <div
                      key={`${item.day}-${index}`}
                      className="text-center"
                    >
                      <p className="text-xs text-black/40 mb-2">
                        {item.day}
                      </p>

                      <div
                        className={`aspect-square rounded-full flex items-center justify-center border ${
                          item.complete
                            ? "bg-primary text-black border-primary"
                            : "border-black/15 text-black/25"
                        }`}
                      >
                        {item.complete ? "✓" : "○"}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 h-2 rounded-full bg-black/10 overflow-hidden">
                  <div className="w-4/5 h-full bg-primary rounded-full" />
                </div>

                <div className="flex justify-between mt-4">
                  <p className="text-xs text-black/45">
                    Training consistency
                  </p>

                  <p className="font-bold text-sm">
                    On Track
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* =======================================================
              07 — EVOLVE
          ======================================================== */}
          <article className="relative overflow-hidden rounded-[28px] bg-[#101716] text-white lg:col-span-7 min-h-[380px] p-7 md:p-10 border border-[#C9A227]/20 shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(21,184,166,0.14),transparent_35%)]" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 text-[#C9A227] text-xs font-bold tracking-[0.2em]">
                <span>07</span>
                <span className="w-12 h-px bg-[#C9A227]/50" />
              </div>

              <div className="grid md:grid-cols-[0.75fr_1.25fr] gap-10 mt-7 items-center">
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold leading-[0.95]">
                    Built
                    <span className="block font-serif italic font-normal text-primary">
                      to Evolve.
                    </span>
                  </h3>

                  <p className="mt-5 text-white/60 leading-relaxed">
                    As you progress, we reassess, adjust, and refine your
                    program so it continues to fit your goals, your life, and
                    what&apos;s next.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    ["01", "Baseline", "Understand where you are"],
                    ["02", "Progress", "Track what is working"],
                    ["03", "Reassess", "Review and evaluate"],
                    ["04", "Adapt", "Update the plan"],
                  ].map(([number, title, text], index) => (
                    <div
                      key={title}
                      className="relative"
                    >
                      <div
                        className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold ${
                          index === 3
                            ? "border-primary text-primary"
                            : "border-[#C9A227]/40 text-[#C9A227]"
                        }`}
                      >
                        {number}
                      </div>

                      <p className="mt-4 font-bold text-sm uppercase">
                        {title}
                      </p>

                      <p className="mt-2 text-xs leading-relaxed text-white/40">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};