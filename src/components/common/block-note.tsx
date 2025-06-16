'use client';

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { useEffect, useRef } from 'react';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent: string;
  editable?: boolean;
}

function BlockNote({ onChange, initialContent, editable }: EditorProps) {
  console.log('initialContent', initialContent);
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: 'heading',
        props: {
          level: 1,
        },
      },
      {
        type: 'paragraph',
      },
    ],
  });

  const didFocus = useRef(false);
  useEffect(() => {
    if (didFocus.current) return;

    const blocks = editor.document; // array seluruh blok
    if (blocks.length > 1) {
      editor.setTextCursorPosition(blocks[1], 'start'); // fokus di awal paragraph
      didFocus.current = true;
    }
  }, [editor]);

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
