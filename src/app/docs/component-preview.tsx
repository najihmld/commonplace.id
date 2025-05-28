/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/common/tabs';
import React from 'react';
import jsxToString from 'react-element-to-jsx-string';
import { atomOneDark, CopyBlock, dracula } from 'react-code-blocks';

interface Props {
  children?: React.ReactNode;
  text?: string;
  language?: 'jsx' | 'tsx';
  theme?: 'dracula' | 'atomOneDark';
}

function ComponentPreview({ children, text, language, theme }: Props) {
  const Codes = React.Children.toArray(children) as React.ReactElement[];

  const jsxString =
    text ||
    jsxToString(Codes[0], {
      showFunctions: true,
      functionValue: (fn) => fn.toString(),
      useBooleanShorthandSyntax: false,
      displayName: (element: React.ReactNode) => {
        if (!element || typeof element !== 'object' || !('type' in element)) {
          return 'UnknownComponent';
        }
        const el = element as React.ReactElement;
        if (typeof el.type === 'function') {
          return (
            (el.type as any).displayName ||
            (el.type as any).name ||
            'UnknownComponent'
          );
        }
        if (typeof el.type === 'object' && el.type !== null) {
          const displayName =
            (el.type as any).displayName ||
            (el.type as any).render?.displayName ||
            (el.type as any).render?.name ||
            'UnknownComponent';
          return displayName;
        }
        if (typeof el.type === 'string') {
          return el.type;
        }
        return 'UnknownComponent';
      },
      /** 🔥 Tambahkan ini: */
      filterProps: ['methods'],
      /** 💡 Ganti nilai prop `methods` menjadi placeholder */
      sortProps: false,
    });

  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <div className="mt-1 rounded-md border p-3">
        <TabsContent value="preview" className="p-2">
          {children}
        </TabsContent>
        <TabsContent value="code" className="p-2">
          <CopyBlock
            text={jsxString}
            language={language || 'jsx'}
            showLineNumbers
            wrapLongLines
            theme={
              { dracula: dracula, atomOneDark: atomOneDark }[
                theme || 'atomOneDark'
              ]
            }
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default ComponentPreview;
