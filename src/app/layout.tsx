import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://totalpowergenerators.com"),
  title: {
    default: "South Florida Home Generators | Total Power Generators",
    template: "%s | Total Power Generators",
  },
  description: "Whole-home standby generators installed and maintained by one licensed South Florida team serving Miami-Dade, Broward and Palm Beach County.",
  applicationName: "Total Power Generators",
  authors: [{ name: "Total Power & Gas Contractors" }],
  creator: "Total Power & Gas Contractors",
  publisher: "Total Power & Gas Contractors",
  category: "Home Services",
  keywords: [
    "whole home generators",
    "standby generators",
    "generator installation",
    "generator maintenance",
    "Generac dealer",
    "South Florida generators",
    "Miami generator installation",
    "Broward generator installation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Total Power Generators",
    title: "South Florida Home Generators | Total Power Generators",
    description: "Whole-home standby power, professionally installed and maintained by one local team.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "A South Florida home protected by a professionally installed standby generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "South Florida Home Generators | Total Power Generators",
    description: "Whole-home standby power, professionally installed and maintained by one local team.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Electrician", "HomeAndConstructionBusiness"],
  "@id": "https://totalpowergenerators.com/#business",
  name: "Total Power & Gas Contractors",
  alternateName: "Total Power Generators",
  url: "https://totalpowergenerators.com",
  logo: "https://totalpowergenerators.com/logo.svg",
  image: "https://totalpowergenerators.com/og-image.png",
  telephone: "+1-305-471-9010",
  email: "hello@totalpowergenerators.com",
  foundingDate: "2009",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4794 SW 75th Ave",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33155",
    addressCountry: "US",
  },
  areaServed: ["Miami-Dade County", "Broward County", "Boca Raton", "Boynton Beach"],
  priceRange: "$$$",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
