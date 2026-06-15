import { Phone, MessageCircle, Navigation } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { telHref, whatsappHref, mapsHref } from "@/lib/contact";

export function ContactButtons({
  phone,
  whatsapp,
  callLabel = "Call",
  message,
  directions,
}: {
  phone: string;
  whatsapp: string;
  callLabel?: string;
  message?: string;
  directions?: { latitude?: number; longitude?: number; label?: string };
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <ButtonLink href={telHref(phone)} external variant="primary">
        <Phone className="size-4" />
        {callLabel}
      </ButtonLink>
      <ButtonLink
        href={whatsappHref(whatsapp, message)}
        external
        variant="whatsapp"
        rel="noopener noreferrer"
        target="_blank"
      >
        <MessageCircle className="size-4" />
        WhatsApp
      </ButtonLink>
      {directions && (
        <ButtonLink
          href={mapsHref(directions)}
          external
          variant="secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation className="size-4" />
          Directions
        </ButtonLink>
      )}
    </div>
  );
}
