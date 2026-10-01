import { experience, type ExperienceEntry } from "@/lib/cv-data";
import type { Repo } from "@/lib/github";

export type ArtesanStepKind = "experience" | "project";

export type ArtesanStep = {
  id: string;
  kind: ArtesanStepKind;
  tabName: string;
  lineCount: number;
  inFields: [string, string][];
  outLines: string[];
  source: string;
};

export type ArtesanStepMeta = Omit<ArtesanStep, "source">;

function slug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function uniqueSlugger() {
  const used = new Map<string, number>();
  return (value: string) => {
    const base = slug(value);
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };
}

function pascalCase(value: string): string {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}

function lineCountOf(source: string): number {
  return source.trim().split("\n").length;
}

function formatUpdatedAt(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

function experienceSource(entry: ExperienceEntry): string {
  const outcomes = entry.bullets
    .map((bullet) => `      <Outcome>${JSON.stringify(bullet)}</Outcome>`)
    .join("\n");

  return `export function ${pascalCase(entry.role)}() {
  return (
    <Role
      title=${JSON.stringify(entry.role)}
      company=${JSON.stringify(entry.company)}
      location=${JSON.stringify(entry.location)}
      period=${JSON.stringify(entry.period)}
    >
${outcomes}
    </Role>
  );
}
`;
}

function projectSource(repo: Repo): string {
  return `export function ${pascalCase(repo.name)}() {
  return (
    <Project
      name=${JSON.stringify(repo.name)}
      description=${JSON.stringify(repo.description ?? "No description provided.")}
      language=${JSON.stringify(repo.language ?? "Unknown")}
      stars={${repo.stars}}
      url=${JSON.stringify(repo.htmlUrl)}
    />
  );
}
`;
}

export function buildArtesanSteps(repos: Repo[]): ArtesanStep[] {
  const nextSlug = uniqueSlugger();

  const experienceSteps: ArtesanStep[] = experience.map((entry, index) => {
    const source = experienceSource(entry);
    return {
      id: `exp-${index}`,
      kind: "experience",
      tabName: `${nextSlug(entry.role)}.tsx`,
      lineCount: lineCountOf(source),
      inFields: [
        ["role", entry.role],
        ["company", entry.company],
        ["location", entry.location],
        ["period", entry.period],
      ],
      outLines: entry.bullets,
      source,
    };
  });

  const projectSteps: ArtesanStep[] = repos.map((repo) => {
    const source = projectSource(repo);
    return {
      id: `project-${repo.name}`,
      kind: "project",
      tabName: `${nextSlug(repo.name)}.tsx`,
      lineCount: lineCountOf(source),
      inFields: [
        ["repo", repo.name],
        ["language", repo.language ?? "Unknown"],
        ["stars", String(repo.stars)],
        ["updated", formatUpdatedAt(repo.updatedAt)],
      ],
      outLines: [repo.description ?? "No description provided."],
      source,
    };
  });

  return [...experienceSteps, ...projectSteps];
}
