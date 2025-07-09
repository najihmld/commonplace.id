import { createClient } from '../client';
import { createServer } from '../server';

export type ParaType = 'project' | 'area' | 'resource' | 'archive';

export type Project = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  para_type: ParaType;
  notes: { count: number }[];
};

export type ProjectFormData = {
  id?: string; // Jika ada, berarti edit
  title: string;
  description?: string;
  para_type: ParaType;
};

export const upsertProject = async (input: ProjectFormData) => {
  const supabase = createClient();

  const { id, ...rest } = input;

  const { data, error } = await supabase
    .from('para_groups')
    .upsert(
      id ? [{ id, ...rest }] : [{ ...rest }],
      { onConflict: 'id' }, // update jika ada id yang sama
    )
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
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
  queryKey,
}: {
  pageParam?: number;
  queryKey: (string | { paraType: ParaType })[];
}) => {
  const paraType =
    (queryKey[1] as { paraType: ParaType })?.paraType || 'project';
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
    .eq('para_type', paraType)
    .order('created_at', { ascending: false })
    .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

  if (error) throw new Error(error.message);
  return data;
};

export const getProjectByServer = async ({
  id,
  paraType,
}: {
  id: string;
  paraType: ParaType;
}) => {
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
    .eq('para_type', paraType)
    .maybeSingle();

  if (error) {
    console.error('getProjectByServer error', error.message);
    return null;
  }

  if (!data) {
    console.error('getProjectByServer: No project found with id', id);
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

export const getProject = async ({
  id,
  paraType,
}: {
  id: string;
  paraType: ParaType;
}) => {
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
    .eq('para_type', paraType)
    .maybeSingle();

  if (error) {
    console.error('getProject error', error.message);
    return null;
  }

  if (!data) {
    console.error('getProject: No project found with id', id);
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
