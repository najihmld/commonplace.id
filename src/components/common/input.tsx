import * as React from 'react';

import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring rounded-form flex h-9 w-full border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

type InputWithIconProps = React.InputHTMLAttributes<HTMLInputElement> & {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  containerClassName?: string;
  iconPosition?: 'left' | 'right';
};

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  (
    { Icon, className, containerClassName, iconPosition = 'right', ...props },
    ref,
  ) => {
    return (
      <div className={cn('relative w-full', containerClassName)}>
        {Icon && (
          <div
            className={cn(
              'text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center',
              iconPosition === 'right' ? 'right-0 pr-3' : 'left-0 pl-3',
            )}
          >
            <Icon size={14} />
          </div>
        )}
        <Input
          className={cn(className, iconPosition === 'right' ? 'pr-8' : 'pl-8')}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
InputWithIcon.displayName = 'InputWithIcon';

export { Input, InputWithIcon };
