import type { Metadata } from "next";
import Link from "next/link";
import { School, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { SchoolFinder } from "@/components/school-finder";
import { SectionHeading } from "@/components/ui/section-heading";
import { schools, schoolSlug, schoolLocation } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse Books & Tutors by School",
  description:
    "Find your school and discover the exact book list, verified tutors and nearby stores linked to it. Browse by State → City → Area → School → Class.",
};

export default function SchoolsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-night">
        <div className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-primary/25 blur-3xl" />
        <Container className="relative py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white">
              <School className="size-4 text-accent" />
              School-first discovery
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Find your school&apos;s books
            </h1>
            <p className="mt-4 text-lg text-white/70">
              Drill down by State → City → Area → School to see every book, tutor
              and store linked to your school.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <SchoolFinder />
        </div>
      </Container>

      <section className="bg-surface-muted py-14">
        <Container>
          <SectionHeading
            title="Popular schools"
            subtitle="Jump straight to a school page."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {schools.map((s) => (
              <Link
                key={s.id}
                href={`/schools/${schoolSlug(s)}`}
                className="group flex items-center gap-3 rounded-card border border-line bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <School className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-ink group-hover:text-primary">
                    {s.name}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-ink-soft">
                    <MapPin className="size-3.5" /> {schoolLocation(s)}
                  </span>
                </span>
                <ArrowRight className="size-5 text-ink-faint transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
