import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Button } from "../components/Button";

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

export const Contact = () => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

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

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: trimmedFormData.name,
          email: trimmedFormData.email,
          message: trimmedFormData.message,
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

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-widest text-sm font-medium mb-3">
            GET IN TOUCH
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s build{" "}
            <span className="text-primary">something</span>{" "}
            <span className="italic font-serif">stronger.</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a fitness goal, apparel idea, or want to learn more about
            Lucid Lifting? Send a message and let&apos;s start the conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="glass p-8 rounded-3xl border border-primary/30 animate-fade-in animation-delay-300">
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              aria-busy={isLoading}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
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
                  placeholder="Your name..."
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
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
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
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
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Submit Button */}
              <Button
                className="w-full"
                type="submit"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              {/* Submission Status */}
              {submitStatus.message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                    submitStatus.type === "success"
                      ? "border-green-500/30 bg-green-500/10 text-green-400"
                      : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0" />
                  )}

                  <span>{submitStatus.message}</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information and Availability */}
          <div className="space-y-6 animate-fade-in animation-delay-500">
            {/* Contact Information */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const isExternalLink = item.href.startsWith("http");
                  const isClickable = item.href !== "#";

                  const cardContent = (
                    <>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>

                        <p className="font-medium">{item.value}</p>
                      </div>
                    </>
                  );

                  if (!isClickable) {
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-4 p-4 rounded-xl"
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
                      rel={isExternalLink ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group"
                    >
                      {cardContent}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability Card */}
            <div className="glass rounded-3xl p-8 border border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />

                <span className="font-medium">Currently Available</span>
              </div>

              <p className="text-muted-foreground text-sm">
                Lucid Lifting is currently accepting personal training
                inquiries, fitness consultations, and new opportunities to
                build within the community. Reach out and let&apos;s start
                working toward something stronger.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};