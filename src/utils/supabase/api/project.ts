import { createClient } from '../client';

export type Project = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  para_type: string;
  notes: { count: number }[];
};

export const getProjects = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('para_groups')
    .select(
      `
      id,
      title,
      description,
      created_at,
      para_type,
      notes(count)
    `,
    )
    .eq('para_type', 'project')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
