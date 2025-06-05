import { MainSidebar } from '@/features/main/main-sidebar';
import { SidebarProvider } from '@/components/common/sidebar';
import { cookies } from 'next/headers';
import { MainHeader } from '@/features/main/main-header';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <MainSidebar />

      <div className="flex-1 py-2.5 pr-2.5">
        <div className="bg-background min-h-full rounded-xl">
          <MainHeader />

          <main className="p-4 md:p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
