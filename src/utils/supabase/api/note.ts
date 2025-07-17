import { QueryFunction } from '@tanstack/react-query';
import { createClient } from '../client';

export type NoteTypeItem = {
  value: string;
  label: string;
  className: string;
};

export const noteTypes = [
  {
    value: 'idea',
    label: '💡 Idea',
    className: 'bg-yellow-100 text-yellow-700',
  },
  { value: 'quote', label: '💬 Quote', className: 'bg-blue-100 text-blue-700' },
  {
    value: 'insight',
    label: '⚡ Insight',
    className: 'bg-purple-100 text-purple-700',
  },
  {
    value: 'book-note',
    label: '📚 Book Note',
    className: 'bg-indigo-100 text-indigo-700',
  },
  {
    value: 'meeting',
    label: '📝 Meeting',
    className: 'bg-green-100 text-green-700',
  },
  {
    value: 'personal',
    label: '🧠 Personal',
    className: 'bg-pink-100 text-pink-700',
  },
  {
    value: 'reference',
    label: '🔖 Reference',
    className: 'bg-gray-100 text-gray-700',
  },
  {
    value: 'journal',
    label: '📔 Journal',
    className: 'bg-orange-100 text-orange-700',
  },
  {
    value: 'task',
    label: '✅ Task',
    className: 'bg-emerald-100 text-emerald-700',
  },
  {
    value: 'dream',
    label: '🌙 Dream',
    className: 'bg-indigo-100 text-indigo-700',
  },
  {
    value: 'learning',
    label: '🎓 Learning',
    className: 'bg-sky-100 text-sky-700',
  },
  {
    value: 'question',
    label: '❓ Question',
    className: 'bg-rose-100 text-rose-700',
  },
  {
    value: 'decision',
    label: '⚖️ Decision',
    className: 'bg-fuchsia-100 text-fuchsia-700',
  },
  {
    value: 'research',
    label: '🔬 Research',
    className: 'bg-teal-100 text-teal-700',
  },
  { value: 'goal', label: '🎯 Goal', className: 'bg-red-100 text-red-700' },
  { value: 'plan', label: '🗺️ Plan', className: 'bg-cyan-100 text-cyan-700' },
  {
    value: 'code-snippet',
    label: '💻 Code Snippet',
    className: 'bg-zinc-100 text-zinc-700',
  },
  {
    value: 'gratitude',
    label: '🙏 Gratitude',
    className: 'bg-amber-100 text-amber-700',
  },
  {
    value: 'travel',
    label: '✈️ Travel',
    className: 'bg-lime-100 text-lime-700',
  },
  { value: 'health', label: '❤️ Health', className: 'bg-red-100 text-red-700' },
  {
    value: 'finance',
    label: '💰 Finance',
    className: 'bg-green-100 text-green-700',
  },
  {
    value: 'uncategorized',
    label: '🗂️ Uncategorized',
    className: 'bg-gray-100 text-gray-700',
  },
];

export const noteTypeMap = Object.fromEntries(
  noteTypes.map(({ value, label, className }) => [
    value,
    { label, className, value },
  ]),
) as Record<string, NoteTypeItem>;

export type NoteType = keyof typeof noteTypeMap;

export type Note = {
  id: string;
  title?: string;
  // user_id: string;
  // para_group_id: string;
  content_html: string;
  // created_at: string;
  updated_at: string;
  type: NoteType;
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
  type,
}: {
  content_html: string;
  content_plain: string;
  para_group_id: string;
  tags: string[]; // contoh: ['quotes', 'inspiration']
  type?: NoteType;
}) => {
  const supabase = createClient();

  // 1. Insert note
  const { data: note, error: noteError } = await supabase
    .from('notes')
    .insert({ content_html, content_plain, para_group_id, type })
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

export const upsertNoteWithTags = async ({
  note_id,
  title,
  content_html,
  content_plain,
  para_group_id,
  tags,
  type,
}: {
  note_id?: string;
  title?: string;
  content_html: string;
  content_plain: string;
  para_group_id: string;
  tags: string[];
  type?: NoteType;
}) => {
  const supabase = createClient();

  // 1. Jika note_id ada, update note
  let note = { id: note_id ?? '' };

  if (note_id) {
    const { error: updateError } = await supabase
      .from('notes')
      .update({ title, content_html, content_plain, type })
      .eq('id', note_id);

    if (updateError) throw new Error(updateError.message);
  } else {
    // 2. Jika tidak, insert note baru
    const { data: newNote, error: insertError } = await supabase
      .from('notes')
      .insert({ title, content_html, content_plain, para_group_id, type })
      .select('id')
      .single();

    if (insertError || !newNote)
      throw new Error(insertError?.message ?? 'Failed to insert note');
    note = newNote;
  }

  // 3. Upsert tags
  const { data: upsertedTags, error: tagsError } = await supabase
    .from('tags')
    .upsert(
      tags.map((name) => ({ name })),
      { onConflict: 'name' },
    )
    .select('id, name');

  if (tagsError || !upsertedTags)
    throw new Error(tagsError?.message ?? 'Failed to upsert tags');

  // 4. Clear old tags if updating
  if (note_id) {
    const { error: deleteOld } = await supabase
      .from('note_tags')
      .delete()
      .eq('note_id', note_id);
    if (deleteOld) throw new Error(deleteOld.message);
  }

  // 5. Insert new note_tag relations
  const tagRelations = upsertedTags.map((tag) => ({
    note_id: note.id,
    tag_id: tag.id,
  }));

  const { error: linkError } = await supabase
    .from('note_tags')
    .insert(tagRelations);

  if (linkError) throw new Error(linkError.message);

  return {
    id: note.id,
    saved_at: new Date(),
    tag_names: upsertedTags.map((tag) => tag.name),
  };
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

type GetNotesByGroupPaginatedParams = {
  paraGroupId: string;
  selectedTags?: string[];
  selectedType?: string;
  searchKeyword?: string;
};
type GetNotesByGroupPaginatedQueryKey = [
  string,
  GetNotesByGroupPaginatedParams,
];

// Jika hasilnya array of notes, bisa pakai any[] atau bikin type Note
export const getNotesByGroupPaginated: QueryFunction<
  Note[], // Ganti dengan type Note[] jika ada
  GetNotesByGroupPaginatedQueryKey,
  number
> = async ({ queryKey, pageParam }) => {
  const [, params] = queryKey;
  const {
    paraGroupId,
    selectedTags = [],
    selectedType = '',
    searchKeyword = '',
  } = params;

  const supabase = createClient();
  const pageSize = 16;

  let query = supabase
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
    .eq('para_group_id', paraGroupId)
    .order('created_at', { ascending: false });

  if (selectedType && selectedType !== '') {
    query = query.eq('type', selectedType);
  }

  if (searchKeyword && searchKeyword.trim() !== '') {
    const keyword = `%${searchKeyword}%`;

    // Gunakan filter OR antara title dan content_html
    query = query.or(`title.ilike.${keyword},content_html.ilike.${keyword}`);
  }

  if (selectedTags && selectedTags.length > 0) {
    const { data: tagIds, error: tagError } = await supabase
      .from('tags')
      .select('id')
      .in('name', selectedTags);

    if (tagError) throw new Error(tagError.message);
    if (!tagIds || tagIds.length === 0) return [];

    const { data: noteIds, error: noteError } = await supabase
      .from('note_tags')
      .select('note_id')
      .in(
        'tag_id',
        tagIds.map((tag) => tag.id),
      );

    if (noteError) throw new Error(noteError.message);
    if (!noteIds || noteIds.length === 0) return [];

    query = query.in(
      'id',
      noteIds.map((note) => note.note_id),
    );
  }

  const { data, error } = await query.range(
    pageParam * pageSize,
    (pageParam + 1) * pageSize - 1,
  );

  if (error) throw new Error(error.message);
  return data;
};

export const deleteNote = async (noteId: string) => {
  const supabase = createClient();

  const { error } = await supabase.from('notes').delete().eq('id', noteId);

  if (error) {
    throw new Error(error.message);
  }
};

export const getNoteTypesByGroupId = async (paraGroupId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('notes')
    .select('type')
    .eq('para_group_id', paraGroupId);

  if (error) throw new Error(error.message);

  const uniqueTypes = [...new Set(data.map((note) => note.type))];
  return uniqueTypes;
};
