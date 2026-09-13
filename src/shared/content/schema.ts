export const BLOCK_SCHEMA_VERSION = 1;
export const DOCUMENT_SCHEMA_VERSION = 1;
export const CONTENT_TYPES = ['story', 'article', 'audio', 'book', 'serial'];
export const ACCESS_LEVELS = ['public', 'session', 'member'];
export const STATES = ['draft', 'review', 'approved', 'scheduled', 'published', 'archived'];
export const CONTRIBUTOR_ROLES = ['author', 'translator', 'editor', 'narrator', 'compiler'];
export const SECTION_TYPES = ['introduction', 'chapter', 'section', 'conclusion', 'appendix'];

export type Mark =
  | { type: 'bold' }
  | { type: 'italic' }
  | { type: 'link'; url: string }
  | { type: 'footnoteRef'; footnoteId: string };

export interface InlineTextNode {
  type: 'text';
  text: string;
  marks?: Mark[];
}

export interface Footnote {
  id: string;
  order: number;
  content: string;
}

export interface BaseBlock { id: string; schemaVersion: number; }
export interface ParagraphBlock extends BaseBlock { type: 'paragraph'; content: InlineTextNode[] }
export interface HeadingBlock extends BaseBlock { type: 'heading'; level: 2|3; content: InlineTextNode[] }
export interface QuoteBlock extends BaseBlock { type: 'quote'; content: InlineTextNode[]; attribution?: string }
export interface ImageBlock extends BaseBlock { type: 'image'; assetId: string; alt: string; caption?: string }
export interface DividerBlock extends BaseBlock { type: 'divider' }
export interface CalloutBlock extends BaseBlock { type: 'callout'; variant: 'note'|'important'|'context'; content: InlineTextNode[] }

export type Block = ParagraphBlock | HeadingBlock | QuoteBlock | ImageBlock | DividerBlock | CalloutBlock;

export interface ContentDocument {
  type: 'document';
  schemaVersion: number;
  blocks: Block[];
  footnotes: Footnote[];
}

export interface ContentMeta {
  title: string;
  slug: string;
  summary?: string;
  [key: string]: unknown;
}

export interface ContentFile {
  meta: ContentMeta;
  document: ContentDocument;
}

export type Severity = 'error' | 'warning' | 'hint';

export interface ValidationIssue {
  severity: Severity;
  path: string;
  message: string;
  line?: number;
  blockId?: string;
  fix?: 'generate-slug' | 'trim-summary';
}

export interface ValidationResult {
  ok: boolean;
  issues: ValidationIssue[];
}

export function validateContent(
  input: unknown,
  opts?: { availableAssets?: string[]; existingSlugs?: Record<string,string> }
): ValidationResult {
  return { ok: true, issues: [] };
}

export function slugify(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-');
}
