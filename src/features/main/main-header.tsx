'use client';

import { InputWithIcon } from '@/components/common/input';
import { SidebarTrigger } from '@/components/common/sidebar';
import { Search } from 'lucide-react';

export function MainHeader() {
  return (
    <header className="flex items-center space-x-2 border-b px-4 py-2">
      <SidebarTrigger />

      <InputWithIcon
        placeholder="Search notes, projects, areas..."
        className="shadow-none"
        containerClassName="max-w-[300px]"
        Icon={Search}
      />
    </header>
  );
}
