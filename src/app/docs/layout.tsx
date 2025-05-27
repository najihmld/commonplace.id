import { SidebarProvider, SidebarTrigger } from '@/components/common/sidebar';
import { cookies } from 'next/headers';
import { AppSidebar } from './sidebar';

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_docs_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />

      <main>
        <header className="mb-4 flex">
          <SidebarTrigger />
        </header>

        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
