import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'AESIA-better-guides';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
};

export default withMDX(config);
