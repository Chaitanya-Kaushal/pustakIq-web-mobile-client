import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Study Guides, Exam Tips & Book Recommendations",
  description:
    "Practical advice on admissions, study guides, exam preparation and saving money on books for Indian students and parents.",
};

export default function BlogPage() {
  return (
    <Container className="py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          The PustakIQ Blog
        </h1>
        <p className="mt-2 text-ink-soft">
          Admissions, study guides, exam tips and book recommendations for
          students and parents.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-card border border-line bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-ink/5"
          >
            <div className="flex items-center gap-3 text-sm text-ink-soft">
              <Badge tone="primary">{post.category}</Badge>
              <span>{formatDate(post.date)}</span>
              <span>· {post.readMinutes} min read</span>
            </div>
            <h2 className="mt-4 text-xl font-bold text-ink group-hover:text-primary">
              {post.title}
            </h2>
            <p className="mt-2 flex-1 text-ink-soft">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Read article
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
