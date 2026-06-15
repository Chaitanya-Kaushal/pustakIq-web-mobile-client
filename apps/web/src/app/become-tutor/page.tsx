"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles, BadgeCheck, MessageCircle } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { SingleImageUpload } from "@/components/image-upload";
import { SUBJECTS, TeachingMode, TEACHING_MODE_LABELS } from "@/lib/data";

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Get discovered",
    text: "Parents and students nearby find you when they search for tutors.",
  },
  {
    icon: BadgeCheck,
    title: "Free profile",
    text: "Build a profile and showcase your subjects at no cost.",
  },
  {
    icon: MessageCircle,
    title: "Leads on WhatsApp",
    text: "Interested students message you directly — no commission.",
  },
];

export default function BecomeTutorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [subjects, setSubjects] = useState<string[]>([]);

  const toggleSubject = (subject: string) =>
    setSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject],
    );

  return (
    <Container className="py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Become a Tutor
        </h1>
        <p className="mt-2 text-ink-soft">
          Share your teaching profile and start receiving leads from students in
          your area.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-card border border-line bg-white p-6 shadow-sm">
          {submitted ? (
            <div className="flex flex-col items-center rounded-card border border-secondary/20 bg-secondary-soft px-6 py-12 text-center">
              <CheckCircle2 className="size-12 text-secondary" />
              <h3 className="mt-4 text-lg font-semibold text-ink">
                Profile submitted 🎉
              </h3>
              <p className="mt-1 text-ink-soft">
                Thanks! We&apos;ll review your tutor profile and get it live
                shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-5"
            >
              <SingleImageUpload shape="circle" label="Add your photo" />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="fullName">
                  <Input id="fullName" name="fullName" required placeholder="Your name" />
                </Field>
                <Field label="Qualification" htmlFor="qualification">
                  <Input
                    id="qualification"
                    name="qualification"
                    placeholder="e.g. M.Sc. Mathematics"
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Experience (years)" htmlFor="experience">
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    min={0}
                    placeholder="e.g. 5"
                  />
                </Field>
                <Field label="Phone" htmlFor="phone">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. 98123 45678"
                  />
                </Field>
              </div>

              <Field label="Subjects" hint="Select all the subjects you teach">
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((subject) => {
                    const active = subjects.includes(subject);
                    return (
                      <button
                        key={subject}
                        type="button"
                        onClick={() => toggleSubject(subject)}
                        aria-pressed={active}
                        className={
                          active
                            ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-white"
                            : "rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary/40"
                        }
                      >
                        {subject}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Classes" htmlFor="classes">
                  <Input
                    id="classes"
                    name="classes"
                    placeholder="e.g. Class 6 to 12"
                  />
                </Field>
                <Field label="Teaching Mode" htmlFor="teachingMode">
                  <Select
                    id="teachingMode"
                    name="teachingMode"
                    defaultValue={TeachingMode.BOTH}
                  >
                    {Object.values(TeachingMode).map((mode) => (
                      <option key={mode} value={mode}>
                        {TEACHING_MODE_LABELS[mode]}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>

              <Field label="About" htmlFor="about">
                <Textarea
                  id="about"
                  name="about"
                  placeholder="Tell students about your teaching style and achievements."
                />
              </Field>

              <div>
                <Button type="submit" size="lg">
                  Submit profile
                </Button>
                <p className="mt-2 text-xs text-ink-faint">
                  This is a demo — submissions aren&apos;t stored yet.
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="h-fit rounded-card border border-line bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-ink">Why tutor with PustakIQ?</h2>
          <ul className="mt-4 flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b.title} className="flex gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <b.icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{b.title}</p>
                  <p className="text-sm text-ink-soft">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Container>
  );
}
