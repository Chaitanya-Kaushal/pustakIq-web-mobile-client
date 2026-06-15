"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookMarked,
  Bell,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { cn } from "@/lib/cn";
import { useAuth } from "@/components/auth-provider";

const nav: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/account", label: "Overview", icon: LayoutDashboard },
  { href: "/account/listings", label: "My Listings", icon: BookMarked },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <Container className="py-24">
        <p className="text-center text-ink-soft">Loading your account…</p>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-card border border-line bg-white p-6 shadow-sm lg:self-start">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary-soft font-bold text-primary">
              {initials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-ink">
                {user.name}
              </p>
              <p className="truncate text-sm text-ink-soft">
                {user.mobile}
              </p>
            </div>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            {nav.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/account"
                  ? pathname === "/account"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-btn px-3 py-2.5 text-sm font-semibold transition-colors",
                    active
                      ? "bg-primary-soft text-primary"
                      : "text-ink-soft hover:bg-surface-soft",
                  )}
                >
                  <Icon className="size-5" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </Container>
  );
}
