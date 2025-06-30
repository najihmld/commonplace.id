import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/utils/supabase/api/note';
import { useParams } from 'next/navigation';

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const paraGroupId = params.id as string;

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      // Invalidate all notes queries for this group (including different tag filters)
      queryClient.invalidateQueries({
        queryKey: ['notes', paraGroupId],
      });
    },
  });
};
