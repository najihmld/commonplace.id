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
      // Invalidate and refetch notes for this group
      queryClient.invalidateQueries({
        queryKey: ['notes', paraGroupId],
      });
    },
  });
};
