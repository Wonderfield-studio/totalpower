"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

const plans = ["Total Essentials", "Total Care", "Total Protect"];
const sizes = ["Up to 28kW", "30–48kW", "60–80kW", "100–150kW"];
const billing = ["Annual", "Monthly"];

export default function QuoteForm({ className, gridClassName }: { className: string; gridClassName: string }) {
  const params = useSearchParams();
  const plan = params.get("plan") ?? "";
  const initialNeed = params.get("need") ?? "";
  const [need, setNeed] = useState(initialNeed);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const recipient = need === "New install" ? "power@totalpowergenerators.com" : need === "Maintenance" || need === "Service or repair" ? "service@totalpowergenerators.com" : "Contact@totalpowergenerators.com";
  const planOptions = useMemo(() => Array.from(new Set([plan, ...plans.flatMap(name => sizes.flatMap(size => billing.map(cycle => `${name} · ${size} · ${cycle}`)))]).values()).filter(Boolean), [plan]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/quote", { method: "POST", body: new FormData(event.currentTarget) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setStatus("sent"); setMessage("Thanks — your request is on its way. Our team will follow up shortly."); event.currentTarget.reset();
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "We could not send your request. Please call (305) 471-9010."); }
  }

  return <section className={className}><form onSubmit={submit}><input type="hidden" name="route-to" value={recipient} /><div className={gridClassName}>
    <label>Name<input required name="name" autoComplete="name" /></label>
    <label>Phone<input required type="tel" name="phone" autoComplete="tel" /></label>
    <label>Email<input required type="email" name="email" autoComplete="email" /></label>
    <label>Home address<input required name="address" autoComplete="street-address" /></label>
    <label>Fuel<select name="fuel" defaultValue=""><option value="" disabled>Select one</option><option>Natural gas</option><option>Propane</option><option>Not sure</option></select></label>
    <label>I need<select name="need" value={need} onChange={event => setNeed(event.target.value)}><option value="" disabled>Select one</option><option>New install</option><option>Maintenance</option><option>Service or repair</option><option>General / other</option></select></label>
    {plan && <label>Plan<select name="plan" defaultValue={plan}>{planOptions.map(option => <option key={option}>{option}</option>)}</select></label>}
    <label>Best time to reach you<input name="best-time" /></label>
    <label>Who referred you? <span>(optional)</span><input name="referral" /></label>
  </div><button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request My Free Quote →"}</button>{message && <p role="status">{message}</p>}<p>Requests are routed to the right team based on what you need. Or call <a href="tel:+13054719010">(305) 471-9010</a> · <a href="mailto:Contact@totalpowergenerators.com">Email our team</a></p></form></section>;
}
