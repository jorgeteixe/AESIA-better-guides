import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'AESIA-better-guides';
const basePath = isGithubPages ? `/${repoName}` : '';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  basePath,
  assetPrefix: isGithubPages ? `${basePath}/` : undefined,
};

export default withMDX(config);
