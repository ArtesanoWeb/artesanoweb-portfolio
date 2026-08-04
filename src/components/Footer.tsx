import { profile } from "@/lib/cv-data";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <div className="flex gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon className="size-5 transition-colors hover:text-foreground" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon className="size-5 transition-colors hover:text-foreground" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <MailIcon className="size-5 transition-colors hover:text-foreground" />
          </a>
        </div>
      </div>
    </footer>
  );
}
