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

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectDetailClient id={id} />
      </HydrationBoundary>
      <br />

      <NoteList />
    </>
  );
}
