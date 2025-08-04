'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getTagsByGroupId } from '@/utils/supabase/api/tags';
import { Badge } from '@/components/common/badge';

interface NoteTagsFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

function NoteTagsFilter({ selectedTags, onTagsChange }: NoteTagsFilterProps) {
  const params = useParams();
  const paraGroupId = params.id as string;

  const {
    data: tags,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tags', paraGroupId],
    queryFn: () => getTagsByGroupId(paraGroupId),
    enabled: !!paraGroupId,
  });

  const handleTagClick = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      onTagsChange(selectedTags.filter((tag) => tag !== tagName));
    } else {
      onTagsChange([...selectedTags, tagName]);
    }
  };

  if (isLoading) {
    return (
      <section className="mb-6">
        <div className="flex flex-wrap gap-1">
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
      <section className="mb-6">
        <div className="text-sm text-red-500">
          Error loading tags: {error.message}
        </div>
      </section>
    );
  }

  if (!tags || tags.length === 0) return <div className="mb-6"></div>;

  return (
    <section className="mb-6">
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.name) ? 'default' : 'outline'}
            className={`bg-card cursor-pointer transition-colors dark:text-white ${
              selectedTags.includes(tag.name)
                ? 'bg-brand text-white dark:text-black'
                : 'hover:bg-brand/5'
            }`}
            onClick={() => handleTagClick(tag.name)}
          >
            🏷️ {tag.name}
          </Badge>
        ))}
      </div>
    </section>
  );
}

export default NoteTagsFilter;
