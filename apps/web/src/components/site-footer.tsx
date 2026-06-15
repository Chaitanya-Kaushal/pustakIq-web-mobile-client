import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

const COLUMNS = [
  {
    title: "Discover",
    links: [
      { href: "/books?category=SCHOOL_BOOK", label: "School Books" },
      { href: "/books?category=EXAM_BOOK", label: "Exam Books" },
      { href: "/tutors", label: "Find Tutors" },
      { href: "/stores", label: "Book Stores" },
      { href: "/schools", label: "Browse by School" },
    ],
  },
  {
    title: "Exam Prep",
    links: [
      { href: "/exam-books/jee", label: "JEE Books" },
      { href: "/exam-books/neet", label: "NEET Books" },
      { href: "/exam-books/upsc", label: "UPSC Books" },
      { href: "/exam-books/ssc", label: "SSC Books" },
      { href: "/exam-prep", label: "All Exams" },
    ],
  },
  {
    title: "Sell & Earn",
    links: [
      { href: "/sell", label: "Sell a Book" },
      { href: "/become-tutor", label: "Become a Tutor" },
      { href: "/register-store", label: "Register a Store" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary text-white">
                <BookOpenCheck className="size-5" />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-primary">
                PustakIQ
              </span>
            </Link>
            <p className="mt-3 text-sm text-ink-soft">
              India&apos;s education community platform — for every learner, from
              school classes to competitive exams. Buy &amp; sell books, find
              verified tutors, and discover trusted stores near you.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PustakIQ. All rights reserved.</p>
          <p>Made for students, parents, tutors &amp; educators across India.</p>
        </div>
      </div>
    </footer>
  );
}
