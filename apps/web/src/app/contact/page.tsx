import type { Metadata } from "next";
import { Mail, MessageCircle, Handshake } from "lucide-react";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the PustakIQ team. Questions, partnerships, or support — we'd love to hear from you.",
};

const CHANNELS = [
  {
    icon: Mail,
    title: "Email us",
    text: "hello@pustakiq.com",
    href: "mailto:hello@pustakiq.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Chat with our team",
    href: "https://wa.me/919812345678",
  },
  {
    icon: Handshake,
    title: "Partner with us",
    text: "Tutors, stores & schools",
    href: "mailto:partners@pustakiq.com",
  },
];

export default function ContactPage() {
  return (
    <Container className="py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-2 text-ink-soft">
          Questions, feedback or partnership ideas? We&apos;d love to hear from
          you.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          {CHANNELS.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="flex items-center gap-4 rounded-card border border-line bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-ink/5"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <c.icon className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">{c.title}</p>
                <p className="text-sm text-ink-soft">{c.text}</p>
              </div>
            </a>
          ))}
        </div>

        <ContactForm />
      </div>
    </Container>
  );
}
