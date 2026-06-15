"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";

const NAV = [
  { href: "/books", label: "Books" },
  { href: "/tutors", label: "Tutors" },
  { href: "/stores", label: "Stores" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary text-white">
            <GraduationCap className="size-5" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-primary">
            PustakIQ
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-primary"
                  : "text-ink-soft hover:bg-surface-soft hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/books" size="sm">
            Browse Books
          </ButtonLink>
        </div>

        <button
          className="rounded-lg p-2 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium",
                  isActive(item.href)
                    ? "bg-primary-soft text-primary"
                    : "text-ink-soft hover:bg-surface-soft",
                )}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/books" className="mt-2" onClick={() => setOpen(false)}>
              Browse Books
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
