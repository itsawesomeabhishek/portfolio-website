import { Navbar } from "@/components/chrome/Navbar";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { BackToTop } from "@/components/chrome/BackToTop";
import { About } from "@/components/sections/About";
import { CodingStats } from "@/components/sections/CodingStats";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Logs } from "@/components/sections/Logs";
import { Projects } from "@/components/sections/Projects";
import { Quotes } from "@/components/sections/Quotes";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Marquee } from "@/components/ui/Marquee";
import {
  getIdentity,
  getStack,
  getProjects,
  getServices,
  getStats,
  getEducation,
  getCertificates,
  getQuotes,
  getContact,
} from "@/lib/data";

const roleTape = [
  "FULL-STACK DEVELOPER",
  "CS STUDENT",
  "OPEN TO INTERNSHIPS",
  "REACT • NEXT.JS • TYPESCRIPT",
];

export default async function Home() {
  const [
    identity,
    stackItems,
    projectsList,
    servicesList,
    { stats, githubProfile },
    educationData,
    certificatesData,
    quotesList,
    contactData,
  ] = await Promise.all([
    getIdentity(),
    getStack(),
    getProjects(),
    getServices(),
    getStats(),
    getEducation(),
    getCertificates(),
    getQuotes(),
    getContact(),
  ]);

  const skillTape = stackItems.map((node) => node.tech.toUpperCase());

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero data={identity} />
        <Marquee label="Roles" items={roleTape} repeat={3} className="text-2xl font-bold" />
        <Marquee
          label="Skills"
          items={skillTape}
          direction="right"
          className="border-t-0 text-xl font-bold"
        />
        <About data={identity} />
        <TechStack items={stackItems} />
        <Logs educationData={educationData} certificatesData={certificatesData} />
        <Projects items={projectsList} />
        <CodingStats items={stats} profileUrl={githubProfile} />
        <Quotes items={quotesList} />
        <Services items={servicesList} />
        <Contact contactData={contactData} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
