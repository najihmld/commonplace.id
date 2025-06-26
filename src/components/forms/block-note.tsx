import { BlockNote } from '../common/block-note';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Control, FieldValues, Path } from 'react-hook-form';

type ControlledBlockNoteProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  disabled?: boolean;
};

const ControlledBlockNote = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
}: ControlledBlockNoteProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <BlockNote
              onChange={field.onChange}
              initialContent={formState.defaultValues?.[name] ?? ''}
              editable={disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { ControlledBlockNote };
