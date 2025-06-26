'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import { ControlledBlockNote } from '@/components/forms/block-note';
import { Form } from '@/components/forms/form';
import { ControlledInputTags } from '@/components/forms/input-tags';
import { noteTypeMap, noteTypes } from '@/utils/supabase/api/note';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { ControlledCombobox } from '@/components/forms/combobox';
import { ControlledInput } from '@/components/forms/input';
import { useNoteAutosave } from './useNoteAutosave';

export const formSchema = z.object({
  note_id: z.string().optional(),
  title: z.string(),
  content: z.string().min(3, {
    message: 'Content must be at least 3 characters.',
  }),
  tags: z.array(z.string()),
  type: z.union([
    z.enum(Object.keys(noteTypeMap) as [string, ...string[]]),
    z.undefined(),
  ]),
});

const FormNote = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) => {
  const [disabledTitle, setDisabledTitle] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisabledTitle(false);
    }, 100);
  }, []);

  return (
    <Form methods={form} className="space-y-2">
      <div className="px-6">
        <ControlledInput
          disabled={disabledTitle}
          control={form.control}
          name="title"
          placeholder="Title"
          className="-mb-2 h-auto rounded-none border-none !text-2xl font-bold shadow-none focus-visible:ring-0"
        />
      </div>
      <div className="-mx-4">
        <ControlledBlockNote control={form.control} name="content" />
      </div>
      <div className="px-4">
        <ControlledCombobox
          placeholder="🗂️ Uncategorized"
          control={form.control}
          name="type"
          options={noteTypes}
          className="rounded-none border-0 shadow-none"
        />
        <ControlledInputTags
          control={form.control}
          name="tags"
          className="rounded-none border-0 shadow-none"
          placeholder="Add tags (e.g., psychology, productivity, focus)"
        />
      </div>
      <br />
    </Form>
  );
};

function useDialogFormNoteState() {
  const [open, setOpen] = useState(false);

  return {
    props: {
      open,
      setOpen,
    },
  };
}

type DialogFormNoteProps = {
  renderTrigger: (props: {
    DialogTrigger: React.ElementType;
    form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
    isSaving: boolean;
  }) => React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function DialogFormNote({ renderTrigger, open, setOpen }: DialogFormNoteProps) {
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSaving, isSavedRecently } = useNoteAutosave({
    form,
    paraGroupId: params.id as string,
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {renderTrigger({ DialogTrigger, form, isSaving })}
      <DialogContent className="py-4 sm:max-w-[620px]">
        <DialogHeader className="mx-6 flex flex-row items-center">
          <DialogTitle className="flex-1"></DialogTitle>
          {isSaving ? (
            <div className="text-xs text-orange-500">Saving...</div>
          ) : form.formState.isDirty ? (
            <div className="text-muted-foreground text-xs">Unsaved</div>
          ) : isSavedRecently ? (
            <div className="text-xs text-green-600">Saved</div>
          ) : null}
        </DialogHeader>
        <FormNote form={form} />
      </DialogContent>
    </Dialog>
  );
}

export { FormNote, DialogFormNote, useDialogFormNoteState };
