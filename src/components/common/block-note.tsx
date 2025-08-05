'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent: string;
  editable?: boolean;
}

function BlockNote({ onChange, initialContent, editable }: EditorProps) {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const editor = useCreateBlockNote();

  useEffect(() => {
    const loadContent = async () => {
      if (initialContent) {
        const blocks = await editor.tryParseHTMLToBlocks(initialContent);
        editor.replaceBlocks(editor.document, blocks);
      }
    };

    loadContent();
  }, [initialContent]);

  return (
    <BlockNoteView
      sideMenu={isMobile ? false : true}
      editor={editor}
      className="min-h-[300px]"
      editable={editable}
      onChange={async (editor) => {
        const html = await editor.blocksToHTMLLossy(editor.document);
        onChange(html);
      }}
      theme={theme as Theme}
      onClick={() => {
        if (!editor.isFocused()) {
          editor.focus();
        }
      }}
    />
  );
}

export { BlockNote };
