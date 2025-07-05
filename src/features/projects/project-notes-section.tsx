'use client';

import React, { useState } from 'react';
import NoteTagsFilter from './note-tags-filter';
import NoteList from './note-list';
import NoteTypeFilter from './note-type-filter';
function ProjectNotesSection() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleTypeClick = (typeValue: string) => {
    setSelectedType((prev) => (prev === typeValue ? '' : typeValue));
  };

  return (
    <>
      <NoteTypeFilter
        selectedType={selectedType}
        onTypeChange={handleTypeClick}
      />
      <NoteTagsFilter
        selectedTags={selectedTags}
        onTagsChange={handleTagsChange}
      />
      <NoteList selectedTags={selectedTags} selectedType={selectedType} />
    </>
  );
}

export default ProjectNotesSection;
