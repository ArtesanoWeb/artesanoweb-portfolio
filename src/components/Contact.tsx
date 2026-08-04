import { Section } from "@/components/Section";
import { profile } from "@/lib/cv-data";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-xl text-foreground/90">
        I&apos;m currently open to frontend and full-stack roles — remote or in
        Cochabamba / Santa Cruz, Bolivia. The fastest way to reach me is email.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          <MailIcon className="size-4" />
          {profile.email}
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
        >
          <LinkedInIcon className="size-4" />
          LinkedIn
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
        >
          <GitHubIcon className="size-4" />
          GitHub
        </a>
      </div>
    </Section>
  );
}
