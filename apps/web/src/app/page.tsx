import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Store,
  Search,
  ShieldCheck,
  Wallet,
  Sparkles,
  School,
  Trophy,
  ArrowRight,
  Star,
  BadgeCheck,
} from "lucide-react";
import { Container } from "@/components/container";
import { SearchBar } from "@/components/search-bar";
import { CategoryCard } from "@/components/category-card";
import { ExamCard } from "@/components/exam-card";
import { BookCard } from "@/components/book-card";
import { TutorCard } from "@/components/tutor-card";
import { StoreCard } from "@/components/store-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { recentBooks, tutors, stores } from "@/lib/data";
import { EXAM_META_LIST } from "@/lib/exams";

const STATS = [
  { value: "20,000+", label: "Books listed" },
  { value: "2,000+", label: "Verified tutors" },
  { value: "7", label: "Exam categories" },
  { value: "500+", label: "Schools covered" },
];

const AUDIENCES = [
  {
    icon: School,
    tone: "bg-primary-soft text-primary",
    title: "School Students & Parents",
    text: "Find affordable textbooks by school, class and subject — Nursery to Class 12.",
    href: "/books?category=SCHOOL_BOOK",
    cta: "Browse school books",
  },
  {
    icon: Trophy,
    tone: "bg-accent-soft text-accent",
    title: "Competitive Exam Aspirants",
    text: "Prep books for JEE, NEET, UPSC, SSC, CAT, Banking & GATE — from those who cleared it.",
    href: "/exam-prep",
    cta: "Explore exam prep",
  },
];

const STEPS = [
  {
    icon: Search,
    title: "Search school or exam",
    text: "Find resources by school & class, or by exam category like JEE, NEET and UPSC.",
  },
  {
    icon: Wallet,
    title: "Compare & save big",
    text: "Used books at up to 70% off MRP. Compare prices, condition and sellers nearby.",
  },
  {
    icon: ShieldCheck,
    title: "Connect directly",
    text: "Reach out on a call or WhatsApp — no middlemen, no commissions, no hidden fees.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Got my son's entire Class 9 set for a third of the price. The seller was right in our neighbourhood!",
    name: "Meera Sharma",
    role: "Parent, Delhi",
  },
  {
    quote:
      "Found used HC Verma and previous-year papers for JEE in great condition. Saved me thousands.",
    name: "Aditya Rao",
    role: "JEE Aspirant, Pune",
  },
  {
    quote:
      "Listed my old UPSC books and they sold in two days. Helped another aspirant and recovered my money.",
    name: "Imran Khan",
    role: "UPSC Aspirant, Bengaluru",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-linear-to-b from-primary-soft/70 via-white to-white">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3.5 py-1.5 text-sm font-semibold text-primary shadow-sm">
              <Sparkles className="size-4" />
              School books &amp; competitive exam prep — all in one place
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Every book for your studies,{" "}
              <span className="text-primary">school to competitive exams</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
              Buy &amp; sell affordable school textbooks and exam-prep books for
              JEE, NEET, UPSC &amp; more. Find verified tutors and trusted stores
              near you — India&apos;s education community marketplace.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <SearchBar />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-ink-soft">Trending:</span>
              {["Class 10 Science", "HC Verma", "NEET Biology", "UPSC Spectrum"].map(
                (t) => (
                  <Link
                    key={t}
                    href={`/books?q=${encodeURIComponent(t)}`}
                    className="rounded-full border border-line bg-white px-3 py-1 text-ink-soft transition-colors hover:border-primary hover:text-primary"
                  >
                    {t}
                  </Link>
                ),
              )}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-soft">
              <span className="flex -space-x-1">
                {[0, 1, 2].map((i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
              Loved by 50,000+ students &amp; parents
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

      {/* Dual audience */}
      <Container className="py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {AUDIENCES.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              className="group flex items-start gap-4 rounded-card border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl ${a.tone}`}>
                <a.icon className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-1 text-ink-soft">{a.text}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {a.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* Categories */}
      <Container className="pb-16">
        <SectionHeading title="What are you looking for?" />
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
            tone="accent"
          />
          <CategoryCard
            href="/tutors"
            label="Tutors"
            description="Verified, rated & nearby"
            icon={GraduationCap}
            tone="secondary"
          />
          <CategoryCard
            href="/stores"
            label="Book Stores"
            description="New, used & stationery"
            icon={Store}
            tone="purple"
          />
        </div>
      </Container>

      {/* Browse by exam */}
      <section className="bg-surface-muted py-16">
        <Container>
          <SectionHeading
            title="Prep books by exam"
            subtitle="Curated second-hand books for every major competitive exam."
            actionHref="/exam-prep"
            actionLabel="All exams"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {EXAM_META_LIST.map((exam) => (
              <ExamCard key={exam.type} exam={exam} />
            ))}
          </div>
        </Container>
      </section>

      {/* Trending books */}
      <Container className="py-16">
        <SectionHeading
          title="Trending books"
          subtitle="Fresh listings from students and families near you."
          actionHref="/books"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recentBooks.slice(0, 8).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </Container>

      {/* Browse by school band */}
      <Container className="pb-16">
        <div className="flex flex-col items-start gap-6 overflow-hidden rounded-card border border-line bg-linear-to-r from-primary-soft to-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-primary shadow-sm">
              <School className="size-4" /> School-first discovery
            </span>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
              Find the exact book list for your school
            </h3>
            <p className="mt-2 text-ink-soft">
              Browse by State → City → Area → School → Class and see every book,
              tutor and store linked to your school.
            </p>
          </div>
          <ButtonLink href="/schools" size="lg" className="shrink-0">
            Browse by school
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </Container>

      {/* Tutors */}
      <section className="bg-surface-muted py-16">
        <Container>
          <SectionHeading
            title="Verified tutors nearby"
            subtitle="Experienced mentors for school subjects and competitive exam prep."
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
          subtitle="Local stores for new, used, exam books and stationery."
          actionHref="/stores"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </Container>

      {/* How it works */}
      <section className="bg-surface-muted py-16">
        <Container>
          <SectionHeading
            title="How PustakIQ works"
            subtitle="An education-first marketplace — not a generic classifieds site."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="rounded-card border border-line bg-white p-6 shadow-sm"
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
      </section>

      {/* Testimonials */}
      <Container className="py-16">
        <SectionHeading
          title="Loved across India"
          subtitle="Students, parents and aspirants saving money every day."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-card border border-line bg-white p-6 shadow-sm"
            >
              <div className="flex gap-1 text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-4 fill-amber-400" />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2">
                <BadgeCheck className="size-4 text-primary" />
                <span className="text-sm font-semibold text-ink">{t.name}</span>
                <span className="text-sm text-ink-faint">· {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      {/* Sell CTA */}
      <Container className="pb-16">
        <div className="overflow-hidden rounded-card bg-primary px-6 py-12 text-center shadow-lg sm:px-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Turn last year&apos;s books into cash
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-soft">
            List your used school or exam books in minutes, recover part of your
            spend, and help another student learn for less.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/sell" variant="secondary" className="bg-white" size="lg">
              Sell a book free
            </ButtonLink>
            <ButtonLink
              href="/become-tutor"
              size="lg"
              className="bg-white/10 text-white hover:bg-white/20"
            >
              Become a tutor
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
