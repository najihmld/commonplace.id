'use client';

import { InputWithIcon } from '@/components/common/input';
import { SidebarTrigger } from '@/components/common/sidebar';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import SearchDialog from './search-dialog';

export function MainHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [openCommandDialog, setOpenCommandDialog] = useState(false);
  const [input, setInput] = useState('');
  const [debouncedInput] = useDebounce(input, 500); // debounce selama 500ms

  // Press keyboard CTRL+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandDialog((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Sync input awal dari URL
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setInput(q);
  }, [searchParams]);

  // Update URL saat input sudah debounce
  useEffect(() => {
    const currentQ = searchParams.get('q') || '';
    if (debouncedInput === currentQ) return;

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedInput) {
      params.set('q', debouncedInput);
    } else {
      params.delete('q');
    }

    router.replace(`?${params.toString()}`);
  }, [debouncedInput]);

  const checkIsMainPage = () => {
    return (
      (pathname.startsWith('/projects') ||
        pathname.startsWith('/areas') ||
        pathname.startsWith('/resources') ||
        pathname.startsWith('/archives')) &&
      pathname.split('/').length === 2
    );
  };

  // Fungsi untuk menentukan placeholder dinamis
  function getPlaceholder(pathname: string) {
    // List level: root, /projects, /notes, /areas
    if (
      pathname.startsWith('/projects') ||
      pathname.startsWith('/areas') ||
      pathname.startsWith('/resources') ||
      pathname.startsWith('/archives')
    ) {
      if (pathname.split('/').length === 2) {
        return 'Search notes, projects, areas, and more...';
      }

      return 'Search notes...';
    }

    // Default
    return 'Search...';
  }

  return (
    <header className="flex items-center space-x-2 border-b px-4 py-2">
      <SidebarTrigger />

      <InputWithIcon
        placeholder={getPlaceholder(pathname)}
        className="shadow-none"
        containerClassName="max-w-[320px]"
        Icon={Search}
        onChange={(e) => setInput(e.target.value)}
        onClick={() => {
          if (checkIsMainPage()) setOpenCommandDialog(true);
        }}
      />

      <SearchDialog
        open={openCommandDialog}
        onOpenChange={setOpenCommandDialog}
      />
    </header>
  );
}
