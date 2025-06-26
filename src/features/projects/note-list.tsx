'use client';

import {
  getNotesByGroupPaginated,
  noteTypeMap,
} from '@/utils/supabase/api/note';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Ellipsis, Tag, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { formatToLocalTime } from '@/utils/format-date-time';
import DOMPurify from 'dompurify';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { useDeleteNote } from './useDeleteNote';
import { useEffect, useRef, useCallback } from 'react';
import { DialogFormNote, useDialogFormNoteState } from './note-form';

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

function NoteList() {
  const params = useParams();
  const paraGroupId = params.id as string;
  const deleteNote = useDeleteNote();
  const dialogFormNoteState = useDialogFormNoteState();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['notes', paraGroupId],
      queryFn: ({ pageParam }) =>
        getNotesByGroupPaginated({ paraGroupId, pageParam }),
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

  const handleDeleteNote = (noteId: string) => {
    deleteNote.mutate(noteId);
  };

  console.log('notes', notes);
  return (
    <section>
      <DialogFormNote
        {...dialogFormNoteState.props}
        renderTrigger={({ DialogTrigger, form, isSaving }) => {
          return (
            <div className="grid grid-cols-4 gap-4">
              {isLoading ? (
                <>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-48 animate-pulse rounded-lg bg-gray-200"
                    />
                  ))}
                </>
              ) : (
                notes?.map((note) => {
                  const type = note.type;
                  const config = noteTypeMap[type];
                  const cleanHtml = DOMPurify.sanitize(note.content_html);
                  return (
                    <div
                      key={note.id}
                      className="card-hover relative flex h-fit transform flex-col justify-between rounded-lg border bg-white transition duration-300 hover:-translate-y-1"
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger className="absolute top-2 right-2 cursor-pointer rounded-sm p-1">
                          <Ellipsis size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteNote(note.id)}
                            disabled={deleteNote.isPending}
                          >
                            <Trash2 className="text-destructive" />
                            <span className="text-destructive">
                              {deleteNote.isPending ? 'Deleting...' : 'Delete'}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DialogTrigger
                        disabled={isSaving}
                        className="w-full p-3 text-left"
                        onClick={() => {
                          form.reset({
                            note_id: note.id,
                            title: note.title,
                            content: note.content_html,
                            type: note.type,
                            tags: note.tags?.map((tag) => tag.name) ?? [],
                          });
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`rounded-lg px-1.5 text-[10px] font-semibold capitalize ${config?.className}`}
                            >
                              {config?.label}
                            </div>
                          </div>
                          <div className="text-text-secondary text-xs">
                            {formatToLocalTime(note.updated_at, 'MMM dd, yyyy')}
                          </div>
                          <div className="flex-1" />
                        </div>

                        <div className="my-4 flex-1 text-sm">
                          {!!note.title && (
                            <div className="font-bold">{note.title}</div>
                          )}
                          <div
                            dangerouslySetInnerHTML={{ __html: cleanHtml }}
                          />
                        </div>

                        <div>
                          <div className="mb-2 flex items-center gap-1">
                            {note.tags?.length ? (
                              <Tag size={12} className="text-text-secondary" />
                            ) : null}
                            {note.tags?.map((tag) => (
                              <div
                                key={tag.name}
                                className="text-text-secondary w-fit rounded-lg border bg-white px-1.5 text-xs"
                              >
                                {tag.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </DialogTrigger>
                    </div>
                  );
                })
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
