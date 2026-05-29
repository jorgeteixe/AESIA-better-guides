import { appName, siteDescription } from '@/lib/shared';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = `${appName} · Portal documental del Reglamento Europeo de IA`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export function GET() {
  return new ImageResponse(
    <DefaultImage
      title={appName}
      description={siteDescription}
      site="Reglamento (UE) 2024/1689"
    />,
    size,
  );
}
