import { NextResponse } from "next/server";

const recipients: Record<string, string> = {
  "New install": "power@totalpowergenerators.com",
  "Builder inquiry": "power@totalpowergenerators.com",
  Maintenance: "service@totalpowergenerators.com",
  "Service or repair": "service@totalpowergenerators.com",
  "General / other": "contact@totalpowergenerators.com",
};
const deliveryError = "We could not send your request. Please try again or call (305) 471-9010.";
const allowedFields = ["name", "phone", "email", "address", "need", "fuel", "plan", "best-time", "referral", "company", "location", "project-size", "notes"];

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }
  if (data.get("_honey")) return NextResponse.json({ ok: true });
  const fields = Object.fromEntries(allowedFields.map(key => [key, String(data.get(key) ?? "").trim()]));
  const required = ["name", "phone", "email", "need", fields.need === "Builder inquiry" ? "company" : "address"];
  if (required.some(key => !fields[key]) || !Object.hasOwn(recipients, fields.need) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || Object.values(fields).some(value => value.length > 5000)) {
    return NextResponse.json({ error: "Please complete all required fields with valid details." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${recipients[fields.need]}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        ...fields,
        _subject: `Website request: ${fields.need} — ${fields.name}`,
        _replyto: fields.email,
        _template: "table",
        _url: "https://www.totalpowergenerators.com",
      }),
    });
    const result = await response.json();
    if (!response.ok || (result.success !== true && result.success !== "true")) {
      return NextResponse.json({ error: deliveryError }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: deliveryError }, { status: 502 });
  }
}
