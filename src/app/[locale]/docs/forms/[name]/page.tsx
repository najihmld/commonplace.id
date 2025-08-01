import { readFileSync } from 'fs';
import path from 'path';
import ComponentPreview from '@/features/docs/component-preview';
import React from 'react';

const registed = {
  input: {
    title: 'Form Input',
  },
};

export default async function FormsPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  if (!registed[name as keyof typeof registed]) return null;

  const filePath = path.resolve(
    process.cwd(),
    `src/app/docs/forms/[name]/${name}.tsx`,
  );
  const sourceCode = readFileSync(filePath, 'utf8');

  const LazyComponent = React.lazy(() => import(`./${name}`));

  const metadata = registed[name as keyof typeof registed];

  return (
    <div>
      <h1 className="mb-2 text-2xl font-medium">{metadata.title}</h1>

      <ComponentPreview text={sourceCode} theme="dracula" language="tsx">
        <LazyComponent />
      </ComponentPreview>
    </div>
  );
}
