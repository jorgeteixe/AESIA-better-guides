'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  capas,
  filtrosRol,
  guias,
  guiaCoincideRol,
  hrefGuia,
  type RolGuia,
} from '@/lib/guides-meta';

/**
 * Matriz comparable de las 16 guías, agrupada por capa del corpus
 * (Conocer / Implementar / Autodiagnosticar) y filtrable por rol de operador
 * (proveedor / responsable del despliegue) para que cada perfil localice sus
 * guías sin recorrer las 16. Cada tarjeta resume número, artículo, rol
 * responsable y momento de uso. Los datos proceden de la fuente única
 * `lib/guides-meta`.
 */
export function GuiasIndice() {
  const [rol, setRol] = useState<RolGuia>('todos');

  const visibles = guias.filter((g) => guiaCoincideRol(g, rol));
  const filtroActivo = filtrosRol.find((f) => f.valor === rol) ?? filtrosRol[0];

  const botonBase =
    'rounded-full border px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary/60';

  return (
    <div className="not-prose flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div
          role="group"
          aria-label="Filtrar guías por rol de operador"
          className="flex flex-wrap gap-2"
        >
          {filtrosRol.map((f) => {
            const activo = f.valor === rol;
            return (
              <button
                key={f.valor}
                type="button"
                aria-pressed={activo}
                onClick={() => setRol(f.valor)}
                className={`${botonBase} ${
                  activo
                    ? 'border-fd-primary bg-fd-primary text-fd-primary-foreground'
                    : 'border-fd-border bg-fd-background text-fd-foreground hover:border-fd-primary/40 hover:bg-fd-accent'
                }`}
              >
                {f.etiqueta}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="text-sm text-fd-muted-foreground">
          <span className="font-medium text-fd-foreground">
            Mostrando {visibles.length} de {guias.length} guías
          </span>{' '}
          · {filtroActivo.nota}
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {capas.map(({ capa, descripcion }) => {
          const items = visibles.filter((g) => g.capa === capa);
          if (items.length === 0) return null;

          return (
            <section key={capa} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 border-b border-fd-border pb-3">
                <div className="flex items-baseline gap-2.5">
                  <h2 className="text-lg font-semibold tracking-tight">{capa}</h2>
                  <span className="text-xs font-medium text-fd-muted-foreground">
                    {items.length} {items.length === 1 ? 'guía' : 'guías'}
                  </span>
                </div>
                <p className="text-sm text-fd-muted-foreground">{descripcion}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((g) => (
                  <Link
                    key={g.n}
                    href={hrefGuia(g.slug)}
                    className="group flex flex-col gap-3 rounded-xl border border-fd-border bg-fd-card p-4 shadow-sm transition hover:border-fd-primary/40 hover:bg-fd-accent/40"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-fd-primary/10 text-sm font-semibold text-fd-primary">
                        {g.n}
                      </span>
                      <span className="flex-1 font-semibold leading-tight tracking-tight text-fd-foreground">
                        {g.titulo}
                      </span>
                      <span className="inline-flex flex-none items-center rounded-full border border-fd-border bg-fd-background px-2 py-0.5 text-[11px] font-medium text-fd-muted-foreground">
                        {g.articuloCorto}
                      </span>
                    </div>

                    <dl className="flex flex-col gap-2 text-sm">
                      <div className="flex flex-col gap-0.5">
                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-fd-muted-foreground">
                          Quién responde
                        </dt>
                        <dd className="leading-snug text-fd-muted-foreground">{g.rol}</dd>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-fd-muted-foreground">
                          Cuándo usarla
                        </dt>
                        <dd className="leading-snug text-fd-muted-foreground">{g.cuando}</dd>
                      </div>
                    </dl>

                    <span className="mt-auto text-sm font-medium text-fd-primary opacity-0 transition group-hover:opacity-100">
                      Abrir guía →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
