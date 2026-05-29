/**
 * Fuente única del calendario de aplicación del Reglamento (UE) 2024/1689.
 *
 * Las obligaciones del Reglamento se activan de forma escalonada (Art. 113).
 * Estas fechas alimentan el componente `Calendario`, que se reutiliza tanto en
 * el «Punto de partida» como en la página dedicada: editar un hito aquí lo
 * propaga a ambos sitios sin duplicar contenido.
 *
 * Las fechas y referencias proceden del propio Art. 113 del Reglamento,
 * contrastado con EUR-Lex y artificialintelligenceact.eu. No se añaden
 * afirmaciones nuevas respecto al contenido ya verificado del portal.
 */

export type EstadoHito = 'en-vigor' | 'proximo';

export type EnlaceHito = {
  label: string;
  /** Ruta raíz-relativa, p. ej. "/docs/itinerarios#proveedor-de-alto-riesgo". */
  href: string;
};

export type HitoCalendario = {
  /** Fecha de aplicación en formato ISO (YYYY-MM-DD). */
  fecha: string;
  /** Etiqueta legible de la fecha, p. ej. "2 de agosto de 2026". */
  fechaLabel: string;
  /** Título corto del hito. */
  titulo: string;
  /** Artículos o anexos implicados, como insignias. */
  referencias: string[];
  /** A quién afecta principalmente este hito. */
  aQuien: string;
  /** Descripción de qué obligaciones se activan. */
  descripcion: string;
  /** Saltos a las páginas del portal relevantes para este hito. */
  enlaces?: EnlaceHito[];
};

/** Entrada en vigor del Reglamento (referencia previa al escalonamiento). */
export const entradaEnVigor = {
  fecha: '2024-08-01',
  fechaLabel: '1 de agosto de 2024',
};

const ITINERARIOS = '/docs/itinerarios';

export const hitos: HitoCalendario[] = [
  {
    fecha: '2025-02-02',
    fechaLabel: '2 de febrero de 2025',
    titulo: 'Prohibiciones y alfabetización en IA',
    referencias: ['Cap. I', 'Art. 5', 'Art. 4'],
    aQuien: 'Todos los operadores.',
    descripcion:
      'Aplican las disposiciones generales (Cap. I), las prácticas prohibidas (Art. 5) —que no pueden ponerse en el mercado bajo ninguna condición— y el deber de alfabetización en IA del personal (Art. 4).',
    enlaces: [
      { label: 'Repasar las prohibiciones (Punto de partida)', href: '/docs/start' },
      { label: 'Guía 01 · Marco general', href: '/docs/guides/01-guia-introductoria-al-reglamento-de-ia' },
    ],
  },
  {
    fecha: '2025-08-02',
    fechaLabel: '2 de agosto de 2025',
    titulo: 'Modelos de uso general (GPAI) y gobernanza',
    referencias: ['GPAI', 'Gobernanza', 'Sanciones'],
    aQuien: 'Proveedores de modelos GPAI y autoridades de supervisión.',
    descripcion:
      'Aplican las obligaciones de los modelos de propósito general (GPAI), la gobernanza y el grueso del régimen sancionador. Los modelos GPAI ya en el mercado antes de esta fecha tienen hasta el 2 de agosto de 2027 para adaptarse.',
    enlaces: [
      { label: 'Ver el marco general (Guía 01)', href: '/docs/guides/01-guia-introductoria-al-reglamento-de-ia' },
      { label: 'Fuentes oficiales', href: '/docs/official-sources' },
    ],
  },
  {
    fecha: '2026-08-02',
    fechaLabel: '2 de agosto de 2026',
    titulo: 'Alto riesgo del Anexo III y transparencia',
    referencias: ['Anexo III', 'Art. 6(2)', 'Art. 50'],
    aQuien:
      'Proveedores y responsables del despliegue de sistemas del Anexo III; cualquier sistema con obligaciones de transparencia.',
    descripcion:
      'Aplica el grueso de las obligaciones de alto riesgo para sistemas con finalidades del Anexo III (empleo, biometría, servicios esenciales, etc.) y las obligaciones de transparencia del Art. 50 (avisar de que hay IA y etiquetar el contenido sintético).',
    enlaces: [
      { label: 'Itinerario · proveedor de alto riesgo', href: `${ITINERARIOS}#proveedor-de-alto-riesgo` },
      {
        label: 'Itinerario · responsable del despliegue',
        href: `${ITINERARIOS}#responsable-del-despliegue-de-alto-riesgo`,
      },
      { label: 'Itinerario · solo transparencia', href: `${ITINERARIOS}#solo-obligaciones-de-transparencia` },
    ],
  },
  {
    fecha: '2027-08-02',
    fechaLabel: '2 de agosto de 2027',
    titulo: 'Alto riesgo del Anexo I (productos regulados)',
    referencias: ['Anexo I', 'Art. 6(1)'],
    aQuien: 'Proveedores de IA que es producto o componente de seguridad de un producto ya regulado por la UE.',
    descripcion:
      'Aplican las obligaciones de alto riesgo para los sistemas que son producto o componente de seguridad de productos regulados (Anexo I), cuya conformidad se integra en la del producto. En esta fecha vence también el plazo de adaptación de los modelos GPAI heredados.',
    enlaces: [
      { label: 'Itinerario · proveedor de alto riesgo', href: `${ITINERARIOS}#proveedor-de-alto-riesgo` },
      { label: 'Guía 03 · Evaluación de conformidad', href: '/docs/guides/03-guia-evaluacion-de-conformidad' },
    ],
  },
];

/**
 * Diferencia en días naturales completos entre `hoy` y una fecha ISO.
 * Ambas se reducen a medianoche UTC de su año/mes/día para evitar desfases por
 * zona horaria. Negativo o cero significa que el hito ya está en vigor.
 */
export function diasHasta(fechaISO: string, hoy: Date): number {
  const [y, m, d] = fechaISO.split('-').map(Number);
  const objetivo = Date.UTC(y, m - 1, d);
  const base = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return Math.round((objetivo - base) / 86_400_000);
}

/** Estado de un hito respecto a la fecha indicada. */
export function estadoHito(fechaISO: string, hoy: Date): EstadoHito {
  return diasHasta(fechaISO, hoy) <= 0 ? 'en-vigor' : 'proximo';
}
