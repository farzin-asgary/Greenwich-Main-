import { ContentDocument, Block, InlineTextNode, Footnote } from './schema';

export function mdToContent(source: string): {
  meta: Record<string, unknown>;
  document: ContentDocument;
  warnings: { line: number; message: string }[];
} {
  return {
    meta: { title: 'Stub', slug: 'stub' },
    document: { type: 'document', schemaVersion: 1, blocks: [], footnotes: [] },
    warnings: []
  };
}

export function contentToMd(meta: Record<string, unknown>, document: ContentDocument): string {
  return "stub markdown";
}
