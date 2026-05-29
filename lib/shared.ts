export const appName = 'Guías AESIA';
export const siteDescription =
  'Portal documental en español para navegar las 16 guías de supervisión de la AESIA sobre el Reglamento Europeo de Inteligencia Artificial.';

export const gitConfig = {
  user: 'jorgeteixe',
  repo: 'AESIA-better-guides',
  branch: 'main',
};

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
export const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubPages ? `/${gitConfig.repo}` : '');
export const siteOrigin = `https://${gitConfig.user}.github.io`;
export const siteUrl = `${siteOrigin}${publicBasePath}/`;

export function withBasePath(path: string) {
  if (!path.startsWith('/')) return publicBasePath ? `${publicBasePath}/${path}` : `/${path}`;
  return publicBasePath ? `${publicBasePath}${path}` : path;
}

export function absoluteUrl(path: string) {
  return new URL(withBasePath(path), siteOrigin).toString();
}

export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';
