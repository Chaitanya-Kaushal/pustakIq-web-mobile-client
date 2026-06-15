import Link from "next/link";
import type { LucideIcon } from "lucide-react";

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
  tone: "primary" | "secondary" | "accent";
}) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary-soft text-secondary",
    accent: "bg-accent-soft text-accent",
  } as const;

  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-card border border-line bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-ink/5"
    >
      <span
        className={`inline-flex size-12 items-center justify-center rounded-xl ${tones[tone]}`}
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
