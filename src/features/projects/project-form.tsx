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
import { upsertProject } from '@/utils/supabase/api/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { getParaTypeFromParamValue } from './utils';

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, {
    message: 'Title must be at least 3 characters.',
  }),
  description: z.string(),
});

function useDialogFormProjectState() {
  const [open, setOpen] = useState(false);

  return {
    props: {
      open,
      setOpen,
    },
  };
}

const FormProject = ({
  form,
  onSubmit,
  isSaving,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isSaving?: boolean;
}) => {
  return (
    <Form
      methods={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl space-y-4"
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
      <Button
        disabled={isSaving}
        type="submit"
        className="w-full"
        variant="project"
      >
        Submit
      </Button>
    </Form>
  );
};

type DialogFormProjectProps = {
  isEdit?: boolean;
  renderTrigger: (props: {
    DialogTrigger: React.ElementType;
    form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
  }) => React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function DialogFormProject({
  isEdit,
  renderTrigger,
  open,
  setOpen,
}: DialogFormProjectProps) {
  const params = useParams<{
    paras: 'projects' | 'areas' | 'resources';
  }>();

  const paraContent = {
    projects: {
      add: {
        title: 'Create New Project',
        desc: 'Add a project with a clear goal and deadline to track your progress.',
      },
      edit: {
        title: 'Edit Project',
        desc: 'Update the title or description of this project.',
      },
    },
    areas: {
      add: {
        title: 'Create New Area',
        desc: 'Define an area of responsibility you want to consistently maintain.',
      },
      edit: {
        title: 'Edit Area',
        desc: 'Make adjustments to this area to reflect your ongoing responsibilities.',
      },
    },
    resources: {
      add: {
        title: 'Add New Resource',
        desc: 'Save helpful knowledge or references to revisit later.',
      },
      edit: {
        title: 'Edit Resource',
        desc: 'Update this resource to better organize your knowledge.',
      },
    },
    archives: {
      add: {},
      edit: {},
    },
  }[params.paras];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: upsertProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [params.paras] });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {renderTrigger({ DialogTrigger, form })}
      <DialogContent className="py-4 sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? paraContent.edit.title : paraContent.add.title}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? paraContent.edit.desc : paraContent.add.desc}
          </DialogDescription>
        </DialogHeader>

        <FormProject
          form={form}
          isSaving={mutation.isPending}
          onSubmit={(values) =>
            mutation.mutate({
              id: values.id,
              title: values.title,
              description: values.description,
              para_type: getParaTypeFromParamValue(params.paras),
            })
          }
        />
      </DialogContent>
    </Dialog>
  );
}

export { FormProject, DialogFormProject, useDialogFormProjectState };
