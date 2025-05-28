'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/common/button';
import { Form } from '@/components/forms/form';
import { ControlledInput } from '@/components/forms/input';
import { ControlledSelect } from '@/components/forms/select';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  gender: z.string().min(1, {
    message: 'Select gender is required',
  }),
});

export default function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      gender: '',
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
      <ControlledSelect
        control={form.control}
        name="gender"
        label="Gender"
        options={[
          { label: 'Male', value: 'm' },
          { label: 'Female', value: 'f' },
        ]}
      />

      <br />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
