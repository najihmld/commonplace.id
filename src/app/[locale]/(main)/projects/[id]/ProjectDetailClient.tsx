'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/common/breadcrumb';
import { NewNote } from '@/features/projects/note-form';
import { Calendar, FileText } from 'lucide-react';
import { getProjectById } from '@/utils/supabase/api/project';
import { useQuery } from '@tanstack/react-query';
import { formatToLocalTime } from '@/utils/format-date-time';

export default function ProjectDetailClient({ id }: { id: string }) {
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!project) return <p>Project not found</p>;

  console.log('project', project);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <br />

      <section>
        <div className="flex items-start justify-between">
          <div className="mb-4">
            <h1 className="text-text-primary text-2xl font-bold tracking-tight">
              {project.title}
            </h1>
            <h2 className="text-text-secondary">{project.description}</h2>
          </div>

          <NewNote />
        </div>

        <div className="text-text-secondary flex items-center gap-x-6">
          <div className="inline-block gap-x-2 align-middle">
            <Calendar size={14} className="mr-1 inline-block" />
            <span className="text-sm">
              Created {formatToLocalTime(project.created_at)}
            </span>
          </div>

          <div className="inline-block gap-x-2 align-middle">
            <FileText size={14} className="mr-1 inline-block" />
            <span className="text-sm">{project.notes[0]?.count} notes</span>
          </div>
        </div>
      </section>
    </>
  );
}
