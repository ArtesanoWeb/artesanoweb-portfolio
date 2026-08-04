import { Section } from "@/components/Section";
import { ExternalLinkIcon, StarIcon } from "@/components/Icons";
import { getPinnedRepos } from "@/lib/github";
import { profile } from "@/lib/cv-data";

function formatUpdated(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export async function Projects() {
  const repos = await getPinnedRepos();

  return (
    <Section id="projects" title="Projects">
      {repos.length === 0 ? (
        <p className="text-sm text-muted">
          Couldn&apos;t load projects right now — see them directly on{" "}
          <a href={profile.github} target="_blank" rel="noreferrer" className="underline">
            GitHub
          </a>
          .
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold group-hover:text-accent">{repo.name}</h3>
                <ExternalLinkIcon className="size-4 shrink-0 text-muted" />
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {repo.description ?? "No description yet."}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>
                  {repo.language && <>{repo.language} &middot; </>}
                  Updated {formatUpdated(repo.updatedAt)}
                </span>
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1">
                    <StarIcon className="size-3.5" />
                    {repo.stars}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
      >
        View all on GitHub
        <ExternalLinkIcon className="size-3.5" />
      </a>
    </Section>
  );
}
