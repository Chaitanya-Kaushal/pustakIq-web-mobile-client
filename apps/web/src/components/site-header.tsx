"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenCheck, Menu, Plus, User, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const NAV = [
  { href: "/books", label: "Books" },
  { href: "/exam-prep", label: "Exam Prep" },
  { href: "/tutors", label: "Tutors" },
  { href: "/stores", label: "Stores" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Selling requires an account — send logged-out users to login first.
  const sellHref = user ? "/sell" : "/login?next=/sell";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
            <BookOpenCheck className="size-5" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-primary">
            PustakIQ
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                isActive(item.href)
                  ? "text-primary"
                  : "text-ink-soft hover:bg-surface-soft hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <Link
              href="/account"
              className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft"
            >
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                {initials(user.name)}
              </span>
              Account
            </Link>
          ) : (
            <ButtonLink href="/login" variant="ghost" size="sm">
              <User className="size-4" />
              Sign in
            </ButtonLink>
          )}
          <ButtonLink href={sellHref} variant="accent" size="sm">
            <Plus className="size-4" />
            Sell a Book
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
                  "rounded-lg px-3 py-3 text-sm font-semibold",
                  isActive(item.href)
                    ? "bg-primary-soft text-primary"
                    : "text-ink-soft hover:bg-surface-soft",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              {user ? (
                <ButtonLink href="/account" variant="secondary" onClick={() => setOpen(false)}>
                  <User className="size-4" /> My Account
                </ButtonLink>
              ) : (
                <ButtonLink href="/login" variant="secondary" onClick={() => setOpen(false)}>
                  <User className="size-4" /> Sign in
                </ButtonLink>
              )}
              <ButtonLink href={sellHref} onClick={() => setOpen(false)}>
                <Plus className="size-4" /> Sell a Book
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
