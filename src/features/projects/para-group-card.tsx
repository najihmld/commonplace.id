'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import {
  Archive,
  Calendar,
  Edit2,
  Ellipsis,
  FileText,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { ParaGroupItem } from '@/utils/supabase/api/project';

interface Props {
  item: ParaGroupItem;
  onClick?: () => void;
  onClickEdit: () => void;
  onClickArchive: () => void;
  onClickDelete: () => void;
  DialogTrigger: React.ElementType;
}

function ParaGroupCard({
  item,
  onClick,
  onClickEdit,
  onClickArchive,
  onClickDelete,
  DialogTrigger,
}: Props) {
  return (
    <div
      className={`border-${item.para_type}s/50 bg-${item.para_type}s/5 card-hover relative h-full transform rounded-lg border p-3`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-2 right-2 cursor-pointer rounded-sm p-1 hover:bg-white">
          <Ellipsis size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {item.para_type !== 'archive' && (
            <DropdownMenuItem asChild className="w-full" onClick={onClickEdit}>
              <DialogTrigger>
                <Edit2 className="text-text-primary" />
                Edit
              </DialogTrigger>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={onClickArchive}>
            {item.para_type === 'archive' ? (
              <>
                <Archive className="text-text-primary" />
                Unarchive
              </>
            ) : (
              <>
                <Archive className="text-text-primary" />
                Archive
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={onClickDelete}
          >
            <Trash2 className="text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link onClick={onClick} href={`/${item.para_type}s/${item.id}`}>
        <div className="flex items-center gap-x-2">
          <div
            className={clsx('h-2 w-2 rounded-sm', `bg-${item.para_type}s`)}
          />
          <div
            className={clsx(
              'text-projects rounded-lg px-1.5 text-xs font-semibold capitalize',
              `bg-${item.para_type}s/5`,
            )}
          >
            {item.para_type}
          </div>
          <div className="h-6 flex-1" />
        </div>

        <div className="text-text-primary my-2 line-clamp-2 text-base font-semibold">
          {item.title}
        </div>
        <div className="text-text-secondary text-sm">{item.description}</div>

        <div className="text-text-tertiary mt-2 flex items-center justify-between">
          <div className="inline-block gap-x-2 align-middle">
            <Calendar size={12} className="mr-1 inline-block" />
            <span className="text-xs">{item.created_at}</span>
          </div>

          <div className="inline-block gap-x-2 align-middle">
            <FileText size={12} className="mr-1 inline-block" />
            <span className="text-xs">{item.notes[0].count} notes</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ParaGroupCard;
