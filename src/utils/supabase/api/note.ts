import { createClient } from '../client';

export type NoteType = 'idea' | 'quote' | 'insight' | 'book_note';

export type Note = {
  id: string;
  // user_id: string;
  // para_group_id: string;
  content_html: string;
  // created_at: string;
  updated_at: string;
  type?: NoteType;
  tags?: { name: string }[];
};

export const createNote = async ({
  title,
  content,
  para_group_id,
}: {
  title: string;
  content: string;
  para_group_id: string;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('notes')
    .insert({
      title,
      content,
      para_group_id,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const createNoteWithTags = async ({
  content_html,
  content_plain,
  para_group_id,
  tags,
}: {
  content_html: string;
  content_plain: string;
  para_group_id: string;
  tags: string[]; // contoh: ['quotes', 'inspiration']
}) => {
  const supabase = createClient();

  // 1. Insert note
  const { data: note, error: noteError } = await supabase
    .from('notes')
    .insert({ content_html, content_plain, para_group_id })
    .select('id')
    .single();

  if (noteError) throw new Error(noteError.message);

  // 2. Upsert tags (jika belum ada, maka insert)
  const { data: insertedTags, error: tagsError } = await supabase
    .from('tags')
    .upsert(tags.map((name) => ({ name })))
    .select('id, name');

  if (tagsError) throw new Error(tagsError.message);

  // 3. Relasikan dengan note_tags
  const tagRelations = insertedTags.map((tag) => ({
    note_id: note.id,
    tag_id: tag.id,
  }));

  const { error: linkError } = await supabase
    .from('note_tags')
    .insert(tagRelations);

  if (linkError) throw new Error(linkError.message);

  return note;
};

export const getNotesByGroup = async (paraGroupId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('notes')
    .select(
      `
      id,
      type,
      content_html,
      updated_at,
      tags (
        name
      )
    `,
    )
    .eq('para_group_id', paraGroupId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
