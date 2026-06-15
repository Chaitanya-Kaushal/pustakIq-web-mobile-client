import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Tag } from "lucide-react";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { ContactButtons } from "@/components/contact-buttons";
import { stores, getStoreById, STORE_CATEGORY_LABELS } from "@/lib/data";

export function generateStaticParams() {
  return stores.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const store = getStoreById(id);
  if (!store) return { title: "Store not found" };
  return {
    title: `${store.storeName} — ${store.address}`,
    description: `${store.storeName} in ${store.address}. ${store.categories
      .map((c) => STORE_CATEGORY_LABELS[c])
      .join(", ")}.`,
  };
}

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = getStoreById(id);
  if (!store) notFound();

  return (
    <Container className="py-10">
      <Link
        href="/stores"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to stores
      </Link>

      {store.image && (
        <div className="relative mt-6 aspect-[21/9] w-full overflow-hidden rounded-card border border-line bg-surface-soft">
          <Image
            src={store.image}
            alt={store.storeName}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">
              {store.storeName}
            </h1>
            <Badge tone={store.isOpen ? "success" : "neutral"}>
              {store.isOpen ? "Open" : "Closed"}
            </Badge>
          </div>
          <p className="mt-1 text-ink-soft">Owner: {store.ownerName}</p>
          <div className="mt-2">
            <Rating value={store.rating} count={store.reviewCount} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-card border border-line p-4">
          <MapPin className="mt-0.5 size-5 text-primary" />
          <div>
            <p className="font-medium text-ink">{store.address}</p>
            {store.distanceLabel && (
              <p className="text-sm text-ink-soft">{store.distanceLabel} away</p>
            )}
          </div>
        </div>
        {store.offer && (
          <div className="flex items-center gap-3 rounded-card border border-primary/20 bg-primary-soft p-4">
            <Tag className="size-5 text-primary" />
            <p className="font-semibold text-primary">{store.offer}</p>
          </div>
        )}
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-ink">Categories</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {store.categories.map((c) => (
            <Badge key={c} tone="primary">
              {STORE_CATEGORY_LABELS[c]}
            </Badge>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <ContactButtons
          phone={store.phone}
          whatsapp={store.whatsapp}
          callLabel="Call Store"
          message={`Hi, I'd like to enquire about books at ${store.storeName}.`}
          directions={{
            latitude: store.latitude,
            longitude: store.longitude,
            label: store.address,
          }}
        />
      </div>
    </Container>
  );
}
