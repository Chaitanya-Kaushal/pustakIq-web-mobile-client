import type { Metadata } from "next";
import { Trophy, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { ExamCard } from "@/components/exam-card";
import { BookCard } from "@/components/book-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { examBooks } from "@/lib/data";
import { EXAM_META_LIST } from "@/lib/exams";

export const metadata: Metadata = {
  title: "Competitive Exam Prep Books — JEE, NEET, UPSC, SSC & more",
  description:
    "Affordable second-hand preparation books for JEE, NEET, UPSC, SSC, CAT, Banking and GATE — listed by aspirants who've cleared the journey before you.",
};

export default function ExamPrepPage() {
  return (
    <>
      <section className="border-b border-line bg-linear-to-b from-accent-soft/60 to-white">
        <Container className="py-14 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white px-3.5 py-1.5 text-sm font-semibold text-accent shadow-sm">
              <Trophy className="size-4" />
              Competitive Exam Prep
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Crack your exam for{" "}
              <span className="text-accent">a fraction of the cost</span>
            </h1>
            <p className="mt-4 text-lg text-ink-soft">
              Quality second-hand prep books for India&apos;s biggest competitive
              exams — from aspirants who&apos;ve already cleared the journey.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <SectionHeading title="Choose your exam" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {EXAM_META_LIST.map((exam) => (
            <ExamCard key={exam.type} exam={exam} />
          ))}
        </div>
      </Container>

      <section className="bg-surface-muted py-14">
        <Container>
          <SectionHeading
            title="Popular exam books"
            subtitle="Trusted titles, gently used, at unbeatable prices."
            actionHref="/books?category=EXAM_BOOK"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {examBooks().slice(0, 8).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <div className="overflow-hidden rounded-card bg-primary px-6 py-12 text-center shadow-lg sm:px-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Cleared your exam? Pay it forward.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-soft">
            List your prep books and help the next aspirant save — while recovering
            part of what you spent.
          </p>
          <div className="mt-6">
            <ButtonLink href="/sell" variant="secondary" className="bg-white" size="lg">
              Sell your books
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
