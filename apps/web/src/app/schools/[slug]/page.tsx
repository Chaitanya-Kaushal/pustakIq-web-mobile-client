import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, BookX } from "lucide-react";
import { Container } from "@/components/container";
import { BookCard } from "@/components/book-card";
import { TutorCard } from "@/components/tutor-card";
import { StoreCard } from "@/components/store-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import {
  schools,
  getSchoolBySlug,
  schoolSlug,
  schoolLocation,
  booksForSchool,
  tutorsInArea,
  storesInArea,
} from "@/lib/data";

export function generateStaticParams() {
  return schools.map((s) => ({ slug: schoolSlug(s) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) return { title: "School not found" };
  return {
    title: `Books, Tutors & Stores for ${school.name}`,
    description: `Find affordable books, verified tutors and nearby book stores for ${school.name}, ${schoolLocation(school)} on PustakIQ.`,
  };
}

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();

  const schoolBooksList = booksForSchool(school.id);
  const nearbyTutors = tutorsInArea(school.areaId);
  const nearbyStores = storesInArea(school.areaId);

  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-12">
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <MapPin className="size-4" />
            {schoolLocation(school)}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {school.name}
          </h1>
          <p className="mt-3 max-w-2xl text-ink-soft">{school.address}</p>
        </Container>
      </section>

      <Container className="py-12">
        <SectionHeading title="Available books" subtitle="Listed by this school's community." />
        {schoolBooksList.length === 0 ? (
          <EmptyState
            icon={BookX}
            title="No books listed yet"
            message="Be the first to list books for this school."
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {schoolBooksList.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </Container>

      <section className="bg-surface-muted py-12">
        <Container>
          <SectionHeading title="Tutors nearby" actionHref="/tutors" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyTutors.slice(0, 3).map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <SectionHeading title="Stores nearby" actionHref="/stores" />
        <div className="grid gap-4 sm:grid-cols-2">
          {nearbyStores.slice(0, 4).map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </Container>
    </>
  );
}
