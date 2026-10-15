import { NextResponse } from "next/server";

const recipients: Record<string, string> = {
  "New install": process.env.SALES_EMAIL ?? "power@totalpowergenerators.com",
  Maintenance: process.env.SERVICE_EMAIL ?? "service@totalpowergenerators.com",
  "Service or repair": process.env.SERVICE_EMAIL ?? "service@totalpowergenerators.com",
  "General / other": process.env.HELLO_EMAIL ?? "Contact@totalpowergenerators.com",
};

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);

export async function POST(request: Request) {
  const data = await request.formData();
  const fields = Object.fromEntries([...data.entries()].map(([key, value]) => [key, String(value).trim()]));
  if (!fields.name || !fields.phone || !fields.email || !fields.address || !fields.need) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });

  const recipient = recipients[fields.need] ?? recipients["General / other"];
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Email delivery is not configured yet. Please call (305) 471-9010." }, { status: 503 });

  const rows = Object.entries(fields).filter(([key]) => key !== "route-to").map(([key, value]) => `<tr><th style="text-align:left;padding:8px 16px 8px 0">${escapeHtml(key)}</th><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`).join("");
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.QUOTE_FROM_EMAIL ?? "Total Power Website <onboarding@resend.dev>", to: [recipient], reply_to: fields.email, subject: `Website request: ${fields.need} — ${fields.name}`, html: `<h1>New website request</h1><table>${rows}</table>` }) });
  if (!response.ok) return NextResponse.json({ error: "We could not send your request. Please call (305) 471-9010." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
