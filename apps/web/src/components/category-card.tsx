import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { type Tone, TONE_SOFT } from "@/lib/exams";

export function CategoryCard({
  href,
  label,
  description,
  icon: Icon,
  tone,
}: {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  tone: Tone;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-card border border-line bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <span
        className={`inline-flex size-12 items-center justify-center rounded-xl ${TONE_SOFT[tone]}`}
      >
        <Icon className="size-6" />
      </span>
      <div>
        <h3 className="font-semibold text-ink group-hover:text-primary">
          {label}
        </h3>
        <p className="mt-0.5 text-sm text-ink-soft">{description}</p>
      </div>
    </Link>
  );
}
