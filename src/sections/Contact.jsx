import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Dumbbell,
  Shirt,
  Handshake,
  MessageCircle,
  Phone,
  CalendarDays,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Button } from "../components/Button";

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

const CONTACT_REASONS = [
  {
    value: "Coaching",
    label: "Coaching",
    description: "Training, programming, or fitness support.",
    icon: Dumbbell,
  },
  {
    value: "Apparel",
    label: "Apparel",
    description: "Products, sizing, orders, or Lucid gear.",
    icon: Shirt,
  },
  {
    value: "Collaboration",
    label: "Collaboration",
    description: "Partnerships, content, events, or creative ideas.",
    icon: Handshake,
  },
  {
    value: "General Question",
    label: "General",
    description: "Anything else you want to talk about.",
    icon: MessageCircle,
  },
];

const CONTACT_METHODS = [
  {
    value: "Email",
    label: "Email Me",
    description: "Keep it simple. I'll follow up by email.",
    icon: Mail,
  },
  {
    value: "Quick Call",
    label: "Quick Call",
    description: "Choose a preferred day for me to reach out.",
    icon: Phone,
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "lucidliftingco@gmail.com",
    href: "mailto:lucidliftingco@gmail.com",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "@lucidliftingco",
    href: "https://www.instagram.com/lucidliftingco/",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Denver, CO",
    href: "#",
  },
];

/* =========================================================
   DATE HELPERS
========================================================= */

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

export const Contact = () => {
  /* -------------------------------------------------------
     INTERACTIVE FLOW
  ------------------------------------------------------- */

  const [contactReason, setContactReason] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showReview, setShowReview] = useState(false);

  /* -------------------------------------------------------
     FORM
  ------------------------------------------------------- */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  /* -------------------------------------------------------
     CALENDAR
  ------------------------------------------------------- */

  const today = useMemo(() => startOfDay(new Date()), []);

  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

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

  const isUnavailable = (date) =>
    startOfDay(date).getTime() < today.getTime();

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

  /* -------------------------------------------------------
     FLOW HELPERS
  ------------------------------------------------------- */

  const resetStatus = () => {
    setSubmitStatus({
      type: null,
      message: "",
    });
  };

  const handleReasonSelect = (reason) => {
    setContactReason(reason);
    setContactMethod("");
    setSelectedDate(null);
    setShowCalendar(false);
    setShowReview(false);
    resetStatus();
  };

  const handleMethodSelect = (method) => {
    setContactMethod(method);
    setSelectedDate(null);
    setShowCalendar(false);
    setShowReview(false);
    resetStatus();
  };

  const handleSelectDate = (date) => {
    if (isUnavailable(date)) {
      return;
    }

    setSelectedDate(date);
    setShowCalendar(false);
    setShowReview(false);
    resetStatus();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));

    setShowReview(false);
  };

  const contactPreferencesComplete =
    contactReason &&
    contactMethod &&
    (contactMethod !== "Quick Call" || selectedDate);

  const formComplete =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.message.trim();

  /* =========================================================
     EMAILJS SUBMISSION
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    const trimmedFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (!contactReason || !contactMethod) {
      setSubmitStatus({
        type: "error",
        message: "Please choose what brings you to Lucid and how you'd like to connect.",
      });

      return;
    }

    if (contactMethod === "Quick Call" && !selectedDate) {
      setSubmitStatus({
        type: "error",
        message: "Please choose a preferred contact day for your quick call.",
      });

      return;
    }

    if (
      !trimmedFormData.name ||
      !trimmedFormData.email ||
      !trimmedFormData.message
    ) {
      setSubmitStatus({
        type: "error",
        message: "Please complete all fields before sending your message.",
      });

      return;
    }

    setIsLoading(true);

    setSubmitStatus({
      type: null,
      message: "",
    });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }

      const structuredMessage = `
NEW LUCID CONTACT REQUEST

CONTACT
Name: ${trimmedFormData.name}
Email: ${trimmedFormData.email}

INTEREST
${contactReason}

CONTACT PREFERENCE
${contactMethod}

${
  contactMethod === "Quick Call"
    ? `PREFERRED CONTACT DATE
${formatLongDate(selectedDate)}

NOTE
This is a preferred contact date, not a confirmed appointment.

`
    : ""
}MESSAGE
${trimmedFormData.message}

SOURCE
Lucid Lifting — Get In Touch

REQUEST SUBMITTED
${new Date().toLocaleString()}
      `.trim();

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: trimmedFormData.name,
          email: trimmedFormData.email,
          message: structuredMessage,
        },
        {
          publicKey,
        }
      );

      setSubmitStatus({
        type: "success",
        message:
          "Message sent successfully! Lucid Lifting will get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setContactReason("");
      setContactMethod("");
      setSelectedDate(null);
      setShowCalendar(false);
      setShowReview(false);
    } catch (error) {
      console.error("EmailJS error:", error);

      setSubmitStatus({
        type: "error",
        message:
          error?.text ||
          error?.message ||
          "Failed to send message. Please try again later or contact Lucid Lifting through Instagram.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 md:py-32"
    >
      {/* =====================================================
          ELEPHANT PRINT BACKGROUND
      ====================================================== */}

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/elephant-print.jpg')",
          backgroundSize: "420px auto",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-[#6f3d8f]/75" />
      <div className="absolute inset-0 bg-black/20" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 25%, rgba(168,85,247,0.22), transparent 34%), radial-gradient(circle at 82% 70%, rgba(20,184,166,0.10), transparent 30%), linear-gradient(to bottom, rgba(15,8,20,0.08), rgba(15,8,20,0.30))",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 180px rgba(12, 6, 18, 0.35)",
        }}
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Get In Touch
          </p>

          <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Let&apos;s build{" "}
            <span className="text-primary">something</span>{" "}
            <span className="font-serif font-normal italic text-white">
              stronger.
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Have a fitness goal, apparel idea, collaboration, or question?
            Tell me what brought you here and let&apos;s start the conversation.
          </p>
        </div>

        {/* =====================================================
            MAIN INTERACTIVE PANEL
        ====================================================== */}

        <div className="mx-auto max-w-5xl overflow-hidden rounded-[30px] border border-white/10 bg-[#f1eee7] shadow-2xl">
          {/* =================================================
              STEP 1 — REASON
          ================================================== */}

          <div className="border-b border-black/10 p-6 md:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                1
              </span>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                Start Here
              </p>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-black md:text-3xl">
              What brings you to{" "}
              <span className="font-serif font-normal italic text-primary">
                Lucid?
              </span>
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/50">
              Pick the option that best matches what you want to talk about.
              No long questionnaire — just enough context to point the
              conversation in the right direction.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CONTACT_REASONS.map((option) => {
                const Icon = option.icon;
                const selected = contactReason === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleReasonSelect(option.value)}
                    className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                      selected
                        ? "border-primary bg-primary text-black shadow-lg -translate-y-1"
                        : "border-black/10 bg-white hover:-translate-y-1 hover:border-primary"
                    }`}
                  >
                    <div
                      className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${
                        selected
                          ? "bg-black/10"
                          : "bg-black/[0.04]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="block font-bold">
                      {option.label}
                    </span>

                    <span
                      className={`mt-2 block text-xs leading-relaxed ${
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

            {contactReason === "Coaching" && (
              <div className="mt-6 rounded-2xl border border-primary/20 bg-black p-5 text-white md:flex md:items-center md:justify-between md:gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                    Looking For Coaching?
                  </p>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
                    You can send a quick question here, or use the full Lucid
                    Coaching experience to build your training request and
                    preferred start date.
                  </p>
                </div>

                <a
                  href="/coaching"
                  className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full border border-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary transition hover:bg-primary hover:text-black md:mt-0"
                >
                  Explore Coaching
                </a>
              </div>
            )}
          </div>

          {/* =================================================
              STEP 2 — CONTACT METHOD
          ================================================== */}

          {contactReason && (
            <div className="border-b border-black/10 p-6 md:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                  2
                </span>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                  Let&apos;s Connect
                </p>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-black md:text-3xl">
                How would you like me to{" "}
                <span className="font-serif font-normal italic text-primary">
                  follow up?
                </span>
              </h3>

              <p className="mt-2 text-sm text-black/45">
                Choose whatever feels easiest. You&apos;re not committing to
                anything here.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {CONTACT_METHODS.map((option) => {
                  const Icon = option.icon;
                  const selected = contactMethod === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleMethodSelect(option.value)}
                      className={`rounded-2xl border p-6 text-left transition-all duration-300 ${
                        selected
                          ? "border-primary bg-primary text-black shadow-lg -translate-y-1"
                          : "border-black/10 bg-white hover:-translate-y-1 hover:border-primary"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            selected
                              ? "bg-black/10"
                              : "bg-black/[0.04]"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <span className="block text-lg font-bold">
                            {option.label}
                          </span>

                          <span
                            className={`mt-1 block text-sm ${
                              selected
                                ? "text-black/60"
                                : "text-black/45"
                            }`}
                          >
                            {option.description}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* =================================================
              STEP 3 — QUICK CALL CALENDAR
          ================================================== */}

          {contactMethod === "Quick Call" && (
            <div className="border-b border-black/10 p-6 md:p-8 lg:p-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                      3
                    </span>

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                      Preferred Contact Day
                    </p>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-black md:text-3xl">
                    What day works{" "}
                    <span className="font-serif font-normal italic text-primary">
                      best?
                    </span>
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-black/45">
                    Pick a preferred day for me to reach out. This helps me
                    understand your availability — it does not automatically
                    confirm an appointment.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowCalendar((current) => !current)
                  }
                  className="inline-flex self-start items-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-primary hover:text-black md:self-auto"
                >
                  <CalendarDays className="h-4 w-4" />

                  {showCalendar
                    ? "Close Calendar"
                    : selectedDate
                    ? "Change Day"
                    : "Choose A Day"}
                </button>
              </div>

              {selectedDate && (
                <div className="mt-6 rounded-xl border border-black/10 bg-white p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">
                    Preferred Contact Day
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {formatLongDate(selectedDate)}
                  </p>

                  <p className="mt-2 text-xs text-black/40">
                    Preferred day only — I&apos;ll follow up to coordinate an
                    actual time.
                  </p>
                </div>
              )}

              {/* KEYSTONE-STYLE CALENDAR */}

              {showCalendar && (
                <div className="mx-auto mt-7 max-w-md rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xl md:p-6">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => changeMonth(-1)}
                      disabled={!canGoToPreviousMonth()}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                        canGoToPreviousMonth()
                          ? "text-black/40 hover:bg-black/[0.04] hover:text-primary"
                          : "cursor-not-allowed text-black/10"
                      }`}
                      aria-label="Previous month"
                    >
                      <span className="text-3xl font-light">‹</span>
                    </button>

                    <div className="text-center">
                      <p className="text-xl font-bold text-primary">
                        {MONTHS[visibleMonth.getMonth()]}
                      </p>

                      <p className="mt-1 text-xs tracking-[0.35em] text-black/45">
                        {visibleMonth.getFullYear()}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => changeMonth(1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-black/40 transition hover:bg-black/[0.04] hover:text-primary"
                      aria-label="Next month"
                    >
                      <span className="text-3xl font-light">›</span>
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-7 border-t border-black/10 pt-4">
                    {DAYS.map((day) => (
                      <div
                        key={day}
                        className="text-center text-[10px] font-bold text-black/40"
                      >
                        {day.charAt(0)}
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 grid grid-cols-7 gap-1">
                    {calendarDays.map((date, index) => {
                      if (!date) {
                        return (
                          <div
                            key={`blank-${index}`}
                            className="aspect-square"
                          />
                        );
                      }

                      const unavailable = isUnavailable(date);

                      const selected =
                        selectedDate &&
                        isSameDay(date, selectedDate);

                      const currentDay = isSameDay(date, today);

                      return (
                        <button
                          key={date.toISOString()}
                          type="button"
                          disabled={unavailable}
                          onClick={() => handleSelectDate(date)}
                          aria-label={formatLongDate(date)}
                          className={`relative aspect-square overflow-hidden rounded-md text-sm font-medium transition-all ${
                            unavailable
                              ? "cursor-not-allowed bg-[#555] text-white/75"
                              : selected
                              ? "scale-[1.04] bg-primary font-bold text-black shadow-md"
                              : "border border-black/[0.06] bg-[#f8f8f6] text-black/70 hover:border-primary hover:bg-primary/10 hover:text-primary"
                          }`}
                        >
                          <span className="relative z-20">
                            {date.getDate()}
                          </span>

                          {unavailable && (
                            <>
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-px w-[145%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/55"
                              />

                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-px w-[145%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white/55"
                              />
                            </>
                          )}

                          {currentDay && (
                            <span className="absolute bottom-1 left-1/2 z-20 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-black/10 pt-4 text-[10px] text-black/45">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm bg-primary" />
                      Selected
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm border border-black/20 bg-white" />
                      Available
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="relative h-3 w-3 overflow-hidden rounded-sm bg-[#555]">
                        <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/70" />
                        <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white/70" />
                      </span>

                      Past
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =================================================
              FINAL STEP — CONTACT DETAILS
          ================================================== */}

          {contactPreferencesComplete && (
            <div className="p-6 md:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                  {contactMethod === "Quick Call" ? "4" : "3"}
                </span>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                  One Last Step
                </p>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-black md:text-3xl">
                Tell me a little about what you&apos;re{" "}
                <span className="font-serif font-normal italic text-primary">
                  thinking.
                </span>
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/45">
                Just the essentials. Give me enough context to understand what
                you&apos;re looking for and I&apos;ll take it from there.
              </p>

              <form
                className="mt-7"
                onSubmit={handleSubmit}
                aria-busy={isLoading}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-black/45"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      disabled={isLoading}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-4 text-black outline-none transition placeholder:text-black/30 focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-black/45"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      disabled={isLoading}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-4 text-black outline-none transition placeholder:text-black/30 focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-black/45"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    disabled={isLoading}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me what you're working toward, what you have in mind, or what you'd like to know..."
                    className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-4 text-black outline-none transition placeholder:text-black/30 focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {/* CURRENT SELECTIONS */}

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-xl border border-black/10 bg-white p-4">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">
                      Interest
                    </p>

                    <p className="mt-2 text-sm font-bold">
                      {contactReason}
                    </p>
                  </div>

                  <div className="rounded-xl border border-black/10 bg-white p-4">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">
                      Follow Up
                    </p>

                    <p className="mt-2 text-sm font-bold">
                      {contactMethod}
                    </p>
                  </div>

                  {selectedDate && (
                    <div className="rounded-xl border border-black/10 bg-white p-4 sm:col-span-2 lg:col-span-1">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">
                        Preferred Day
                      </p>

                      <p className="mt-2 text-sm font-bold">
                        {formatLongDate(selectedDate)}
                      </p>
                    </div>
                  )}
                </div>

                {/* REVIEW BUTTON */}

                {!showReview && (
                  <button
                    type="button"
                    disabled={!formComplete}
                    onClick={() => {
                      setShowReview(true);
                      resetStatus();
                    }}
                    className="mt-6 rounded-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Review Message
                  </button>
                )}

                {/* FINAL REVIEW */}

                {showReview && (
                  <div className="mt-8 overflow-hidden rounded-2xl bg-[#07100f] text-white">
                    <div className="border-b border-white/10 p-6 md:p-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a84b]">
                        Ready To Send
                      </p>

                      <h4 className="mt-2 text-2xl font-bold">
                        Does everything look{" "}
                        <span className="font-serif font-normal italic text-primary">
                          right?
                        </span>
                      </h4>

                      <p className="mt-2 text-sm text-white/50">
                        Your selections will be included with your message so
                        I know exactly what you&apos;re reaching out about.
                      </p>
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                          <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                            Name
                          </p>

                          <p className="mt-2 text-sm font-semibold">
                            {formData.name}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                          <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                            Email
                          </p>

                          <p className="mt-2 break-all text-sm font-semibold">
                            {formData.email}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
                        <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                          Message
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/75">
                          {formData.message}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isLoading}
                          className="sm:min-w-[220px]"
                        >
                          {isLoading ? (
                            <>Sending...</>
                          ) : (
                            <>
                              Send To Lucid
                              <Send className="h-5 w-5" />
                            </>
                          )}
                        </Button>

                        <button
                          type="button"
                          disabled={isLoading}
                          onClick={() => setShowReview(false)}
                          className="rounded-full border border-white/20 px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/70 transition hover:border-primary hover:text-primary"
                        >
                          Edit Message
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* STATUS */}

                {submitStatus.message && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`mt-6 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                      submitStatus.type === "success"
                        ? "border-green-500/30 bg-green-500/10 text-green-700"
                        : "border-red-500/30 bg-red-500/10 text-red-600"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="h-5 w-5 shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0" />
                    )}

                    <span>{submitStatus.message}</span>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        {/* =====================================================
            CONTACT INFORMATION
        ====================================================== */}

        <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-black/10 bg-[#f1eee7]/95 p-6 shadow-2xl backdrop-blur-md md:p-8">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-[#9a7b18]">
              Connect Directly
            </span>

            <h3 className="mb-2 text-2xl font-bold text-black">
              Find Lucid{" "}
              <span className="font-serif font-normal italic text-primary">
                anywhere.
              </span>
            </h3>

            <p className="mb-7 text-sm leading-relaxed text-black/55">
              Prefer not to use the form? You can always reach out directly or
              follow along as Lucid continues to grow.
            </p>

            <div className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const isExternalLink = item.href.startsWith("http");
                const isClickable = item.href !== "#";

                const cardContent = (
                  <>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-white/70">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.14em] text-black/40">
                        {item.label}
                      </p>

                      <p className="truncate font-semibold text-black/80">
                        {item.value}
                      </p>
                    </div>
                  </>
                );

                if (!isClickable) {
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white/45 p-4"
                    >
                      {cardContent}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={isExternalLink ? "_blank" : undefined}
                    rel={
                      isExternalLink
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white/45 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white/75"
                  >
                    {cardContent}
                  </a>
                );
              })}
            </div>
          </div>

          {/* AVAILABILITY */}

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#07100f]/95 p-6 shadow-2xl backdrop-blur-md md:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a84b]">
                Availability
              </span>

              <div className="mb-5 flex items-center gap-3">
                <span className="h-3 w-3 animate-pulse rounded-full bg-green-500 shadow-[0_0_14px_rgba(34,197,94,0.65)]" />

                <h3 className="text-xl font-semibold text-white">
                  Currently Available
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-white/60">
                Lucid Lifting is currently accepting personal training
                inquiries, fitness consultations, apparel questions,
                collaborations, and new opportunities to build within the
                community.
              </p>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-serif text-xl italic text-white/85">
                  Make the world your gym.
                </p>

                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                  Lucid Lifting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};