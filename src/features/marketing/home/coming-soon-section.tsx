import { Badge } from '@/components/common/badge';
import { Card, CardHeader } from '@/components/common/card';
import { CheckSquare, Clock } from 'lucide-react';

export function CoomingSoonSection() {
  return (
    <section className="relative z-20 mx-auto max-w-7xl py-10 xl:py-20">
      <div className="px-8">
        <div className="mx-auto w-fit">
          <Badge variant="secondary" className="mb-4">
            Coming Soon
          </Badge>
        </div>
        <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black lg:text-5xl lg:leading-tight dark:text-white">
          Your Complete Productivity Suite
        </h4>

        <p className="mx-auto my-4 max-w-2xl text-center text-base font-normal text-neutral-500 lg:text-lg dark:text-neutral-300">
          We&apos;re building more than just a note-taking app. Get ready for
          integrated productivity tools.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 px-4 lg:mt-12 lg:grid-cols-2">
        <Card className="rounded-none border-2 border-dashed border-gray-200 bg-gray-50/50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <CheckSquare />
              <p className="relative z-20 text-base font-bold text-neutral-800 dark:text-white">
                Integrated Todo List
              </p>
            </div>
            <p className="relative z-20 mt-2 text-base font-normal text-neutral-600 dark:text-neutral-400">
              Transform your project notes into actionable tasks. Create todo
              lists that automatically organize within your PARA structure, with
              smart due dates and priority management.
            </p>
          </CardHeader>
        </Card>

        <Card className="rounded-none border-2 border-dashed border-gray-200 bg-gray-50/50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Clock />
              <p className="relative z-20 text-base font-bold text-neutral-800 dark:text-white">
                Time Tracking
              </p>
            </div>
            <p className="relative z-20 mt-2 text-base font-normal text-neutral-600 dark:text-neutral-400">
              Track time spent on projects and areas directly from your notes.
              Get insights into your productivity patterns and optimize your
              workflow with detailed analytics.
            </p>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
