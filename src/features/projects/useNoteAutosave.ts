import { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { upsertNoteWithTags } from '@/utils/supabase/api/note';
import { z } from 'zod';
import { formSchema } from './note-form';
import { stripHtml } from 'string-strip-html';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

export function useNoteAutosave({
  form,
  paraGroupId,
  enabled,
  delay = 1500,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  paraGroupId: string;
  enabled: boolean;
  delay?: number;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({ mutationFn: upsertNoteWithTags });

  // Debounce auto save
  const debounced = useDebouncedCallback(
    () => {
      form.handleSubmit((value) => {
        console.log('on submit', value);
        mutation.mutate(
          {
            note_id: value.note_id,
            title: value.title,
            content_html: value.content,
            content_plain: stripHtml(value.content).result,
            para_group_id: paraGroupId,
            tags: value.tags,
            type: value.type,
          },
          {
            onSuccess: (res) => {
              form.reset({
                ...value,
                note_id: res.id,
              });

              if (!enabled) {
                queryClient.invalidateQueries({ queryKey: ['notes'] });
              }
            },
          },
        );
      })();
    },
    // delay in ms
    delay,
  );

  const watchedData = useWatch({
    control: form.control,
  });

  useEffect(() => {
    if (
      enabled &&
      form.formState.isDirty &&
      !mutation.isPending &&
      watchedData.content &&
      watchedData.content.length > 3
    ) {
      debounced();
    }
  }, [
    enabled,
    watchedData,
    debounced,
    form.formState.isDirty,
    mutation.isPending,
  ]);

  useEffect(() => {
    if (mutation.submittedAt && !enabled) {
      // invalidate pada saat close modal/form/dialog
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
  }, [enabled, mutation.submittedAt, queryClient]);

  return {
    isSaving: mutation.isPending,
    isSavedRecently: mutation.isSuccess,
  };
}
