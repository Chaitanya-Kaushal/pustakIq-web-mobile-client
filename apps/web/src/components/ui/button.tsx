import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "accent"
  | "secondary"
  | "ghost"
  | "white"
  | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white shadow-sm shadow-primary/30 hover:bg-primary-dark",
  accent: "bg-accent text-white shadow-sm shadow-accent/30 hover:bg-accent-dark",
  secondary:
    "border-2 border-primary/20 bg-white text-primary hover:border-primary/40 hover:bg-primary-soft",
  ghost: "text-ink-soft hover:bg-surface-soft",
  white: "bg-white text-night shadow-sm hover:bg-surface-soft",
  whatsapp: "bg-whatsapp text-white hover:brightness-95",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
