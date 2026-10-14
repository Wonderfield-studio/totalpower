"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ServiceAreaChecker({ styles }: { styles: Record<string, string> }) {
  const [result, setResult] = useState<"checking" | "covered" | "outside" | null>(null);
  async function check(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = String(new FormData(event.currentTarget).get("address") ?? ""); setResult("checking");
    try { const response = await fetch("/api/service-area", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ address }) }); const data = await response.json(); setResult(data.covered ? "covered" : "outside"); }
    catch { setResult("outside"); }
  }
  return <form className={styles.serviceCheckCard} onSubmit={check}>
    <div className={styles.serviceCheckIcon} aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M24 44s14-13.1 14-26A14 14 0 1 0 10 18c0 12.9 14 26 14 26Z" /><circle cx="24" cy="18" r="5" /></svg></div>
    <span>Check your address</span><h3>Are we in your neighborhood?</h3><label htmlFor="service-address">Home address or ZIP code</label>
    <div className={styles.serviceCheckField}><input id="service-address" name="address" autoComplete="street-address" placeholder="Enter an address or ZIP code" required /><button type="submit" aria-label="Check address">→</button></div>
    {result === "checking" && <div role="status"><strong>Checking your address…</strong></div>}
    {result === "covered" && <div role="status"><strong>Yes, we service your area.</strong><br /><Link href="/quote">Schedule a free assessment →</Link></div>}
    {result === "outside" && <div role="status"><strong>We may not cover your area yet.</strong><br /><a href="tel:+13054719010">Call us at (305) 471-9010</a></div>}
    {!result && <small>Coverage runs from Miami-Dade through Broward and north to Boynton Beach.</small>}
  </form>;
}
