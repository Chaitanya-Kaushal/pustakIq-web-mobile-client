import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, MonitorSmartphone, Star } from "lucide-react";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { ContactButtons } from "@/components/contact-buttons";
import {
  tutors,
  getTutorById,
  TEACHING_MODE_LABELS,
} from "@/lib/data";

export function generateStaticParams() {
  return tutors.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tutor = getTutorById(id);
  if (!tutor) return { title: "Tutor not found" };
  return {
    title: `${tutor.name} — ${tutor.subjects.join(", ")} Tutor`,
    description: tutor.bio.slice(0, 155),
  };
}

export default async function TutorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutor = getTutorById(id);
  if (!tutor) notFound();

  const initials = tutor.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  const message = `Hi ${tutor.name}, I found you on PustakIQ and would like to know your availability.`;

  const stats = [
    { icon: Briefcase, value: `${tutor.experienceYears} yrs`, label: "Experience" },
    { icon: MonitorSmartphone, value: TEACHING_MODE_LABELS[tutor.mode], label: "Mode" },
    { icon: Star, value: tutor.rating.toFixed(1), label: "Rating" },
  ];

  return (
    <Container className="py-10">
      <Link
        href="/tutors"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to tutors
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <div className="rounded-card border border-line bg-white p-6 text-center">
            <div className="relative mx-auto size-28 overflow-hidden rounded-full bg-primary-soft">
              {tutor.photo ? (
                <Image
                  src={tutor.photo}
                  alt={tutor.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <span className="flex size-full items-center justify-center text-2xl font-bold text-primary">
                  {initials}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-2xl font-bold text-ink">{tutor.name}</h1>
            <p className="mt-1 text-ink-soft">{tutor.qualification}</p>
            <div className="mt-2 flex justify-center">
              <Rating value={tutor.rating} count={tutor.reviewCount} />
            </div>
          </div>

          <div className="mt-4">
            <ContactButtons
              phone={tutor.phone}
              whatsapp={tutor.whatsapp}
              callLabel="Call Tutor"
              message={message}
            />
          </div>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-card border border-line bg-white p-4 text-center"
              >
                <s.icon className="mx-auto size-5 text-primary" />
                <p className="mt-2 font-semibold text-ink">{s.value}</p>
                <p className="text-xs text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-bold text-ink">Subjects</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {tutor.subjects.map((s) => (
                <Badge key={s} tone="primary">
                  {s}
                </Badge>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-bold text-ink">Classes</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {tutor.classes.map((c) => (
                <Badge key={c} tone="success">
                  {c}
                </Badge>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-bold text-ink">About</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{tutor.bio}</p>
          </section>
        </div>
      </div>
    </Container>
  );
}
