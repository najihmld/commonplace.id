'use client';

import React, { useState } from 'react';
import NoteTagsFilter from './note-tags-filter';
import NoteList from './note-list';

function ProjectNotesSection() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  return (
    <>
      <NoteTagsFilter
        selectedTags={selectedTags}
        onTagsChange={handleTagsChange}
      />
      <NoteList selectedTags={selectedTags} />
    </>
  );
}

export default ProjectNotesSection;
