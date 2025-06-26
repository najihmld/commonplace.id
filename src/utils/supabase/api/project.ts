import { createClient } from '../client';
import { createServer } from '../server';

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

export const getProjectsPaginated = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}) => {
  const supabase = createClient();
  const pageSize = 12; // Number of projects per page

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
    .order('created_at', { ascending: false })
    .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

  if (error) throw new Error(error.message);
  return data;
};

export const getProjectByIdServer = async (id: string) => {
  const supabase = await createServer();

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
    .eq('id', id)
    .eq('para_type', 'project')
    .maybeSingle();

  if (error) {
    console.error('getProjectByIdServer error', error.message);
    return null;
  }

  if (!data) {
    console.error('getProjectByIdServer: No project found with id', id);
    return null;
  }

  // Ensure we return a plain object that matches the Project type
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    created_at: data.created_at,
    para_type: data.para_type,
    notes: data.notes || [],
  } as Project;
};

export const getProjectById = async (id: string) => {
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
    .eq('id', id)
    .eq('para_type', 'project')
    .maybeSingle();

  if (error) {
    console.error('getProjectById error', error.message);
    return null;
  }

  if (!data) {
    console.error('getProjectById: No project found with id', id);
    return null;
  }

  // Ensure we return a plain object that matches the Project type
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    created_at: data.created_at,
    para_type: data.para_type,
    notes: data.notes || [],
  } as Project;
};

export const deleteProject = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from('para_groups').delete().eq('id', id);

  if (error) throw new Error(error.message);
};
