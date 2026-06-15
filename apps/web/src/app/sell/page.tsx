"use client";

import { useState } from "react";
import { CheckCircle2, IndianRupee, ShieldCheck, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { MultiImageUpload } from "@/components/image-upload";
import { RequireAuth } from "@/components/require-auth";
import {
  ListingType,
  BookCategory,
  BookCondition,
  CONDITION_LABELS,
  EXAM_TYPES,
  EXAM_TYPE_LABELS,
} from "@/lib/data";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Free to list",
    text: "Listing your books costs nothing — pay zero commission.",
  },
  {
    icon: MapPin,
    title: "Reach buyers nearby",
    text: "Students near you discover your books first.",
  },
  {
    icon: MessageCircle,
    title: "Contact via WhatsApp",
    text: "Buyers reach you directly — no middleman, no waiting.",
  },
];

function SellForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Container className="py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Sell a Book
        </h1>
        <p className="mt-2 text-ink-soft">
          List your used books in minutes. Add a few photos, set a fair price and
          reach buyers in your area.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-card border border-line bg-white p-6 shadow-sm">
          {submitted ? (
            <div className="flex flex-col items-center rounded-card border border-secondary/20 bg-secondary-soft px-6 py-12 text-center">
              <CheckCircle2 className="size-12 text-secondary" />
              <h3 className="mt-4 text-lg font-semibold text-ink">
                Listing submitted 🎉
              </h3>
              <p className="mt-1 text-ink-soft">
                Your book has been submitted for review. We&apos;ll publish it
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
              <MultiImageUpload max={6} />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Listing Type" htmlFor="listingType">
                  <Select id="listingType" name="listingType" defaultValue={ListingType.INDIVIDUAL_BOOK}>
                    <option value={ListingType.INDIVIDUAL_BOOK}>Individual Book</option>
                    <option value={ListingType.BOOK_SET}>Complete Set</option>
                  </Select>
                </Field>
                <Field label="Category" htmlFor="category">
                  <Select id="category" name="category" defaultValue={BookCategory.SCHOOL_BOOK}>
                    <option value={BookCategory.SCHOOL_BOOK}>School Book</option>
                    <option value={BookCategory.EXAM_BOOK}>Exam Book</option>
                  </Select>
                </Field>
              </div>

              <Field label="Title" htmlFor="title">
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. NCERT Mathematics Class 10"
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="School" htmlFor="school" hint="The school this book is used at">
                  <Input id="school" name="school" placeholder="e.g. Delhi Public School" />
                </Field>
                <Field label="Class" htmlFor="class">
                  <Input id="class" name="class" placeholder="e.g. Class 10" />
                </Field>
              </div>

              <Field label="Exam Type" htmlFor="examType" hint="For exam-prep books only">
                <Select id="examType" name="examType" defaultValue="">
                  <option value="">None</option>
                  {EXAM_TYPES.map((exam) => (
                    <option key={exam} value={exam}>
                      {EXAM_TYPE_LABELS[exam]}
                    </option>
                  ))}
                </Select>
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Price (₹)" htmlFor="price">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min={0}
                    required
                    placeholder="e.g. 250"
                  />
                </Field>
                <Field label="Condition" htmlFor="condition">
                  <Select id="condition" name="condition" defaultValue={BookCondition.GOOD}>
                    {Object.values(BookCondition).map((c) => (
                      <option key={c} value={c}>
                        {CONDITION_LABELS[c]}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>

              <Field label="Description" htmlFor="description">
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Mention edition, highlights, missing pages, etc."
                />
              </Field>

              <div>
                <Button type="submit" size="lg">
                  <IndianRupee className="size-4" />
                  Submit listing
                </Button>
                <p className="mt-2 text-xs text-ink-faint">
                  This is a demo — submissions aren&apos;t stored yet.
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="h-fit rounded-card border border-line bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-ink">Why sell on PustakIQ?</h2>
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

export default function SellPage() {
  return (
    <RequireAuth>
      <SellForm />
    </RequireAuth>
  );
}
