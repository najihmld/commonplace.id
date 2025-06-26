'use client';

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { useEffect } from 'react';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent: string;
  editable?: boolean;
}

function BlockNote({ onChange, initialContent, editable }: EditorProps) {
  console.log('initialContent', initialContent);
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
      editor={editor}
      className="min-h-[300px]"
      editable={editable}
      onChange={async (editor) => {
        const html = await editor.blocksToHTMLLossy(editor.document);
        onChange(html);
      }}
    />
  );
}

export { BlockNote };
