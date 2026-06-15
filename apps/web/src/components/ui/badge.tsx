import { cn } from "@/lib/cn";
import { BookCondition, CONDITION_LABELS } from "@pustakiq/shared";

type Tone = "primary" | "success" | "warning" | "danger" | "neutral";

const tones: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary",
  success: "bg-secondary-soft text-secondary",
  warning: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-danger",
  neutral: "bg-surface-soft text-ink-soft",
};

export function Badge({
  children,
  tone = "primary",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const conditionTone: Record<BookCondition, Tone> = {
  [BookCondition.NEW]: "success",
  [BookCondition.LIKE_NEW]: "success",
  [BookCondition.GOOD]: "warning",
  [BookCondition.WORN]: "danger",
};

export function ConditionBadge({ condition }: { condition: BookCondition }) {
  return <Badge tone={conditionTone[condition]}>{CONDITION_LABELS[condition]}</Badge>;
}
