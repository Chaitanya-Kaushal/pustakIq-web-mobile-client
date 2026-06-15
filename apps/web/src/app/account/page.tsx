import type { Metadata } from "next";
import Link from "next/link";
import {
  BookPlus,
  GraduationCap,
  Store,
  BookMarked,
  Bell,
  type LucideIcon,
} from "lucide-react";
import { currentUser, books, notifications } from "@/lib/data";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your listings, notifications and settings on PustakIQ.",
};

const actions: {
  href: string;
  title: string;
  text: string;
  icon: LucideIcon;
  className: string;
}[] = [
  {
    href: "/sell",
    title: "Sell a Book",
    text: "List your used school or exam books for buyers nearby.",
    icon: BookPlus,
    className: "bg-primary-soft text-primary",
  },
  {
    href: "/become-tutor",
    title: "Become a Tutor",
    text: "Create a tutor profile and reach students in your area.",
    icon: GraduationCap,
    className: "bg-secondary-soft text-secondary",
  },
  {
    href: "/register-store",
    title: "Register a Store",
    text: "Put your book store on the map for the local community.",
    icon: Store,
    className: "bg-warn-soft text-warn",
  },
  {
    href: "/account/listings",
    title: "My Listings",
    text: "View, edit and manage everything you've posted.",
    icon: BookMarked,
    className: "bg-danger-soft text-danger",
  },
];

export default function AccountPage() {
  const myListings = books.filter((b) => b.userId === currentUser.id);
  const unread = notifications.filter((n) => !n.isRead).length;
  const firstName = currentUser.name.split(" ")[0];

  const stats = [
    { value: myListings.length, label: "active listings", icon: BookMarked },
    { value: unread, label: "unread notifications", icon: Bell },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Welcome back, {firstName} 👋
      </h1>
      <p className="mt-2 text-ink-soft">
        Manage your activity across PustakIQ from one place.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {actions.map(({ href, title, text, icon: Icon, className }) => (
          <Link
            key={href}
            href={href}
            className="group flex gap-4 rounded-card border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span
              className={`inline-flex size-12 shrink-0 items-center justify-center rounded-2xl ${className}`}
            >
              <Icon className="size-6" />
            </span>
            <div>
              <h2 className="font-semibold text-ink group-hover:text-primary">
                {title}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">{text}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {stats.map(({ value, label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-card border border-line bg-white p-6 shadow-sm"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-surface-soft text-ink-soft">
              <Icon className="size-6" />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-ink">{value}</p>
              <p className="text-sm text-ink-soft">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
