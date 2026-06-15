import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import {
  type BookListing,
  discountPercent,
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
  const discount = discountPercent(book.price, book.originalPrice);

  return (
    <Link
      href={`/books/${book.id}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-surface-soft">
        {book.images[0] && (
          <Image
            src={book.images[0].imageUrl}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, 260px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute left-3 top-3">
          <ConditionBadge condition={book.condition} />
        </div>
        {discount && (
          <div className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            {discount}% OFF
          </div>
        )}
        <span className="absolute bottom-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-ink-soft opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
          <Heart className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-semibold text-ink group-hover:text-primary">
          {book.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-ink-soft">{subtitle}</p>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-primary">
              {formatPrice(book.price)}
            </span>
            {book.originalPrice && (
              <span className="text-sm text-ink-faint line-through">
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-soft">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {book.seller.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
