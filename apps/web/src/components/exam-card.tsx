import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { booksForExam } from "@/lib/data";
import { type ExamMeta, TONE_SOFT } from "@/lib/exams";

export function ExamCard({ exam }: { exam: ExamMeta }) {
  const count = booksForExam(exam.type).length;
  return (
    <Link
      href={`/exam-books/${exam.type.toLowerCase()}`}
      className="group relative flex flex-col gap-3 rounded-card border border-line bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex h-12 items-center justify-center rounded-xl px-3 text-lg font-extrabold ${TONE_SOFT[exam.tone]}`}
        >
          {exam.label}
        </span>
        <ArrowUpRight className="size-5 text-ink-faint transition-colors group-hover:text-primary" />
      </div>
      <div>
        <h3 className="font-bold text-ink group-hover:text-primary">
          {exam.full}
        </h3>
        <p className="mt-0.5 text-sm text-ink-soft">{exam.description}</p>
      </div>
      <p className="text-xs font-semibold text-ink-faint">
        {count > 0 ? `${count} book${count > 1 ? "s" : ""} available` : "Browse books"}
      </p>
    </Link>
  );
}
