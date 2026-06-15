"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

export function SearchBar({
  placeholder = "Search books, tutors, stores…",
  className,
  defaultValue = "",
  size = "lg",
}: {
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  size?: "md" | "lg";
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/books?q=${encodeURIComponent(q)}` : "/books");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex w-full items-center gap-2 rounded-btn border border-line bg-white shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        size === "lg" ? "h-14 px-4" : "h-11 px-3",
        className,
      )}
    >
      <Search className="size-5 shrink-0 text-ink-faint" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-ink placeholder:text-ink-faint focus:outline-none"
        aria-label="Search"
      />
      <button
        type="submit"
        className="shrink-0 rounded-btn bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
      >
        Search
      </button>
    </form>
  );
}
