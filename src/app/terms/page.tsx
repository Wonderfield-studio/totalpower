import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import TermsContent from "./terms-content";

export const metadata: Metadata = { title: "Terms & Conditions", description: "Terms and conditions for Total Power services and maintenance plans." };

const manropeExtraBold = Manrope({ weight: "800", subsets: ["latin"], variable: "--font-manrope-extra-bold" });

export default function TermsPage() { return <div className={manropeExtraBold.variable}><TermsContent /></div>; }
