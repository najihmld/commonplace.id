import { defineRouting } from 'next-intl/routing';

export const LOCALE_OPTIONS = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Bahasa Indonesia',
    value: 'id',
  },
];

export const locales = LOCALE_OPTIONS.map(({ value }) => value);

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'id'],

  // Used when no locale matches
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'as-needed',
});
