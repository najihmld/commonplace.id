import { Note } from '@/utils/supabase/api/note';
import { ParaGroupItem } from '@/utils/supabase/api/project';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

const supabase = createClient();

export const useSearchAll = (keyword: string) => {
  return useQuery({
    queryKey: ['search-all', keyword],
    enabled: !!keyword,
    queryFn: async (): Promise<{
      notes: Note[];
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
            ),
            para_group:para_groups (
              title,
              para_type
            )
          `,
          )
          .or(`title.ilike.%${keyword}%,content_html.ilike.%${keyword}%`),
      ]);

      if (notesResult.error) throw notesResult.error;
      if (paraGroupsResult.error) throw paraGroupsResult.error;

      const notes = notesResult.data.map(
        (note): Note => ({
          ...note,
          para_group: Array.isArray(note.para_group)
            ? note.para_group[0]
            : note.para_group,
        }),
      );

      const paraGroups = paraGroupsResult.data || [];

      return { notes, paraGroups };
    },
  });
};
