import type { Metadata } from "next";
import { Container } from "@/components/container";
import { StoreCard } from "@/components/store-card";
import { stores } from "@/lib/data";

export const metadata: Metadata = {
  title: "Book Stores Near You",
  description:
    "Discover trusted local book stores for new and used school books, exam guides and stationery. Get contact details and directions.",
};

export default function StoresPage() {
  return (
    <Container className="py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Book Stores
        </h1>
        <p className="mt-2 text-ink-soft">
          Local stores for new &amp; used books, exam guides and stationery —
          with contact details and directions.
        </p>
      </header>

      <p className="mt-6 text-sm text-ink-soft">{stores.length} stores near you</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </Container>
  );
}
