import { Input } from '../common/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Control, FieldValues, Path } from 'react-hook-form';

type ControlledInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
} & React.ComponentProps<typeof Input>;

const ControlledInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  ...inputProps
}: ControlledInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...inputProps} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { ControlledInput };
