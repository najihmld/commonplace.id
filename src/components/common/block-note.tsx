'use client';

import {
  BlockNoteEditor,
  filterSuggestionItems,
  // insertOrUpdateBlock,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from '@blocknote/react';
// import { Globe } from 'lucide-react';
import { en } from '@blocknote/core/locales';
import { useEffect, useRef } from 'react';

// Custom Slash Menu item to insert a block after the current one.
// const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
//   title: 'Insert Hello World',
//   onItemClick: () =>
//     // If the block containing the text caret is empty, `insertOrUpdateBlock`
//     // changes its type to the provided block. Otherwise, it inserts the new
//     // block below and moves the text caret to it. We use this function with
//     // a block containing 'Hello World' in bold.
//     insertOrUpdateBlock(editor, {
//       type: 'paragraph',
//       content: [{ type: 'text', text: 'Hello World', styles: { bold: true } }],
//     }),
//   aliases: ['helloworld', 'hw'],
//   group: 'Other',
//   icon: <Globe size={18} />,
//   subtext: "Used to insert a block with 'Hello World' below.",
// });

// List containing all default Slash Menu Items, as well as our custom one.
const getCustomSlashMenuItems = (
  editor: BlockNoteEditor,
): DefaultReactSuggestionItem[] => {
  return [
    // {
    //   aliases: ['h3', 'heading3', 'subheading'],
    //   badge: '⌘-Alt-3',
    //   group: 'Heading',
    //   icon: <Heading size={18} />,
    //   subtext: 'Note Title',
    //   title: 'Title',
    //   onItemClick: () =>
    //     insertOrUpdateBlock(editor, {
    //       type: 'heading',
    //     }),
    // },
    // ...getDefaultReactSlashMenuItems(editor).filter(
    //   (item) => !['Heading 1', 'Heading 2', 'Heading 3'].includes(item.title),
    // ),
    ...getDefaultReactSlashMenuItems(editor),
  ];
};

function BlockNote() {
  // We use the English, default dictionary
  const locale = en;

  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
      // {
      //   type: 'heading',
      //   props: {
      //     level: 1,
      //   },
      // },
      {
        type: 'paragraph',
      },
    ],
    // We override the `placeholders` in our dictionary
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        // We override the empty document placeholder
        // emptyDocument: 'Start typing..',
        // // // We override the default placeholder
        // default: 'Custom default placeholder',
        // We override the heading placeholder
        heading: 'Title',
        // paragraph: 'Take a note...',
      },
    },
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
    <BlockNoteView editor={editor} slashMenu={false} className="min-h-[300px]">
      <SuggestionMenuController
        triggerCharacter={'/'}
        // Replaces the default Slash Menu items with our custom ones.
        getItems={async (query) => {
          return filterSuggestionItems(getCustomSlashMenuItems(editor), query);
        }}
      />
    </BlockNoteView>
  );
}

export { BlockNote };
