import { profile, education, skills, spokenLanguages } from "@/lib/cv-data";

export type IdeFile = {
  id: string;
  name: string;
  language: "typescript" | "json" | "tsx";
  source: string;
};

export type RenderedFile = Omit<IdeFile, "source"> & { html: string };

function aboutSource(): string {
  return `export const about = {
  name: "${profile.name}",
  title: "${profile.title}",
  location: "${profile.location}",
  summary:
    "${profile.summary}",
  education: {
    degree: "${education.degree}",
    school: "${education.school}",
    location: "${education.location}",
    period: "${education.period}",
    note: "${education.note}",
  },
} as const;
`;
}

function skillsSource(): string {
  const entries = Object.entries(skills)
    .map(([category, items]) => {
      const key = category
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .split(" ")
        .filter(Boolean)
        .map((word, i) =>
          i === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
      return `  ${key}: [${items.map((i) => `"${i}"`).join(", ")}],`;
    })
    .join("\n");

  const languages = spokenLanguages
    .map((l) => `    { language: "${l.language}", level: "${l.level}" },`)
    .join("\n");

  return `export const skills = {
${entries}
  spokenLanguages: [
${languages}
  ],
} as const;
`;
}

function contactSource(): string {
  return `export const contact = {
  email: "${profile.email}",
  github: "${profile.github}",
  linkedin: "${profile.linkedin}",
  location: "${profile.location}",
} as const;
`;
}

export const ideFiles: IdeFile[] = [
  { id: "about", name: "about.ts", language: "typescript", source: aboutSource() },
  { id: "skills", name: "skills.ts", language: "typescript", source: skillsSource() },
  { id: "contact", name: "contact.ts", language: "typescript", source: contactSource() },
];

export function getIdeFile(id: string): IdeFile | undefined {
  return ideFiles.find((file) => file.id === id);
}
