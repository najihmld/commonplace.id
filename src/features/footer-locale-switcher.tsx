'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';
import { LOCALE_OPTIONS } from '@/i18n/routing';

export default function FooterLocaleSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  return (
    <ul className="mt-4 flex space-x-4 sm:mt-0">
      {LOCALE_OPTIONS.map((item) => {
        return (
          <li key={item.label}>
            <button
              className={cn(
                'cursor-pointer text-gray-400 transition-colors hover:text-white',
                isPending && 'opacity-50',
              )}
              onClick={() => onSelectChange(item.value)}
            >
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
