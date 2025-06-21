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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { stripHtml } from 'string-strip-html';
import { ControlledCombobox } from '@/components/forms/combobox';
import { ControlledInput } from '@/components/forms/input';

export type NoteTypeItem = {
  value: string;
  label: string;
  className: string;
};

export const noteTypes = [
  {
    value: 'idea',
    label: '💡 Idea',
    className: 'bg-yellow-100 text-yellow-800',
  },
  { value: 'quote', label: '💬 Quote', className: 'bg-blue-100 text-blue-800' },
  {
    value: 'insight',
    label: '⚡ Insight',
    className: 'bg-purple-100 text-purple-800',
  },
  {
    value: 'book-note',
    label: '📚 Book Note',
    className: 'bg-indigo-100 text-indigo-800',
  },
  {
    value: 'meeting',
    label: '📝 Meeting',
    className: 'bg-green-100 text-green-800',
  },
  {
    value: 'personal',
    label: '🧠 Personal',
    className: 'bg-pink-100 text-pink-800',
  },
  {
    value: 'reference',
    label: '🔖 Reference',
    className: 'bg-gray-100 text-gray-800',
  },
  {
    value: 'journal',
    label: '📔 Journal',
    className: 'bg-orange-100 text-orange-800',
  },
  {
    value: 'task',
    label: '✅ Task',
    className: 'bg-emerald-100 text-emerald-800',
  },
  {
    value: 'dream',
    label: '🌙 Dream',
    className: 'bg-indigo-100 text-indigo-800',
  },
  {
    value: 'learning',
    label: '🎓 Learning',
    className: 'bg-sky-100 text-sky-800',
  },
  {
    value: 'question',
    label: '❓ Question',
    className: 'bg-rose-100 text-rose-800',
  },
  {
    value: 'decision',
    label: '⚖️ Decision',
    className: 'bg-fuchsia-100 text-fuchsia-800',
  },
  {
    value: 'research',
    label: '🔬 Research',
    className: 'bg-teal-100 text-teal-800',
  },
  { value: 'goal', label: '🎯 Goal', className: 'bg-red-100 text-red-800' },
  { value: 'plan', label: '🗺️ Plan', className: 'bg-cyan-100 text-cyan-800' },
  {
    value: 'code-snippet',
    label: '💻 Code Snippet',
    className: 'bg-zinc-100 text-zinc-800',
  },
  {
    value: 'gratitude',
    label: '🙏 Gratitude',
    className: 'bg-amber-100 text-amber-800',
  },
  {
    value: 'travel',
    label: '✈️ Travel',
    className: 'bg-lime-100 text-lime-800',
  },
  { value: 'health', label: '❤️ Health', className: 'bg-red-100 text-red-800' },
  {
    value: 'finance',
    label: '💰 Finance',
    className: 'bg-green-100 text-green-800',
  },
];

export const formSchema = z.object({
  title: z.string(),
  content: z.string().min(3, {
    message: 'Content must be at least 3 characters.',
  }),
  tags: z.array(z.string()),
  type: z.enum(['idea', 'quote', 'insight', 'book note'] as const),
});

const FormNote = ({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}) => {
  const [disabledTitle, setDisabledTitle] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      tags: [],
      title: '',
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setDisabledTitle(false);
    }, 100);
  }, []);

  return (
    <Form
      methods={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-2"
    >
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
      {/* <div className="px-4">
        <Button type="submit" className="w-full" variant="project">
          Add Note
        </Button>
      </div> */}
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const content_plain = stripHtml(data.content).result;
    mutation.mutate({
      content_html: data.content,
      content_plain,
      para_group_id: params.id as string,
      tags: data.tags,
      type: data.type,
    });
    setOpen(false);
  };

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
      <DialogContent className="py-4 sm:max-w-[620px]">
        <DialogHeader className="mx-6 flex flex-row items-center">
          <DialogTitle className="flex-1"></DialogTitle>
          <div className="text-muted-foreground text-xs">Unsaved</div>
        </DialogHeader>
        <FormNote onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

export { FormNote, NewNote };
