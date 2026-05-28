import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 max-w-3xl mx-auto gap-6">
      <div>
        <h1 className="text-4xl font-bold mb-4">AESIA Better Guides</h1>
        <p className="text-lg text-fd-muted-foreground">
          A simple MVP that turns the AESIA supervision guides into a more readable docs portal.
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link href="/docs" className="font-medium underline">Open docs</Link>
        <Link href="/docs/summary" className="font-medium underline">Read the summary</Link>
        <Link href="/docs/official-sources" className="font-medium underline">Official sources</Link>
      </div>
    </div>
  );
}
