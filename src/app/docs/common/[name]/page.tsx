'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const CommonUI = {
  button: React.lazy(() => import('./button.mdx')),
  input: React.lazy(() => import('./input.mdx')),
  select: React.lazy(() => import('./select.mdx')),
};

function DocsCommonPage() {
  const params = useParams<{ name: string }>();

  const name = params.name as keyof typeof CommonUI;
  const Component = CommonUI[name];

  return <Component />;
}

export default DocsCommonPage;
