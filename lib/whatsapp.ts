const WHATSAPP_BASE_URL = "https://wa.me" as const;

export const DEFAULT_WHATSAPP_MESSAGE = "Olá VoxAnalitica, gostaria de uma proposta";

const BRIEFING_UTM_PARAMS: Record<string, string> = {
  utm_source: "site",
  utm_medium: "whatsapp",
  utm_campaign: "briefing_voxanalitica",
};

export type BuildWhatsAppLinkOptions = {
  message?: string;
  utmContent?: string;
  extraParams?: Record<string, string | undefined>;
};

function sanitizePhoneNumber(rawNumber: string | undefined) {
  if (!rawNumber) return "";
  return rawNumber.replace(/[^0-9+]/g, "");
}

export function buildWhatsAppLink(
  rawNumber: string | undefined,
  { message = DEFAULT_WHATSAPP_MESSAGE, utmContent, extraParams }: BuildWhatsAppLinkOptions = {},
) {
  const digits = sanitizePhoneNumber(rawNumber);
  if (!digits) return "";

  const params = new URLSearchParams();
  params.set("text", message);

  const utmParams = { ...BRIEFING_UTM_PARAMS };
  if (utmContent) {
    utmParams.utm_content = utmContent;
  }

  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  if (extraParams) {
    Object.entries(extraParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
  }

  return `${WHATSAPP_BASE_URL}/${digits}?${params.toString()}`;
}

export const WHATSAPP_LINK_TEMPLATE = `${WHATSAPP_BASE_URL}/:phone`;
