import { NextResponse } from "next/server";
import { integrations } from "@/config/integrations";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAILERLITE_BASE = "https://connect.mailerlite.com/api";

export async function POST(request: Request) {
  let body: {
    email?: string;
    source?: string;
    name?: string;
    firstName?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const source = body.source || "site";
  const firstName = (body.name || body.firstName || "").trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const { apiKey, groupName, enabled } = integrations.mailerlite;

  if (!enabled) {
    const missing = [
      !apiKey && "MAILERLITE_API_KEY",
      !groupName && "MAILERLITE_GROUP_NAME",
    ]
      .filter(Boolean)
      .join(" and ");
    console.error(
      `[newsletter] MailerLite is not configured (missing ${missing}).`,
    );
    return NextResponse.json(
      { error: `Newsletter signup is not configured. Missing ${missing}.` },
      { status: 500 },
    );
  }

  try {
    const groupId = await findGroupIdByName(apiKey!, groupName!);
    if (!groupId) {
      console.error(
        `[newsletter] MailerLite group "${groupName}" was not found.`,
      );
      return NextResponse.json(
        { error: "We couldn't subscribe you right now. Please try again." },
        { status: 500 },
      );
    }

    await subscribeToMailerLite(apiKey!, email, firstName, source, groupId);
  } catch (err) {
    console.error("[newsletter] MailerLite subscribe failed:", err);
    return NextResponse.json(
      { error: "We couldn't subscribe you right now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message:
      "Welcome to the apothecary. Your free guide is on its way to your inbox.",
  });
}

/** Looks up MailerLite groups and returns the id whose name matches. */
async function findGroupIdByName(
  apiKey: string,
  groupName: string,
): Promise<string | undefined> {
  const res = await fetch(`${MAILERLITE_BASE}/groups?limit=100`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(
      `[newsletter] MailerLite groups lookup failed: ${res.status} ${detail}`,
    );
    throw new Error(`MailerLite groups responded ${res.status}`);
  }

  const json = (await res.json()) as {
    data?: Array<{ id: string; name: string }>;
  };
  const target = groupName.trim().toLowerCase();
  const match = json.data?.find((g) => g.name.trim().toLowerCase() === target);
  return match?.id;
}

/** Subscribes an email to MailerLite and adds them to the resolved group. */
async function subscribeToMailerLite(
  apiKey: string,
  email: string,
  firstName: string,
  source: string,
  groupId: string,
) {
  const res = await fetch(`${MAILERLITE_BASE}/subscribers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      fields: {
        ...(firstName && { name: firstName }),
        source,
      },
      groups: [groupId],
    }),
  });

  // MailerLite returns 200 (existing) or 201 (created) on success.
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(
      `[newsletter] MailerLite subscribe failed: ${res.status} ${detail}`,
    );
    throw new Error(`MailerLite responded ${res.status}`);
  }
}
