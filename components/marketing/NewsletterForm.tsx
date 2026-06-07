"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/format";

interface NewsletterFormProps {
  /** Visual treatment for placement context. */
  variant?: "light" | "dark" | "inline";
  /** Source label sent to the API so flows can be segmented. */
  source?: string;
  buttonLabel?: string;
  placeholder?: string;
  className?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  variant = "light",
  source = "site",
  buttonLabel = "Subscribe",
  placeholder = "Your email address",
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setMessage(data.message || "You're on the list. Check your inbox.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    }
  }

  const dark = variant === "dark";

  if (status === "success") {
    return (
      <p
        className={cn(
          "rounded-full px-5 py-3 text-sm",
          dark ? "bg-cream/15 text-cream" : "bg-emerald/10 text-emerald",
          className,
        )}
      >
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)}>
      <div
        className={cn(
          "flex flex-col gap-3 sm:flex-row",
          variant === "inline" && "sm:gap-2",
        )}
      >
        <label className="sr-only" htmlFor={`newsletter-${source}`}>
          Email address
        </label>
        <input
          id={`newsletter-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full flex-1 rounded-full border px-5 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gold",
            dark
              ? "border-cream/30 bg-cream/10 text-cream placeholder:text-cream/50"
              : "border-gold/30 bg-cream-50 text-ink placeholder:text-ink-soft/60",
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "shrink-0 rounded-full px-6 py-3 text-sm font-medium transition-all disabled:opacity-60",
            dark
              ? "bg-gold text-ink hover:bg-gold-soft"
              : "bg-emerald text-cream hover:bg-emerald-700",
          )}
        >
          {status === "loading" ? "Joining..." : buttonLabel}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-rose-deep">{message}</p>
      )}
      <p
        className={cn(
          "mt-2 text-xs",
          dark ? "text-cream/60" : "text-ink-soft/70",
        )}
      >
        We respect your inbox. Unsubscribe anytime.
      </p>
    </form>
  );
}
