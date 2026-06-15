import type { Metadata } from "next";
import { Container } from "@/components/container";
import { TutorCard } from "@/components/tutor-card";
import { tutors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Find Verified Tutors Near You",
  description:
    "Discover experienced, verified tutors for school subjects and competitive exams like JEE, NEET and UPSC. View profiles and connect directly.",
};

export default function TutorsPage() {
  return (
    <Container className="py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Tutors
        </h1>
        <p className="mt-2 text-ink-soft">
          Verified, experienced tutors for school subjects and exam preparation —
          rated by parents and students.
        </p>
      </header>

      <p className="mt-6 text-sm text-ink-soft">{tutors.length} tutors near you</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </Container>
  );
}
