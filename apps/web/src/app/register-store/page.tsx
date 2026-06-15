"use client";

import { useState } from "react";
import { CheckCircle2, Store, Users, MessageCircle } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { SingleImageUpload } from "@/components/image-upload";
import { RequireAuth } from "@/components/require-auth";
import { StoreCategory, STORE_CATEGORY_LABELS } from "@/lib/data";

const BENEFITS = [
  {
    icon: Store,
    title: "Showcase your store",
    text: "Get a clean storefront page listing your books and categories.",
  },
  {
    icon: Users,
    title: "Reach local students",
    text: "Students nearby discover your store when they search for books.",
  },
  {
    icon: MessageCircle,
    title: "Orders on WhatsApp",
    text: "Customers reach you directly to ask and order — no commission.",
  },
];

function RegisterStoreForm() {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState<StoreCategory[]>([]);

  const toggleCategory = (category: StoreCategory) =>
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );

  return (
    <Container className="py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Register your Store
        </h1>
        <p className="mt-2 text-ink-soft">
          Put your bookstore on the map. Create a free storefront and start
          getting customers from your area.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-card border border-line bg-white p-6 shadow-sm">
          {submitted ? (
            <div className="flex flex-col items-center rounded-card border border-secondary/20 bg-secondary-soft px-6 py-12 text-center">
              <CheckCircle2 className="size-12 text-secondary" />
              <h3 className="mt-4 text-lg font-semibold text-ink">
                Store submitted 🎉
              </h3>
              <p className="mt-1 text-ink-soft">
                Thanks! We&apos;ll review your store and get your storefront live
                shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-5"
            >
              <SingleImageUpload shape="banner" label="Add a store photo" />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Store Name" htmlFor="storeName">
                  <Input
                    id="storeName"
                    name="storeName"
                    required
                    placeholder="e.g. Sharma Book Depot"
                  />
                </Field>
                <Field label="Owner Name" htmlFor="ownerName">
                  <Input
                    id="ownerName"
                    name="ownerName"
                    required
                    placeholder="Your name"
                  />
                </Field>
              </div>

              <Field label="Phone" htmlFor="phone">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="e.g. 98123 45678"
                />
              </Field>

              <Field label="Address" htmlFor="address">
                <Textarea
                  id="address"
                  name="address"
                  required
                  placeholder="Shop no., street, area, city & pincode"
                />
              </Field>

              <Field label="Categories" hint="Select all that apply to your store">
                <div className="flex flex-wrap gap-2">
                  {Object.values(StoreCategory).map((category) => {
                    const active = categories.includes(category);
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => toggleCategory(category)}
                        aria-pressed={active}
                        className={
                          active
                            ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-white"
                            : "rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary/40"
                        }
                      >
                        {STORE_CATEGORY_LABELS[category]}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div>
                <Button type="submit" size="lg">
                  Submit store
                </Button>
                <p className="mt-2 text-xs text-ink-faint">
                  This is a demo — submissions aren&apos;t stored yet.
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="h-fit rounded-card border border-line bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-ink">
            Why register on PustakIQ?
          </h2>
          <ul className="mt-4 flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b.title} className="flex gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <b.icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{b.title}</p>
                  <p className="text-sm text-ink-soft">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Container>
  );
}

export default function RegisterStorePage() {
  return (
    <RequireAuth>
      <RegisterStoreForm />
    </RequireAuth>
  );
}
