import { getContact } from "@/lib/data";
import { ContactManager } from "./ContactManager";

export default async function AdminContactPage() {
  const contact = await getContact();

  return (
    <div className="space-y-6">
      <div className="border-2 border-line bg-card p-6 shadow-hard">
        <span className="border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-black uppercase text-ink">
          SECTION 09
        </span>
        <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
          Contact Email & Social Links
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Manage your contact form recipient address and your social network links.
        </p>
      </div>

      <ContactManager initialContact={contact} />
    </div>
  );
}
