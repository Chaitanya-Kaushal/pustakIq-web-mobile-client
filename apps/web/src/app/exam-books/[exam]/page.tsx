import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookX } from "lucide-react";
import { Container } from "@/components/container";
import { BookCard } from "@/components/book-card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  EXAM_TYPES,
  EXAM_TYPE_LABELS,
  ExamType,
  booksForExam,
} from "@/lib/data";

function toExam(param: string): ExamType | undefined {
  return EXAM_TYPES.find((e) => e.toLowerCase() === param.toLowerCase());
}

export function generateStaticParams() {
  return EXAM_TYPES.map((e) => ({ exam: e.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ exam: string }>;
}): Promise<Metadata> {
  const { exam } = await params;
  const type = toExam(exam);
  if (!type) return { title: "Exam not found" };
  const label = EXAM_TYPE_LABELS[type];
  return {
    title: `${label} Books — Buy & Sell Used ${label} Preparation Books`,
    description: `Affordable second-hand ${label} preparation books from aspirants near you. Browse and connect on PustakIQ.`,
  };
}

export default async function ExamBooksPage({
  params,
}: {
  params: Promise<{ exam: string }>;
}) {
  const { exam } = await params;
  const type = toExam(exam);
  if (!type) notFound();

  const label = EXAM_TYPE_LABELS[type];
  const list = booksForExam(type);

  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Exam Preparation
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {label} Books
          </h1>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Curated second-hand {label} preparation books from aspirants who&apos;ve
            cleared the journey before you — at a fraction of the price.
          </p>
        </Container>
      </section>

      <Container className="py-12">
        <p className="mb-6 text-sm text-ink-soft">
          {list.length} {list.length === 1 ? "book" : "books"} available
        </p>
        {list.length === 0 ? (
          <EmptyState
            icon={BookX}
            title="No books listed yet"
            message={`Check back soon for ${label} preparation books.`}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
