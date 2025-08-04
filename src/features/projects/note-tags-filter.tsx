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
              className="h-[20px] w-20 animate-pulse rounded-md bg-gray-200"
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
            className={`cursor-pointer transition-colors ${
              selectedTags.includes(tag.name)
                ? 'border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => handleTagClick(tag.name)}
          >
            🏷️ {tag.name}
          </Badge>
        ))}
      </div>

      {selectedTags.length > 0 && (
        <div className="mt-3 text-sm text-gray-600">
          Showing notes with tags: {selectedTags.join(', ')}
        </div>
      )}
    </section>
  );
}

export default NoteTagsFilter;
