import { Star } from "lucide-react";

export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1 text-sm ${className ?? ""}`}>
      <Star className="size-4 fill-amber-400 text-amber-400" />
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {count != null && <span className="text-ink-soft">({count}+)</span>}
    </span>
  );
}
