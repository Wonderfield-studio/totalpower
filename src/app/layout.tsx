import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Total Power Generators",
  description: "Whole-home standby power, professionally installed.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
