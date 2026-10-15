"use client";

import { type FormEvent, type ReactNode, useState } from "react";

export default function BuilderForm({ className, children }: { className: string; children: ReactNode }) {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setMessage("");
    try {
      const response = await fetch("/api/quote", { method: "POST", body: new FormData(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      form.reset();
      setMessage("Thanks — your request is on its way. Our builder team will follow up shortly.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We could not send your request. Please call (305) 471-9010.");
    } finally {
      setSending(false);
    }
  }

  return <form className={className} onSubmit={submit}>
    <input type="hidden" name="need" value="Builder inquiry" />
    <input name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
    {children}
    <button type="submit" disabled={sending}>{sending ? "Sending…" : "Talk to Our Builder Team →"}</button>
    {message && <p role="status">{message}</p>}
  </form>;
}
