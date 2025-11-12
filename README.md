# 🌐 VoxAnalitica — Site Institucional

Este repositório contém o código-fonte e a documentação do **site institucional da VoxAnalitica**, agência de **pesquisa eleitoral, opinião pública e inteligência de dados**.\
O projeto foi planejado para transmitir **credibilidade**, **gerar leads qualificados** e destacar o novo diferencial da empresa:\
**pesquisa automatizada via WhatsApp** e **relatórios express (texto + vídeo)**.

---

## 🎯 Objetivos

- Gerar **leads qualificados** para serviços de pesquisa e consultoria.
- Reforçar **credibilidade e transparência metodológica**.
- Oferecer **conteúdo técnico e análises regionais** (PB/PE/Nordeste).
- Criar **caminhos claros de conversão** (WhatsApp, formulário, proposta).
- Evidenciar o diferencial de **velocidade na entrega** e **didatismo visual** dos relatórios.

**Principais KPIs:**

- Conversão visita → lead ≥ 3%
- CTR para WhatsApp ≥ 8%
- Tempo médio em cases ≥ 1m30
- Tráfego orgânico mês 3 ≥ 1.5x mês 1
- SLA de relatório express: **24–72h** pós-coleta
- ≥90% dos projetos com vídeo explicativo

---

## 👥 Público-Alvo

- Gestores públicos / prefeituras
- Candidatos e coordenadores de campanha
- Empresas e associações locais
- Imprensa e formadores de opinião

**Principais dores:**

- Incerteza sobre cenário local
- Falta de segmentação geográfica
- Necessidade de validar narrativas e mensagens
- Prazos curtos e exigência de compliance

---

## 💡 Proposta de Valor

> “Pesquisa com precisão local e inteligência aplicada à tomada de decisão — do campo ao plano de ação.”

**Diferenciais competitivos:**

- Coleta automatizada via **WhatsApp** com quotas e verificação LGPD.
- **Relatórios express** (texto + vídeo explicativo em até 72h).
- Cobertura capilar no Nordeste (PB/PE).
- **Pipeline proprietário** (Sentinela + Farol do Nordeste).
- Relatórios **auditáveis e transparentes**.
- Equipe com experiência em gestão e campanhas.

---

## 🟙️ Sitemap / Estrutura de Páginas

**Navbar:** Home | Soluções | Metodologia | Cases | Relatórios Express | Blog | Sobre | Contato

- **Home:** hero, soluções, mini-cases, depoimentos, CTA WhatsApp
- **Soluções:** detalhamento de cada tipo de pesquisa
- **Metodologia:** processos, ética, LGPD
- **Cases:** grid filtrável + páginas individuais
- **Blog:** artigos técnicos e análises regionais
- **Sobre:** manifesto e equipe
- **Contato:** formulário de lead + CTA WhatsApp
- **Auxiliares:** Política de Privacidade, Press Kit

---

## 🎨 Design System

| Elemento       | Valor                               |
| -------------- | ----------------------------------- |
| **Primária**   | `#043873`                           |
| **Secundária** | `#4F9CF9`                           |
| **Acento**     | `#FFE6A8`                           |
| **Neutros**    | `#212529`, `#495057`, `#F8F9FA`     |
| **Fontes**     | Montserrat (títulos), Inter (corpo) |

**Componentes-chave (shadcn/ui):**\
Navbar, Footer, Cards, Accordion, Tabs, Dialog, Tooltip, Toast, Charts (Recharts).

**Ícones:** lucide-react\
**Imagens:** fotos de campo e gráficos simplificados

---

## 🧱️ Stack Técnica

**Framework principal:** Next.js (App Router)\
**Linguagem:** TypeScript\
**Estilo:** TailwindCSS + shadcn/ui\
**Formulários:** React Hook Form + Zod\
**E-mail:** Resend / Formspree\
**Analytics:** Plausible / Umami\
**SEO:** next-seo\
**Deploy:** Vercel

**Serviços complementares:**

- Coleta via Z-API / Meta Cloud API
- Render de vídeo (FFmpeg / Remotion)
- Relatórios PDF (MDX / React-PDF)
