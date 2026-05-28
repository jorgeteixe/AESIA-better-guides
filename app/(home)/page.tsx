import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guías AESIA',
  description:
    'Portal documental en español para navegar las guías de supervisión de la AESIA y el Reglamento Europeo de IA.',
};

const stats = [
  { label: 'Guías transcritas', value: '16' },
  { label: 'Bloques clave', value: 'Guías, resumen y recursos' },
  { label: 'Idioma', value: 'Español' },
];

const highlights = [
  {
    title: 'Lectura más rápida',
    description:
      'Convierte un corpus disperso en una experiencia documental clara, navegable y lista para consulta.',
  },
  {
    title: 'Fuentes verificables',
    description:
      'Cada guía mantiene trazabilidad hacia las fuentes oficiales publicadas por la AESIA y EUR-Lex.',
  },
  {
    title: 'Enfoque práctico',
    description:
      'Además del corpus completo, incluye resumen transversal y recursos operativos para aterrizar requisitos.',
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-10">
      <section className="rounded-3xl border border-fd-border/60 bg-gradient-to-b from-fd-card to-fd-background px-8 py-12 shadow-sm sm:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <span className="rounded-full border border-fd-border bg-fd-secondary px-4 py-1 text-sm font-medium text-fd-muted-foreground">
            Corpus navegable sobre supervisión de IA en España
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Guías AESIA
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-fd-muted-foreground text-pretty sm:text-xl">
              Un portal documental en español para entender, recorrer y consultar las guías de supervisión de la
              AESIA sin tener que pelearte con un bloque de PDFs sueltos.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs"
              className="rounded-full bg-fd-primary px-5 py-3 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
            >
              Abrir documentación
            </Link>
            <Link
              href="/docs/summary"
              className="rounded-full border border-fd-border bg-fd-card px-5 py-3 text-sm font-medium transition hover:bg-fd-accent"
            >
              Leer resumen ejecutivo
            </Link>
            <Link
              href="/docs/resources/checklists-and-examples"
              className="rounded-full border border-fd-border bg-fd-card px-5 py-3 text-sm font-medium transition hover:bg-fd-accent"
            >
              Ver recursos prácticos
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-fd-border/60 bg-fd-card px-5 py-5 shadow-sm">
            <p className="text-sm text-fd-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-xl font-semibold text-pretty">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-fd-border/60 bg-fd-card px-6 py-6 shadow-sm">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-fd-muted-foreground">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 rounded-3xl border border-fd-border/60 bg-fd-secondary/30 px-8 py-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Qué vas a encontrar</h2>
          <ul className="space-y-3 text-fd-muted-foreground">
            <li>• Una colección completa de guías individuales organizadas para lectura y consulta.</li>
            <li>• Un resumen transversal para captar rápido objetivos, obligaciones y patrones comunes.</li>
            <li>• Recursos complementarios con manuales, listas de control y enlaces oficiales.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-fd-border/60 bg-fd-background px-6 py-6 shadow-sm">
          <p className="text-sm font-medium text-fd-muted-foreground">Ruta sugerida</p>
          <ol className="mt-4 space-y-3 text-sm leading-7">
            <li>
              <strong>1.</strong> Empieza por la <Link href="/docs/introduction" className="underline underline-offset-4">introducción</Link>.
            </li>
            <li>
              <strong>2.</strong> Sigue con el <Link href="/docs/summary" className="underline underline-offset-4">resumen profundo</Link> para orientarte.
            </li>
            <li>
              <strong>3.</strong> Baja al detalle en las <Link href="/docs" className="underline underline-offset-4">guías y recursos</Link> que necesites.
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
