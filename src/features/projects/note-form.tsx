'use client';

import { Button } from '@/components/common/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import { Form } from '@/components/forms/form';
import { ControlledInput } from '@/components/forms/input';
import { ControlledTextarea } from '@/components/forms/textarea';
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
      className="max-w-xl space-y-2"
    >
      <ControlledInput
        control={form.control}
        name="title"
        label="Title"
        placeholder="Enter title..."
      />
      <ControlledTextarea
        control={form.control}
        name="description"
        label="Description"
        placeholder="Optional description..."
      />
      <br />
      <Button type="submit" className="w-full" variant="project">
        Create New Project
      </Button>
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new project to your knowledge base.
          </DialogDescription>
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
