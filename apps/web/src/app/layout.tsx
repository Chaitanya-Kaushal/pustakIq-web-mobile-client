import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pustakiq.com"),
  title: {
    default: "PustakIQ — India's Education Community Platform",
    template: "%s · PustakIQ",
  },
  description:
    "Buy & sell school and exam books, find verified tutors, and discover trusted book stores near you. PustakIQ connects India's education community.",
  keywords: [
    "used school books",
    "exam preparation books",
    "tutors near me",
    "book stores",
    "PustakIQ",
  ],
  openGraph: {
    title: "PustakIQ — India's Education Community Platform",
    description:
      "Buy & sell school and exam books, find verified tutors, and discover trusted book stores near you.",
    type: "website",
    siteName: "PustakIQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
