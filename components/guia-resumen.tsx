import Link from 'next/link';

type Relacionada = {
  /** Número de la guía, p. ej. "04". */
  n: string;
  /** Título corto de la guía relacionada. */
  titulo: string;
  /** Ruta raíz-relativa, p. ej. "/docs/guides/04-...". */
  href: string;
};

type GuiaResumenProps = {
  /** Artículo o anexo del Reglamento que desarrolla la guía. */
  articulo: string;
  /** Capa del corpus: "Conocer", "Implementar" o "Autodiagnosticar". */
  capa: string;
  /** Operador que asume principalmente las obligaciones. */
  rol: string;
  /** En qué momento del proyecto conviene usarla. */
  cuando: string;
  /** Guías directamente relacionadas (opcional). */
  relacionadas?: Relacionada[];
};

const campos = (props: GuiaResumenProps) => [
  { label: 'Artículo del Reglamento', value: props.articulo, strong: true },
  { label: 'Quién responde', value: props.rol, strong: false },
  { label: 'Cuándo usarla', value: props.cuando, strong: false },
];

/**
 * Cabecera estandarizada "De un vistazo" para las guías técnicas: orienta al
 * lector que aterriza desde un itinerario (artículo, rol, momento de uso) y le
 * ofrece los saltos relevantes a guías relacionadas y a su itinerario por perfil.
 */
export function GuiaResumen(props: GuiaResumenProps) {
  const { capa, relacionadas = [] } = props;

  return (
    <aside
      aria-label="Resumen de la guía de un vistazo"
      className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card text-fd-foreground shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b border-fd-border bg-fd-secondary/40 px-4 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wider">De un vistazo</span>
        <span className="inline-flex items-center rounded-full bg-fd-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-fd-primary">
          {capa}
        </span>
      </div>

      <dl className="grid gap-x-6 gap-y-4 px-4 py-4 sm:grid-cols-3">
        {campos(props).map((campo) => (
          <div key={campo.label} className="flex flex-col gap-1">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-fd-muted-foreground">
              {campo.label}
            </dt>
            <dd
              className={
                campo.strong
                  ? 'text-sm font-semibold leading-snug'
                  : 'text-sm leading-snug text-fd-muted-foreground'
              }
            >
              {campo.value}
            </dd>
          </div>
        ))}
      </dl>

      {relacionadas.length > 0 && (
        <div className="flex flex-col gap-2 border-t border-fd-border px-4 py-3 sm:flex-row sm:items-baseline">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-fd-muted-foreground sm:shrink-0 sm:pt-1">
            Guías relacionadas
          </span>
          <div className="flex flex-wrap gap-2">
            {relacionadas.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-background px-3 py-1 text-xs font-medium no-underline transition hover:border-fd-primary/40 hover:bg-fd-accent"
              >
                <span className="font-semibold text-fd-primary">{r.n}</span>
                {r.titulo}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-fd-border bg-fd-secondary/20 px-4 py-2.5">
        <Link
          href="/docs/itinerarios"
          className="text-xs font-medium text-fd-primary no-underline hover:underline"
        >
          Sitúala en tu itinerario por perfil →
        </Link>
      </div>
    </aside>
  );
}
