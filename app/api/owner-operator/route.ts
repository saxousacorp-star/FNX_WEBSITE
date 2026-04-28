import { NextResponse } from "next/server";

/**
 * Payload enviado ao Make (e daí ao Airtable): **apenas** estes 11 campos em texto.
 * Não enviamos ficheiros nem campos de anexo; o Make trata disso se necessário.
 */
const DEFAULT_WEBHOOK =
  "https://hook.us2.make.com/ckl9p02ee48lmuvh7xc6o6r4qye1be0q";

type JoinTeamPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  city: string;
  state: string;
  message: string;
  commercialInsurance: "Yes" | "No";
  dotNumber: "Yes" | "No";
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function toYesNo(v: unknown): "Yes" | "No" | null {
  if (typeof v !== "string") return null;
  const t = v.trim().toLowerCase();
  if (t === "yes") return "Yes";
  if (t === "no") return "No";
  return null;
}

const TEXT_FIELDS: (keyof Pick<
  JoinTeamPayload,
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "companyName"
  | "city"
  | "state"
  | "message"
>)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "companyName",
  "city",
  "state",
  "message",
];

/** Corpo POST para o Make: apenas estas chaves, sem anexos ou campos extra. */
function serializeOwnerOperatorForMake(p: JoinTeamPayload): string {
  return JSON.stringify({
    firstName: p.firstName,
    lastName: p.lastName,
    email: p.email,
    phone: p.phone,
    companyName: p.companyName,
    city: p.city,
    state: p.state,
    message: p.message,
    commercialInsurance: p.commercialInsurance,
    dotNumber: p.dotNumber,
  });
}

export async function POST(request: Request) {
  const webhookUrl =
    process.env.MAKE_JOIN_TEAM_WEBHOOK_URL?.trim() || DEFAULT_WEBHOOK;

  if (process.env.NODE_ENV === "development") {
    console.warn("[owner-operator] Webhook em uso:", webhookUrl);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const payload: JoinTeamPayload = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    city: "",
    state: "",
    message: "",
    commercialInsurance: "Yes",
    dotNumber: "Yes",
  };

  for (const k of TEXT_FIELDS) {
    const v = body[k];
    if (typeof v !== "string" || !v.trim()) {
      return NextResponse.json({ error: `Missing or invalid ${k}` }, { status: 400 });
    }
    payload[k] = v.trim();
  }

  const ci = toYesNo(body.commercialInsurance);
  const dn = toYesNo(body.dotNumber);
  if (ci === null || dn === null) {
    return NextResponse.json(
      { error: "Missing or invalid commercialInsurance / dotNumber" },
      { status: 400 },
    );
  }
  payload.commercialInsurance = ci;
  payload.dotNumber = dn;

  const makeBody = serializeOwnerOperatorForMake(payload);

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: makeBody,
      redirect: "follow",
    });

    const responseBody = await upstream.text();
    const detail = responseBody.trim().slice(0, 800);

    if (!upstream.ok) {
      console.error("[owner-operator] Resposta não OK do Make:", {
        status: upstream.status,
        statusText: upstream.statusText,
        snippet: detail.slice(0, 280),
      });
      return NextResponse.json(
        {
          error:
            detail ||
            `O Make respondeu com HTTP ${upstream.status} (${upstream.statusText}). Verifique se o cenário está ligado (ON) e se o URL do webhook está correto.`,
          makeStatus: upstream.status,
        },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[owner-operator] Falha ao contatar o webhook:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? `Failed to reach webhook: ${err.message}`
            : "Failed to reach webhook",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
