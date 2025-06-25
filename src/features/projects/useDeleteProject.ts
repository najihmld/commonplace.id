// hooks/useDeleteProject.ts
import { deleteProject } from '@/utils/supabase/api/project';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      // Misalnya invalidate query untuk list project
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
