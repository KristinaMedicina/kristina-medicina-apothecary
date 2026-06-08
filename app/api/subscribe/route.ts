import { NextResponse } from "next/server";
import { integrations } from "@/config/integrations";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // MailerLite is the primary provider. If either credential is present we treat
  // it as the intended provider and require both to be set.
  if (
    integrations.mailerlite.enabled ||
    integrations.mailerlite.partiallyConfigured
  ) {
    if (!integrations.mailerlite.enabled) {
      const missing = [
        !integrations.mailerlite.apiKey && "MAILERLITE_API_KEY",
        !integrations.mailerlite.groupId && "MAILERLITE_GROUP_ID",
      ]
        .filter(Boolean)
        .join(" and ");
      console.error(`MailerLite is not fully configured (missing ${missing}).`);
      return NextResponse.json(
        {
          error: `Newsletter signup is not fully configured. Missing ${missing}.`,
        },
        { status: 500 },
      );
    }

    try {
      await subscribeToMailerLite(email, firstName, source);
    } catch (err) {
      console.error("MailerLite subscribe failed:", err);
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

  if (integrations.kit.enabled && integrations.kit.apiSecret) {
    try {
      await subscribeToKit(email, source);
    } catch (err) {
      console.error("Kit subscribe failed:", err);
      return NextResponse.json(
        { error: "We couldn't subscribe you right now. Please try again." },
        { status: 502 },
      );
    }
  } else if (integrations.klaviyo.enabled) {
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

async function subscribeToMailerLite(
  email: string,
  firstName: string,
  source: string,
) {
  const { apiKey, groupId } = integrations.mailerlite;
  if (!apiKey || !groupId) {
    throw new Error("MailerLite API key or group id missing");
  }

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
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
    throw new Error(`MailerLite responded ${res.status}`);
  }
}

async function subscribeToKit(email: string, source: string) {
  const formId = integrations.kit.formId;
  if (!formId) throw new Error("Kit form id missing");

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: integrations.kit.apiSecret,
        email,
        fields: { source },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Kit responded ${res.status}`);
  }
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
