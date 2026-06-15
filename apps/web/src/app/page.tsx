import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Store,
  ShieldCheck,
  BadgePercent,
  MessageCircle,
  Layers,
  School,
  Trophy,
  ArrowRight,
  Star,
  BadgeCheck,
  PencilRuler,
  Library,
  Smartphone,
  Apple,
  Play,
  Sparkles,
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

const FEATURES = [
  { icon: BadgePercent, title: "Up to 70% off MRP", text: "Gently-used books at unbeatable prices." },
  { icon: ShieldCheck, title: "Verified sellers", text: "Rated students, parents & local stores." },
  { icon: MessageCircle, title: "Call & WhatsApp directly", text: "No middlemen, no commissions." },
  { icon: Layers, title: "School + 7 exams", text: "Nursery to Class 12 and every major exam." },
];

const STATS = [
  { value: "50,000+", label: "Happy students" },
  { value: "20,000+", label: "Books listed" },
  { value: "2,000+", label: "Verified tutors" },
  { value: "500+", label: "Schools covered" },
];

const RESOURCES = [
  {
    icon: BookOpen,
    tone: "bg-primary-soft text-primary",
    title: "School Textbooks",
    text: "Complete sets and individual books by school, class and subject.",
    href: "/books?category=SCHOOL_BOOK",
  },
  {
    icon: Trophy,
    tone: "bg-accent-soft text-accent",
    title: "Exam Prep Books",
    text: "JEE, NEET, UPSC, SSC, CAT, Banking & GATE preparation books.",
    href: "/exam-prep",
  },
  {
    icon: PencilRuler,
    tone: "bg-secondary-soft text-secondary",
    title: "Guides & Stationery",
    text: "Reference guides, previous-year papers and study material.",
    href: "/stores",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Got my son's entire Class 9 set for a third of the price — the seller was right in our neighbourhood!",
    name: "Meera Sharma",
    tag: "Parent · Delhi",
  },
  {
    quote:
      "Found used HC Verma and previous-year papers for JEE in great condition. Saved me thousands.",
    name: "Aditya Rao",
    tag: "JEE Aspirant · Pune",
  },
  {
    quote:
      "Listed my old UPSC books and they sold in two days. Helped another aspirant and recovered my money.",
    name: "Imran Khan",
    tag: "UPSC Aspirant · Bengaluru",
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
              India&apos;s most affordable education marketplace
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Every book for your studies,{" "}
              <span className="text-primary">school to competitive exams</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
              Buy &amp; sell affordable school textbooks and exam-prep books for
              JEE, NEET, UPSC &amp; more. Find verified tutors and trusted stores
              near you.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <SearchBar />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-ink-soft">Popular exams:</span>
              {EXAM_META_LIST.slice(0, 5).map((e) => (
                <Link
                  key={e.type}
                  href={`/exam-books/${e.type.toLowerCase()}`}
                  className="rounded-full border border-line bg-white px-3 py-1 font-semibold text-ink-soft transition-colors hover:border-primary hover:text-primary"
                >
                  {e.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-soft">
              <span className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
              Trusted by 50,000+ students &amp; parents across India
            </div>
          </div>
        </Container>
      </section>

      {/* Features strip */}
      <section className="border-b border-line bg-white">
        <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <f.icon className="size-5" />
              </span>
              <div>
                <p className="font-bold text-ink">{f.title}</p>
                <p className="text-sm text-ink-soft">{f.text}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Choose your goal */}
      <Container className="py-16">
        <SectionHeading
          title="Choose your goal"
          subtitle="Whether it's school or a competitive exam — start here."
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
            href="/exam-prep"
            label="Exam Prep"
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

      {/* Exam categories (coaching-style) */}
      <section className="bg-surface-muted py-16">
        <Container>
          <SectionHeading
            title="Preparing for 7 competitive exams"
            subtitle="Curated second-hand prep books for every major exam."
            actionHref="/exam-prep"
            actionLabel="View all"
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

      {/* Resource types */}
      <section className="bg-surface-muted py-16">
        <Container>
          <SectionHeading
            title="Everything you need to study"
            subtitle="From textbooks to exam guides and stationery."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {RESOURCES.map((r) => (
              <Link
                key={r.title}
                href={r.href}
                className="group flex flex-col gap-3 rounded-card border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className={`inline-flex size-12 items-center justify-center rounded-xl ${r.tone}`}>
                  <r.icon className="size-6" />
                </span>
                <h3 className="text-lg font-bold text-ink group-hover:text-primary">
                  {r.title}
                </h3>
                <p className="text-ink-soft">{r.text}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-primary">
                  Explore
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust metrics band */}
      <section className="bg-primary py-14">
        <Container>
          <div className="mb-8 flex items-center justify-center gap-2 text-center">
            <Library className="size-6 text-white/80" />
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Trusted by learners across India
            </h2>
          </div>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-3xl font-extrabold text-white sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-primary-soft">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Browse by school */}
      <Container className="py-16">
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

      {/* Testimonials */}
      <section className="bg-surface-muted py-16">
        <Container>
          <SectionHeading
            title="Students ❤️ PustakIQ"
            subtitle="Real savings and success stories from across India."
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
                  <span className="text-sm text-ink-faint">· {t.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Get the app */}
      <Container className="py-16">
        <div className="grid items-center gap-8 overflow-hidden rounded-card border border-line bg-white p-8 shadow-sm sm:p-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">
              <Smartphone className="size-4" /> PustakIQ App
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Take PustakIQ everywhere you study
            </h2>
            <p className="mt-2 text-ink-soft">
              Browse books, chat with sellers and tutors, and list your own books
              in seconds — right from your phone.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              {["Buy & sell on the go", "Instant Call & WhatsApp leads", "Notifications for your listings"].map(
                (li) => (
                  <li key={li} className="flex items-center gap-2">
                    <BadgeCheck className="size-4 text-secondary" />
                    {li}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">
                <Play className="size-5" /> Google Play
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">
                <Apple className="size-5" /> App Store
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="grid w-full max-w-sm grid-cols-2 gap-4">
              {recentBooks.slice(0, 4).map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl border border-line bg-surface-muted p-3 text-center"
                >
                  <div className="mx-auto mb-2 inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <BookOpen className="size-5" />
                  </div>
                  <p className="line-clamp-1 text-xs font-semibold text-ink">
                    {b.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
