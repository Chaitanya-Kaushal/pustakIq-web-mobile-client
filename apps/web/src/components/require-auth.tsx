"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/container";
import { useAuth } from "@/components/auth-provider";

/**
 * Gates a page behind login. Logged-out visitors are bounced to /login with a
 * ?next= pointing back here, so they return after signing in.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (ready && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, user, router, pathname]);

  if (!ready || !user) {
    return (
      <Container className="py-24">
        <p className="text-center text-ink-soft">Loading…</p>
      </Container>
    );
  }

  return <>{children}</>;
}
