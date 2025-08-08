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

export function FeaturesSection() {
  const features = [
    {
      Icon: FileText,
      title: 'Capture Notes Instantly',
      description:
        'Write down ideas, thoughts, and insights in a clean, distraction-free editor.',
    },
    {
      Icon: Folder,
      title: 'PARA Organization System',
      description:
        'Structure your knowledge using Projects, Areas, Resources, and Archives.',
    },
    {
      Icon: Tag,
      title: 'Smart Tagging',
      description:
        'Add multiple tags to your notes and filter them easily based on context.',
    },
    {
      Icon: Search,
      title: 'Powerful Search',
      description: 'Find notes by keywords, tags, type, or group — instantly.',
    },
    {
      Icon: Pin,
      title: 'Note Types & Labels',
      description:
        'Categorize notes as Ideas, Quotes, Insights, and more with visual icons.',
    },
    {
      Icon: RefreshCcw,
      title: 'Autosave & Version Safe',
      description: 'Your thoughts are always saved automatically as you type.',
    },
    {
      Icon: Smartphone,
      title: 'Cross-Platform Access',
      description: 'Access your knowledge base from anywhere — web or mobile.',
      icon: '📱',
    },
    {
      Icon: Lock,
      title: 'Private & Secure',
      description:
        'All your notes are securely stored and only accessible to you.',
    },
  ];

  return (
    <section className="relative z-20 mx-auto max-w-7xl pb-10 xl:pb-20">
      <div className="px-8">
        <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black lg:text-5xl lg:leading-tight dark:text-white">
          Everything you need for organized thinking
        </h2>

        <p className="mx-auto my-4 max-w-2xl text-center text-base font-normal text-neutral-500 lg:text-lg dark:text-neutral-300">
          Powerful features designed to help you capture, organize, and retrieve
          your knowledge effortlessly.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-8 grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
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
