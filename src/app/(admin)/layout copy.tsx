import Siderbar from '@/components/layouts/Siderbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background-secondary">
      <Siderbar />

      <main className="bg-background rounded-2xl flex-1 my-6 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        {children}
      </main>
    </div>
  );
}
