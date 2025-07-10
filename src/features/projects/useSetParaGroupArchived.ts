import { setParaGroupArchived } from '@/utils/supabase/api/project';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useSetParaGroupArchived = () => {
  const queryClient = useQueryClient();
  const params = useParams();

  return useMutation({
    mutationFn: setParaGroupArchived,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [params.paras] });
    },
  });
};
