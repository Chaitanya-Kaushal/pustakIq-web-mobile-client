import type { Metadata } from "next";
import Link from "next/link";
import { BookX } from "lucide-react";
import { Container } from "@/components/container";
import { SearchBar } from "@/components/search-bar";
import { BookCard } from "@/components/book-card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/cn";
import {
  books,
  BookCategory,
  getSchoolById,
  type BookListing,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Buy & Sell School and Exam Books",
  description:
    "Browse affordable second-hand school and exam books near you. Filter by category, class and price on PustakIQ.",
};

type SearchParams = {
  q?: string;
  category?: string;
  exam?: string;
};

function matches(book: BookListing, q: string) {
  if (!q) return true;
  const haystack = [
    book.title,
    book.subject,
    book.examBook?.examType,
    getSchoolById(book.schoolBook?.schoolId ?? "")?.name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q.toLowerCase());
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q = "", category } = await searchParams;

  const activeCategory =
    category === BookCategory.EXAM_BOOK
      ? BookCategory.EXAM_BOOK
      : category === BookCategory.SCHOOL_BOOK
        ? BookCategory.SCHOOL_BOOK
        : null;

  const results = books.filter(
    (b) =>
      (!activeCategory || b.category === activeCategory) && matches(b, q),
  );

  const tabs = [
    { label: "All Books", category: null },
    { label: "School Books", category: BookCategory.SCHOOL_BOOK },
    { label: "Exam Books", category: BookCategory.EXAM_BOOK },
  ];

  const hrefFor = (cat: BookCategory | null) => {
    const params = new URLSearchParams();
    if (cat) params.set("category", cat);
    if (q) params.set("q", q);
    const s = params.toString();
    return s ? `/books?${s}` : "/books";
  };

  return (
    <Container className="py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Books
        </h1>
        <p className="mt-2 text-ink-soft">
          Affordable school and exam books from families and stores near you.
        </p>
      </header>

      <div className="mt-6 max-w-2xl">
        <SearchBar
          size="md"
          defaultValue={q}
          placeholder="Search by book name, author, or school…"
        />
      </div>

      {/* Category tabs */}
      <div className="mt-6 flex flex-wrap gap-2 border-b border-line pb-px">
        {tabs.map((tab) => {
          const active = tab.category === activeCategory;
          return (
            <Link
              key={tab.label}
              href={hrefFor(tab.category)}
              className={cn(
                "rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "border-b-2 border-primary text-primary"
                  : "text-ink-soft hover:text-ink",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        {results.length} {results.length === 1 ? "book" : "books"}
        {q && (
          <>
            {" "}
            for <span className="font-semibold text-ink">“{q}”</span>
          </>
        )}
      </p>

      {results.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={BookX}
            title="No books found"
            message="Try a different search or browse all categories."
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </Container>
  );
}
