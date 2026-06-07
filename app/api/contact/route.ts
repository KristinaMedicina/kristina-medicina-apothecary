import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please complete all fields with a valid email." },
      { status: 400 },
    );
  }

  // Pre-launch stub: log the inquiry. Wire to email/CRM (e.g. Resend, Klaviyo,
  // or a help desk) when ready.
  console.info("[contact] inquiry received:", {
    name,
    email,
    subject: body.subject,
  });

  return NextResponse.json({
    message:
      "Your message has been received. We'll be in touch within 1-2 business days.",
  });
}
