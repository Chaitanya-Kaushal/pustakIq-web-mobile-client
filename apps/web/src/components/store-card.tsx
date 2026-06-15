import Image from "next/image";
import Link from "next/link";
import { Footprints, Tag, Store as StoreIcon } from "lucide-react";
import { type StoreProfile, STORE_CATEGORY_LABELS } from "@pustakiq/shared";
import { Badge } from "@/components/ui/badge";

export function StoreCard({ store }: { store: StoreProfile }) {
  return (
    <Link
      href={`/stores/${store.id}`}
      className="group flex gap-4 rounded-card border border-line bg-white p-4 transition-shadow hover:shadow-lg hover:shadow-ink/5"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface-soft">
        {store.image ? (
          <Image
            src={store.image}
            alt={store.storeName}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center text-ink-faint">
            <StoreIcon className="size-7" />
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-semibold text-ink group-hover:text-primary">
            {store.storeName}
          </h3>
          <Badge tone={store.isOpen ? "success" : "neutral"}>
            {store.isOpen ? "Open" : "Closed"}
          </Badge>
        </div>
        <p className="truncate text-sm text-ink-soft">{store.address}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
          {store.distanceLabel && (
            <span className="inline-flex items-center gap-1">
              <Footprints className="size-3.5" />
              {store.distanceLabel}
            </span>
          )}
          {store.offer && (
            <span className="inline-flex items-center gap-1 font-semibold text-primary">
              <Tag className="size-3.5" />
              {store.offer}
            </span>
          )}
          <span className="text-ink-faint">
            {store.categories
              .slice(0, 2)
              .map((c) => STORE_CATEGORY_LABELS[c])
              .join(" · ")}
          </span>
        </div>
      </div>
    </Link>
  );
}
