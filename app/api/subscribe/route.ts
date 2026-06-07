import { NextResponse } from "next/server";
import { integrations } from "@/config/integrations";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const source = body.source || "site";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // When Klaviyo is configured, forward the subscription. Otherwise we accept
  // it gracefully so the form works in development and pre-launch.
  if (integrations.klaviyo.enabled) {
    try {
      await subscribeToKlaviyo(email, source);
    } catch (err) {
      console.error("Klaviyo subscribe failed:", err);
      return NextResponse.json(
        { error: "We couldn't subscribe you right now. Please try again." },
        { status: 502 },
      );
    }
  } else {
    console.info(`[newsletter] (no ESP configured) ${email} from ${source}`);
  }

  return NextResponse.json({
    message:
      "Welcome to the apothecary. Your free guide is on its way to your inbox.",
  });
}

async function subscribeToKlaviyo(email: string, source: string) {
  const res = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        revision: "2024-10-15",
        Authorization: `Klaviyo-API-Key ${integrations.klaviyo.privateApiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    properties: { source },
                  },
                },
              ],
            },
          },
          relationships: {
            list: {
              data: { type: "list", id: integrations.klaviyo.listId },
            },
          },
        },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Klaviyo responded ${res.status}`);
  }
}
