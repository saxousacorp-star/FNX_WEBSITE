import { NextResponse } from "next/server";

const DEFAULT_WEBHOOK =
  "https://hook.us2.make.com/okk44s3jifpwpeibarq3sid3z3ako4p2";

type QuotePayload = {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  City: string;
  State: string;
  Message: string;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export async function POST(request: Request) {
  const webhookUrl = process.env.MAKE_QUOTE_WEBHOOK_URL ?? DEFAULT_WEBHOOK;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const keys = [
    "FirstName",
    "LastName",
    "Email",
    "Phone",
    "City",
    "State",
    "Message",
  ] as const;

  const payload = {} as QuotePayload;
  for (const k of keys) {
    const v = body[k];
    if (typeof v !== "string" || !v.trim()) {
      return NextResponse.json({ error: `Missing or invalid ${k}` }, { status: 400 });
    }
    payload[k] = v.trim();
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream webhook rejected the request" },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json({ error: "Failed to reach webhook" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
