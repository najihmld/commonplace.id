'use client';

import { Button } from '@/components/common/button';

export default function DashboardPage() {
  return (
    <>
      <h1>Hello Next.js! Dashboard Page</h1>
      <div className="flex gap-3">
        <Button onClick={() => alert('test')}>default</Button>
        <Button disabled onClick={() => alert('test')}>
          default
        </Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="outline">outline</Button>
        <Button variant="secondary">secondary</Button>
      </div>
    </>
  );
}
