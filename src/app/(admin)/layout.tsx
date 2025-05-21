import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/common/sidebar';
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
      <div className="py-2.5 pr-2.5 flex-1">
        <main className="bg-background rounded-2xl min-h-full p-4 md:p-4 lg:p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
