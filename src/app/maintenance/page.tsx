import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import MaintenancePage from "./maintenance-page";

const manropeExtraBold = Manrope({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-manrope-extra-bold",
});

export const metadata: Metadata = {
  title: "Generator Maintenance Plans & Monitoring",
  description: "Straightforward generator maintenance plans, guaranteed response times, and 24/7 monitoring for South Florida homeowners.",
  alternates: { canonical: "/maintenance" },
  openGraph: {
    title: "Generator Maintenance Plans & Monitoring",
    description: "Straightforward maintenance plans, guaranteed response times, and 24/7 monitoring for South Florida generators.",
    url: "/maintenance",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "A South Florida home protected by a standby generator" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export default function Page() {
  return <MaintenancePage fontClassName={manropeExtraBold.variable} />;
}
