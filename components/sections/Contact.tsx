import { ExternalLink, Mail } from "lucide-react";
import { contact } from "@/content/contact";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";

import type { ContactInfo } from "@/content/types";

export function Contact({ contactData = contact }: { contactData?: ContactInfo }) {
  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading id="contact-title" eyebrow="OPEN TO OPPORTUNITIES">
        GET_IN_TOUCH
      </SectionHeading>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            Have an internship, project, or idea in mind? Send a message and I&apos;ll get back to you.
          </p>
          <p className="break-all font-mono text-sm font-bold">
            <Mail className="mr-2 inline size-4" aria-hidden="true" />
            <a href={`mailto:${contactData.email}`} className="underline underline-offset-4 hover:bg-neo-yellow">
              {contactData.email}
            </a>
          </p>
          <ul className="flex flex-wrap gap-4">
            {contactData.socials.map((social) => (
              <li key={social.label}>
                <Button href={social.href} external variant="outline">
                  {social.label}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm email={contactData.email} />
      </div>
    </Section>
  );
}

