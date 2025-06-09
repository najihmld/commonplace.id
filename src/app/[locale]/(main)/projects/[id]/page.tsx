import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/common/breadcrumb';
import { NewNote } from '@/features/projects/note-form';
import { Calendar, FileText, Tag } from 'lucide-react';

export type NoteType = 'idea' | 'quote' | 'insight' | 'book note';

export interface Note {
  id: string;
  content: string;
  type: NoteType;
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
  itemId: string;
  isFavorite: boolean;
}

const sampleNotes: Note[] = [
  {
    id: '1',
    content:
      'Consider using Framer Motion for smooth animations and micro-interactions',
    type: 'idea',
    tags: ['animation', 'framer-motion', 'ux'],
    createdAt: new Date('2024-01-16'),
    itemId: '1',
    isFavorite: false,
  },
  {
    id: '2',
    content: '"Good design is as little design as possible" - Dieter Rams',
    type: 'quote',
    tags: ['design', 'minimalism'],
    createdAt: new Date('2024-01-17'),
    itemId: '1',
    isFavorite: true,
  },
  {
    id: '3',
    content:
      'Newsletter should focus on actionable insights rather than just news',
    type: 'insight',
    tags: ['content', 'strategy'],
    createdAt: new Date('2024-01-21'),
    itemId: '2',
    isFavorite: false,
  },
  {
    id: '4',
    content: 'Used Canon EOS R6 with 24-70mm lens for landscape photography',
    type: 'book note',
    tags: ['photography', 'equipment'],
    createdAt: new Date('2023-05-10'),
    itemId: '6',
    isFavorite: false,
  },
];

const noteTypeConfig = {
  idea: {
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    card: 'note-idea border-2',
    icon: '💡',
  },
  quote: {
    badge:
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
    card: 'note-quote border-2',
    icon: '💬',
  },
  insight: {
    badge:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    card: 'note-insight border-2',
    icon: '⚡',
  },
  'book note': {
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    card: 'note-book-note border-2',
    icon: '📚',
  },
};

function ProjectsNotes() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Redesign Portfolio Website</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <br />

      <section>
        <div className="flex items-start justify-between">
          <div className="mb-4">
            <h1 className="text-text-primary text-2xl font-bold tracking-tight">
              Redesign Portfolio Website
            </h1>
            <h2 className="text-text-secondary">
              Complete overhaul of personal portfolio with modern design and
              better UX
            </h2>
          </div>

          <NewNote />
        </div>

        <div className="text-text-secondary flex items-center gap-x-6">
          <div className="inline-block gap-x-2 align-middle">
            <Calendar size={14} className="mr-1 inline-block" />
            <span className="text-sm">Created 12 Jun 2025</span>
          </div>

          <div className="inline-block gap-x-2 align-middle">
            <FileText size={14} className="mr-1 inline-block" />
            <span className="text-sm">2 notes</span>
          </div>
        </div>
      </section>
      <br />

      <section>
        <div className="grid grid-cols-4 gap-4">
          {sampleNotes.map((note) => {
            const config = noteTypeConfig[note.type];
            return (
              <div
                key={note.id}
                className="card-hover flex h-full transform flex-col justify-between rounded-lg border bg-white p-3 transition duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-x-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{config.icon}</span>
                    <div className="bg-projects/5 text-projects rounded-lg px-1.5 text-xs font-semibold capitalize">
                      {note.type}
                    </div>
                  </div>
                  <div className="flex-1" />
                </div>

                <div className="my-4 flex-1 text-sm">{note.content}</div>

                <div>
                  <div className="mb-2 flex items-center gap-1">
                    <Tag size={12} className="text-text-secondary" />
                    {note.tags.map((tag) => (
                      <div
                        key={tag}
                        className="text-text-secondary w-fit rounded-lg border bg-white px-1.5 text-xs"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-text-secondary" />
                    <div className="text-text-secondary text-xs">
                      12 Jul 2025
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default ProjectsNotes;
