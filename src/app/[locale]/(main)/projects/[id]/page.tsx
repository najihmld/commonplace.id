import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/common/breadcrumb';

function ProjectsNotes() {
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

      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-text-primary text-2xl font-bold tracking-tight">
            Redesign Portfolio Website
          </h1>
          <h2 className="text-text-secondary">
            Complete overhaul of personal portfolio with modern design and
            better UX
          </h2>
        </div>
      </section>
    </>
  );
}

export default ProjectsNotes;
