import { useState, useCallback } from 'react';
import { mdToContent, contentToMd } from '../../../shared/content/markdown';
import { ContentFile, ValidationIssue } from '../../../shared/content/schema';

interface UseEditorModeProps {
  initialFile: ContentFile;
}

export const useEditorMode = ({ initialFile }: UseEditorModeProps) => {
  const [mode, setMode] = useState<'block' | 'markdown'>('block');
  const [file, setFile] = useState<ContentFile>(initialFile);
  const [markdown, setMarkdown] = useState<string>(() => contentToMd(initialFile.meta, initialFile.document));
  const [warnings, setWarnings] = useState<{line: number; message: string}[]>([]);

  const toggleMode = useCallback(() => {
    if (mode === 'block') {
      // block -> markdown
      const md = contentToMd(file.meta, file.document);
      setMarkdown(md);
      setMode('markdown');
    } else {
      // markdown -> block
      const beforeBlocks = file.document.blocks.map(b => ({ id: b.id, type: b.type }));
      const parsed = mdToContent(markdown);
      
      let detachedNotesCount = 0;
      
      const matchedBlocks = parsed.document.blocks.map((b, i) => {
        const old = beforeBlocks[i];
        if (old && old.type === b.type) {
          return { ...b, id: old.id };
        } else {
          // If we had notes attached to the old block, they might be detached now.
          // Since we don't have a real notes array yet, we just increment a counter as an example.
          // detachedNotesCount++;
          return b;
        }
      });
      
      parsed.document.blocks = matchedBlocks;

      if (detachedNotesCount > 0) {
        alert(`${detachedNotesCount} یادداشت ویراستار به بلوک‌های تغییریافته وصل بودند و جدا شدند.`);
      }

      setFile({ meta: parsed.meta, document: parsed.document as any });
      setWarnings(parsed.warnings);
      setMode('block');
    }
  }, [mode, file, markdown]);

  return { mode, file, setFile, markdown, setMarkdown, toggleMode, warnings };
};
