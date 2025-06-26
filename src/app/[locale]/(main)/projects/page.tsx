'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { NewProject } from '@/features/projects/project-form';
import { DeleteProjectDialog } from '@/features/projects/delete-project-dialog';
import { getProjectsPaginated } from '@/utils/supabase/api/project';
import { useInfiniteQuery } from '@tanstack/react-query';
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
import { useState } from 'react';
import { Button } from '@/components/common/button';

function ProjectSkeleton() {
  return (
    <div className="border-projects/50 bg-projects/5 h-full animate-pulse rounded-lg border p-3">
      <div className="flex items-center gap-x-2">
        <div className="bg-projects/20 h-2 w-2 rounded-sm" />
        <div className="bg-projects/20 h-4 w-16 rounded-lg" />
        <div className="flex-1" />
        <div className="bg-projects/20 h-4 w-4 rounded-sm" />
      </div>

      <div className="my-2">
        <div className="bg-projects/20 h-5 w-3/4 rounded" />
        <div className="bg-projects/20 mt-1 h-4 w-1/2 rounded" />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="bg-projects/20 h-3 w-20 rounded" />
        <div className="bg-projects/20 h-3 w-16 rounded" />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const t = useTranslations('ProjectsPage');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['projects'],
      queryFn: getProjectsPaginated,
      getNextPageParam: (lastPage, allPages) => {
        // If last page has fewer items than page size, we've reached the end
        return lastPage.length === 12 ? allPages.length : undefined;
      },
      initialPageParam: 0,
    });

  const projects = data?.pages.flat() || [];

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    projectId: string;
    projectTitle: string;
  }>({
    isOpen: false,
    projectId: '',
    projectTitle: '',
  });

  const handleDeleteClick = (projectId: string, projectTitle: string) => {
    setDeleteDialog({
      isOpen: true,
      projectId,
      projectTitle,
    });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      projectId: '',
      projectTitle: '',
    });
  };

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
        {isLoading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </>
        ) : (
          projects?.map((project) => (
            <div
              key={project.id}
              className="border-projects/50 bg-projects/5 card-hover relative h-full transform rounded-lg border p-3 transition duration-300 hover:-translate-y-1"
            >
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2 cursor-pointer rounded-sm p-1 hover:bg-white">
                  <Ellipsis size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem disabled>
                    <Pin />
                    Pin
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Edit2 />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Archive />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleDeleteClick(project.id, project.title)}
                  >
                    <Trash2 className="text-destructive" />
                    <span className="text-destructive">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href={`/projects/${project.id}`}>
                <div className="flex items-center gap-x-2">
                  <div className="bg-projects h-2 w-2 rounded-sm" />
                  <div className="bg-projects/5 text-projects rounded-lg px-1.5 text-xs font-semibold capitalize">
                    {project.para_type}
                  </div>
                  <div className="h-6 flex-1" />
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
                    <span className="text-xs">{project.created_at}</span>
                  </div>

                  <div className="inline-block gap-x-2 align-middle">
                    <FileText size={12} className="mr-1 inline-block" />
                    <span className="text-xs">
                      {project.notes[0].count} notes
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </section>

      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More Projects'}
          </Button>
        </div>
      )}

      <DeleteProjectDialog
        projectId={deleteDialog.projectId}
        projectTitle={deleteDialog.projectTitle}
        isOpen={deleteDialog.isOpen}
        onCloseAction={handleCloseDeleteDialog}
      />
    </>
  );
}
