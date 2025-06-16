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
import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 3 characters.',
  }),
  description: z.string(),
});

const FormProject = ({
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

function NewProject() {
  const [open, setOpen] = useState(false);

  const supabase = createClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const { error } = await supabase.from('para_groups').insert({
        title: data.title,
        description: data.description,
        para_type: 'project',
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button asChild variant="project">
          <span>
            <Plus />
            New Project
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

        <FormProject onSubmit={(data) => mutation.mutate(data)} />
      </DialogContent>
    </Dialog>
  );
}

export { FormProject, NewProject };
