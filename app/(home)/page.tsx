import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 max-w-3xl mx-auto gap-6">
      <div>
        <h1 className="text-4xl font-bold mb-4">Guías AESIA</h1>
        <p className="text-lg text-fd-muted-foreground">
          Un MVP sencillo que convierte las guías de supervisión de la AESIA en un portal documental más claro y navegable.
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link href="/docs" className="font-medium underline">Abrir documentación</Link>
        <Link href="/docs/summary" className="font-medium underline">Leer resumen</Link>
        <Link href="/docs/official-sources" className="font-medium underline">Fuentes oficiales</Link>
      </div>
    </div>
  );
}
