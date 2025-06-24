'use client';

import { getNotesByGroup, Note, noteTypeMap } from '@/utils/supabase/api/note';
import { useQuery } from '@tanstack/react-query';
import { Tag } from 'lucide-react';
import { useParams } from 'next/navigation';
import { formatToLocalTime } from '@/utils/format-date-time';
import DOMPurify from 'dompurify';

function NoteList() {
  const params = useParams();
  const paraGroupId = params.id as string;

  const { data: notes } = useQuery<Note[]>({
    queryKey: ['notes', paraGroupId],
    queryFn: () => getNotesByGroup(paraGroupId),
    enabled: !!paraGroupId,
  });

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
              className="card-hover flex h-full transform flex-col justify-between rounded-lg border bg-white p-3 transition duration-300 hover:-translate-y-1"
            >
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
