import { NextRequest, NextResponse } from "next/server";

import { contactFormSchema, honeypotFieldName, MIN_SUBMIT_DELAY_MS } from "@/lib/validation/contact";

type ContactRequestPayload = Record<string, unknown> & {
  formStartedAt?: unknown;
};

export async function POST(request: NextRequest) {
  const receivedAt = Date.now();

  try {
    const body = (await request.json().catch(() => null)) as ContactRequestPayload | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, message: "Dados inválidos." }, { status: 400 });
    }

    const { [honeypotFieldName]: honeypotValue, formStartedAt, ...formData } = body;

    if (typeof honeypotValue === "string" && honeypotValue.trim().length > 0) {
      return NextResponse.json({ ok: false, message: "Envio inválido." }, { status: 400 });
    }

    const submissionTimestamp = typeof formStartedAt === "number" ? formStartedAt : Number(formStartedAt);
    if (!Number.isFinite(submissionTimestamp)) {
      return NextResponse.json({ ok: false, message: "Envio inválido." }, { status: 400 });
    }

    if (receivedAt - submissionTimestamp < MIN_SUBMIT_DELAY_MS) {
      return NextResponse.json({ ok: false, message: "Envio muito rápido. Tente novamente." }, { status: 429 });
    }

    const validationResult = contactFormSchema.safeParse(formData);

    if (!validationResult.success) {
      return NextResponse.json(
        { ok: false, message: "Revise os campos informados.", errors: validationResult.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    // TODO: Integrar com serviços de envio (Resend/Formspree) quando as chaves estiverem disponíveis.
    // const resendApiKey = process.env.RESEND_API_KEY;
    // const formspreeFormId = process.env.FORMSPREE_FORM_ID;

    return NextResponse.json({ ok: true, message: "Mensagem enviada com sucesso." });
  } catch (error) {
    console.error("Erro ao processar o formulário de contato", error);
    return NextResponse.json({ ok: false, message: "Erro interno. Tente novamente mais tarde." }, { status: 500 });
  }
}
