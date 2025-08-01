import { formatToLocalTime } from '@/utils/format-date-time';
import { Ellipsis, Tag, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { Note, noteTypeMap } from '@/utils/supabase/api/note';
import DOMPurify from 'dompurify';
import { useDeleteNote } from './useDeleteNote';

interface Props {
  note: Note;
  DialogTrigger: React.ElementType;
  isSaving?: boolean;
  onClick?: () => void;
}

function NoteItemCard({ note, DialogTrigger, isSaving, onClick }: Props) {
  const config = noteTypeMap[note.type];
  const cleanHtml = DOMPurify.sanitize(note.content_html);

  const deleteNote = useDeleteNote();
  const handleDeleteNote = (noteId: string) => {
    deleteNote.mutate(noteId);
  };

  return (
    <div
      key={note.id}
      className="card-hover relative flex h-fit flex-col justify-between rounded-lg border bg-white"
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

        <div className="my-4 flex-1 text-sm">
          {!!note.title && <div className="mb-2 font-bold">{note.title}</div>}
          <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </div>

        <div>
          <div className="flex items-center gap-1">
            {note.tags?.length ? (
              <Tag size={12} className="text-text-secondary" />
            ) : null}
            <div className="flex flex-wrap gap-0.5">
              {note.tags?.map((tag) => (
                <div
                  key={tag.name}
                  className="text-text-secondary w-fit rounded-sm border bg-white px-1.5 text-xs"
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogTrigger>
    </div>
  );
}

export default NoteItemCard;
