import type { Metadata } from "next";
import { Bell, BellOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/cn";
import { notifications, formatDate } from "@/lib/data";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Stay updated on your listings and activity on PustakIQ.",
};

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Notifications
      </h1>
      <p className="mt-2 text-ink-soft">
        Updates about your listings, buyers and account.
      </p>

      {notifications.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={BellOff}
            title="You're all caught up"
            message="New notifications about your activity will show up here."
          />
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={cn(
                "flex gap-4 rounded-card border bg-white p-5 shadow-sm",
                n.isRead
                  ? "border-line"
                  : "border-primary/20 bg-primary-soft/40",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-10 shrink-0 items-center justify-center rounded-full",
                  n.isRead
                    ? "bg-surface-soft text-ink-soft"
                    : "bg-primary text-white",
                )}
              >
                <Bell className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-ink">{n.title}</h2>
                  {!n.isRead && <Badge tone="primary">New</Badge>}
                </div>
                <p className="mt-1 text-sm text-ink-soft">{n.body}</p>
                <p className="mt-2 text-xs text-ink-faint">
                  {formatDate(n.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
