/**
 * Fuente única de metadatos de las 16 guías del corpus AESIA.
 *
 * Alimenta tanto la cabecera "De un vistazo" de cada guía (`GuiaResumen`) como
 * la matriz comparativa del índice `/docs/guides` (`GuiasIndice`). Editar aquí
 * un dato lo propaga a ambos sitios: no debe duplicarse en los MDX.
 */

export type Capa = 'Conocer' | 'Implementar' | 'Autodiagnosticar';

/**
 * Rol de operador al que concierne una guía, para filtrar la vista de conjunto.
 * `todos` marca las guías de marco/diagnóstico relevantes para cualquier perfil.
 */
export type RolGuia = 'todos' | 'proveedor' | 'desplegador';

export type GuiaMeta = {
  /** Número de guía con dos dígitos, p. ej. "05". */
  n: string;
  /** Slug del fichero (sin extensión) bajo content/docs/guides. */
  slug: string;
  /** Título descriptivo, sin el prefijo "NN · ". */
  titulo: string;
  /** Etiqueta corta para chips de guías relacionadas. */
  tituloCorto: string;
  /** Artículo o anexo del Reglamento que desarrolla la guía (texto largo). */
  articulo: string;
  /** Referencia corta para insignias y la matriz, p. ej. "Art. 9". */
  articuloCorto: string;
  /** Capa del corpus en la que se sitúa la guía. */
  capa: Capa;
  /** Operador que asume principalmente las obligaciones. */
  rol: string;
  /** En qué momento del proyecto conviene usarla. */
  cuando: string;
  /** Números de las guías directamente relacionadas. */
  relacionadas: string[];
  /**
   * Roles de operador a los que concierne la guía. Se derivan del campo `rol`
   * (texto): no añaden afirmaciones nuevas, solo lo estructuran para filtrar.
   */
  roles: RolGuia[];
};

export const guias: GuiaMeta[] = [
  {
    n: '01',
    slug: '01-guia-introductoria-al-reglamento-de-ia',
    titulo: 'Introducción al Reglamento de IA',
    tituloCorto: 'Introducción',
    articulo: 'Visión general (ámbito Art. 2 · roles Art. 3 · clasificación de riesgo Art. 6)',
    articuloCorto: 'Marco general',
    capa: 'Conocer',
    rol: 'Todos los operadores',
    cuando: 'Primera lectura para cualquier equipo que inicia un proyecto de cumplimiento.',
    relacionadas: ['02', '16'],
    roles: ['todos'],
  },
  {
    n: '02',
    slug: '02-guia-practica-y-ejemplos-para-entender-el-reglamento-de-ia',
    titulo: 'Guía práctica y ejemplos del Reglamento',
    tituloCorto: 'Casos y glosario',
    articulo: 'Definiciones (Art. 3) y casos de uso',
    articuloCorto: 'Art. 3 · casos',
    capa: 'Conocer',
    rol: 'Todos los operadores',
    cuando: 'En paralelo o justo después de la Guía 01; como consulta puntual de definiciones.',
    relacionadas: ['01', '16'],
    roles: ['todos'],
  },
  {
    n: '03',
    slug: '03-guia-evaluacion-de-conformidad',
    titulo: 'Evaluación de conformidad',
    tituloCorto: 'Conformidad',
    articulo: 'Evaluación de conformidad (Art. 43)',
    articuloCorto: 'Art. 43',
    capa: 'Implementar',
    rol: 'Proveedor',
    cuando: 'Antes de lanzar al mercado, tras una modificación sustancial o al heredar un sistema.',
    relacionadas: ['04', '15'],
    roles: ['proveedor'],
  },
  {
    n: '04',
    slug: '04-guia-del-sistema-de-gestion-de-la-calidad',
    titulo: 'Sistema de gestión de la calidad',
    tituloCorto: 'Calidad (SGC)',
    articulo: 'Sistema de gestión de la calidad (Art. 17)',
    articuloCorto: 'Art. 17',
    capa: 'Implementar',
    rol: 'Proveedor',
    cuando: 'En paralelo con la Guía 05: es el marco organizativo que contiene a los demás requisitos.',
    relacionadas: ['05', '15'],
    roles: ['proveedor'],
  },
  {
    n: '05',
    slug: '05-guia-de-gestion-de-riesgos',
    titulo: 'Sistema de gestión de riesgos',
    tituloCorto: 'Riesgos',
    articulo: 'Sistema de gestión de riesgos (Art. 9)',
    articuloCorto: 'Art. 9',
    capa: 'Implementar',
    rol: 'Proveedor',
    cuando: 'Desde el diseño y como revisión obligatoria antes del lanzamiento y tras incidentes.',
    relacionadas: ['04', '07'],
    roles: ['proveedor'],
  },
  {
    n: '06',
    slug: '06-guia-vigilancia-humana',
    titulo: 'Supervisión humana',
    tituloCorto: 'Supervisión humana',
    articulo: 'Supervisión humana (Art. 14)',
    articuloCorto: 'Art. 14',
    capa: 'Implementar',
    rol: 'Proveedor (diseño) · responsable del despliegue (uso)',
    cuando: 'Durante el diseño y al definir los procedimientos operativos del responsable del despliegue.',
    relacionadas: ['08', '12'],
    roles: ['proveedor', 'desplegador'],
  },
  {
    n: '07',
    slug: '07-guia-de-datos-y-gobernanza-de-datos',
    titulo: 'Datos y gobernanza del dato',
    tituloCorto: 'Datos',
    articulo: 'Datos y gobernanza del dato (Art. 10)',
    articuloCorto: 'Art. 10',
    capa: 'Implementar',
    rol: 'Proveedor · responsable del despliegue (si controla los datos de entrada)',
    cuando: 'Desde el inicio y de forma continua durante entrenamiento y reentrenamiento.',
    relacionadas: ['05', '09'],
    roles: ['proveedor', 'desplegador'],
  },
  {
    n: '08',
    slug: '08-guia-transparencia',
    titulo: 'Transparencia y provisión de información',
    tituloCorto: 'Transparencia',
    articulo: 'Transparencia e información (Art. 13)',
    articuloCorto: 'Art. 13',
    capa: 'Implementar',
    rol: 'Proveedor (elabora) · responsable del despliegue (aplica)',
    cuando: 'Desde el diseño y antes de la puesta en el mercado.',
    relacionadas: ['06', '15'],
    roles: ['proveedor', 'desplegador'],
  },
  {
    n: '09',
    slug: '09-guia-de-precision',
    titulo: 'Precisión',
    tituloCorto: 'Precisión',
    articulo: 'Precisión (Art. 15)',
    articuloCorto: 'Art. 15',
    capa: 'Implementar',
    rol: 'Proveedor',
    cuando: 'Durante entrenamiento, validación y documentación técnica.',
    relacionadas: ['10', '07'],
    roles: ['proveedor'],
  },
  {
    n: '10',
    slug: '10-guia-solidez',
    titulo: 'Solidez',
    tituloCorto: 'Solidez',
    articulo: 'Solidez / robustez (Art. 15)',
    articuloCorto: 'Art. 15',
    capa: 'Implementar',
    rol: 'Proveedor',
    cuando: 'En diseño, en pruebas y al definir el plan de vigilancia poscomercialización.',
    relacionadas: ['09', '13'],
    roles: ['proveedor'],
  },
  {
    n: '11',
    slug: '11-guia-ciberseguridad',
    titulo: 'Ciberseguridad',
    tituloCorto: 'Ciberseguridad',
    articulo: 'Ciberseguridad (Art. 15)',
    articuloCorto: 'Art. 15',
    capa: 'Implementar',
    rol: 'Proveedor · responsable del despliegue',
    cuando: 'En el diseño de arquitectura y en revisiones antes del despliegue o de cambios de infraestructura.',
    relacionadas: ['10', '12'],
    roles: ['proveedor', 'desplegador'],
  },
  {
    n: '12',
    slug: '12-guia-de-registros',
    titulo: 'Registros y logs automáticos',
    tituloCorto: 'Registros',
    articulo: 'Registros / logs automáticos (Art. 12)',
    articuloCorto: 'Art. 12',
    capa: 'Implementar',
    rol: 'Proveedor · responsable del despliegue',
    cuando: 'En el diseño de arquitectura y al redactar la documentación técnica.',
    relacionadas: ['13', '14'],
    roles: ['proveedor', 'desplegador'],
  },
  {
    n: '13',
    slug: '13-guia-vigilancia-poscomercializacion',
    titulo: 'Vigilancia poscomercialización',
    tituloCorto: 'Poscomercialización',
    articulo: 'Vigilancia poscomercialización (Art. 72)',
    articuloCorto: 'Art. 72',
    capa: 'Implementar',
    rol: 'Proveedor (plan) · responsable del despliegue (seguimiento)',
    cuando: 'Antes del despliegue y durante toda la operación continua.',
    relacionadas: ['14', '05'],
    roles: ['proveedor', 'desplegador'],
  },
  {
    n: '14',
    slug: '14-guia-gestion-de-incidentes',
    titulo: 'Notificación de incidentes graves',
    tituloCorto: 'Incidentes',
    articulo: 'Notificación de incidentes graves (Art. 73)',
    articuloCorto: 'Art. 73',
    capa: 'Implementar',
    rol: 'Proveedor (notifica) · responsable del despliegue (procedimiento subsidiario)',
    cuando: 'Al diseñar procesos operativos y como consulta inmediata ante eventos potencialmente graves.',
    relacionadas: ['13', '04'],
    roles: ['proveedor', 'desplegador'],
  },
  {
    n: '15',
    slug: '15-guia-documentacion-tecnica',
    titulo: 'Documentación técnica',
    tituloCorto: 'Doc. técnica',
    articulo: 'Documentación técnica (Art. 11 y Anexo IV)',
    articuloCorto: 'Art. 11 + Anexo IV',
    capa: 'Implementar',
    rol: 'Proveedor',
    cuando: 'Como checklist permanente durante el desarrollo y como plantilla del expediente de conformidad.',
    relacionadas: ['03', '04'],
    roles: ['proveedor'],
  },
  {
    n: '16',
    slug: '16-manual-de-checklist-de-guias-de-requisitos',
    titulo: 'Manual de las listas de control',
    tituloCorto: 'Checklists',
    articulo: 'Manual de las checklists de autoevaluación',
    articuloCorto: 'Autoevaluación',
    capa: 'Autodiagnosticar',
    rol: 'Todos los operadores',
    cuando: 'En el diagnóstico inicial, en revisiones periódicas y en auditorías internas.',
    relacionadas: ['01', '03'],
    roles: ['todos'],
  },
];

export const guiasPorNumero: Record<string, GuiaMeta> = Object.fromEntries(
  guias.map((g) => [g.n, g]),
);

/** Ruta raíz-relativa de una guía a partir de su slug. */
export function hrefGuia(slug: string): string {
  return `/docs/guides/${slug}`;
}

/** Orden y descripción de las tres capas del corpus para vistas agrupadas. */
export const capas: { capa: Capa; descripcion: string }[] = [
  {
    capa: 'Conocer',
    descripcion: 'Marco general, niveles de riesgo, actores y vocabulario del Reglamento.',
  },
  {
    capa: 'Implementar',
    descripcion: 'Una guía por requisito de los sistemas de alto riesgo, del diseño a la operación.',
  },
  {
    capa: 'Autodiagnosticar',
    descripcion: 'Cómo usar las listas de control para autoevaluación y auditoría interna.',
  },
];

export type FiltroRol = {
  /** Valor del filtro; `todos` muestra el corpus completo. */
  valor: RolGuia;
  /** Etiqueta del botón de filtro. */
  etiqueta: string;
  /** Nota contextual que explica qué incluye la vista filtrada. */
  nota: string;
};

/** Filtros de la vista de conjunto, por rol de operador en la cadena de valor. */
export const filtrosRol: FiltroRol[] = [
  {
    valor: 'todos',
    etiqueta: 'Todos los perfiles',
    nota: 'Las 16 guías del corpus, agrupadas por capa.',
  },
  {
    valor: 'proveedor',
    etiqueta: 'Proveedor',
    nota: 'El proveedor asume la mayoría de obligaciones de los sistemas de alto riesgo: todas las guías del corpus le resultan relevantes.',
  },
  {
    valor: 'desplegador',
    etiqueta: 'Responsable del despliegue',
    nota: 'El responsable del despliegue se centra en el uso conforme: instrucciones de uso, supervisión humana, control de los datos de entrada y vigilancia en producción.',
  },
];

/**
 * ¿La guía concierne al rol seleccionado? Las guías de marco/diagnóstico
 * (marcadas `todos`) se muestran con cualquier filtro.
 */
export function guiaCoincideRol(g: GuiaMeta, rol: RolGuia): boolean {
  return rol === 'todos' || g.roles.includes('todos') || g.roles.includes(rol);
}
