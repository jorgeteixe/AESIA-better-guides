import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { appName, absoluteUrl, siteDescription, siteUrl } from '@/lib/shared';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s · ${appName}`,
  },
  description: siteDescription,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: appName,
    title: appName,
    description: siteDescription,
    images: [
      {
        url: absoluteUrl('/og/site'),
        width: 1200,
        height: 630,
        alt: `${appName} · Portal documental del Reglamento Europeo de IA`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: appName,
    description: siteDescription,
    images: [absoluteUrl('/og/site')],
  },
};

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          i18n={{
            locale: 'es',
            translations: {
              search: 'Buscar',
              searchNoResult: 'Sin resultados',
              toc: 'En esta página',
              tocNoHeadings: 'Sin encabezados',
              lastUpdate: 'Última actualización',
              chooseLanguage: 'Elegir idioma',
              nextPage: 'Página siguiente',
              previousPage: 'Página anterior',
              chooseTheme: 'Cambiar tema',
              editOnGithub: 'Editar en GitHub',
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
