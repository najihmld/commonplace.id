import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/common/breadcrumb';
import NoteList from '@/features/projects/note-list';
import { getProjectByIdServer } from '@/utils/supabase/api/project';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ProjectDetailClient from './ProjectDetailClient';

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectByIdServer(id),
  });

  // const project = await getProjectById(id);
  // if (!project) return notFound();

  // console.log('===project', project);

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

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectDetailClient id={id} />
      </HydrationBoundary>
      <br />

      <NoteList />
    </>
  );
}
