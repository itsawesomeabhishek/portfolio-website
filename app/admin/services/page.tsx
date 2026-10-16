import { getServices } from "@/lib/data";
import { ServicesManager } from "./ServicesManager";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <span className="border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-black uppercase text-ink">
          SECTION 04
        </span>
        <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
          Services & Offerings
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Configure service cards, descriptions, and feature bullet points shown to clients and recruiters.
        </p>
      </div>

      <ServicesManager initialServices={services} />
    </div>
  );
}
