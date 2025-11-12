"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Linkedin, Mail, MapPin, Phone, X } from "lucide-react";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/voxanalitica", icon: Linkedin },
];

export function Footer() {
  const [open, setOpen] = useState(false);

  const closeDialog = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, closeDialog]);

  return (
    <footer id="politica" data-section-id="politica" className="bg-[#021F46] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 md:px-6 md:py-16 lg:flex-row lg:justify-between">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#4F9CF9] text-lg font-semibold">
              VA
            </span>
            <p className="text-lg font-semibold">VoxAnalitica Pesquisa & Dados</p>
          </div>
          <p className="text-sm text-white/70">
            Insights locais para decisões com menos risco. Combinamos automação, inteligência analítica e apresentação clara para acelerar decisões públicas e privadas.
          </p>
          <div className="space-y-2 text-sm text-white/80">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" /> João Pessoa · Paraíba
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <a href="mailto:contato@voxanalitica.com.br" className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
                contato@voxanalitica.com.br
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <a href="tel:+5583988880000" className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
                +55 (83) 98888-0000
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 text-sm text-white/80">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Redes</h4>
            <ul className="mt-3 space-y-2">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver Política de Privacidade
            </button>
            <p className="mt-3 text-xs text-white/50">© {new Date().getFullYear()} VoxAnalitica. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-policy-title"
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 text-[#212529] shadow-2xl"
          >
            <button
              type="button"
              onClick={closeDialog}
              className="absolute right-4 top-4 rounded-full border border-[#DEE2E6] p-2 text-[#495057] hover:text-[#212529]"
              aria-label="Fechar Política de Privacidade"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <h3 id="privacy-policy-title" className="text-2xl font-semibold text-[#043873]">
              Política de Privacidade VoxAnalitica
            </h3>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#495057]">
              <p>
                A VoxAnalitica coleta dados fornecidos diretamente pelos clientes para execução de projetos de pesquisa e análises de dados. Utilizamos as informações exclusivamente para cumprir os contratos firmados e gerar entregáveis com segurança.
              </p>
              <p>
                As bases são armazenadas em infraestrutura criptografada, com acesso restrito à equipe autorizada. Aplicamos auditorias periódicas, controles de acesso e políticas de retenção compatíveis com a LGPD.
              </p>
              <p>
                O compartilhamento de dados com parceiros ocorre apenas mediante consentimento explícito e finalidades descritas previamente. Você pode solicitar revisão, atualização ou exclusão dos seus dados a qualquer momento pelo e-mail contato@voxanalitica.com.br.
              </p>
              <p>
                Em caso de incidentes de segurança, comunicaremos os titulares afetados e a ANPD, seguindo os prazos legais. Última atualização: {new Date().toLocaleDateString("pt-BR")}.
              </p>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-full border border-[#043873] px-4 py-2 text-sm font-semibold text-[#043873] hover:bg-[#043873]/10"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </footer>
  );
}
