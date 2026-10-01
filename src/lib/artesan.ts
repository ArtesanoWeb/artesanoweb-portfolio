import { experience, type ExperienceEntry } from "@/lib/cv-data";
import type { Repo } from "@/lib/github";

export type ArtesanStepKind = "experience" | "project";

export type ArtesanStep = {
  id: string;
  kind: ArtesanStepKind;
  inLabel: string;
  inMeta: string;
  outSummary: string;
  tabName: string;
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

function pascalCase(value: string): string {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}

function experienceSource(entry: ExperienceEntry): string {
  const outcomes = entry.bullets
    .map((bullet) => `      <Outcome>${JSON.stringify(bullet)}</Outcome>`)
    .join("\n");

  return `export function ${pascalCase(entry.company)}() {
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
  const experienceSteps: ArtesanStep[] = experience.map((entry, index) => ({
    id: `exp-${index}`,
    kind: "experience",
    inLabel: `${entry.role} @ ${entry.company}`,
    inMeta: `${entry.location} · ${entry.period}`,
    outSummary: `${entry.bullets.length} outcome${entry.bullets.length === 1 ? "" : "s"}`,
    tabName: `${slug(entry.company)}.tsx`,
    source: experienceSource(entry),
  }));

  const projectSteps: ArtesanStep[] = repos.map((repo) => ({
    id: `project-${repo.name}`,
    kind: "project",
    inLabel: repo.name,
    inMeta: repo.language ?? "—",
    outSummary: repo.description ?? "No description provided.",
    tabName: `${slug(repo.name)}.tsx`,
    source: projectSource(repo),
  }));

  return [...experienceSteps, ...projectSteps];
}
