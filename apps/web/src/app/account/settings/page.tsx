"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { cn } from "@/lib/cn";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        checked ? "bg-primary" : "bg-line",
      )}
    >
      <span
        className={cn(
          "inline-block size-5 transform rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

const aboutLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/about", label: "About PustakIQ" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [prefs, setPrefs] = useState({
    push: true,
    email: false,
    location: true,
  });

  const rows: { key: keyof typeof prefs; label: string; hint: string }[] = [
    {
      key: "push",
      label: "Push notifications",
      hint: "Get alerts about your listings and buyers.",
    },
    {
      key: "email",
      label: "Email updates",
      hint: "Occasional summaries and product news.",
    },
    {
      key: "location",
      label: "Use my location",
      hint: "Show books, tutors and stores near you.",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Settings
      </h1>

      <div className="mt-8 rounded-card border border-line bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-ink">Preferences</h2>
        <div className="mt-4 divide-y divide-line">
          {rows.map(({ key, label, hint }) => (
            <div
              key={key}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div>
                <p className="font-medium text-ink">{label}</p>
                <p className="text-sm text-ink-soft">{hint}</p>
              </div>
              <Toggle
                checked={prefs[key]}
                onChange={(next) => setPrefs((p) => ({ ...p, [key]: next }))}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-card border border-line bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-ink">About</h2>
        <div className="mt-4 divide-y divide-line">
          {aboutLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between gap-4 py-3.5 text-ink-soft transition-colors first:pt-0 last:pb-0 hover:text-ink"
            >
              <span className="font-medium">{label}</span>
              <ChevronRight className="size-5" />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="ghost"
          onClick={() => {
            signOut();
            router.replace("/");
          }}
          className="text-danger hover:bg-danger-soft"
        >
          <LogOut className="size-5" />
          Log out
        </Button>
      </div>

      <p className="mt-8 text-center text-xs text-ink-faint">v0.1.0</p>
    </div>
  );
}
