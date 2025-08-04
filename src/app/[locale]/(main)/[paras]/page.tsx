'use client';

import {
  DialogFormProject,
  useDialogFormProjectState,
} from '@/features/projects/project-form';
import { DeleteProjectDialog } from '@/features/projects/delete-project-dialog';
import { getProjectsPaginated } from '@/utils/supabase/api/project';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/common/button';
import { useParams } from 'next/navigation';
import { getParaTypeFromParamValue } from '@/features/projects/utils';
import { useSetParaGroupArchived } from '@/features/projects/useSetParaGroupArchived';
import ParaGroupCard from '@/features/projects/para-group-card';

// Custom hook for intersection observer
function useInView(callback: () => void, deps: React.DependencyList = []) {
  const ref = useRef<HTMLDivElement>(null);

  const memoizedCallback = useCallback(callback, deps);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            memoizedCallback();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [memoizedCallback]);

  return ref;
}

function ProjectSkeleton() {
  const params = useParams() as {
    paras: 'projects' | 'areas' | 'resources' | 'areas';
  };
  if (params.paras === 'projects') {
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
  } else if (params.paras === 'areas') {
    return (
      <div className="border-areas/50 bg-areas/5 h-full animate-pulse rounded-lg border p-3">
        <div className="flex items-center gap-x-2">
          <div className="bg-areas/20 h-2 w-2 rounded-sm" />
          <div className="bg-areas/20 h-4 w-16 rounded-lg" />
          <div className="flex-1" />
          <div className="bg-areas/20 h-4 w-4 rounded-sm" />
        </div>

        <div className="my-2">
          <div className="bg-areas/20 h-5 w-3/4 rounded" />
          <div className="bg-areas/20 mt-1 h-4 w-1/2 rounded" />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="bg-areas/20 h-3 w-20 rounded" />
          <div className="bg-areas/20 h-3 w-16 rounded" />
        </div>
      </div>
    );
  } else if (params.paras === 'resources') {
    return (
      <div className="border-resources/50 bg-resources/5 h-full animate-pulse rounded-lg border p-3">
        <div className="flex items-center gap-x-2">
          <div className="bg-resources/20 h-2 w-2 rounded-sm" />
          <div className="bg-resources/20 h-4 w-16 rounded-lg" />
          <div className="flex-1" />
          <div className="bg-resources/20 h-4 w-4 rounded-sm" />
        </div>

        <div className="my-2">
          <div className="bg-resources/20 h-5 w-3/4 rounded" />
          <div className="bg-resources/20 mt-1 h-4 w-1/2 rounded" />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="bg-resources/20 h-3 w-20 rounded" />
          <div className="bg-resources/20 h-3 w-16 rounded" />
        </div>
      </div>
    );
  }
  return (
    <div className="border-archives/50 bg-archives/5 h-full animate-pulse rounded-lg border p-3">
      <div className="flex items-center gap-x-2">
        <div className="bg-archives/20 h-2 w-2 rounded-sm" />
        <div className="bg-archives/20 h-4 w-16 rounded-lg" />
        <div className="flex-1" />
        <div className="bg-archives/20 h-4 w-4 rounded-sm" />
      </div>

      <div className="my-2">
        <div className="bg-archives/20 h-5 w-3/4 rounded" />
        <div className="bg-archives/20 mt-1 h-4 w-1/2 rounded" />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="bg-archives/20 h-3 w-20 rounded" />
        <div className="bg-archives/20 h-3 w-16 rounded" />
      </div>
    </div>
  );
}

export default function ParasPage() {
  const params = useParams() as {
    paras: 'projects' | 'areas' | 'resources';
  };
  const paraType = getParaTypeFromParamValue(params.paras);

  const t = useTranslations(`/${params.paras}`);
  const dialogFormAddProjectState = useDialogFormProjectState();
  const dialogFormEditProjectState = useDialogFormProjectState();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [params.paras, { paraType }],
      queryFn: getProjectsPaginated,
      getNextPageParam: (lastPage, allPages) => {
        // If last page has fewer items than page size, we've reached the end
        return lastPage.length === 12 ? allPages.length : undefined;
      },
      initialPageParam: 0,
    });

  const projects = data?.pages.flat() || [];
  console.log('projects', projects);

  // Auto-load more when scroll reaches bottom
  const loadMoreRef = useInView(
    useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]),
  );

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

  const setArchived = useSetParaGroupArchived();

  return (
    <>
      <section className="flex items-center justify-between gap-x-3">
        <div>
          <h1 className="text-text-primary text-xl font-bold tracking-tight md:text-2xl">
            {t('title')}
          </h1>
          <h2 className="text-text-secondary text-sm md:text-base">
            {t('description')}
          </h2>
        </div>

        <DialogFormProject
          {...dialogFormAddProjectState.props}
          renderTrigger={({ DialogTrigger, form }) => {
            if (paraType === 'archive') return null;
            return (
              <DialogTrigger>
                <Button
                  asChild
                  variant={paraType}
                  onClick={() => {
                    form.reset({
                      title: '',
                      description: '',
                    });
                  }}
                >
                  <span className="capitalize">
                    <Plus />
                    <span className="hidden md:block">New {paraType}</span>
                  </span>
                </Button>
              </DialogTrigger>
            );
          }}
        />
      </section>
      <br />

      <section>
        <DialogFormProject
          isEdit
          {...dialogFormEditProjectState.props}
          renderTrigger={({ DialogTrigger, form }) => (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {isLoading ? (
                <>
                  {[...Array(6)].map((_, i) => (
                    <ProjectSkeleton key={i} />
                  ))}
                </>
              ) : (
                projects?.map((project) => (
                  <ParaGroupCard
                    key={project.id}
                    DialogTrigger={DialogTrigger}
                    item={project}
                    onClickEdit={() => {
                      form.reset({
                        id: project.id,
                        title: project.title,
                        description: project.description,
                      });
                    }}
                    onClickArchive={() => {
                      setArchived.mutate({
                        id: project.id,
                        currentParaType: project.para_type,
                        originalParaType: project.original_para_type,
                      });
                    }}
                    onClickDelete={() => {
                      handleDeleteClick(project.id, project.title);
                    }}
                  />
                ))
              )}
            </div>
          )}
        />
      </section>

      {/* Intersection observer target for auto-loading */}
      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="col-span-3 mt-8 flex justify-center py-4"
          style={{ minHeight: '100px' }}
        >
          {isFetchingNextPage && (
            <div className="text-text-secondary text-sm">Loading more...</div>
          )}
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
