import { getProjectByServer, ParaType } from '@/utils/supabase/api/project';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ProjectDetailClient from './ProjectDetailClient';
import ProjectNotesSection from '@/features/projects/project-notes-section';
import { getParaTypeFromParamValue } from '@/features/projects/utils';

export default async function ParaDetailPage({
  params,
}: {
  params: { id: string; paras: ParaType };
}) {
  const { id, paras } = await params;
  const paraType = getParaTypeFromParamValue(paras);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [paraType, id],
    queryFn: () => getProjectByServer({ id, paraType }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectDetailClient id={id} />
      </HydrationBoundary>
      <br />
      <ProjectNotesSection />
    </>
  );
}
