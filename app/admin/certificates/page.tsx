import { getCertificates } from "@/lib/data";
import { CertificatesManager } from "./CertificatesManager";

export default async function AdminCertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div className="space-y-6">
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <span className="border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-black uppercase text-ink">
          SECTION 07
        </span>
        <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
          Certificates & Accreditations
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Upload and manage verified certification badges from HackerRank, Microsoft Azure, and other providers.
        </p>
      </div>

      <CertificatesManager initialCertificates={certificates} />
    </div>
  );
}
