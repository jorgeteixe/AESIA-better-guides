import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

const primaryLinks: NonNullable<BaseLayoutProps['links']> = [
  {
    text: 'Documentación',
    url: '/docs',
    active: 'nested-url',
  },
  {
    text: 'Resumen',
    url: '/docs/summary',
  },
  {
    text: 'Recursos',
    url: '/docs/resources/checklists-and-examples',
  },
  {
    text: 'Fuentes oficiales',
    url: '/docs/official-sources',
  },
];

export function baseOptions({ includeLinks = true }: { includeLinks?: boolean } = {}): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-fd-primary/10 text-fd-primary text-xs font-bold"
          >
            AI
          </span>
          {appName}
        </span>
      ),
    },
    links: includeLinks ? primaryLinks : [],
    searchToggle: {
      enabled: false,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
