"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

type ContactSectionProps = {
  title: string;
  subtitle: string;
};

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
};

export function ContactSection({ title, subtitle }: ContactSectionProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [touched, setTouched] = useState<Record<keyof ContactFormValues, boolean>>({
    name: false,
    email: false,
    company: false,
    phone: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  if (!values.name.trim()) {
    errors.name = "Informe seu nome";
  }
  if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "E-mail inválido";
  }
  if (!values.company.trim()) {
    errors.company = "Informe a organização";
  }
  if (!values.message.trim()) {
    errors.message = "Conte um pouco sobre o projeto";
  }

  const handleChange = (field: keyof ContactFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSubmitted(false);
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleBlur = (field: keyof ContactFormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, email: true, company: true, phone: true, message: true });

    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      setValues(initialValues);
    }
  };

  return (
    <Section id="contato">
      <SectionHeader eyebrow="Contato" title={title} subtitle={subtitle} align="center" className="mx-auto max-w-2xl" />
      <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-[#E9ECEF] bg-white p-8 shadow-sm">
        <form className="space-y-6" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-sm font-semibold text-[#212529]">
                Nome
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                className="w-full rounded-xl border border-[#CED4DA] px-4 py-3 text-sm focus:border-[#4F9CF9] focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/40"
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
              <label htmlFor="contact-email" className="text-sm font-semibold text-[#212529]">
                E-mail
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                className="w-full rounded-xl border border-[#CED4DA] px-4 py-3 text-sm focus:border-[#4F9CF9] focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/40"
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
              <label htmlFor="contact-company" className="text-sm font-semibold text-[#212529]">
                Organização
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                value={values.company}
                onChange={handleChange("company")}
                onBlur={handleBlur("company")}
                className="w-full rounded-xl border border-[#CED4DA] px-4 py-3 text-sm focus:border-[#4F9CF9] focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/40"
                placeholder="Empresa, órgão público ou projeto"
                aria-invalid={Boolean(touched.company && errors.company)}
                aria-describedby={touched.company && errors.company ? "error-company" : undefined}
              />
              {touched.company && errors.company ? (
                <p id="error-company" className="text-xs text-red-500">
                  {errors.company}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-phone" className="text-sm font-semibold text-[#212529]">
                WhatsApp (opcional)
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                className="w-full rounded-xl border border-[#CED4DA] px-4 py-3 text-sm focus:border-[#4F9CF9] focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/40"
                placeholder="(00) 90000-0000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-sm font-semibold text-[#212529]">
              Briefing do projeto
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={values.message}
              onChange={handleChange("message")}
              onBlur={handleBlur("message")}
              rows={5}
              className="w-full rounded-xl border border-[#CED4DA] px-4 py-3 text-sm focus:border-[#4F9CF9] focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/40"
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
            <p className="text-xs text-[#868E96]">
              Ao enviar, você concorda com nossa <a href="#politica" className="font-semibold text-[#043873] underline">Política de Privacidade</a>.
            </p>
            <Button type="submit" className="justify-center">
              Enviar briefing
            </Button>
          </div>
          {submitted ? (
            <div className="rounded-xl border border-[#51CF66] bg-[#D3F9D8] px-4 py-3 text-sm text-[#2B8A3E]">
              Mensagem enviada! Entraremos em contato em até 1 dia útil.
            </div>
          ) : null}
        </form>
      </div>
    </Section>
  );
}
