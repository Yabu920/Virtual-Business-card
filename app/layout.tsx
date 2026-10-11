import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const title = "Yeabsra Abera | Software Developer";
const description =
  "Digital business card of Yeabsra Abera, Software Developer and founder of Bluecode Technology Solution in Addis Ababa, Ethiopia.";
export const metadata: Metadata = {
  title,
  description,
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: siteUrl } }
    : {}),
  openGraph: {
    title,
    description,
    type: "profile",
    firstName: "Yeabsra",
    lastName: "Abera",
    ...(siteUrl ? { url: siteUrl } : {}),
    siteName: "Yeabsra Abera",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090f1b",
  colorScheme: "dark",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to contact card
        </a>
        {children}
      </body>
    </html>
  );
}
