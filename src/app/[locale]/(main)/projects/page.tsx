import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { NewProject } from '@/features/projects/project-form';
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
  originalCategory?: 'projects' | 'areas' | 'resources';
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
    title: 'Create Personal Knowledge Base',
    description: 'Set up and curate a second-brain knowledge system',
    category: 'project',
    createdAt: new Date('2024-02-05'),
    slug: 'create-personal-knowledge-base',
  },
  {
    id: '4',
    title: 'Build UI Component Library',
    description: 'Reusable React component library for future projects',
    category: 'project',
    createdAt: new Date('2024-02-18'),
    slug: 'build-ui-component-library',
  },
  {
    id: '5',
    title: 'Launch Design Podcast',
    description: 'Interview industry experts on design career journeys',
    category: 'project',
    createdAt: new Date('2024-03-01'),
    slug: 'launch-design-podcast',
  },
  {
    id: '6',
    title: 'Develop Portfolio Mobile App',
    description: 'Native app showcasing projects and case studies',
    category: 'project',
    createdAt: new Date('2024-03-10'),
    slug: 'develop-portfolio-mobile-app',
  },
  {
    id: '7',
    title: 'Write UX Strategy eBook',
    description: 'Comprehensive guide on UX strategy for startups',
    category: 'project',
    createdAt: new Date('2024-03-22'),
    slug: 'write-ux-strategy-ebook',
  },
  {
    id: '8',
    title: 'Organize Online Design Course',
    description: 'Four-week cohort-based course on product design',
    category: 'project',
    createdAt: new Date('2024-04-04'),
    slug: 'organize-online-design-course',
  },
  {
    id: '9',
    title: 'Redesign Personal Blog',
    description: 'Update styling, typography, and performance',
    category: 'project',
    createdAt: new Date('2024-04-18'),
    slug: 'redesign-personal-blog',
  },
  {
    id: '10',
    title: 'Implement Dark Mode',
    description: 'Add dark/light theme toggle across portfolio and blog',
    category: 'project',
    createdAt: new Date('2024-05-02'),
    slug: 'implement-dark-mode',
  },
  {
    id: '11',
    title: 'Conduct User Research',
    description: 'Interview 15 target users to validate new features',
    category: 'project',
    createdAt: new Date('2024-05-14'),
    slug: 'conduct-user-research',
  },
  {
    id: '12',
    title: 'Set Up CI/CD Pipeline',
    description: 'Automated testing and deployment via GitHub Actions',
    category: 'project',
    createdAt: new Date('2024-05-27'),
    slug: 'set-up-ci-cd-pipeline',
  },
  {
    id: '13',
    title: 'Optimize Page Performance',
    description: 'Improve Core Web Vitals for <2 s load times',
    category: 'project',
    createdAt: new Date('2024-06-05'),
    slug: 'optimize-page-performance',
  },
  {
    id: '14',
    title: 'Migrate Site to Next.js',
    description: 'SSR for faster loads and better SEO',
    category: 'project',
    createdAt: new Date('2024-06-18'),
    slug: 'migrate-site-to-nextjs',
  },
  {
    id: '15',
    title: 'Integrate Analytics & Heatmaps',
    description: 'Use Plausible + Hotjar for behavior insights',
    category: 'project',
    createdAt: new Date('2024-07-01'),
    slug: 'integrate-analytics-heatmaps',
  },
  {
    id: '16',
    title: 'Build Comprehensive Design System',
    description: 'Token-based system for colors, spacing, and typography',
    category: 'project',
    createdAt: new Date('2024-07-15'),
    slug: 'build-comprehensive-design-system',
  },
  {
    id: '17',
    title: 'Automate Social Media Publishing',
    description: 'Scripted cross-posting to Twitter, LinkedIn, and Medium',
    category: 'project',
    createdAt: new Date('2024-07-28'),
    slug: 'automate-social-media-publishing',
  },
  {
    id: '18',
    title: 'Refactor Legacy Codebase',
    description: 'Modernize outdated JavaScript modules to TypeScript',
    category: 'project',
    createdAt: new Date('2024-08-10'),
    slug: 'refactor-legacy-codebase',
  },
  {
    id: '19',
    title: 'Launch Community Forum',
    description: 'Self-hosted Discourse for readers and course alumni',
    category: 'project',
    createdAt: new Date('2024-08-23'),
    slug: 'launch-community-forum',
  },
  {
    id: '20',
    title: 'Publish Annual Design Trends Report',
    description: 'Data-driven PDF and web microsite',
    category: 'project',
    createdAt: new Date('2024-09-05'),
    slug: 'publish-design-trends-report',
  },
];

export default function ProjectsPage() {
  const t = useTranslations('ProjectsPage');
  return (
    <>
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-text-primary text-2xl font-bold tracking-tight">
            {t('title')}
          </h1>
          <h2 className="text-text-secondary">{t('description')}</h2>
        </div>

        <NewProject />
      </section>
      <br />

      <section className="grid grid-cols-3 gap-4">
        {items.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <div className="border-projects/50 bg-projects/5 card-hover h-full transform rounded-lg border p-3 transition duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-x-2">
                <div className="bg-projects h-2 w-2 rounded-sm" />
                <div className="bg-projects/5 text-projects rounded-lg px-1.5 text-xs font-semibold capitalize">
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
                  <span className="text-xs">12 Jun 2025</span>
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
