import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import {
  Archive,
  Calendar,
  Edit2,
  Ellipsis,
  FileText,
  Pin,
  Trash2,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface Item {
  id: string;
  title: string;
  description?: string;
  category: 'project' | 'area' | 'resource' | 'archive';
  createdAt: Date;
  slug: string;
  originalCategory?: 'projects' | 'areas' | 'resources'; // Track original category for filtering archives
  archivedAt?: Date;
}

const items: Item[] = [
  {
    id: '1',
    title: 'Redesign Portfolio Website',
    description:
      'Complete overhaul of personal portfolio with modern design and better UX',
    category: 'project',
    createdAt: new Date('2024-01-15'),
    slug: 'redesign-portfolio-website',
  },
  {
    id: '2',
    title: 'Launch Writing Newsletter',
    description: 'Weekly newsletter about design and technology trends',
    category: 'project',
    createdAt: new Date('2024-01-20'),
    slug: 'launch-writing-newsletter',
  },
  {
    id: '3',
    title: 'Redesign Portfolio Website',
    description:
      'Complete overhaul of personal portfolio with modern design and better UX',
    category: 'project',
    createdAt: new Date('2024-01-15'),
    slug: 'redesign-portfolio-website',
  },
  {
    id: '4',
    title: 'Launch Writing Newsletter',
    description: 'Weekly newsletter about design and technology trends',
    category: 'project',
    createdAt: new Date('2024-01-20'),
    slug: 'launch-writing-newsletter',
  },
];

export default function ProjectsPage() {
  const t = useTranslations('ProjectsPage');
  return (
    <>
      <h1 className="text-text-primary text-2xl font-bold tracking-tight">
        {t('title')}
      </h1>
      <h2 className="text-text-secondary">{t('description')}</h2>
      <br />

      <section className="grid grid-cols-3 gap-4">
        {items.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <div className="border-projects/50 bg-projects/5 card-hover h-full transform rounded-lg border p-3 transition duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-x-2">
                <div className="bg-projects h-2 w-2 rounded-sm" />
                <div className="bg-projects/5 text-projects rounded-sm px-1 text-xs font-semibold capitalize">
                  {project.category}
                </div>
                <div className="flex-1" />

                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer rounded-sm p-1 hover:bg-white">
                    <Ellipsis size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Pin />
                      Pin
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit2 />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="text-destructive" />
                      <span className="text-destructive">Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="text-text-primary my-2 line-clamp-2 text-base font-semibold">
                {project.title}
              </div>
              <div className="text-text-secondary text-sm">
                {project.description}
              </div>

              <div className="text-text-tertiary mt-2 flex items-center justify-between">
                <div className="inline-block gap-x-2 align-middle">
                  <Calendar size={12} className="mr-1 inline-block" />
                  <span className="text-xs">12 Jun 2025 23:54</span>
                </div>

                <div className="inline-block gap-x-2 align-middle">
                  <FileText size={12} className="mr-1 inline-block" />
                  <span className="text-xs">2 notes</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
