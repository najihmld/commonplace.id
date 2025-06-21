'use client';

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent: string;
  editable?: boolean;
}

function BlockNote({ onChange, initialContent, editable }: EditorProps) {
  console.log('initialContent', initialContent);
  const editor = useCreateBlockNote();

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
