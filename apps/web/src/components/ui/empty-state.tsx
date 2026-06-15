import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  message,
}: {
  icon: LucideIcon;
  title: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-line bg-surface-muted px-6 py-16 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-white text-ink-faint">
        <Icon className="size-7" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      {message && <p className="mt-1 max-w-sm text-ink-soft">{message}</p>}
    </div>
  );
}
