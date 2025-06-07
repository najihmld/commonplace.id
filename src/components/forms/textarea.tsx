import { Textarea } from '../common/textarea';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Control, FieldValues, Path } from 'react-hook-form';

type ControlledTextareaProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
} & React.ComponentProps<typeof Textarea>;

const ControlledTextarea = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  ...inputProps
}: ControlledTextareaProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea {...inputProps} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { ControlledTextarea };
