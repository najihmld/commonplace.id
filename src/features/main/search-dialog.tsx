'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/common/command';
import { useSearchAll } from './use-search-all';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import ParaGroupCard from '../projects/para-group-card';
import {
  DialogFormProject,
  useDialogFormProjectState,
} from '../projects/project-form';
import { useSetParaGroupArchived } from '../projects/useSetParaGroupArchived';
import { DeleteProjectDialog } from '../projects/delete-project-dialog';
import { DialogFormNote, useDialogFormNoteState } from '../projects/note-form';
import NoteItemCard from '../projects/note-item-card';

interface Props {
  open: boolean;
  onOpenChange: (_val: boolean) => void;
}

function SearchDialog({ open, onOpenChange }: Props) {
  const [keyword, setKeyword] = useState('');
  const [debouncedInput] = useDebounce(keyword, 500); // debounce selama 500ms

  const search = useSearchAll(debouncedInput);
  const notes = search.data?.notes || [];
  const paraGroups = search.data?.paraGroups || [];

  const dialogFormNoteState = useDialogFormNoteState();

  const dialogFormEditProjectState = useDialogFormProjectState();
  const setArchived = useSetParaGroupArchived();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    projectId: string;
    projectTitle: string;
  }>({
    isOpen: false,
    projectId: '',
    projectTitle: '',
  });
  const handleDeleteClick = (projectId: string, projectTitle: string) => {
    setDeleteDialog({
      isOpen: true,
      projectId,
      projectTitle,
    });
  };

  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={(b) => {
          if (!b) setKeyword('');
          onOpenChange(b);
        }}
        className="!max-w-xl"
      >
        <CommandInput
          onInput={(e) => {
            setKeyword((e.target as HTMLInputElement).value);
          }}
          placeholder="Search notes, projects, areas, and more..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <DialogFormNote
            {...dialogFormNoteState.props}
            renderTrigger={({ DialogTrigger, form, isSaving }) =>
              notes.length > 0 && (
                <CommandGroup heading="Notes">
                  {notes?.map((note) => (
                    <CommandItem
                      key={note.id}
                      value={`${note.title} ${note.content_html || ''}`}
                      asChild
                    >
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
                    </CommandItem>
                  ))}
                </CommandGroup>
              )
            }
          />

          <DialogFormProject
            isEdit
            {...dialogFormEditProjectState.props}
            renderTrigger={({ DialogTrigger, form }) =>
              paraGroups.length > 0 && (
                <CommandGroup heading="PARA Groups">
                  {paraGroups?.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.title} ${item.description || ''}`}
                      asChild
                    >
                      <ParaGroupCard
                        onClick={() => onOpenChange(false)}
                        DialogTrigger={DialogTrigger}
                        item={item}
                        onClickEdit={() => {
                          form.reset({
                            id: item.id,
                            title: item.title,
                            description: item.description,
                          });
                        }}
                        onClickArchive={() => {
                          setArchived.mutate({
                            id: item.id,
                            currentParaType: item.para_type,
                            originalParaType: item.original_para_type,
                          });
                        }}
                        onClickDelete={() => {
                          handleDeleteClick(item.id, item.title);
                        }}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )
            }
          />
        </CommandList>
      </CommandDialog>

      <DeleteProjectDialog
        projectId={deleteDialog.projectId}
        projectTitle={deleteDialog.projectTitle}
        isOpen={deleteDialog.isOpen}
        onCloseAction={() => {
          setDeleteDialog({
            isOpen: false,
            projectId: '',
            projectTitle: '',
          });
        }}
      />
    </>
  );
}

export default SearchDialog;
