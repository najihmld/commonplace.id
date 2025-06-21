'use client';

import * as React from 'react';
import { Check, ChevronsUpDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/common/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/common/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/common/popover';

export type Options = { label: string; value: string }[];

type ComboboxProps = {
  placeholder?: string;
  options?: Options;
  onChange: (value: string) => void;
  value: string;
  className?: string;
};

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    { placeholder = 'Select', options = [], onChange, value, className },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover modal open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn('w-full justify-between', className)}
          >
            {value ? (
              options.find((framework) => framework.value === value)?.label
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === option.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
Combobox.displayName = 'Combobox';

export { Combobox };
