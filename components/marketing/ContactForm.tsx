"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
      setMessage(json.message);
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-gold/30 bg-cream-50 px-4 py-3 text-sm text-ink outline-none transition focus:ring-2 focus:ring-gold";

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center">
        <p className="font-display text-2xl text-emerald">Thank you</p>
        <p className="mt-2 text-sm text-ink-soft">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs text-ink-soft">
            Name
          </label>
          <input id="name" name="name" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-xs text-ink-soft">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-xs text-ink-soft">
          Subject
        </label>
        <input id="subject" name="subject" className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-xs text-ink-soft">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-emerald px-8 py-3 text-sm font-medium text-cream transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-xs text-rose-deep">{message}</p>
      )}
    </form>
  );
}
