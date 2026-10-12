import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import MaintenancePage from "./maintenance-page";

const manropeExtraBold = Manrope({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-manrope-extra-bold",
});

export const metadata: Metadata = {
  title: "Generator Maintenance Plans | Total Power Generators",
  description: "Straightforward generator maintenance plans, guaranteed response times, and 24/7 monitoring for South Florida homeowners.",
};

export default function Page() {
  return <MaintenancePage fontClassName={manropeExtraBold.variable} />;
}
