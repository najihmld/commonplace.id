'use client';

import { BlockNote } from '@/components/common/block-note';
import { Button } from '@/components/common/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import { Form } from '@/components/forms/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 3 characters.',
  }),
  description: z.string(),
});

const FormNote = ({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  return (
    <Form
      methods={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-2"
    >
      <BlockNote />
      <br />
      <div className="px-6">
        <Button type="submit" className="w-full" variant="project">
          Create New Project
        </Button>
      </div>
    </Form>
  );
};

function NewNote() {
  return (
    <Dialog>
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
            console.log(data);
            // TODO: Handle form submission
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export { FormNote, NewNote };
