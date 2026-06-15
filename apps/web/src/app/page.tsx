import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Store,
  Search,
  MapPin,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/container";
import { SearchBar } from "@/components/search-bar";
import { CategoryCard } from "@/components/category-card";
import { BookCard } from "@/components/book-card";
import { TutorCard } from "@/components/tutor-card";
import { StoreCard } from "@/components/store-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import {
  recentBooks,
  tutors,
  stores,
  EXAM_TYPES,
  EXAM_TYPE_LABELS,
} from "@/lib/data";

const STATS = [
  { value: "20,000+", label: "Book listings" },
  { value: "2,000+", label: "Verified tutors" },
  { value: "500+", label: "Schools covered" },
  { value: "10+", label: "Cities" },
];

const STEPS = [
  {
    icon: Search,
    title: "Search your school or exam",
    text: "Find resources by school and class, or by exam category like JEE, NEET and UPSC.",
  },
  {
    icon: MapPin,
    title: "Discover what's nearby",
    text: "Compare affordable books, verified tutors and trusted stores in your area.",
  },
  {
    icon: ShieldCheck,
    title: "Connect directly",
    text: "Reach out on a call or WhatsApp — no middlemen, no hidden fees.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-linear-to-b from-primary-soft/60 to-white">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-sm font-medium text-primary">
              <Wallet className="size-4" />
              Reduce education costs for every family
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Everything for your{" "}
              <span className="text-primary">school journey</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
              Buy &amp; sell school and exam books, find verified tutors, and
              discover trusted book stores near you — all on India&apos;s
              education community platform.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <SearchBar />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-ink-soft">Popular:</span>
              {["Class 10 Physics", "HC Verma", "JEE", "Maths Tutor"].map((t) => (
                <Link
                  key={t}
                  href={`/books?q=${encodeURIComponent(t)}`}
                  className="rounded-full border border-line bg-white px-3 py-1 text-ink-soft hover:border-primary hover:text-primary"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-2xl font-extrabold text-primary sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-ink-soft">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Categories */}
      <Container className="py-16">
        <SectionHeading
          title="Explore categories"
          subtitle="Start with what you need today."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            href="/books?category=SCHOOL_BOOK"
            label="School Books"
            description="By school, class & subject"
            icon={BookOpen}
            tone="primary"
          />
          <CategoryCard
            href="/books?category=EXAM_BOOK"
            label="Exam Books"
            description="JEE, NEET, UPSC, SSC & more"
            icon={ClipboardList}
            tone="secondary"
          />
          <CategoryCard
            href="/tutors"
            label="Tutors"
            description="Verified, rated & nearby"
            icon={GraduationCap}
            tone="accent"
          />
          <CategoryCard
            href="/stores"
            label="Book Stores"
            description="New, used & stationery"
            icon={Store}
            tone="primary"
          />
        </div>
      </Container>

      {/* Recently added books */}
      <section className="bg-surface-muted py-16">
        <Container>
          <SectionHeading
            title="Recently added books"
            subtitle="Fresh listings from families near you."
            actionHref="/books"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {recentBooks.slice(0, 8).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <Container className="py-16">
        <SectionHeading
          title="How PustakIQ works"
          subtitle="A trusted, education-first ecosystem — not a generic marketplace."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-card border border-line bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <step.icon className="size-5" />
                </span>
                <span className="text-sm font-bold text-ink-faint">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-1 text-ink-soft">{step.text}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Tutors */}
      <section className="bg-surface-muted py-16">
        <Container>
          <SectionHeading
            title="Verified tutors nearby"
            subtitle="Experienced mentors for school subjects and exam prep."
            actionHref="/tutors"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.slice(0, 3).map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </Container>
      </section>

      {/* Stores */}
      <Container className="py-16">
        <SectionHeading
          title="Top book stores"
          subtitle="Local stores for new, used and exam books."
          actionHref="/stores"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </Container>

      {/* Exam shortcuts */}
      <section className="bg-surface-muted py-16">
        <Container>
          <SectionHeading
            title="Browse by exam"
            subtitle="Curated second-hand books for every major exam."
          />
          <div className="flex flex-wrap gap-3">
            {EXAM_TYPES.map((exam) => (
              <Link
                key={exam}
                href={`/exam-books/${exam.toLowerCase()}`}
                className="rounded-full border border-line bg-white px-5 py-2.5 font-semibold text-ink-soft transition-colors hover:border-primary hover:text-primary"
              >
                {EXAM_TYPE_LABELS[exam]}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Container className="py-16">
        <div className="overflow-hidden rounded-card bg-primary px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Sitting on last year&apos;s books?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-soft">
            List them on PustakIQ in minutes, recover part of your spend, and
            help another family learn for less.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/books" variant="secondary" className="bg-white">
              Browse books
            </ButtonLink>
            <ButtonLink
              href="/contact"
              className="bg-white/10 text-white hover:bg-white/20"
            >
              Become a partner
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
