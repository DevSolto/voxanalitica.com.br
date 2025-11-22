"use client";

import type React from "react";
import { FormEvent, useMemo, useState } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { contactFormSchema, ContactFormInput, honeypotFieldName, MIN_SUBMIT_DELAY_MS } from "@/lib/validation/contact";

type ContactFormValues = ContactFormInput & {
  phone: string;
};

type ContactSectionProps = {
  title: string;
  subtitle: string;
};

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  organization: "",
  phone: "",
  message: "",
};

export function ContactSection({ title, subtitle }: ContactSectionProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [touched, setTouched] = useState<Record<keyof ContactFormValues, boolean>>({
    name: false,
    email: false,
    organization: false,
    phone: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypotValue, setHoneypotValue] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());

  const validationResult = useMemo(() => contactFormSchema.safeParse(values), [values]);
  const fieldErrors = validationResult.success ? {} : validationResult.error.flatten().fieldErrors;
  const errors: Partial<Record<keyof ContactFormValues, string>> = {
    name: fieldErrors.name?.[0],
    email: fieldErrors.email?.[0],
    organization: fieldErrors.organization?.[0],
    phone: fieldErrors.phone?.[0],
    message: fieldErrors.message?.[0],
  };

  const handleChange =
    (field: keyof ContactFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSubmitted(false);
      setSubmitError(null);
      setValues((prev: ContactFormValues) => ({ ...prev, [field]: event.target.value }));
    };

  const handleBlur = (field: keyof ContactFormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, email: true, organization: true, phone: true, message: true });

    if (Date.now() - formStartedAt < MIN_SUBMIT_DELAY_MS) {
      setSubmitError("Por favor, revise as informações antes de enviar.");
      return;
    }

    if (honeypotValue.trim()) {
      setSubmitError("Não foi possível enviar o formulário.");
      return;
    }

    if (!validationResult.success) {
      setSubmitError("Verifique os campos destacados e tente novamente.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validationResult.data,
          [honeypotFieldName]: honeypotValue,
          formStartedAt,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        const errorMessage = payload?.message ?? "Não foi possível enviar. Tente novamente.";
        setSubmitError(errorMessage);
        return;
      }

      setSubmitted(true);
      setValues(initialValues);
      setTouched({ name: false, email: false, organization: false, phone: false, message: false });
      setHoneypotValue("");
      setFormStartedAt(Date.now());
    } catch (error) {
      console.error("Falha ao enviar formulário de contato", error);
      setSubmitError("Falha de conexão. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contato" className="bg-bg">
      <SectionHeader eyebrow="Contato" title={title} subtitle={subtitle} align="center" className="mx-auto max-w-2xl" />
      <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border bg-surface p-8 shadow-sm">
        <form className="space-y-6" noValidate onSubmit={handleSubmit}>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-website" className="sr-only">
              Não preencha este campo
            </label>
            <input
              id="contact-website"
              name={honeypotFieldName}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypotValue}
              onChange={(event) => setHoneypotValue(event.target.value)}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-sm font-semibold text-text">
                Nome
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Como podemos te chamar?"
                aria-invalid={Boolean(touched.name && errors.name)}
                aria-describedby={touched.name && errors.name ? "error-name" : undefined}
              />
              {touched.name && errors.name ? (
                <p id="error-name" className="text-xs text-red-500">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-semibold text-text">
                E-mail
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="email@empresa.com"
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby={touched.email && errors.email ? "error-email" : undefined}
              />
              {touched.email && errors.email ? (
                <p id="error-email" className="text-xs text-red-500">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="contact-organization" className="text-sm font-semibold text-text">
                Organização
              </label>
              <input
                id="contact-organization"
                name="organization"
                type="text"
                value={values.organization}
                onChange={handleChange("organization")}
                onBlur={handleBlur("organization")}
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Empresa, órgão público ou projeto"
                aria-invalid={Boolean(touched.organization && errors.organization)}
                aria-describedby={touched.organization && errors.organization ? "error-organization" : undefined}
              />
              {touched.organization && errors.organization ? (
                <p id="error-organization" className="text-xs text-red-500">
                  {errors.organization}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-phone" className="text-sm font-semibold text-foreground">
                WhatsApp (opcional)
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="(00) 90000-0000"
                aria-invalid={Boolean(touched.phone && errors.phone)}
                aria-describedby={touched.phone && errors.phone ? "error-phone" : undefined}
              />
              {touched.phone && errors.phone ? (
                <p id="error-phone" className="text-xs text-red-500">
                  {errors.phone}
                </p>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-sm font-semibold text-foreground">
              Briefing do projeto
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={values.message}
              onChange={handleChange("message")}
              onBlur={handleBlur("message")}
              rows={5}
              className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              placeholder="Conte objetivo, público e prazos desejados"
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={touched.message && errors.message ? "error-message" : undefined}
            />
            {touched.message && errors.message ? (
              <p id="error-message" className="text-xs text-red-500">
                {errors.message}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-accent-foreground">
              Ao enviar, você concorda com nossa <a href="#politica" className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-2">Política de Privacidade</a>.
            </p>
            <Button variant="secondary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar briefing"}
            </Button>
          </div>
          {submitError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {submitError}
            </div>
          ) : null}
          {submitted ? (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700" role="status" aria-live="polite">
              Mensagem enviada! Entraremos em contato em até 1 dia útil.
            </div>
          ) : null}
        </form>
      </div>
    </Section>
  );
}
