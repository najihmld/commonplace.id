/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/common/button';
import { Archive, ArrowRight, LibraryBig, Shrub, Target } from 'lucide-react';
import React from 'react';
import { useId } from 'react';

export function AboutParaSection() {
  return (
    <section className="relative z-20 mx-auto max-w-7xl py-10 xl:py-20">
      <div className="px-8">
        <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black lg:text-5xl lg:leading-tight dark:text-white">
          The PARA Method
        </h2>

        <p className="mx-auto my-4 max-w-2xl text-center text-base font-normal text-neutral-500 lg:text-lg dark:text-neutral-300">
          Created by Tiago Forte, PARA is a simple yet powerful organizational
          system that mirrors how your brain naturally thinks.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-2 lg:mt-12 lg:grid-cols-4">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 to-white p-6 dark:from-neutral-900 dark:to-neutral-950"
          >
            <Grid size={20} />
            {feature.icon}
            <p className="relative z-20 mt-4 text-base font-bold text-neutral-800 dark:text-white">
              {feature.title}
            </p>
            <p className="relative z-20 mt-4 text-base font-normal text-neutral-600 dark:text-neutral-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-4 w-fit">
        <Button variant="outline" size="lg">
          Learn More About PARA
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

const grid = [
  {
    Icon: Target,
    icon: <Target className="text-projects" />,
    title: 'Projects',
    description:
      "Things you're working on with a deadline and specific outcome. Active work that needs your attention.",
  },
  {
    Icon: Shrub,
    icon: <Shrub className="text-areas" />,
    title: 'Areas',
    description:
      'Ongoing responsibilities you want to manage over time. Standards you want to maintain in your life.',
  },
  {
    Icon: LibraryBig,
    icon: <LibraryBig className="text-resources" />,
    title: 'Resources',
    description:
      'Topics or interests that may be useful in the future. Your personal knowledge library.',
  },
  {
    Icon: Archive,
    icon: <Archive className="text-archives" />,
    title: 'Archive',
    description:
      'Inactive items from the other three categories. Keep your active workspace clean and focused.',
  },
];

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/30 to-zinc-300/30 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100 dark:from-zinc-900/30 dark:to-zinc-900/30">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full fill-black/10 stroke-black/10 mix-blend-overlay dark:fill-white/10 dark:stroke-white/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: [number, number], i: number) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}-${i}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
