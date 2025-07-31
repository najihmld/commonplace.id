import { ParaGroupItem } from '@/utils/supabase/api/project';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

type Entity = {
  id: string;
  title: string;
  type: 'note' | 'project' | 'area' | 'resource' | 'archive';
};

const supabase = createClient();

export const useSearchAll = (keyword: string) => {
  return useQuery({
    queryKey: ['search-all', keyword],
    enabled: !!keyword,
    queryFn: async (): Promise<{
      notes: Entity[];
      paraGroups: ParaGroupItem[];
    }> => {
      const [paraGroupsResult, notesResult] = await Promise.all([
        supabase
          .from('para_groups')
          .select(
            `
            id,
            title,
            description,
            created_at,
            para_type,
            original_para_type,
            notes(count)
          `,
          )
          .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`),

        supabase
          .from('notes')
          .select(
            `
            id,
            type,
            title,
            content_html,
            updated_at,
            tags (
              name
            )
          `,
          )
          .or(`title.ilike.%${keyword}%,content_html.ilike.%${keyword}%`),
      ]);

      if (notesResult.error) throw notesResult.error;
      if (paraGroupsResult.error) throw paraGroupsResult.error;

      const notes =
        (notesResult.data || []).map((n) => ({
          id: n.id,
          title: n.title,
          type: 'note' as const,
        })) || [];

      const paraGroups = paraGroupsResult.data || [];

      return { notes, paraGroups };
    },
  });
};
