'use client';

import { getNotesByGroup, Note, noteTypeMap } from '@/utils/supabase/api/note';
import { useQuery } from '@tanstack/react-query';
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

function NoteList() {
  const params = useParams();
  const paraGroupId = params.id as string;
  const deleteNote = useDeleteNote();

  const { data: notes } = useQuery<Note[]>({
    queryKey: ['notes', paraGroupId],
    queryFn: () => getNotesByGroup(paraGroupId),
    enabled: !!paraGroupId,
  });

  const handleDeleteNote = (noteId: string) => {
    deleteNote.mutate(noteId);
  };

  console.log('notes', notes);
  return (
    <section>
      <div className="grid grid-cols-4 gap-4">
        {notes?.map((note) => {
          const type = note.type || 'idea';
          const config = noteTypeMap[type];
          const cleanHtml = DOMPurify.sanitize(note.content_html);
          return (
            <div
              key={note.id}
              className="card-hover relative flex h-full transform flex-col justify-between rounded-lg border bg-white p-3 transition duration-300 hover:-translate-y-1"
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

              <div className="flex items-center gap-x-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-lg px-1.5 text-[11px] font-semibold capitalize ${config.className}`}
                  >
                    {config.label}
                  </div>
                </div>
                <div className="text-text-secondary text-xs">
                  {formatToLocalTime(note.updated_at, 'MMM dd, yyyy')}
                </div>
                <div className="flex-1" />
              </div>

              <div className="my-4 flex-1 text-sm">
                <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
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
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default NoteList;
