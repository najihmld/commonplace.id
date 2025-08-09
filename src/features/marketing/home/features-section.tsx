import { cn } from '@/lib/utils';
import {
  FileText,
  Folder,
  Tag,
  Search,
  Pin,
  RefreshCcw,
  Smartphone,
  Lock,
  LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FeaturesSection() {
  const t = useTranslations(`/`);

  const features = [
    {
      Icon: FileText,
    },
    {
      Icon: Folder,
    },
    {
      Icon: Tag,
    },
    {
      Icon: Search,
    },
    {
      Icon: Pin,
    },
    {
      Icon: RefreshCcw,
    },
    {
      Icon: Smartphone,
    },
    {
      Icon: Lock,
    },
  ];

  return (
    <section className="relative z-20 mx-auto max-w-7xl pb-10 xl:pb-20">
      <div className="px-8">
        <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black lg:text-5xl lg:leading-tight dark:text-white">
          {t('features.title')}
        </h2>

        <p className="mx-auto my-4 max-w-2xl text-center text-base font-normal text-neutral-500 lg:text-lg dark:text-neutral-300">
          {t('features.desc')}
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-8 grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
        {features.map((feature, index) => {
          const title = t(`features.${index + 1}.title`);
          const desc = t(`features.${index + 1}.desc`);
          return (
            <Feature
              key={title}
              title={title}
              description={desc}
              {...feature}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  Icon,
  index,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}) => {
  return (
    <div
      className={cn(
        'group/feature relative flex flex-col py-4 lg:border-r lg:py-10 dark:border-neutral-800',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800',
      )}
    >
      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      <div className="relative z-10 mb-2 px-10 text-neutral-600 lg:mb-4 dark:text-neutral-400">
        <Icon />
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="group-hover/feature:bg-primary absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 dark:bg-neutral-700" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
};
