import type { MetadataRoute } from "next";
import {
  books,
  tutors,
  stores,
  schools,
  schoolSlug,
  EXAM_TYPES,
} from "@/lib/data";
import { blogPosts } from "@/lib/blog";

const BASE = "https://pustakiq.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/books",
    "/exam-prep",
    "/tutors",
    "/stores",
    "/schools",
    "/sell",
    "/become-tutor",
    "/register-store",
    "/blog",
    "/about",
    "/contact",
  ].map((path) => ({ url: `${BASE}${path}`, changeFrequency: "weekly" as const }));

  const dynamicRoutes = [
    ...books.map((b) => `/books/${b.id}`),
    ...tutors.map((t) => `/tutors/${t.id}`),
    ...stores.map((s) => `/stores/${s.id}`),
    ...schools.map((s) => `/schools/${schoolSlug(s)}`),
    ...EXAM_TYPES.map((e) => `/exam-books/${e.toLowerCase()}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
  ].map((path) => ({ url: `${BASE}${path}` }));

  return [...staticRoutes, ...dynamicRoutes];
}
