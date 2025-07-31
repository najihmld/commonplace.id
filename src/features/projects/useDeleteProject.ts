// hooks/useDeleteProject.ts
import { deleteProject } from '@/utils/supabase/api/project';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const params = useParams();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      // Misalnya invalidate query untuk list project
      queryClient.invalidateQueries({ queryKey: [params.paras] });
      queryClient.invalidateQueries({ queryKey: ['search-all'] });
    },
  });
};
