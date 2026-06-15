import type { Metadata } from "next";
import {
  Target,
  Compass,
  HandHeart,
  Users,
  GraduationCap,
  Store,
} from "lucide-react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "PustakIQ is on a mission to reduce education costs, improve accessibility, and build a trusted education ecosystem for every learner in India.",
};

const VALUES = [
  {
    icon: Target,
    title: "Our mission",
    text: "Reduce educational costs, improve accessibility, and create a trusted education ecosystem for every learner in India.",
  },
  {
    icon: Compass,
    title: "Our vision",
    text: "To become India's largest education community platform where every student, parent, tutor, school and educational business can connect, discover and grow.",
  },
  {
    icon: HandHeart,
    title: "Education-first",
    text: "Unlike generic marketplaces, PustakIQ focuses exclusively on educational resources and services — organised around your school and your exam.",
  },
];

const AUDIENCE = [
  { icon: Users, label: "Parents & Students", text: "Buy & sell books, find tutors and stores." },
  { icon: GraduationCap, label: "Tutors", text: "Get discovered by families nearby." },
  { icon: Store, label: "Book Stores", text: "Reach local customers digitally." },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-16 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            India&apos;s education community platform
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
            PustakIQ connects students, parents, tutors, book stores and schools —
            helping every learner access educational resources affordably and
            with trust.
          </p>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-card border border-line bg-white p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <v.icon className="size-5" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-ink">{v.title}</h2>
              <p className="mt-2 text-ink-soft">{v.text}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="bg-surface-muted py-16">
        <Container>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            The problem we&apos;re solving
          </h2>
          <p className="mt-3 max-w-3xl text-ink-soft">
            School books are expensive yet used for barely one academic year. Used
            books are hard to find, prices are tough to compare, and there&apos;s
            no school-specific marketplace. Tutors and local stores struggle to be
            discovered. PustakIQ brings it all together in one trusted, hyperlocal
            place.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {AUDIENCE.map((a) => (
              <div key={a.label} className="rounded-card border border-line bg-white p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                  <a.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{a.label}</h3>
                <p className="mt-1 text-sm text-ink-soft">{a.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="rounded-card bg-primary px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Join India&apos;s education community
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-soft">
            Discover affordable books, verified tutors and trusted stores near you.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/books" variant="secondary" className="bg-white">
              Browse books
            </ButtonLink>
            <ButtonLink
              href="/contact"
              className="bg-white/10 text-white hover:bg-white/20"
            >
              Contact us
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
