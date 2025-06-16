import { Input } from '../common/input';
import { InputTags } from '../common/input-tags';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Control, FieldValues, Path } from 'react-hook-form';

type ControlledInputTagsProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
} & React.ComponentProps<typeof Input>;

const ControlledInputTags = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  ...inputProps
}: ControlledInputTagsProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <InputTags {...inputProps} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { ControlledInputTags };
