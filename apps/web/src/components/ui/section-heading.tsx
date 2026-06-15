import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  title,
  subtitle,
  actionHref,
  actionLabel = "View all",
}: {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-ink-soft">{subtitle}</p>}
      </div>
      {actionHref && (
        <Link
          href={actionHref}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark"
        >
          {actionLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
