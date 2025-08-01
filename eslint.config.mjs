import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Extends Next.js recommended configs
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Rules or overrides untuk root atau semua package
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // rules umum bisa ditambahkan di sini
    rules: {
      // contoh rules kustom
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off', // Next.js gak perlu React di import
    },
  },

  // Override khusus untuk package ui (misal di packages/ui)
  {
    files: ['packages/ui/**/*.{ts,tsx}'],
    rules: {
      // aturan spesifik untuk UI package
    },
  },

  // Override khusus untuk zone apps (misal di apps/zone-a dan apps/zone-b)
  {
    files: [
      'apps/zone-a/**/*.{ts,tsx,js,jsx}',
      'apps/zone-b/**/*.{ts,tsx,js,jsx}',
    ],
    rules: {
      // aturan khusus zone jika perlu
    },
  },
];
