'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/dialog';
import { Button } from '@/components/common/button';
import { useDeleteProject } from './useDeleteProject';
import { Trash2 } from 'lucide-react';

interface DeleteProjectDialogProps {
  projectId: string;
  projectTitle: string;
  isOpen: boolean;
  onCloseAction: () => void;
}

export function DeleteProjectDialog({
  projectId,
  projectTitle,
  isOpen,
  onCloseAction,
}: DeleteProjectDialogProps) {
  const deleteProject = useDeleteProject();

  const handleDelete = async () => {
    try {
      await deleteProject.mutateAsync(projectId);
      onCloseAction();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="text-destructive h-5 w-5" />
            Delete Project
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;
            <strong>{projectTitle}</strong>&quot;? This action cannot be undone
            and will permanently remove the project and all its associated
            notes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCloseAction}
            disabled={deleteProject.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteProject.isPending}
          >
            {deleteProject.isPending ? 'Deleting...' : 'Delete Project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
