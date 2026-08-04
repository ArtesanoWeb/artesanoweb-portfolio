import { profile } from "@/lib/cv-data";
import { DownloadIcon, MailIcon } from "@/components/Icons";

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 sm:pt-24">
      <p className="text-sm font-medium text-accent">{profile.title}</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-2 text-muted">{profile.location}</p>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/90">
        {profile.summary}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          <MailIcon className="size-4" />
          Get in touch
        </a>
        <a
          href="/cv/Henrique_Alvarez_CV_EN.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
        >
          <DownloadIcon className="size-4" />
          Download CV
        </a>
      </div>
    </section>
  );
}
