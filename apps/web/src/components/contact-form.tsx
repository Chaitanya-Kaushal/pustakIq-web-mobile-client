"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-btn border border-line bg-white px-4 py-2.5 text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-card border border-secondary/20 bg-secondary-soft px-6 py-12 text-center">
        <CheckCircle2 className="size-12 text-secondary" />
        <h3 className="mt-4 text-lg font-semibold text-ink">Message sent!</h3>
        <p className="mt-1 text-ink-soft">
          Thanks for reaching out — we&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4 rounded-card border border-line bg-white p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
            Name
          </label>
          <input id="name" required placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-ink">
          Subject
        </label>
        <input id="subject" placeholder="How can we help?" className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Tell us a bit more…"
          className={inputClass}
        />
      </div>
      <Button type="submit" size="lg">
        Send message
      </Button>
      <p className="text-xs text-ink-faint">
        This is a demo form — submissions aren&apos;t stored yet.
      </p>
    </form>
  );
}
