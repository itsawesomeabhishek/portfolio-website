import { getEducation } from "@/lib/data";
import { EducationForm } from "./EducationForm";

export default async function AdminEducationPage() {
  const education = await getEducation();

  return (
    <div className="space-y-6">
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <span className="border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-black uppercase text-ink">
          SECTION 06
        </span>
        <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
          Education & Degree Details
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Update university credentials, expected graduation, and academic highlights shown in Logs section.
        </p>
      </div>

      <EducationForm initialData={education} />
    </div>
  );
}
