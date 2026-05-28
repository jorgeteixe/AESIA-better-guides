import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guías AESIA · Portal documental del Reglamento Europeo de IA',
  description:
    'Portal documental en español para navegar las 16 guías de supervisión de la AESIA sobre el Reglamento Europeo de Inteligencia Artificial.',
};

const corpusMap = [
  {
    tag: 'Conocer',
    title: 'Marco y vocabulario',
    range: 'Guías 01 — 02',
    description:
      'Punto de entrada al Reglamento, niveles de riesgo, actores de la cadena de valor y casos de uso de referencia.',
    href: '/docs/guides/01-guia-introductoria-al-reglamento-de-ia',
  },
  {
    tag: 'Implementar',
    title: 'Requisitos técnicos',
    range: 'Guías 03 — 15',
    description:
      'Trece guías que cubren cada obligación de los sistemas de alto riesgo: conformidad, calidad, riesgos, datos, transparencia y más.',
    href: '/docs/guides/03-guia-evaluacion-de-conformidad',
  },
  {
    tag: 'Autodiagnosticar',
    title: 'Checklists operativas',
    range: 'Guía 16 + recursos',
    description:
      'Manual de uso de las listas de control y el paquete oficial de ejemplos publicado por AESIA para autoevaluación.',
    href: '/docs/resources/checklists-and-examples',
  },
];

const reasons = [
  {
    title: 'Una lectura, no una pila de PDFs',
    description:
      'Las 16 guías quedan unificadas como sitio navegable, con índice, tabla de contenidos por página y enlaces internos entre temas relacionados.',
  },
  {
    title: 'Trazabilidad hacia las fuentes',
    description:
      'Cada página mantiene referencia al material publicado por AESIA y al texto legal del Reglamento (UE) 2024/1689 disponible en EUR-Lex.',
  },
  {
    title: 'Síntesis editorial',
    description:
      'Un resumen profundo conecta los 16 documentos: objetivos por guía, patrones transversales y orden de lectura recomendado para un proyecto real.',
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-6 py-12 sm:py-16">
      <section className="relative overflow-hidden rounded-3xl border border-fd-border/60 bg-gradient-to-b from-fd-card via-fd-card to-fd-background px-6 py-14 shadow-sm sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-72 w-[42rem] max-w-full bg-fd-primary/10 blur-3xl"
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-secondary/60 px-4 py-1 text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-fd-primary"
            />
            Corpus documental · Reglamento (UE) 2024/1689
          </span>

          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Las guías de la AESIA,
            <br className="hidden sm:inline" /> legibles de un tirón.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-fd-muted-foreground text-pretty sm:text-xl">
            Una versión editorial del corpus español de supervisión del AI Act: 16 guías reorganizadas como portal navegable,
            con resumen transversal, fuentes oficiales y material práctico.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/docs"
              className="rounded-full bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Abrir documentación
            </Link>
            <Link
              href="/docs/summary"
              className="rounded-full border border-fd-border bg-fd-card px-6 py-3 text-sm font-medium transition hover:bg-fd-accent"
            >
              Leer el resumen profundo
            </Link>
          </div>

          <p className="pt-3 text-xs text-fd-muted-foreground">
            Este sitio reorganiza material público de AESIA. Las fuentes oficiales siguen siendo las{' '}
            <Link href="/docs/official-sources" className="underline underline-offset-4 hover:text-fd-foreground">
              publicaciones de la Agencia y EUR-Lex
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
              Cómo está organizado
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Tres capas, un solo recorrido
            </h2>
            <p className="text-fd-muted-foreground">
              El corpus de AESIA está pensado para acompañar a una organización desde el primer contacto con el
              Reglamento hasta su autoevaluación operativa. Aquí lo verás dividido en tres capas conectadas.
            </p>
          </div>
          <Link
            href="/docs"
            className="hidden text-sm font-medium text-fd-muted-foreground underline-offset-4 hover:text-fd-foreground hover:underline sm:inline-block"
          >
            Ver índice completo →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {corpusMap.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col gap-3 rounded-2xl border border-fd-border/60 bg-fd-card p-6 shadow-sm transition hover:border-fd-primary/40 hover:bg-fd-accent/40"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-fd-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-fd-primary">
                {item.tag}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-0.5 text-xs font-medium text-fd-muted-foreground">{item.range}</p>
              </div>
              <p className="text-sm leading-relaxed text-fd-muted-foreground">{item.description}</p>
              <span className="mt-auto text-sm font-medium text-fd-primary opacity-0 transition group-hover:opacity-100">
                Entrar →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-10 rounded-3xl border border-fd-border/60 bg-fd-secondary/30 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_0.85fr]">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
              Por qué este portal
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Material oficial, pero legible
            </h2>
          </div>
          <p className="text-fd-muted-foreground">
            Los documentos originales son rigurosos pero pesados de consumir. Este portal mantiene el contenido y le da
            la estructura, la jerarquía y los puentes que faltaban para usarlo en un proyecto real de cumplimiento.
          </p>
          <ul className="space-y-4">
            {reasons.map((reason) => (
              <li key={reason.title} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-fd-primary"
                />
                <div>
                  <p className="font-medium">{reason.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fd-muted-foreground">{reason.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-fd-border/60 bg-fd-background p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
            Por dónde empezar
          </p>
          <ol className="mt-5 space-y-5 text-sm">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-fd-primary/10 text-xs font-semibold text-fd-primary">
                1
              </span>
              <div>
                <Link href="/docs/introduction" className="font-medium underline-offset-4 hover:underline">
                  Introducción
                </Link>
                <p className="mt-0.5 text-fd-muted-foreground">
                  Qué cubre el portal, a quién va dirigido y cómo está organizado.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-fd-primary/10 text-xs font-semibold text-fd-primary">
                2
              </span>
              <div>
                <Link href="/docs/summary" className="font-medium underline-offset-4 hover:underline">
                  Resumen profundo
                </Link>
                <p className="mt-0.5 text-fd-muted-foreground">
                  Síntesis transversal de las 16 guías y patrones comunes en una sola lectura.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-fd-primary/10 text-xs font-semibold text-fd-primary">
                3
              </span>
              <div>
                <Link
                  href="/docs/resources/checklists-and-examples"
                  className="font-medium underline-offset-4 hover:underline"
                >
                  Material práctico
                </Link>
                <p className="mt-0.5 text-fd-muted-foreground">
                  Checklists oficiales y ejemplos para aterrizar requisitos en trabajo de cumplimiento.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <footer className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-fd-border/60 pt-6 text-xs text-fd-muted-foreground sm:flex-row sm:items-center">
        <p>
          Portal independiente sobre material público de la Agencia Española de Supervisión de Inteligencia Artificial.
        </p>
        <Link href="/docs/official-sources" className="underline-offset-4 hover:text-fd-foreground hover:underline">
          Ver fuentes oficiales →
        </Link>
      </footer>
    </div>
  );
}
