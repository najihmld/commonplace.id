import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'id'];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'id'],

  // Used when no locale matches
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'as-needed',
});
