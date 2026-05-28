import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://jorgeteixe.github.io/AESIA-better-guides/'),
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
