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

        <div className="flex h-full flex-1 flex-col justify-center md:py-2.5 md:pr-2.5">
          <ScrollArea className="bg-background h-dvh md:h-[calc(100dvh-24px)] md:rounded-xl md:border">
            <div className="bg-background sticky top-0 z-10">
              <MainHeader />
            </div>

            <main className="p-4 md:px-8 lg:px-12">{children}</main>
          </ScrollArea>
        </div>
      </SidebarProvider>
    </Providers>
  );
}
