// lib/supabase/tags.ts
import { createClient } from '@/utils/supabase/client';

export const getTagsByGroupId = async (paraGroupId: string) => {
  const supabase = createClient();

  // First, get the note IDs for the para group
  const { data: noteIds, error: noteError } = await supabase
    .from('notes')
    .select('id')
    .eq('para_group_id', paraGroupId);

  if (noteError) throw new Error(noteError.message);
  if (!noteIds || noteIds.length === 0) return [];

  // Then, get the tag IDs from note_tags
  const { data: tagIds, error: tagError } = await supabase
    .from('note_tags')
    .select('tag_id')
    .in(
      'note_id',
      noteIds.map((note) => note.id),
    );

  if (tagError) throw new Error(tagError.message);
  if (!tagIds || tagIds.length === 0) return [];

  // Finally, get the tags
  const { data, error } = await supabase
    .from('tags')
    .select('id, name')
    .in(
      'id',
      tagIds.map((tag) => tag.tag_id),
    );

  if (error) throw new Error(error.message);
  return data;
};
