import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Combobox } from '../common/combobox';

type ControlledComboboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
} & Omit<React.ComponentProps<typeof Combobox>, 'onChange' | 'value'>;

const ControlledCombobox = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  ...comboboxProps
}: ControlledComboboxProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Combobox
              {...comboboxProps}
              ref={field.ref}
              onChange={field.onChange}
              value={field.value}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { ControlledCombobox };
