import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { blogPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Container className="py-12">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Back to blog
        </Link>

        <div className="mt-6 flex items-center gap-3 text-sm text-ink-soft">
          <Badge tone="primary">{post.category}</Badge>
          <span>{formatDate(post.date)}</span>
          <span>· {post.readMinutes} min read</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{post.excerpt}</p>

        <div className="mt-8 space-y-5 leading-relaxed text-ink">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-10 rounded-card border border-line bg-surface-muted p-6 text-center">
          <p className="font-semibold text-ink">Ready to save on books?</p>
          <Link
            href="/books"
            className="mt-2 inline-block font-semibold text-primary hover:text-primary-dark"
          >
            Browse books on PustakIQ →
          </Link>
        </div>
      </article>
    </Container>
  );
}
