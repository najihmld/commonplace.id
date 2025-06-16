'use client';

import * as React from 'react';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { Badge } from './badge';

type InputTagsProps = Omit<
  React.ComponentProps<'input'>,
  'value' | 'onChange'
> & {
  value: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
};

const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = React.useState('');

    React.useEffect(() => {
      if (pendingDataPoint.includes(',')) {
        const newDataPoints = new Set([
          ...value,
          ...pendingDataPoint.split(',').map((chunk) => chunk.trim()),
        ]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint('');
      }
    }, [pendingDataPoint, onChange, value]);

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint('');
      }
    };

    return (
      <div
        className={cn(
          'border-input dark:bg-input/30 flex min-h-10 w-full flex-wrap gap-2 rounded-md border bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      >
        {value.map((item) => (
          <Badge key={item} variant="secondary">
            <span className="block max-w-xs truncate break-words">{item}</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 size-4 p-0"
              onClick={() => {
                onChange(value.filter((i) => i !== item));
              }}
            >
              <XIcon />
            </Button>
          </Badge>
        ))}
        <input
          className="placeholder:text-muted-foreground flex-1 outline-none"
          value={pendingDataPoint}
          onChange={(e) => setPendingDataPoint(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addPendingDataPoint();
            } else if (
              e.key === 'Backspace' &&
              pendingDataPoint.length === 0 &&
              value.length > 0
            ) {
              e.preventDefault();
              onChange(value.slice(0, -1));
            }
          }}
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);

InputTags.displayName = 'InputTags';

export { InputTags };
