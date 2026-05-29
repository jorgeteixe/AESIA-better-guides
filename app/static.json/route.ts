import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

// Spanish stemming so queries like "obligaciones" match "obligación" in the
// indexed corpus. The client query tokenizer must use the same language
// (see components/search-dialog.tsx).
export const { staticGET: GET } = createFromSource(source, {
  language: 'spanish',
});
