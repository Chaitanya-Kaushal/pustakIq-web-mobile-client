import type { Metadata } from "next";
import { BookPlus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { BookCard } from "@/components/book-card";
import { currentUser, books } from "@/lib/data";

export const metadata: Metadata = {
  title: "My Listings",
  description: "Manage the books you've listed for sale on PustakIQ.",
};

export default function MyListingsPage() {
  const myListings = books.filter((b) => b.userId === currentUser.id);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          My Listings
        </h1>
        <ButtonLink href="/sell">
          <BookPlus className="size-5" />
          Sell a Book
        </ButtonLink>
      </div>

      {myListings.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-card border border-line bg-white p-12 text-center shadow-sm">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary">
            <BookPlus className="size-7" />
          </span>
          <h2 className="mt-4 text-lg font-semibold text-ink">
            No listings yet
          </h2>
          <p className="mt-1 max-w-sm text-ink-soft">
            Sell your used books to students near you — it only takes a minute
            to create your first listing.
          </p>
          <ButtonLink href="/sell" className="mt-6">
            <BookPlus className="size-5" />
            Sell a Book
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {myListings.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
