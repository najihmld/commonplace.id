'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/common/button';
import { Form } from '@/components/forms/form';
import { ControlledInput } from '@/components/forms/input';
import { InputWithIcon } from '@/components/common/input';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  mail: z.string().email({
    message: 'Invalid email',
  }),
});

export default function ExampleForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      mail: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form
      methods={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl space-y-2"
    >
      <ControlledInput
        control={form.control}
        name="username"
        label="Username"
        description="This is your public display name."
        placeholder="Username"
      />

      <ControlledInput
        control={form.control}
        name="mail"
        label="Mail"
        description="This is your public display name."
        placeholder="Mail"
        render={(field) => (
          <InputWithIcon Icon={Mail} iconPosition="left" {...field} />
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
