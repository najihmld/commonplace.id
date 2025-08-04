'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/common/badge';
import { getNoteTypesByGroupId, noteTypeMap } from '@/utils/supabase/api/note';
import { useElementSize } from '@mantine/hooks';
import useEmblaCarousel, {
  usePrevNextButtons,
} from '@/hooks/use-embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NoteTypeFilterProps {
  selectedType: string;
  onTypeChange: (_type: string) => void;
}

function NoteTypeFilter({ selectedType, onTypeChange }: NoteTypeFilterProps) {
  const params = useParams();
  const paraGroupId = params.id as string;

  const {
    data: types,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['types', paraGroupId],
    queryFn: () => getNoteTypesByGroupId(paraGroupId),
    enabled: !!paraGroupId,
    select: (data) => {
      return data.map((value) => noteTypeMap[value]);
    },
  });

  const { ref: refElementSize, width } = useElementSize();
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  if (isLoading) {
    return (
      <section className="mb-2">
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-[20px] w-20 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-2">
        <div className="text-sm text-red-500">
          Error loading type: {error.message}
        </div>
      </section>
    );
  }

  if (!types || types.length === 0) return null;

  return (
    <section className="mb-2">
      <div className="h-0 w-full" ref={refElementSize}></div>
      <div className="embla relative flex" style={{ maxWidth: width }}>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container gap-x-1">
            {types.map((type) => {
              return (
                <div className="embla__slide" key={type.value}>
                  <Badge
                    variant={
                      selectedType === type.value ? 'default' : 'outline'
                    }
                    className={`bg-card cursor-pointer transition-colors dark:text-white ${
                      selectedType === type.value
                        ? 'bg-brand text-white dark:text-black'
                        : 'hover:bg-brand/5'
                    }`}
                    onClick={() => onTypeChange(type.value)}
                  >
                    {type.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {!prevBtnDisabled && (
          <button
            className="absolute top-0.5 -left-6 aspect-1/1 h-[22px] cursor-pointer rounded-full border bg-white shadow-md"
            type="button"
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          >
            <ChevronLeft size={20} className="text-primary" />
          </button>
        )}
        {!nextBtnDisabled && (
          <button
            className="absolute top-0.5 -right-6 aspect-1/1 h-[22px] cursor-pointer rounded-full border bg-white shadow-md"
            type="button"
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          >
            <ChevronRight size={20} className="text-primary" />
          </button>
        )}
      </div>
    </section>
  );
}

export default NoteTypeFilter;
