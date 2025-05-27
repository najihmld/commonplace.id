import { AppSidebar } from '@/app/admin/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/common/sidebar';
import { cookies } from 'next/headers';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

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
