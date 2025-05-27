'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/common/tabs';
import React from 'react';
import jsxToString from 'react-element-to-jsx-string';
import { atomOneLight, atomOneDark, CopyBlock } from 'react-code-blocks';
import { useTheme } from 'next-themes';

interface Props {
  children: React.ReactNode;
}

function ComponentPreview({ children }: Props) {
  const { theme } = useTheme();
  const Codes = React.Children.toArray(children) as React.ReactElement[];

  const jsxString = jsxToString(Codes[0], {
    showFunctions: true,
    functionValue: (fn) => fn.toString(),
    useBooleanShorthandSyntax: false,
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
            language="jsx"
            showLineNumbers
            wrapLongLines
            theme={theme === 'dark' ? atomOneDark : atomOneLight}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default ComponentPreview;
