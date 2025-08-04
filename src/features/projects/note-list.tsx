'use client';

import { getNotesByGroupPaginated } from '@/utils/supabase/api/note';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useCallback } from 'react';
import { DialogFormNote, useDialogFormNoteState } from './note-form';
import NoteItemCard from './note-item-card';

// Custom hook for intersection observer
function useInView(callback: () => void, deps: React.DependencyList = []) {
  const ref = useRef<HTMLDivElement>(null);

  const memoizedCallback = useCallback(callback, deps);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            memoizedCallback();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [memoizedCallback]);

  return ref;
}

function NoteList({
  selectedTags = [],
  selectedType = '',
}: {
  selectedTags?: string[];
  selectedType?: string;
}) {
  const params = useParams();
  const paraGroupId = params.id as string;
  const dialogFormNoteState = useDialogFormNoteState();

  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('q') || '';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [
        'notes',
        { paraGroupId, selectedTags, selectedType, searchKeyword },
      ],
      queryFn: getNotesByGroupPaginated,
      getNextPageParam: (lastPage, allPages) => {
        // If last page has fewer items than page size, we've reached the end
        return lastPage.length === 16 ? allPages.length : undefined;
      },
      initialPageParam: 0,
      enabled: !!paraGroupId,
    });

  const notes = data?.pages.flat() || [];

  // Auto-load more when scroll reaches bottom
  const loadMoreRef = useInView(
    useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]),
  );

  return (
    <section>
      <DialogFormNote
        {...dialogFormNoteState.props}
        renderTrigger={({ DialogTrigger, form, isSaving }) => {
          return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading ? (
                <>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-48 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800"
                    />
                  ))}
                </>
              ) : (
                notes?.map((note) => (
                  <NoteItemCard
                    key={note.id}
                    note={note}
                    isSaving={isSaving}
                    onClick={() => {
                      form.reset({
                        note_id: note.id,
                        title: note.title,
                        content: note.content_html,
                        type: note.type,
                        tags: note.tags?.map((tag) => tag.name) ?? [],
                      });
                    }}
                    DialogTrigger={DialogTrigger}
                  />
                ))
              )}
            </div>
          );
        }}
      />

      {/* Intersection observer target for auto-loading */}
      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="col-span-4 mt-8 flex justify-center py-4"
          style={{ minHeight: '100px' }}
        >
          {isFetchingNextPage && (
            <div className="text-text-secondary text-sm">
              Loading more notes...
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default NoteList;
