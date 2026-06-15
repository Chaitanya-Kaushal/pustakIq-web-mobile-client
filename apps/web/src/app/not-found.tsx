import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <p className="text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 max-w-md text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-6 flex gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/books" variant="secondary">
          Browse books
        </ButtonLink>
      </div>
      <Link href="/contact" className="mt-6 text-sm text-ink-soft hover:text-primary">
        Need help? Contact us
      </Link>
    </Container>
  );
}
