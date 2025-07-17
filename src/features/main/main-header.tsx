'use client';

import { InputWithIcon } from '@/components/common/input';
import { SidebarTrigger } from '@/components/common/sidebar';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export function MainHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [input, setInput] = useState('');
  const [debouncedInput] = useDebounce(input, 500); // debounce selama 500ms

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

  // Fungsi untuk menentukan placeholder dinamis
  function getPlaceholder(pathname: string) {
    // List level: root, /projects, /notes, /areas
    if (
      pathname === '/' ||
      (pathname.startsWith('/projects') && pathname.split('/').length === 2) ||
      (pathname.startsWith('/notes') && pathname.split('/').length === 2) ||
      (pathname.startsWith('/areas') && pathname.split('/').length === 2)
    ) {
      return 'Search notes, projects, areas, and more...';
    }
    // Project detail: /projects/[id]
    if (pathname.startsWith('/projects/') && pathname.split('/').length === 3) {
      return 'Search notes...';
    }
    // Note list in project/group: /projects/[id]/notes atau /groups/[id]/notes
    if (
      (pathname.startsWith('/projects/') || pathname.startsWith('/groups/')) &&
      pathname.endsWith('/notes')
    ) {
      return 'Search notes in this project/group...';
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
      />
    </header>
  );
}
