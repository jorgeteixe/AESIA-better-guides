'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { diasHasta, entradaEnVigor, estadoHito, hitos } from '@/lib/calendario';

/**
 * Línea de tiempo del calendario de aplicación del Reglamento (Art. 113).
 *
 * El contenido sustantivo (fechas, artículos, a quién afecta, descripción y
 * enlaces) se renderiza siempre, también en el HTML estático. El estado
 * relativo a hoy (en vigor / cuánto falta) se calcula en el cliente tras el
 * montaje para evitar desajustes de hidratación y mantenerse siempre actual.
 * Los datos proceden de la fuente única `lib/calendario`.
 */
export function Calendario() {
  const [hoy, setHoy] = useState<Date | null>(null);

  useEffect(() => {
    setHoy(new Date());
  }, []);

  // Fecha del próximo hito aún no aplicable, para destacarlo.
  const proximaFecha =
    hoy === null
      ? null
      : hitos
          .map((h) => ({ fecha: h.fecha, dias: diasHasta(h.fecha, hoy) }))
          .filter((h) => h.dias > 0)
          .sort((a, b) => a.dias - b.dias)[0]?.fecha ?? null;

  return (
    <div className="not-prose my-6">
      <ol className="flex flex-col">
        {hitos.map((hito, i) => {
          const esUltimo = i === hitos.length - 1;
          const dias = hoy ? diasHasta(hito.fecha, hoy) : null;
          const estado = hoy ? estadoHito(hito.fecha, hoy) : null;
          const esProximo = hito.fecha === proximaFecha;

          const dotClase =
            estado === 'en-vigor'
              ? 'border-emerald-500 bg-emerald-500'
              : estado === 'proximo'
                ? 'border-amber-500 bg-fd-card'
                : 'border-fd-border bg-fd-card';

          return (
            <li key={hito.fecha} className="grid grid-cols-[auto_1fr] gap-x-4">
              <div className="flex flex-col items-center" aria-hidden>
                <span className={`mt-1 h-3.5 w-3.5 flex-none rounded-full border-2 ${dotClase}`} />
                {!esUltimo && <span className="w-px flex-1 bg-fd-border" />}
              </div>

              <div className={esUltimo ? '' : 'pb-7'}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="text-sm font-semibold tracking-tight text-fd-foreground">
                    {hito.fechaLabel}
                  </span>
                  {estado && (
                    <span
                      aria-label={
                        estado === 'en-vigor'
                          ? 'Estado: en vigor'
                          : `Estado: faltan ${dias} días`
                      }
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                        estado === 'en-vigor'
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-500'
                      }`}
                    >
                      {describeCuenta(dias ?? 0)}
                    </span>
                  )}
                  {esProximo && estado === 'proximo' && (
                    <span className="inline-flex items-center rounded-full bg-fd-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-fd-primary">
                      Próximo hito
                    </span>
                  )}
                </div>

                <h3 className="mt-1.5 text-base font-semibold leading-snug tracking-tight">{hito.titulo}</h3>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {hito.referencias.map((ref) => (
                    <span
                      key={ref}
                      className="inline-flex items-center rounded-md border border-fd-border bg-fd-secondary/40 px-2 py-0.5 text-[11px] font-medium text-fd-muted-foreground"
                    >
                      {ref}
                    </span>
                  ))}
                </div>

                <p className="mt-2.5 text-sm leading-relaxed text-fd-muted-foreground">{hito.descripcion}</p>

                <p className="mt-2 text-xs text-fd-muted-foreground">
                  <span className="font-semibold text-fd-foreground">A quién afecta:</span> {hito.aQuien}
                </p>

                {hito.enlaces && hito.enlaces.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {hito.enlaces.map((enlace) => (
                      <Link
                        key={enlace.href}
                        href={enlace.href}
                        className="inline-flex items-center rounded-full border border-fd-border bg-fd-background px-3 py-1 text-xs font-medium no-underline transition hover:border-fd-primary/40 hover:bg-fd-accent"
                      >
                        {enlace.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-5 border-t border-fd-border pt-3 text-xs text-fd-muted-foreground">
        El Reglamento entró en vigor el{' '}
        <span className="font-medium text-fd-foreground">{entradaEnVigor.fechaLabel}</span> y sus obligaciones se
        activan de forma escalonada (Art. 113).
        {hoy && (
          <>
            {' '}
            El estado se calcula con la fecha de tu dispositivo (
            {new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(hoy)}).
          </>
        )}
      </p>
    </div>
  );
}

function describeCuenta(dias: number): string {
  if (dias <= 0) return 'En vigor';
  if (dias === 1) return 'Falta 1 día';
  if (dias <= 45) return `Faltan ${dias} días`;
  const meses = Math.round(dias / 30);
  return `En ~${meses} ${meses === 1 ? 'mes' : 'meses'}`;
}
