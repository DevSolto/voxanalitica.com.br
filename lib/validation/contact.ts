import { z } from "next/dist/compiled/zod";

export const MIN_SUBMIT_DELAY_MS = 3000;

export const contactFormSchema = z.object({
  name: z
    .string({ required_error: "Informe seu nome" })
    .trim()
    .min(1, "Informe seu nome"),
  email: z
    .string({ required_error: "Informe um e-mail" })
    .trim()
    .email("E-mail inválido"),
  organization: z
    .string({ required_error: "Informe a organização" })
    .trim()
    .min(1, "Informe a organização"),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || value.replace(/\D/g, "").length >= 10,
      "Informe um WhatsApp válido"
    ),
  message: z
    .string({ required_error: "Conte um pouco sobre o projeto" })
    .trim()
    .min(10, "Conte um pouco sobre o projeto"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const honeypotFieldName = "website";
