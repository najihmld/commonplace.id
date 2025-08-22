import { formatToLocalTime } from '@/utils/format-date-time';
import { Ellipsis, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { Note, noteTypeMap } from '@/utils/supabase/api/note';
import DOMPurify from 'dompurify';
import { useDeleteNote } from './useDeleteNote';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  note: Note;
  DialogTrigger: React.ElementType;
  isSaving?: boolean;
  onClick?: () => void;
}

function NoteItemCard({ note, DialogTrigger, isSaving, onClick }: Props) {
  const t = useTranslations();
  const config = noteTypeMap[note.type];
  const cleanHtml = DOMPurify.sanitize(note.content_html);

  const deleteNote = useDeleteNote();
  const handleDeleteNote = (noteId: string) => {
    deleteNote.mutate(noteId);
  };

  // state untuk expand/collapse
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [cleanHtml]);

  return (
    <div
      key={note.id}
      className="bg-card dark:text-text-primary relative flex h-fit flex-col justify-between rounded-lg border"
    >
      {/* Dropdown Menu */}
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
              {deleteNote.isPending ? 'Deleting...' : t('delete')}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* PARA Group */}
      {note.para_group && (
        <div className="mt-3 flex items-center px-2">
          <div
            className={`text-projects rounded-lg px-1.5 text-xs font-semibold capitalize bg-${note.para_group?.para_type}s/5`}
          >
            {note.para_group?.para_type}
          </div>
          <div className="truncate text-sm text-neutral-500">
            / {note.para_group?.title}
          </div>
        </div>
      )}

      <DialogTrigger
        disabled={isSaving}
        className="w-full p-3 text-left"
        onClick={onClick}
      >
        {/* Header */}
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-2">
            <div
              className={`rounded-sm px-1.5 text-[10px] font-semibold capitalize ${config?.className}`}
            >
              {config?.label}
            </div>
          </div>
          <div className="text-text-secondary text-xs">
            {formatToLocalTime(note.updated_at, 'MMM dd, yyyy')}
          </div>
          <div className="flex-1" />
        </div>

        {/* Content */}
        <div className="prose flex-1 text-sm">
          <div
            ref={contentRef}
            className={`relative overflow-hidden transition-all ${
              expanded ? 'max-h-none' : 'max-h-96'
            }`}
          >
            {!!note.title && (
              <div className="mt-4 mb-2 font-bold">{note.title}</div>
            )}
            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />

            {note.tags?.length ? (
              <div className="mb-3 flex flex-wrap gap-0.5 gap-y-1">
                {note.tags?.map((tag) => (
                  <div
                    key={tag.name}
                    className="text-text-secondary bg-card w-fit rounded-sm border px-1.5 text-xs"
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            ) : null}

            {!expanded && isOverflowing && (
              <div className="from-card absolute right-0 bottom-0 left-0 h-12 bg-gradient-to-t to-transparent" />
            )}
          </div>

          {/* Toggle button hanya muncul kalau konten panjang */}
          {isOverflowing && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation(); // supaya gak trigger DialogTrigger
                setExpanded((prev) => !prev);
              }}
              className="text-xs font-medium text-blue-500 hover:underline"
            >
              {expanded ? t('see-less') : t('see-more')}
            </span>
          )}
        </div>
      </DialogTrigger>
    </div>
  );
}

export default NoteItemCard;
