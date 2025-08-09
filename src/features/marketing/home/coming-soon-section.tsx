import { Badge } from '@/components/common/badge';
import { Card, CardHeader } from '@/components/common/card';
import { CheckSquare, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function CoomingSoonSection() {
  const t = useTranslations(`/`);

  return (
    <section className="relative z-20 mx-auto max-w-7xl py-10 xl:py-20">
      <div className="px-8">
        <div className="mx-auto w-fit">
          <Badge variant="secondary" className="mb-4">
            Coming Soon
          </Badge>
        </div>
        <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black lg:text-5xl lg:leading-tight dark:text-white">
          {t('comming-soon.title')}
        </h2>

        <p className="mx-auto my-4 max-w-2xl text-center text-base font-normal text-neutral-500 lg:text-lg dark:text-neutral-300">
          {t('comming-soon.desc')}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 px-4 lg:mt-12 lg:grid-cols-2">
        <Card className="rounded-none border-2 border-dashed border-gray-200 bg-gray-50/50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <CheckSquare />
              <p className="relative z-20 text-base font-bold text-neutral-800 dark:text-white">
                {t('comming-soon.1.title')}
              </p>
            </div>
            <p className="relative z-20 mt-2 text-base font-normal text-neutral-600 dark:text-neutral-400">
              {t('comming-soon.1.desc')}
            </p>
          </CardHeader>
        </Card>

        <Card className="rounded-none border-2 border-dashed border-gray-200 bg-gray-50/50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Clock />
              <p className="relative z-20 text-base font-bold text-neutral-800 dark:text-white">
                {t('comming-soon.2.title')}
              </p>
            </div>
            <p className="relative z-20 mt-2 text-base font-normal text-neutral-600 dark:text-neutral-400">
              {t('comming-soon.2.desc')}
            </p>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
