import { getProjects } from "@/lib/data";
import { ProjectsManager } from "./ProjectsManager";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <span className="border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-black uppercase text-ink">
          SECTION 02
        </span>
        <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
          Projects Management
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Add new portfolio projects, upload screenshots, specify live/github links, and reorder.
        </p>
      </div>

      <ProjectsManager initialProjects={projects} />
    </div>
  );
}
