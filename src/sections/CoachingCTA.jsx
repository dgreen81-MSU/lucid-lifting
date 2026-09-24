import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

/* =========================================================
   CONSTANTS
========================================================= */

const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const COACHING_TYPES = [
  {
    value: "In-Person Training",
    shortLabel: "In-Person",
    description: "Train together in person with hands-on coaching.",
  },
  {
    value: "Online Coaching",
    shortLabel: "Online Coaching",
    description: "Remote programming, accountability, and coaching support.",
  },
];

const TRAINING_FREQUENCIES = [
  {
    value: 2,
    label: "2 Days",
    description: "2 training days / week",
  },
  {
    value: 3,
    label: "3 Days",
    description: "3 training days / week",
  },
  {
    value: 4,
    label: "4 Days",
    description: "4 training days / week",
  },
  {
    value: 5,
    label: "5 Days",
    description: "5 training days / week",
  },
];

const TRAINING_TIMES = [
  {
    value: "Early",
    label: "Early",
    description: "Morning",
  },
  {
    value: "Midday",
    label: "Midday",
    description: "Late morning / afternoon",
  },
  {
    value: "Late",
    label: "Late",
    description: "Late afternoon / evening",
  },
];

/* =========================================================
   DATE HELPERS
========================================================= */

const addDays = (date, amount) => {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
};

const startOfDay = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatLongDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

/* =========================================================
   COMPONENT
========================================================= */

export const CoachingCTA = () => {
  /* -------------------------------------------------------
     MAIN FLOW STATE
  ------------------------------------------------------- */

  const [showAvailability, setShowAvailability] = useState(false);

  const [coachingType, setCoachingType] = useState("");
  const [trainingFrequency, setTrainingFrequency] = useState(null);
  const [preferredTime, setPreferredTime] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);

  /* -------------------------------------------------------
     FAST TRACK STATE
  ------------------------------------------------------- */

  const [showEarlyStart, setShowEarlyStart] = useState(false);

  /* -------------------------------------------------------
     CLIENT INFORMATION
  ------------------------------------------------------- */

  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
  });

  /* -------------------------------------------------------
     SUBMISSION STATE
  ------------------------------------------------------- */

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  /* =======================================================
     BOOKING BOUNDARY

     Today + the following 7 days are unavailable.

     Example:
     Today = Sept 23
     First standard date = Oct 1
  ======================================================= */

  const today = useMemo(() => startOfDay(new Date()), []);

  const firstAvailableDate = useMemo(
    () => addDays(today, 8),
    [today]
  );

  const [visibleMonth, setVisibleMonth] = useState(
    () =>
      new Date(
        firstAvailableDate.getFullYear(),
        firstAvailableDate.getMonth(),
        1
      )
  );

  /* =======================================================
     CALENDAR GRID
  ======================================================= */

  const calendarDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const leadingBlanks = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const cells = [];

    for (let i = 0; i < leadingBlanks; i += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(year, month, day));
    }

    return cells;
  }, [visibleMonth]);

  /* =======================================================
     DATE AVAILABILITY
  ======================================================= */

  const isUnavailable = (date) =>
    startOfDay(date).getTime() < firstAvailableDate.getTime();

  const canGoToPreviousMonth = () => {
    const previousMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() - 1,
      1
    );

    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    return previousMonth.getTime() >= currentMonth.getTime();
  };

  const changeMonth = (amount) => {
    if (amount < 0 && !canGoToPreviousMonth()) {
      return;
    }

    setVisibleMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + amount,
          1
        )
    );
  };

  /* =======================================================
     FLOW HELPERS
  ======================================================= */

  const isOnline = coachingType === "Online Coaching";

  const preferencesComplete =
    coachingType &&
    trainingFrequency &&
    preferredTime;

  const bookingComplete =
    coachingType &&
    trainingFrequency &&
    preferredTime &&
    selectedDate;

  const resetStatus = () => {
    setSubmitStatus({
      type: null,
      message: "",
    });
  };

  /* =======================================================
     SELECTION HANDLERS
  ======================================================= */

  const handleCoachingTypeSelect = (type) => {
    setCoachingType(type);

    setTrainingFrequency(null);
    setPreferredTime("");
    setSelectedDate(null);

    setShowCalendar(false);
    setShowConfirmation(false);
    setShowEarlyStart(false);

    resetStatus();
  };

  const handleFrequencySelect = (frequency) => {
    setTrainingFrequency(frequency);

    setShowConfirmation(false);

    resetStatus();
  };

  const handleTimeSelect = (time) => {
    setPreferredTime(time);

    setShowConfirmation(false);

    resetStatus();
  };

  const handleSelectDate = (date) => {
    if (isUnavailable(date)) {
      return;
    }

    setSelectedDate(date);
    setShowCalendar(false);
    setShowConfirmation(false);

    resetStatus();
  };

  const handleClientInfoChange = (event) => {
    const { name, value } = event.target;

    setClientInfo((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =======================================================
     OPEN / CLOSE
  ======================================================= */

  const openAvailability = () => {
    setShowAvailability((current) => !current);

    if (showAvailability) {
      setShowCalendar(false);
      setShowConfirmation(false);
      setShowEarlyStart(false);
    }
  };

  const openEarlyStart = () => {
    setShowEarlyStart(true);
    setShowConfirmation(false);
    resetStatus();
  };

  /* =======================================================
     EMAILJS HELPER
  ======================================================= */

  const sendEmail = async ({
    name,
    email,
    message,
  }) => {
    const serviceId =
      import.meta.env.VITE_EMAILJS_SERVICE_ID;

    const templateId =
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    const publicKey =
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error(
        "EmailJS configuration is missing. Please check your environment variables."
      );
    }

    await emailjs.send(
      serviceId,
      templateId,
      {
        name,
        email,
        message,
      },
      {
        publicKey,
      }
    );
  };

  /* =======================================================
     STANDARD COACHING REQUEST
  ======================================================= */

  const handleSubmitCoachingRequest = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const trimmedName = clientInfo.name.trim();
    const trimmedEmail = clientInfo.email.trim();

    if (
      !coachingType ||
      !trainingFrequency ||
      !preferredTime ||
      !selectedDate ||
      !trimmedName ||
      !trimmedEmail
    ) {
      setSubmitStatus({
        type: "error",
        message:
          "Please complete your coaching preferences, name, and email before sending your request.",
      });

      return;
    }

    setIsSubmitting(true);
    resetStatus();

    try {
      const requestMessage = `
NEW LUCID COACHING REQUEST

CLIENT
Name: ${trimmedName}
Email: ${trimmedEmail}

COACHING TYPE
${coachingType}

TRAINING PREFERENCES
Training Days Per Week: ${trainingFrequency}
Preferred Training Time: ${preferredTime}

START DATE
Preferred Start Date: ${formatLongDate(selectedDate)}
First Standard Available Date: ${formatLongDate(firstAvailableDate)}

REQUEST DETAILS
Request Type: Standard Coaching Request
Request Submitted: ${new Date().toLocaleString()}

SOURCE
Lucid Lifting Coaching Page

NEXT STEP
Contact ${trimmedName} at ${trimmedEmail} to begin the Lucid Lifting onboarding and consultation process.
      `.trim();

      await sendEmail({
        name: trimmedName,
        email: trimmedEmail,
        message: requestMessage,
      });

      setSubmitStatus({
        type: "success",
        message:
          "Your coaching request has been sent. I’ll reach out directly to begin the onboarding process.",
      });

      setShowConfirmation(false);
    } catch (error) {
      console.error(
        "EmailJS coaching request error:",
        error
      );

      setSubmitStatus({
        type: "error",
        message:
          error?.text ||
          error?.message ||
          "Your request could not be sent. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     EARLY START REQUEST
  ======================================================= */

  const handleSubmitEarlyStart = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const trimmedName = clientInfo.name.trim();
    const trimmedEmail = clientInfo.email.trim();

    if (!trimmedName || !trimmedEmail) {
      setSubmitStatus({
        type: "error",
        message:
          "Please enter your name and email so I can follow up with you.",
      });

      return;
    }

    setIsSubmitting(true);
    resetStatus();

    try {
      const requestMessage = `
LUCID COACHING — EARLY START REQUEST

CLIENT
Name: ${trimmedName}
Email: ${trimmedEmail}

COACHING TYPE
${coachingType || "Not selected yet"}

TRAINING PREFERENCES
Training Days Per Week: ${
        trainingFrequency
          ? `${trainingFrequency} days / week`
          : "Not selected yet"
      }

Preferred Training Time: ${
        preferredTime || "Not selected yet"
      }

REQUEST
Client would like to begin sooner than the standard seven-day onboarding window.

STANDARD BOOKING WINDOW
First Standard Available Date: ${formatLongDate(firstAvailableDate)}

REQUEST DETAILS
Request Type: Early Start / Fast Track
Request Submitted: ${new Date().toLocaleString()}

SOURCE
Lucid Lifting Coaching Page

NEXT STEP
Contact ${trimmedName} at ${trimmedEmail} directly to discuss early-start availability and begin onboarding if appropriate.
      `.trim();

      await sendEmail({
        name: trimmedName,
        email: trimmedEmail,
        message: requestMessage,
      });

      setSubmitStatus({
        type: "success",
        message:
          "Your early-start request has been sent. I’ll follow up directly about availability.",
      });

      setShowEarlyStart(false);
    } catch (error) {
      console.error(
        "EmailJS early-start request error:",
        error
      );

      setSubmitStatus({
        type: "error",
        message:
          error?.text ||
          error?.message ||
          "Your request could not be sent. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="onboarding"
      className="relative text-white py-28 md:py-40 overflow-hidden bg-black"
    >
      {/* ===================================================
          ELEPHANT PRINT BACKGROUND
      ==================================================== */}

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('/images/elephant-print.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "420px auto",
          backgroundPosition: "center top",
        }}
      />

      {/* Purple Lucid wash over the elephant print */}

      <div className="absolute inset-0 bg-[#6f45a8]/60 mix-blend-color" />

      {/* Dark overlay keeps the CTA readable without hiding the purple texture */}

      <div className="absolute inset-0 bg-black/48" />

      {/* Slight purple glow for a richer branded finish */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#8b5fc7]/10 via-transparent to-[#4f2f78]/20" />

      <div className="container mx-auto px-6 relative z-10 text-center">

        {/* =================================================
            ORIGINAL CTA
        ================================================== */}

        <p className="text-primary text-sm uppercase tracking-[0.3em]">
          Your Next Step
        </p>

        <h2 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-bold">
          Ready to Train

          <span className="block font-serif italic font-normal text-primary">
            With Purpose?
          </span>
        </h2>

        <p className="mt-8 mx-auto max-w-xl text-white/65 text-lg">
          Start with a conversation about where you are,
          where you want to go, and what it will take to
          get there.
        </p>

        <button
          type="button"
          onClick={openAvailability}
          className="mt-10 px-8 py-4 bg-primary text-black font-semibold uppercase tracking-wider rounded-full hover:scale-[1.03] transition"
        >
          {showAvailability
            ? "Close Availability"
            : "See Availability"}
        </button>

        {/* =================================================
            COACHING PANEL
        ================================================== */}

        {showAvailability && (
          <div className="mt-14 mx-auto max-w-4xl text-left">

            <div className="rounded-[28px] bg-[#f2efe9] text-black overflow-hidden shadow-2xl border border-white/10">

              {/* ===========================================
                  HEADER
              ============================================ */}

              <div className="p-6 md:p-8 border-b border-black/10">

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

                  <div>
                    <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
                      Lucid Coaching
                    </p>

                    <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                      Build Your Training Schedule
                    </h3>

                    <p className="mt-2 text-sm text-black/50 max-w-xl">
                      Tell me how you want to train, what
                      schedule works best for you, and when
                      you&apos;d like to get started.
                    </p>
                  </div>

                  <div className="md:text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">
                      First Standard Start
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {formatLongDate(firstAvailableDate)}
                    </p>
                  </div>

                </div>
              </div>

              {/* ===========================================
                  STEP 1 — COACHING TYPE
              ============================================ */}

              <div className="p-6 md:p-8 border-b border-black/10">

                <div className="flex items-center gap-3">

                  <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                    1
                  </span>

                  <p className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold">
                    Coaching Style
                  </p>

                </div>

                <h4 className="mt-4 text-xl md:text-2xl font-bold">
                  How would you like to train?
                </h4>

                <p className="mt-2 text-sm text-black/45">
                  Choose the coaching experience that best
                  fits where you are and how you want to work
                  together.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-6">

                  {COACHING_TYPES.map((option) => {
                    const selected =
                      coachingType === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          handleCoachingTypeSelect(
                            option.value
                          )
                        }
                        className={`rounded-2xl border p-6 text-left transition-all ${
                          selected
                            ? "bg-primary border-primary text-black shadow-lg -translate-y-1"
                            : "bg-white border-black/10 hover:border-primary hover:-translate-y-1"
                        }`}
                      >
                        <span className="block text-xl font-bold">
                          {option.shortLabel}
                        </span>

                        <span
                          className={`block mt-2 text-sm leading-relaxed ${
                            selected
                              ? "text-black/65"
                              : "text-black/45"
                          }`}
                        >
                          {option.description}
                        </span>
                      </button>
                    );
                  })}

                </div>
              </div>

              {/* ===========================================
                  STEP 2 — FREQUENCY
              ============================================ */}

              {coachingType && (
                <div className="p-6 md:p-8 border-b border-black/10">

                  <div className="flex items-center gap-3">

                    <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                      2
                    </span>

                    <p className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold">
                      Training Frequency
                    </p>

                  </div>

                  <h4 className="mt-4 text-xl md:text-2xl font-bold">
                    {isOnline
                      ? "How many training days would you like programmed each week?"
                      : "How often would you like to train each week?"}
                  </h4>

                  <p className="mt-2 text-sm text-black/45">
                    {isOnline
                      ? "Choose the weekly training frequency that best fits your goals, schedule, and recovery."
                      : "Choose the frequency that best fits your goals and schedule."}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">

                    {TRAINING_FREQUENCIES.map(
                      (option) => {
                        const selected =
                          trainingFrequency ===
                          option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              handleFrequencySelect(
                                option.value
                              )
                            }
                            className={`rounded-xl border p-4 text-left transition-all ${
                              selected
                                ? "bg-primary border-primary text-black shadow-md -translate-y-1"
                                : "bg-white border-black/10 hover:border-primary hover:-translate-y-1"
                            }`}
                          >
                            <span className="block text-xl font-bold">
                              {option.label}
                            </span>

                            <span
                              className={`block mt-1 text-xs ${
                                selected
                                  ? "text-black/60"
                                  : "text-black/40"
                              }`}
                            >
                              {option.description}
                            </span>
                          </button>
                        );
                      }
                    )}

                  </div>
                </div>
              )}

              {/* ===========================================
                  STEP 3 — TIME
              ============================================ */}

              {trainingFrequency && (
                <div className="p-6 md:p-8 border-b border-black/10">

                  <div className="flex items-center gap-3">

                    <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                      3
                    </span>

                    <p className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold">
                      Preferred Time
                    </p>

                  </div>

                  <h4 className="mt-4 text-xl md:text-2xl font-bold">
                    {isOnline
                      ? "When do you typically complete your workouts?"
                      : "When do you typically prefer to train?"}
                  </h4>

                  <p className="mt-2 text-sm text-black/45">
                    {isOnline
                      ? "This gives me a better idea of when training fits naturally into your day."
                      : "This helps me understand what part of the day usually works best for you."}
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 mt-6">

                    {TRAINING_TIMES.map((option) => {
                      const selected =
                        preferredTime === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            handleTimeSelect(
                              option.value
                            )
                          }
                          className={`rounded-xl border p-5 text-left transition-all ${
                            selected
                              ? "bg-primary border-primary text-black shadow-md -translate-y-1"
                              : "bg-white border-black/10 hover:border-primary hover:-translate-y-1"
                          }`}
                        >
                          <span className="block text-lg font-bold">
                            {option.label}
                          </span>

                          <span
                            className={`block mt-1 text-xs ${
                              selected
                                ? "text-black/60"
                                : "text-black/40"
                            }`}
                          >
                            {option.description}
                          </span>
                        </button>
                      );
                    })}

                  </div>
                </div>
              )}

              {/* ===========================================
                  STEP 4 — CALENDAR
              ============================================ */}

              {preferencesComplete && (
                <div className="p-6 md:p-8 border-b border-black/10">

                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

                    <div>

                      <div className="flex items-center gap-3">

                        <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                          4
                        </span>

                        <p className="text-xs uppercase tracking-[0.2em] text-black/40 font-semibold">
                          {isOnline
                            ? "Program Start"
                            : "Training Start"}
                        </p>

                      </div>

                      <h4 className="mt-4 text-xl md:text-2xl font-bold">
                        When would you like to get started?
                      </h4>

                      <p className="mt-2 text-sm text-black/45 max-w-xl">
                        {isOnline
                          ? "Choose your preferred program start date. The onboarding window gives us time to get your plan organized before you begin."
                          : "Choose your preferred start date. The onboarding window gives us time to prepare before your first session."}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setShowCalendar(
                          (current) => !current
                        )
                      }
                      className="self-start md:self-auto px-6 py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-primary hover:text-black transition"
                    >
                      {showCalendar
                        ? "Close Calendar"
                        : selectedDate
                        ? "Change Date"
                        : "Open Calendar"}
                    </button>

                  </div>

                  {/* SELECTED DATE */}

                  {selectedDate && (
                    <div className="mt-6 rounded-xl bg-white border border-black/10 p-5">

                      <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">
                        {isOnline
                          ? "Preferred Program Start"
                          : "Preferred Training Start"}
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        {formatLongDate(selectedDate)}
                      </p>

                    </div>
                  )}

                  {/* =======================================
                      KEYSTONE-STYLE CALENDAR
                  ======================================== */}

                  {showCalendar && (
                    <div className="mt-7 mx-auto max-w-md rounded-2xl bg-white shadow-xl border border-black/[0.08] p-5 md:p-6">

                      {/* MONTH HEADER */}

                      <div className="flex items-center justify-between">

                        <button
                          type="button"
                          onClick={() => changeMonth(-1)}
                          disabled={
                            !canGoToPreviousMonth()
                          }
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                            canGoToPreviousMonth()
                              ? "text-black/40 hover:bg-black/[0.04] hover:text-primary"
                              : "text-black/10 cursor-not-allowed"
                          }`}
                          aria-label="Previous month"
                        >
                          <span className="text-3xl font-light">
                            ‹
                          </span>
                        </button>

                        <div className="text-center">

                          <p className="text-xl font-bold text-primary">
                            {
                              MONTHS[
                                visibleMonth.getMonth()
                              ]
                            }
                          </p>

                          <p className="text-xs tracking-[0.35em] text-black/45 mt-1">
                            {visibleMonth.getFullYear()}
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() => changeMonth(1)}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-black/40 hover:bg-black/[0.04] hover:text-primary transition"
                          aria-label="Next month"
                        >
                          <span className="text-3xl font-light">
                            ›
                          </span>
                        </button>

                      </div>

                      {/* DAY HEADINGS */}

                      <div className="grid grid-cols-7 mt-5 border-t border-black/10 pt-4">

                        {DAYS.map((day) => (
                          <div
                            key={day}
                            className="text-center text-[10px] font-bold text-black/40"
                          >
                            {day.charAt(0)}
                          </div>
                        ))}

                      </div>

                      {/* CALENDAR DAYS */}

                      <div className="grid grid-cols-7 gap-1 mt-2">

                        {calendarDays.map(
                          (date, index) => {
                            if (!date) {
                              return (
                                <div
                                  key={`blank-${index}`}
                                  className="aspect-square"
                                />
                              );
                            }

                            const unavailable =
                              isUnavailable(date);

                            const selected =
                              selectedDate &&
                              isSameDay(
                                date,
                                selectedDate
                              );

                            const currentDay =
                              isSameDay(date, today);

                            return (
                              <button
                                key={date.toISOString()}
                                type="button"
                                disabled={unavailable}
                                onClick={() =>
                                  handleSelectDate(date)
                                }
                                aria-label={formatLongDate(
                                  date
                                )}
                                className={`relative aspect-square overflow-hidden rounded-md text-sm font-medium transition-all ${
                                  unavailable
                                    ? "bg-[#555] text-white/75 cursor-not-allowed"
                                    : selected
                                    ? "bg-primary text-black font-bold shadow-md scale-[1.04]"
                                    : "bg-[#f8f8f6] border border-black/[0.06] text-black/70 hover:bg-primary/10 hover:border-primary hover:text-primary"
                                }`}
                              >

                                {/* DATE NUMBER */}

                                <span className="relative z-20">
                                  {date.getDate()}
                                </span>

                                {/* KEYSTONE X */}

                                {unavailable && (
                                  <>
                                    <span
                                      aria-hidden="true"
                                      className="absolute z-10 left-1/2 top-1/2 w-[145%] h-px bg-white/55 -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none"
                                    />

                                    <span
                                      aria-hidden="true"
                                      className="absolute z-10 left-1/2 top-1/2 w-[145%] h-px bg-white/55 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none"
                                    />
                                  </>
                                )}

                                {/* TODAY INDICATOR */}

                                {currentDay && (
                                  <span className="absolute z-20 bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                                )}

                              </button>
                            );
                          }
                        )}

                      </div>

                      {/* LEGEND */}

                      <div className="mt-5 pt-4 border-t border-black/10 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-black/45">

                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-sm bg-primary" />
                          Selected
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-sm border border-black/20 bg-white" />
                          Available
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="relative w-3 h-3 rounded-sm bg-[#555] overflow-hidden">
                            <span className="absolute left-1/2 top-1/2 w-4 h-px bg-white/70 -translate-x-1/2 -translate-y-1/2 rotate-45" />
                            <span className="absolute left-1/2 top-1/2 w-4 h-px bg-white/70 -translate-x-1/2 -translate-y-1/2 -rotate-45" />
                          </span>

                          Unavailable
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ===========================================
                  FAST TRACK
              ============================================ */}

              {preferencesComplete && (
                <div className="px-6 md:px-8 py-6 md:py-8">

                  <div
                    className="relative overflow-hidden rounded-2xl text-white border border-primary/20"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.74), rgba(0, 0, 0, 0.82)), url('/images/elephant-print.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >

                    <div className="relative z-10 p-6 md:p-8">

                      {!showEarlyStart ? (
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                          <div className="max-w-xl">

                            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.25em]">
                              Looking to get started sooner?
                            </p>

                            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                              New coaching clients are
                              generally scheduled at least one
                              week in advance to allow time
                              for onboarding and preparation.
                              If you&apos;d like to begin
                              sooner, send me an early-start
                              request and I&apos;ll personally
                              follow up about availability.
                            </p>

                          </div>

                          <button
                            type="button"
                            onClick={openEarlyStart}
                            className="shrink-0 inline-flex items-center justify-center px-7 py-4 rounded-full bg-primary text-black text-xs font-bold uppercase tracking-[0.15em] hover:scale-[1.03] transition"
                          >
                            Contact Davon
                          </button>

                        </div>
                      ) : (
                        <div>

                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                            <div>

                              <p className="text-primary text-[10px] font-bold uppercase tracking-[0.25em]">
                                Early Start Request
                              </p>

                              <h5 className="mt-2 text-2xl font-bold">
                                Let&apos;s See What We Can Do.
                              </h5>

                              <p className="mt-2 text-sm text-white/60 max-w-xl leading-relaxed">
                                Send me your contact
                                information and I&apos;ll
                                personally follow up about
                                starting inside the normal
                                seven-day onboarding window.
                              </p>

                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                setShowEarlyStart(false)
                              }
                              className="text-xs uppercase tracking-[0.15em] text-white/40 hover:text-primary transition"
                            >
                              Cancel
                            </button>

                          </div>

                          {/* SAVED PREFERENCES */}

                          <div className="grid sm:grid-cols-3 gap-3 mt-6">

                            <div className="rounded-xl bg-white/[0.07] border border-white/10 p-4">

                              <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                                Coaching
                              </p>

                              <p className="mt-2 text-sm font-semibold">
                                {coachingType}
                              </p>

                            </div>

                            <div className="rounded-xl bg-white/[0.07] border border-white/10 p-4">

                              <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                                Frequency
                              </p>

                              <p className="mt-2 text-sm font-semibold">
                                {trainingFrequency} days / week
                              </p>

                            </div>

                            <div className="rounded-xl bg-white/[0.07] border border-white/10 p-4">

                              <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                                Preferred Time
                              </p>

                              <p className="mt-2 text-sm font-semibold">
                                {preferredTime}
                              </p>

                            </div>

                          </div>

                          {/* EARLY START FORM */}

                          <form
                            onSubmit={
                              handleSubmitEarlyStart
                            }
                            className="mt-6"
                          >

                            <div className="grid md:grid-cols-2 gap-4">

                              <div>

                                <label
                                  htmlFor="early-name"
                                  className="block text-xs uppercase tracking-[0.15em] text-white/50 mb-2"
                                >
                                  Name
                                </label>

                                <input
                                  id="early-name"
                                  name="name"
                                  type="text"
                                  required
                                  autoComplete="name"
                                  disabled={
                                    isSubmitting
                                  }
                                  value={
                                    clientInfo.name
                                  }
                                  onChange={
                                    handleClientInfoChange
                                  }
                                  placeholder="Your name"
                                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-primary transition"
                                />

                              </div>

                              <div>

                                <label
                                  htmlFor="early-email"
                                  className="block text-xs uppercase tracking-[0.15em] text-white/50 mb-2"
                                >
                                  Email
                                </label>

                                <input
                                  id="early-email"
                                  name="email"
                                  type="email"
                                  required
                                  autoComplete="email"
                                  disabled={
                                    isSubmitting
                                  }
                                  value={
                                    clientInfo.email
                                  }
                                  onChange={
                                    handleClientInfoChange
                                  }
                                  placeholder="you@email.com"
                                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-primary transition"
                                />

                              </div>

                            </div>

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="mt-5 px-7 py-4 rounded-full bg-primary text-black text-xs font-bold uppercase tracking-[0.15em] hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting
                                ? "Sending Request..."
                                : "Request Early Start"}
                            </button>

                          </form>

                        </div>
                      )}

                    </div>
                  </div>
                </div>
              )}

              {/* ===========================================
                  STANDARD REVIEW
              ============================================ */}

              {bookingComplete && !showEarlyStart && (
                <div className="border-t border-black/10 p-6 md:p-8">

                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.25em]">
                    Your Coaching Preferences
                  </p>

                  <h4 className="mt-2 text-2xl font-bold">
                    Does everything look right?
                  </h4>

                  <p className="mt-2 text-sm text-black/45">
                    Review your selections before sending
                    your coaching request.
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">

                    <div className="rounded-xl bg-white border border-black/10 p-4">

                      <p className="text-[10px] uppercase tracking-[0.15em] text-black/35">
                        Coaching
                      </p>

                      <p className="mt-2 font-bold">
                        {coachingType}
                      </p>

                    </div>

                    <div className="rounded-xl bg-white border border-black/10 p-4">

                      <p className="text-[10px] uppercase tracking-[0.15em] text-black/35">
                        Frequency
                      </p>

                      <p className="mt-2 font-bold">
                        {trainingFrequency} days / week
                      </p>

                    </div>

                    <div className="rounded-xl bg-white border border-black/10 p-4">

                      <p className="text-[10px] uppercase tracking-[0.15em] text-black/35">
                        Preferred Time
                      </p>

                      <p className="mt-2 font-bold">
                        {preferredTime}
                      </p>

                    </div>

                    <div className="rounded-xl bg-white border border-black/10 p-4">

                      <p className="text-[10px] uppercase tracking-[0.15em] text-black/35">
                        {isOnline
                          ? "Program Start"
                          : "Training Start"}
                      </p>

                      <p className="mt-2 font-bold">
                        {formatLongDate(selectedDate)}
                      </p>

                    </div>

                  </div>

                  {!showConfirmation && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmation(true)
                      }
                      className="mt-6 w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold uppercase tracking-[0.15em] rounded-full hover:scale-[1.02] transition"
                    >
                      Confirm Preferences
                    </button>
                  )}

                  {/* =======================================
                      FINAL CONTACT INFORMATION
                  ======================================== */}

                  {showConfirmation && (
                    <form
                      onSubmit={
                        handleSubmitCoachingRequest
                      }
                      className="mt-8 rounded-2xl bg-black text-white p-6 md:p-8"
                    >

                      <p className="text-primary text-[10px] font-bold uppercase tracking-[0.25em]">
                        One Last Step
                      </p>

                      <h5 className="mt-2 text-2xl font-bold">
                        Where should I reach you?
                      </h5>

                      <p className="mt-2 text-sm text-white/50 max-w-lg">
                        Just your name and email. I&apos;ll
                        use this to follow up about your
                        coaching request and begin the
                        onboarding process.
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mt-6">

                        <div>

                          <label
                            htmlFor="coaching-name"
                            className="block text-xs uppercase tracking-[0.15em] text-white/50 mb-2"
                          >
                            Name
                          </label>

                          <input
                            id="coaching-name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            disabled={isSubmitting}
                            value={clientInfo.name}
                            onChange={
                              handleClientInfoChange
                            }
                            placeholder="Your name"
                            className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-primary transition"
                          />

                        </div>

                        <div>

                          <label
                            htmlFor="coaching-email"
                            className="block text-xs uppercase tracking-[0.15em] text-white/50 mb-2"
                          >
                            Email
                          </label>

                          <input
                            id="coaching-email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            disabled={isSubmitting}
                            value={clientInfo.email}
                            onChange={
                              handleClientInfoChange
                            }
                            placeholder="you@email.com"
                            className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-primary transition"
                          />

                        </div>

                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-6">

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-4 rounded-full bg-primary text-black font-bold uppercase tracking-[0.12em] hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting
                            ? "Sending Request..."
                            : "Send Coaching Request"}
                        </button>

                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() =>
                            setShowConfirmation(false)
                          }
                          className="px-8 py-4 rounded-full border border-white/20 text-white/70 font-semibold uppercase tracking-[0.12em] hover:border-primary hover:text-primary transition"
                        >
                          Edit Preferences
                        </button>

                      </div>

                    </form>
                  )}

                </div>
              )}

              {/* ===========================================
                  SUBMISSION STATUS
              ============================================ */}

              {submitStatus.message && (
                <div className="px-6 md:px-8 pb-8">

                  <div
                    role="status"
                    aria-live="polite"
                    className={`rounded-xl border px-5 py-4 text-sm ${
                      submitStatus.type === "success"
                        ? "border-green-500/30 bg-green-500/10 text-green-700"
                        : "border-red-500/30 bg-red-500/10 text-red-600"
                    }`}
                  >
                    {submitStatus.message}
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};