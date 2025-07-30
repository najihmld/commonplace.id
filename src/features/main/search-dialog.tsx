'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/common/command';
import { useSearchAll } from './use-search-all';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

interface Props {
  open: boolean;
  onOpenChange: (_val: boolean) => void;
}

function SearchDialog({ open, onOpenChange }: Props) {
  const [keyword, setKeyword] = useState('');
  const [debouncedInput] = useDebounce(keyword, 500); // debounce selama 500ms

  const search = useSearchAll(debouncedInput);

  console.log('===search', keyword, search.data);
  return (
    <CommandDialog
      open={open}
      onOpenChange={(b) => {
        if (!b) setKeyword('');
        onOpenChange(b);
      }}
      className="!max-w-xl"
    >
      <CommandInput
        onInput={(e) => {
          setKeyword((e.target as HTMLInputElement).value);
        }}
        placeholder="Search notes, projects, areas, and more..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {search.data?.map((item) => (
            <CommandItem key={item.id}>{item.title}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export default SearchDialog;
