export default function Home() {
  return (
    <section data-loc="client/src/pages/Home.tsx:47" className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div data-loc="client/src/pages/Home.tsx:48" className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      <div data-loc="client/src/pages/Home.tsx:49" className="container relative z-10">
        <div data-loc="client/src/pages/Home.tsx:50" className="max-w-4xl mx-auto text-center">
          <h1 data-loc="client/src/pages/Home.tsx:51" className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            A Inteligência que <span data-loc="client/src/pages/Home.tsx:52" className="text-primary">Vence Eleições</span> e Transforma Governos
          </h1>
          <p data-loc="client/src/pages/Home.tsx:54" className="text-xl md:text-2xl text-muted-foreground mb-8">
            Transformamos a Opinião Pública em <span data-loc="client/src/pages/Home.tsx:55" className="text-primary font-semibold">Subsídios Estratégicos</span> Acionáveis. Pare de Chutar. Comece a Decidir com Segurança.
          </p>
          <div data-loc="client/src/pages/Home.tsx:57" className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              data-loc="client/src/pages/Home.tsx:58"
              data-slot="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 rounded-md has-[&gt;svg]:px-4 bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
            >
              Fale com um Estrategista
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right ml-2"
                data-loc="client/src/pages/Home.tsx:63"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
            <button
              data-loc="client/src/pages/Home.tsx:65"
              data-slot="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-transparent shadow-xs hover:bg-accent dark:bg-transparent dark:border-input dark:hover:bg-input/50 h-10 rounded-md has-[&gt;svg]:px-4 text-lg px-8 py-6"
            >
              Conheça Nossas Soluções
            </button>
          </div>
        </div>
        <div data-loc="client/src/pages/Home.tsx:77" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <div data-loc="client/src/pages/Home.tsx:78" data-slot="card" className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-card/50 backdrop-blur-sm border-primary/20">
            <div data-loc="client/src/pages/Home.tsx:79" data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-brain text-primary mb-2"
                data-loc="client/src/pages/Home.tsx:80"
              >
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                <path d="M6 18a4 4 0 0 1-1.967-.516" />
                <path d="M19.967 17.484A4 4 0 0 1 18 18" />
              </svg>
              <div data-loc="client/src/pages/Home.tsx:81" data-slot="card-title" className="leading-none font-semibold text-foreground">
                Decifre o Eleitorado
              </div>
            </div>
            <div data-loc="client/src/pages/Home.tsx:83" data-slot="card-content" className="px-6">
              <p data-loc="client/src/pages/Home.tsx:84" className="text-muted-foreground">
                Vá além da intenção de voto. Entenda o <em data-loc="client/src/pages/Home.tsx:84">porquê</em> o eleitor escolhe, rejeita ou se emociona.
              </p>
            </div>
          </div>
          <div data-loc="client/src/pages/Home.tsx:87" data-slot="card" className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-card/50 backdrop-blur-sm border-primary/20">
            <div data-loc="client/src/pages/Home.tsx:88" data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-target text-primary mb-2"
                data-loc="client/src/pages/Home.tsx:89"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <div data-loc="client/src/pages/Home.tsx:90" data-slot="card-title" className="leading-none font-semibold text-foreground">
                Subsídios Estratégicos
              </div>
            </div>
            <div data-loc="client/src/pages/Home.tsx:92" data-slot="card-content" className="px-6">
              <p data-loc="client/src/pages/Home.tsx:93" className="text-muted-foreground">
                Transforme dados brutos em insumos valiosos para narrativas vencedoras e planos de governo com impacto real.
              </p>
            </div>
          </div>
          <div data-loc="client/src/pages/Home.tsx:96" data-slot="card" className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-card/50 backdrop-blur-sm border-primary/20">
            <div data-loc="client/src/pages/Home.tsx:97" data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shield text-primary mb-2"
                data-loc="client/src/pages/Home.tsx:98"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              </svg>
              <div data-loc="client/src/pages/Home.tsx:99" data-slot="card-title" className="leading-none font-semibold text-foreground">
                Segurança na Decisão
              </div>
            </div>
            <div data-loc="client/src/pages/Home.tsx:101" data-slot="card-content" className="px-6">
              <p data-loc="client/src/pages/Home.tsx:102" className="text-muted-foreground">
                Reduza a incerteza e blinde sua campanha contra surpresas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
