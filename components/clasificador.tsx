'use client';

import Link from 'next/link';
import { useId, useState } from 'react';

/**
 * Asistente de clasificación: hace interactivo el triaje en cinco pasos de
 * `content/docs/start.mdx` (ámbito Art. 2 → práctica prohibida Art. 5 → alto
 * riesgo Art. 6 → transparencia Art. 50 → rol Art. 3) y termina en el
 * resultado con su itinerario por perfil.
 *
 * No introduce afirmaciones nuevas: cada pregunta, opción, fecha y ruta procede
 * del contenido ya verificado de `start.mdx` e `itinerarios.mdx`, que siguen
 * disponibles más abajo en la página como referencia detallada.
 */

type Tono = 'ok' | 'warn' | 'stop' | 'info';

type Accion = { label: string; href: string; primario?: boolean };

type Resultado = {
  etiqueta: string;
  tono: Tono;
  resumen: string;
  fecha: string;
  notas?: string[];
  acciones: Accion[];
};

type Opcion = {
  label: string;
  detalle?: string;
  next?: string;
  result?: string;
  estado?: { anexo: 'I' | 'III' };
};

type Pregunta = {
  id: string;
  paso: string;
  titulo: string;
  ayuda?: string;
  opciones: Opcion[];
};

const PRIMERA = 'p1-ambito';

const preguntas: Record<string, Pregunta> = {
  'p1-ambito': {
    id: 'p1-ambito',
    paso: 'Ámbito · Art. 2',
    titulo: '¿Lo que evalúas es un «sistema de IA» y se introduce o usa en la UE con fines profesionales?',
    ayuda:
      'El Reglamento regula casos de uso, no la tecnología en sí. Quedan fuera, entre otros: la I+D previa a la comercialización, los fines militares, de defensa o seguridad nacional, y el uso personal no profesional.',
    opciones: [
      {
        label: 'Sí, es un sistema de IA en un contexto profesional',
        next: 'p2-prohibida',
      },
      {
        label: 'Es un modelo de IA de uso general (GPAI)',
        detalle: 'Una base reutilizable que se integra en muchos sistemas, p. ej. un gran modelo de lenguaje.',
        result: 'gpai',
      },
      {
        label: 'Queda fuera del ámbito o no encaja en la definición',
        detalle: 'I+D previa, uso militar/defensa/seguridad nacional o uso personal no profesional.',
        result: 'fuera-ambito',
      },
    ],
  },
  'p2-prohibida': {
    id: 'p2-prohibida',
    paso: 'Prácticas prohibidas · Art. 5',
    titulo: '¿El uso encaja en alguna práctica prohibida del Art. 5?',
    ayuda:
      'Manipulación subliminal dañina, explotación de vulnerabilidades de un grupo, puntuación social, o identificación biométrica remota «en tiempo real» en espacios públicos por autoridades (salvo casos tasados y autorizados).',
    opciones: [
      { label: 'Sí, encaja en una práctica prohibida', result: 'prohibido' },
      {
        label: 'No (o, en duda, creo que no)',
        detalle: 'Si tienes dudas, contrasta con las directrices de la Comisión y la Guía 01.',
        next: 'p3-alto-riesgo',
      },
    ],
  },
  'p3-alto-riesgo': {
    id: 'p3-alto-riesgo',
    paso: 'Nivel de riesgo · Art. 6',
    titulo: '¿Tu sistema es de alto riesgo? Lo es por dos vías independientes.',
    ayuda: 'Aquí se concentra la mayoría de obligaciones del Reglamento.',
    opciones: [
      {
        label: 'Vía A · Es producto o componente de seguridad de un producto regulado (Anexo I)',
        detalle: 'Máquinas, juguetes, ascensores, productos sanitarios, automoción, aviación…',
        estado: { anexo: 'I' },
        next: 'p5-rol',
      },
      {
        label: 'Vía B · Se usa para una finalidad sensible del Anexo III',
        detalle: 'Empleo, biometría, educación, servicios esenciales, infraestructuras críticas, justicia, migración…',
        estado: { anexo: 'III' },
        next: 'p5-rol',
      },
      { label: 'No es de alto riesgo', next: 'p4-transparencia' },
    ],
  },
  'p4-transparencia': {
    id: 'p4-transparencia',
    paso: 'Transparencia · Art. 50',
    titulo: 'Aunque no sea de alto riesgo, ¿hace algo de esto?',
    ayuda:
      'Interactuar con personas (chatbot), generar contenido sintético (texto, imagen, audio, vídeo), producir deepfakes o reconocer emociones / categorizar biométricamente.',
    opciones: [
      { label: 'Sí, alguna de esas', result: 'transparencia' },
      { label: 'No, ninguna', result: 'minimo' },
    ],
  },
  'p5-rol': {
    id: 'p5-rol',
    paso: 'Tu rol · Art. 3',
    titulo: '¿Cuál es tu rol en la cadena de valor de este sistema de alto riesgo?',
    ayuda: 'Las obligaciones cambian según el operador que seas.',
    opciones: [
      {
        label: 'Proveedor',
        detalle: 'Desarrollas el sistema (o lo mandas desarrollar) y lo pones en el mercado bajo tu nombre o marca.',
        result: 'prov-alto',
      },
      {
        label: 'Responsable del despliegue · sector público',
        detalle: 'Usas el sistema bajo tu autoridad y eres administración, o prestas un servicio público.',
        result: 'admin-alto',
      },
      {
        label: 'Responsable del despliegue · privado',
        detalle: 'Usas el sistema bajo tu autoridad en un contexto profesional privado.',
        result: 'desp-alto',
      },
      {
        label: 'Importador, distribuidor o representante autorizado',
        detalle: 'Introduces o comercializas en la UE un sistema de un tercero.',
        result: 'intermediario',
      },
    ],
  },
};

const ART01 = '/docs/guides/01-guia-introductoria-al-reglamento-de-ia';
const FUENTES = '/docs/official-sources';

const fechaAltoRiesgo = (anexo: 'I' | 'III' | null): string =>
  anexo === 'I'
    ? 'Alto riesgo del Anexo I (producto regulado): obligaciones aplicables desde el 2 de agosto de 2027.'
    : 'Alto riesgo del Anexo III: obligaciones aplicables desde el 2 de agosto de 2026.';

const resultados: Record<string, (anexo: 'I' | 'III' | null) => Resultado> = {
  'fuera-ambito': () => ({
    etiqueta: 'Fuera del ámbito del Reglamento',
    tono: 'info',
    resumen:
      'Por lo que indicas, tu caso no parece entrar en el ámbito del Reglamento de IA, así que no necesitas el resto del recorrido de obligaciones.',
    fecha: 'Alfabetización en IA (Art. 4): exigible desde el 2 de febrero de 2025.',
    notas: [
      'Mantén, en todo caso, la alfabetización en IA de tu personal (Art. 4).',
      'Si cambian el uso o el contexto, vuelve a comprobar el ámbito.',
    ],
    acciones: [
      { label: 'Repasar el ámbito en la Guía 01', href: ART01, primario: true },
      { label: 'Consultar fuentes oficiales', href: FUENTES },
    ],
  }),
  gpai: () => ({
    etiqueta: 'Modelo de IA de uso general (GPAI)',
    tono: 'info',
    resumen:
      'Los GPAI tienen un régimen propio: transparencia, documentación técnica y derechos de autor; y, si tienen riesgo sistémico, evaluación y gestión de riesgos.',
    fecha:
      'Obligaciones GPAI: aplican desde el 2 de agosto de 2025 (los modelos ya en el mercado antes de esa fecha tienen hasta el 2 de agosto de 2027 para adaptarse).',
    notas: [
      'Según el uso final en que se integre, el sistema resultante puede acabar siendo de alto riesgo o incluso prohibido.',
      'Evalúa también ese sistema final: vuelve a empezar el asistente pensando en el caso de uso concreto.',
    ],
    acciones: [
      { label: 'Ver el marco general (Guía 01)', href: ART01, primario: true },
      { label: 'Consultar fuentes oficiales', href: FUENTES },
    ],
  }),
  prohibido: () => ({
    etiqueta: 'Práctica prohibida',
    tono: 'stop',
    resumen:
      'El camino no es «cumplir requisitos»: este uso no puede ponerse en el mercado bajo ninguna condición. La decisión es no desplegarlo.',
    fecha: 'Las prohibiciones se aplican desde el 2 de febrero de 2025.',
    notas: [
      'La Comisión Europea ha publicado directrices sobre prácticas prohibidas para aclarar casos límite.',
      'Confirma la clasificación con la Guía 01 y las fuentes oficiales antes de descartar el proyecto.',
    ],
    acciones: [
      { label: 'Confirmar en la Guía 01', href: ART01, primario: true },
      { label: 'Directrices y fuentes oficiales', href: FUENTES },
    ],
  }),
  transparencia: () => ({
    etiqueta: 'Obligaciones de transparencia (Art. 50)',
    tono: 'warn',
    resumen:
      'No es de alto riesgo, pero debes avisar de que detrás hay IA y etiquetar el contenido sintético. La Guía 08 desarrolla cómo hacerlo bien.',
    fecha: 'Las obligaciones de transparencia del Art. 50 se aplican desde el 2 de agosto de 2026.',
    acciones: [
      {
        label: 'Abrir el itinerario de transparencia',
        href: '/docs/itinerarios#solo-obligaciones-de-transparencia',
        primario: true,
      },
      { label: 'Guía 08 · Transparencia', href: '/docs/guides/08-guia-transparencia' },
    ],
  }),
  minimo: () => ({
    etiqueta: 'Riesgo mínimo',
    tono: 'ok',
    resumen:
      'Sin obligaciones específicas más allá de promover la alfabetización en IA de tu personal (Art. 4). Aun así, conviene aplicar buenas prácticas voluntarias.',
    fecha: 'Alfabetización en IA (Art. 4): exigible desde el 2 de febrero de 2025.',
    acciones: [
      {
        label: 'Abrir el itinerario de riesgo mínimo',
        href: '/docs/itinerarios#riesgo-mínimo',
        primario: true,
      },
      { label: 'Guía 01 · Marco general', href: ART01 },
    ],
  }),
  'prov-alto': (anexo) => ({
    etiqueta: 'Alto riesgo · Proveedor',
    tono: 'warn',
    resumen:
      'Tu caso central: te aplican prácticamente todas las guías técnicas (03–15). El itinerario te lleva de la clasificación al expediente de conformidad —SGC, riesgos, Anexo IV— y a los controles técnicos, fase a fase.',
    fecha: fechaAltoRiesgo(anexo),
    acciones: [
      {
        label: 'Abrir tu itinerario de proveedor',
        href: '/docs/itinerarios#proveedor-de-alto-riesgo',
        primario: true,
      },
      { label: 'Empezar por la Guía 03 · Conformidad', href: '/docs/guides/03-guia-evaluacion-de-conformidad' },
    ],
  }),
  'admin-alto': (anexo) => ({
    etiqueta: 'Alto riesgo · Administración o sector público',
    tono: 'warn',
    resumen:
      'Sigues el itinerario del responsable del despliegue y, además, debes realizar una Evaluación de Impacto en los Derechos Fundamentales (EIDF/FRIA, Art. 27) antes de poner el sistema en servicio.',
    fecha: fechaAltoRiesgo(anexo),
    notas: [
      'Si pones tu nombre o marca, haces una modificación sustancial o cambias la finalidad prevista, puedes pasar a asumir obligaciones de proveedor.',
    ],
    acciones: [
      {
        label: 'Abrir el itinerario de sector público',
        href: '/docs/itinerarios#administración-y-sector-público',
        primario: true,
      },
      { label: 'Guía 06 · Supervisión humana', href: '/docs/guides/06-guia-vigilancia-humana' },
    ],
  }),
  'desp-alto': (anexo) => ({
    etiqueta: 'Alto riesgo · Responsable del despliegue',
    tono: 'warn',
    resumen:
      'Menos obligaciones, pero críticas: instrucciones de uso, supervisión humana, control de los datos de entrada y vigilancia en producción (Art. 26).',
    fecha: fechaAltoRiesgo(anexo),
    notas: [
      'Comprueba si alguna acción tuya te convierte en proveedor: poner tu nombre o marca, una modificación sustancial o cambiar la finalidad prevista.',
    ],
    acciones: [
      {
        label: 'Abrir el itinerario de desplegador',
        href: '/docs/itinerarios#responsable-del-despliegue-de-alto-riesgo',
        primario: true,
      },
      { label: 'Guía 06 · Supervisión humana', href: '/docs/guides/06-guia-vigilancia-humana' },
    ],
  }),
  intermediario: (anexo) => ({
    etiqueta: 'Alto riesgo · Importador, distribuidor o representante',
    tono: 'info',
    resumen:
      'Como intermediario verificas que el proveedor cumplió (marcado, documentación, registro) y cooperas con las autoridades. No asumes las obligaciones de diseño del proveedor, pero sí las de diligencia y trazabilidad.',
    fecha: fechaAltoRiesgo(anexo),
    notas: [
      'Si pones tu nombre o marca, o modificas sustancialmente el sistema, pasas a ser proveedor y te aplica su itinerario completo.',
    ],
    acciones: [
      { label: 'Repasar los roles en la Guía 01', href: ART01, primario: true },
      { label: 'Ver el itinerario del proveedor (contexto)', href: '/docs/itinerarios#proveedor-de-alto-riesgo' },
    ],
  }),
};

const tonoEstilos: Record<Tono, { barra: string; pill: string }> = {
  ok: { barra: 'border-l-emerald-500', pill: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' },
  warn: { barra: 'border-l-amber-500', pill: 'bg-amber-500/10 text-amber-700 dark:text-amber-400' },
  stop: { barra: 'border-l-red-500', pill: 'bg-red-500/10 text-red-700 dark:text-red-400' },
  info: { barra: 'border-l-fd-primary', pill: 'bg-fd-primary/10 text-fd-primary' },
};

export function Clasificador() {
  const tituloId = useId();
  const [historial, setHistorial] = useState<string[]>([]);
  const [actualId, setActualId] = useState<string>(PRIMERA);
  const [resultadoId, setResultadoId] = useState<string | null>(null);
  const [anexo, setAnexo] = useState<'I' | 'III' | null>(null);

  const elegir = (op: Opcion) => {
    if (op.estado) setAnexo(op.estado.anexo);
    if (op.result) {
      setResultadoId(op.result);
    } else if (op.next) {
      setHistorial((h) => [...h, actualId]);
      setActualId(op.next);
      setResultadoId(null);
    }
  };

  const atras = () => {
    if (resultadoId) {
      setResultadoId(null);
      return;
    }
    if (historial.length === 0) return;
    const prev = historial[historial.length - 1];
    setHistorial(historial.slice(0, -1));
    setActualId(prev);
    if (prev === 'p1-ambito' || prev === 'p2-prohibida' || prev === 'p3-alto-riesgo') {
      setAnexo(null);
    }
  };

  const reiniciar = () => {
    setHistorial([]);
    setActualId(PRIMERA);
    setResultadoId(null);
    setAnexo(null);
  };

  const pregunta = preguntas[actualId];
  const resultado = resultadoId ? resultados[resultadoId](anexo) : null;
  const puedeRetroceder = resultadoId !== null || historial.length > 0;
  const numeroPregunta = historial.length + 1;

  return (
    <section
      aria-label="Asistente de clasificación"
      className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card text-fd-foreground shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b border-fd-border bg-fd-secondary/40 px-4 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wider">Asistente de clasificación</span>
        <span className="text-[11px] font-medium text-fd-muted-foreground">
          {resultado ? 'Resultado' : `Pregunta ${numeroPregunta}`}
        </span>
      </div>

      {resultado ? (
        <div role="status" aria-live="polite" className={`border-l-4 ${tonoEstilos[resultado.tono].barra} px-4 py-4`}>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${tonoEstilos[resultado.tono].pill}`}
          >
            Tu resultado
          </span>
          <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight">{resultado.etiqueta}</h3>
          <p className="mt-1 text-sm leading-relaxed text-fd-muted-foreground">{resultado.resumen}</p>

          <p className="mt-3 rounded-lg bg-fd-secondary/50 px-3 py-2 text-xs font-medium text-fd-foreground">
            {resultado.fecha}
          </p>

          {resultado.notas && resultado.notas.length > 0 && (
            <ul className="mt-3 flex flex-col gap-1.5 text-sm text-fd-muted-foreground">
              {resultado.notas.map((nota) => (
                <li key={nota} className="flex gap-2">
                  <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-fd-primary/60" />
                  <span className="leading-snug">{nota}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {resultado.acciones.map((accion) => (
              <Link
                key={accion.href}
                href={accion.href}
                className={
                  accion.primario
                    ? 'inline-flex items-center rounded-lg bg-fd-primary px-3.5 py-2 text-sm font-semibold text-fd-primary-foreground no-underline transition hover:opacity-90'
                    : 'inline-flex items-center rounded-lg border border-fd-border bg-fd-background px-3.5 py-2 text-sm font-medium no-underline transition hover:border-fd-primary/40 hover:bg-fd-accent'
                }
              >
                {accion.label}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div role="group" aria-labelledby={tituloId} className="px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-fd-muted-foreground">{pregunta.paso}</p>
          <h3 id={tituloId} className="mt-1 text-base font-semibold leading-snug tracking-tight">
            {pregunta.titulo}
          </h3>
          {pregunta.ayuda && <p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground">{pregunta.ayuda}</p>}

          <div className="mt-4 flex flex-col gap-2">
            {pregunta.opciones.map((op) => (
              <button
                key={op.label}
                type="button"
                onClick={() => elegir(op)}
                className="group flex w-full flex-col gap-0.5 rounded-lg border border-fd-border bg-fd-background px-3.5 py-3 text-left transition hover:border-fd-primary/50 hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary/60"
              >
                <span className="flex items-center justify-between gap-3 text-sm font-medium">
                  {op.label}
                  <span
                    aria-hidden
                    className="flex-none text-fd-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-fd-primary"
                  >
                    →
                  </span>
                </span>
                {op.detalle && (
                  <span className="text-xs leading-snug text-fd-muted-foreground">{op.detalle}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 border-t border-fd-border bg-fd-secondary/20 px-4 py-2.5">
        <button
          type="button"
          onClick={atras}
          disabled={!puedeRetroceder}
          className="text-xs font-medium text-fd-muted-foreground transition hover:text-fd-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Atrás
        </button>
        <button
          type="button"
          onClick={reiniciar}
          className="text-xs font-medium text-fd-muted-foreground transition hover:text-fd-foreground"
        >
          Empezar de nuevo
        </button>
      </div>
    </section>
  );
}
