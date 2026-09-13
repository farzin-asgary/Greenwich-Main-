import React, { useState } from 'react';
import { GripVertical, Trash2, Link, Quote, Image as ImageIcon } from 'lucide-react';
import { BlockToolbar } from './BlockToolbar';
import { Block } from '../../../shared/content/schema';

// Mock blocks for initial display
const MOCK_BLOCKS: Block[] = [
  { id: 'blk_01', schemaVersion: 1, type: 'heading', level: 2, content: [{ type: 'text', text: 'پنجشنبه‌ها' }] },
  { id: 'blk_02', schemaVersion: 1, type: 'paragraph', content: [{ type: 'text', text: 'سه سال طول کشید تا بپرسم.' }] },
  { id: 'blk_03', schemaVersion: 1, type: 'paragraph', content: [{ type: 'text', text: 'این یک متن با پانویس است.', marks: [{ type: 'footnoteRef', footnoteId: 'fn_1' }] }] }
];

export const BlockEditor: React.FC = () => {
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<Block[]>(MOCK_BLOCKS);

  const handleDelete = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#050a09] p-8">
      <div className="max-w-[700px] mx-auto pb-32">
        <div className="space-y-4">
          {blocks.map((block) => (
            <div 
              key={block.id}
              onClick={() => setActiveBlock(block.id)}
              className={`group relative flex gap-3 p-4 rounded-2xl border transition-all duration-200 ${
                activeBlock === block.id 
                  ? 'border-[#d4af37]/50 bg-[#0b1312] shadow-lg shadow-[#d4af37]/5' 
                  : 'border-transparent hover:border-emerald-900/30 hover:bg-[#0b1312]/50'
              }`}
            >
              {/* Drag Handle */}
              <div className="flex flex-col items-center gap-2 pt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="cursor-grab p-1 text-emerald-600 hover:text-emerald-400">
                  <GripVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Block Content */}
              <div className="flex-1 min-w-0">
                {/* Block Type Label */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold bg-emerald-950/30 px-2 py-0.5 rounded-md">
                    {block.type}
                  </span>
                </div>

                {/* Content Editor area */}
                <div className="text-emerald-50 text-sm leading-relaxed outline-none min-h-[1.5rem]" contentEditable suppressContentEditableWarning>
                  {block.type === 'heading' && block.content.map(c => c.text).join('')}
                  {block.type === 'paragraph' && block.content.map((c, i) => (
                    <React.Fragment key={i}>
                      {c.marks?.some(m => m.type === 'footnoteRef') ? (
                        <span className="inline-flex mx-1 items-center justify-center w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-mono align-super select-none" contentEditable={false}>
                          1
                        </span>
                      ) : (
                        c.text
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Inline Toolbar (only shows when active) */}
                {activeBlock === block.id && (
                  <div className="absolute top-full right-12 mt-2 flex items-center gap-1 bg-[#121e1c] border border-emerald-900/50 rounded-lg p-1 shadow-xl z-10" contentEditable={false}>
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-emerald-900/40 text-emerald-300 font-serif font-bold italic">I</button>
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-emerald-900/40 text-emerald-300 font-serif font-bold">B</button>
                    <div className="w-px h-4 bg-emerald-900/50 mx-1"></div>
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-emerald-900/40 text-emerald-300"><Link className="w-3.5 h-3.5" /></button>
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#d4af37]/20 text-[#d4af37] text-xs font-bold">[1]</button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col pt-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(block.id); }}
                  className="p-1.5 text-red-500/50 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-8">
          <BlockToolbar />
        </div>
      </div>
    </div>
  );
};
