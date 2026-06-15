import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Languages,
  ShieldAlert,
} from "lucide-react";
import { Container } from "@/components/container";
import { Badge, ConditionBadge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { ContactButtons } from "@/components/contact-buttons";
import {
  books,
  getBookById,
  getClassName,
  getSchoolById,
  formatPrice,
  formatDate,
  schoolSlug,
} from "@/lib/data";

export function generateStaticParams() {
  return books.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const book = getBookById(id);
  if (!book) return { title: "Book not found" };
  return {
    title: `${book.title} — ${formatPrice(book.price)}`,
    description: book.description.slice(0, 155),
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = getBookById(id);
  if (!book) notFound();

  const school = book.schoolBook
    ? getSchoolById(book.schoolBook.schoolId)
    : undefined;
  const categoryLabel = book.examBook
    ? `${book.examBook.examType} • Exam Book`
    : `${getClassName(book.schoolBook?.classId)} • School Book`;
  const message = `Hi, is "${book.title}" still available on PustakIQ?`;

  return (
    <Container className="py-10">
      <Link
        href="/books"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to books
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Cover */}
        <div className="relative aspect-4/3 overflow-hidden rounded-card border border-line bg-surface-soft">
          {book.images[0] && (
            <Image
              src={book.images[0].imageUrl}
              alt={book.title}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-contain p-6"
              priority
            />
          )}
          <div className="absolute left-4 top-4">
            <ConditionBadge condition={book.condition} />
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">{categoryLabel}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
            {book.title}
          </h1>
          {school && (
            <Link
              href={`/schools/${schoolSlug(school)}`}
              className="mt-1 inline-block text-ink-soft hover:text-primary"
            >
              {school.name}
            </Link>
          )}

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-primary">
              {formatPrice(book.price)}
            </span>
            {book.originalPrice && (
              <span className="text-lg text-ink-faint line-through">
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink-faint">
            Posted on {formatDate(book.createdAt)}
          </p>

          {/* Seller */}
          <div className="mt-6 flex items-center gap-3 rounded-card border border-line bg-surface-muted p-4">
            <div className="flex size-11 items-center justify-center rounded-full bg-primary-soft font-bold text-primary">
              {book.seller.name
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-ink">
                  {book.seller.name}
                </span>
                {book.seller.isTrusted && (
                  <BadgeCheck className="size-4 text-primary" />
                )}
              </div>
              <Rating
                value={book.seller.rating}
                count={book.seller.reviewCount}
              />
            </div>
          </div>

          {/* Contact */}
          <div className="mt-6">
            <ContactButtons
              phone={book.seller.phone}
              whatsapp={book.seller.whatsapp}
              callLabel="Call Seller"
              message={message}
            />
          </div>

          {/* Specs */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-card border border-line p-4">
              <BookOpen className="size-5 text-primary" />
              <div>
                <p className="font-semibold text-ink">{book.pageCount ?? "—"}</p>
                <p className="text-sm text-ink-soft">Pages</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-card border border-line p-4">
              <Languages className="size-5 text-primary" />
              <div>
                <p className="font-semibold text-ink">
                  {book.language ?? "English"}
                </p>
                <p className="text-sm text-ink-soft">Language</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 max-w-3xl">
        <h2 className="text-xl font-bold text-ink">Description</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">{book.description}</p>

        <div className="mt-6 flex items-start gap-3 rounded-card border border-accent/20 bg-accent-soft p-4">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-accent" />
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-accent">Safety tip:</span> Always
            meet the seller in a public place and inspect the book before making
            any payment.
          </p>
        </div>
      </div>
    </Container>
  );
}
