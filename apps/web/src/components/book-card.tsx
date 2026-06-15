import Image from "next/image";
import Link from "next/link";
import {
  type BookListing,
  formatPrice,
  getClassName,
  getSchoolById,
} from "@pustakiq/shared";
import { ConditionBadge } from "@/components/ui/badge";

export function BookCard({ book }: { book: BookListing }) {
  const school = book.schoolBook
    ? getSchoolById(book.schoolBook.schoolId)
    : undefined;
  const subtitle = book.examBook
    ? `${book.examBook.examType} • ${book.subject ?? "Exam Book"}`
    : `${getClassName(book.schoolBook?.classId)} • ${school?.name ?? ""}`;

  return (
    <Link
      href={`/books/${book.id}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-white transition-shadow hover:shadow-lg hover:shadow-ink/5"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-surface-soft">
        {book.images[0] && (
          <Image
            src={book.images[0].imageUrl}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, 240px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute left-3 top-3">
          <ConditionBadge condition={book.condition} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-semibold text-ink group-hover:text-primary">
          {book.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-ink-soft">{subtitle}</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(book.price)}
          </span>
          {book.originalPrice && (
            <span className="text-sm text-ink-faint line-through">
              {formatPrice(book.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
