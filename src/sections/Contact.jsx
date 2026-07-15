import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "../components/Button";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@lucidlifting.com",
    href: "mailto:hello@lucidlifting.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (720) 555-2026",
    href: "tel:+17205552026",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Denver, CO",
    href: "#",
  },
];

export const Contact = () => {
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
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your name..."
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              <Button className="w-full" type="submit" size="lg">
                Start Your Journey
                <Send />
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in animation-delay-500">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={index}
                  href={item.href}
                  className="glass p-6 rounded-2xl border border-border hover:border-primary/50 transition-all flex items-center gap-5"
                >
                  <div className="p-4 rounded-xl bg-primary/10">
                    <Icon className="text-primary" size={24} />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>

                    <h3 className="font-semibold">{item.value}</h3>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};