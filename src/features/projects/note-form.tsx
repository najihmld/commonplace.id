'use client';

import { Button } from '@/components/common/button';
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
import { createNoteWithTags } from '@/utils/supabase/api/note';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { stripHtml } from 'string-strip-html';

const formSchema = z.object({
  content: z.string().min(3, {
    message: 'Content must be at least 3 characters.',
  }),
  tags: z.array(z.string()), // array of strings
});

const FormNote = ({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      tags: [],
    },
  });

  return (
    <Form
      methods={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-2"
    >
      <div className="-mx-4">
        <ControlledBlockNote control={form.control} name="content" />
      </div>
      <div className="px-4">
        <ControlledInputTags control={form.control} name="tags" />
      </div>
      <br />
      <div className="px-4">
        <Button type="submit" className="w-full" variant="project">
          Add Note
        </Button>
      </div>
    </Form>
  );
};

function NewNote() {
  const [open, setOpen] = useState(false);
  const params = useParams();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNoteWithTags,
    onSuccess: () => {
      // Refresh list notes per project
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button asChild variant="project">
          <span>
            <Plus />
            New Note
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <FormNote
          onSubmit={(data) => {
            mutation.mutate({
              content_html: data.content,
              content_plain: stripHtml(data.content).result,
              tags: data.tags,
              para_group_id: params.id as string,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export { FormNote, NewNote };
