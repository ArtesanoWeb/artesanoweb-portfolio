import { profile } from "@/lib/cv-data";

export type Repo = {
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  updatedAt: string;
  stars: number;
};

// Repos that exist on the account but aren't meant to be shown as portfolio pieces.
const EXCLUDED_REPOS = new Set(["prueba-hosting", "Practica-1---Web-development"]);

export async function getPinnedRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=10`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return (data as Array<Record<string, unknown>>)
      .filter((repo) => !EXCLUDED_REPOS.has(repo.name as string))
      .map((repo) => ({
        name: repo.name as string,
        description: repo.description as string | null,
        htmlUrl: repo.html_url as string,
        language: repo.language as string | null,
        updatedAt: repo.updated_at as string,
        stars: repo.stargazers_count as number,
      }));
  } catch {
    return [];
  }
}
