import Image from "next/image";
import Link from "next/link";
import {
  type TutorProfile,
  TEACHING_MODE_LABELS,
} from "@pustakiq/shared";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TutorCard({ tutor }: { tutor: TutorProfile }) {
  return (
    <Link
      href={`/tutors/${tutor.id}`}
      className="group flex flex-col rounded-card border border-line bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-ink/5"
    >
      <div className="flex items-center gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-primary-soft">
          {tutor.photo ? (
            <Image
              src={tutor.photo}
              alt={tutor.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <span className="flex size-full items-center justify-center font-bold text-primary">
              {initials(tutor.name)}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-ink group-hover:text-primary">
            {tutor.name}
          </h3>
          <p className="truncate text-sm text-ink-soft">{tutor.qualification}</p>
          <div className="mt-1">
            <Rating value={tutor.rating} count={tutor.reviewCount} />
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tutor.subjects.slice(0, 3).map((s) => (
          <Badge key={s} tone="primary">
            {s}
          </Badge>
        ))}
        <Badge tone="success">{TEACHING_MODE_LABELS[tutor.mode]}</Badge>
      </div>
    </Link>
  );
}
