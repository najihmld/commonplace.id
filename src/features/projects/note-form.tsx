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
import { ControlledInput } from '@/components/forms/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string(),
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
    },
  });

  return (
    <Form
      methods={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-2"
    >
      <div className="flex flex-col-reverse">
        <div className="-mx-6">
          <BlockNote />
        </div>
        <div className="mb-4 px-4">
          <ControlledInput
            autoFocus={false}
            control={form.control}
            name="title"
            placeholder="Title"
            className="h-auto rounded-none border-none !text-2xl font-bold shadow-none placeholder:text-[#cfcfcf] focus-visible:ring-0"
          />
        </div>
      </div>
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
