import { MainSidebar } from '@/features/main/main-sidebar';
import { SidebarProvider } from '@/components/common/sidebar';
import { cookies } from 'next/headers';
import { MainHeader } from '@/features/main/main-header';
import { ScrollArea } from '@/components/common/scroll-area';
import { Providers } from './providers';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <Providers>
      <SidebarProvider
        defaultOpen={defaultOpen}
        className="h-dvh overflow-hidden"
      >
        <MainSidebar />

        <div className="flex h-full flex-1 flex-col justify-center py-2.5 pr-2.5">
          <ScrollArea className="bg-background h-[calc(100dvh-24px)] rounded-xl border">
            <div className="bg-background sticky top-0 z-10">
              <MainHeader />
            </div>

            <main className="p-4 md:p-8 lg:p-12">{children}</main>
          </ScrollArea>
        </div>
      </SidebarProvider>
    </Providers>
  );
}
