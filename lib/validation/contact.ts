export const MIN_SUBMIT_DELAY_MS = 3000;

export type ContactFormInput = {
  name: string;
  email: string;
  organization: string;
  phone?: string;
  message: string;
};

export type ContactFormFieldErrors = Partial<Record<keyof ContactFormInput, string[]>>;

export type ContactFormSafeParseResult =
  | { success: true; data: ContactFormInput }
  | { success: false; error: { flatten(): { fieldErrors: ContactFormFieldErrors } } };

type ContactFormSchema = {
  safeParse(values: unknown): ContactFormSafeParseResult;
};

const requiredMessage = {
  name: "Informe seu nome",
  email: "Informe um e-mail",
  organization: "Informe a organização",
  message: "Conte um pouco sobre o projeto",
} as const;

function isValidEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

export const contactFormSchema: ContactFormSchema = {
  safeParse(values: unknown): ContactFormSafeParseResult {
    const raw = (typeof values === "object" && values !== null ? values : {}) as Record<string, unknown>;
    const fieldErrors: ContactFormFieldErrors = {};

    const data: ContactFormInput = {
      name: "",
      email: "",
      organization: "",
      message: "",
    };

    const pushError = (field: keyof ContactFormInput, message: string) => {
      fieldErrors[field] = [...(fieldErrors[field] ?? []), message];
    };

    const name = typeof raw.name === "string" ? raw.name.trim() : "";
    if (!name) {
      pushError("name", requiredMessage.name);
    } else {
      data.name = name;
    }

    const email = typeof raw.email === "string" ? raw.email.trim() : "";
    if (!email) {
      pushError("email", requiredMessage.email);
    } else if (!isValidEmail(email)) {
      pushError("email", "E-mail inválido");
    } else {
      data.email = email;
    }

    const organization = typeof raw.organization === "string" ? raw.organization.trim() : "";
    if (!organization) {
      pushError("organization", requiredMessage.organization);
    } else {
      data.organization = organization;
    }

    const phone = typeof raw.phone === "string" ? raw.phone.trim() : undefined;
    if (phone && phone.replace(/\D/g, "").length < 10) {
      pushError("phone", "Informe um WhatsApp válido");
    } else if (phone) {
      data.phone = phone;
    }

    const message = typeof raw.message === "string" ? raw.message.trim() : "";
    if (!message || message.length < 10) {
      pushError("message", requiredMessage.message);
    } else {
      data.message = message;
    }

    if (Object.keys(fieldErrors).length > 0) {
      return {
        success: false,
        error: {
          flatten() {
            return { fieldErrors };
          },
        },
      };
    }

    return { success: true, data };
  },
};

export const honeypotFieldName = "website";
