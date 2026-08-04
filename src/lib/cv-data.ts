export const profile = {
  name: "Henrique Alvarez Corrales",
  title: "Software Developer",
  location: "Cochabamba, Bolivia",
  email: "henrique.alvarez.dev@gmail.com",
  linkedin: "https://linkedin.com/in/henrique-alvarez",
  github: "https://github.com/ArtesanoWeb",
  githubUsername: "ArtesanoWeb",
  summary:
    "Software developer with a background in Computer Science (Universidad Mayor de San Simón), with experience building web applications using React, Next.js, PostgreSQL, and Docker. Additional background in university teaching and technical support. Interested in web development and cloud computing, with strong ability to learn quickly and communicate effectively within teams.",
};

export type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Software Developer",
    company: "Cooperativa Quillacollo R.L.",
    location: "Quillacollo, Bolivia",
    period: "Jan 2026 – Jul 2026",
    bullets: [
      "Developed an executive report automation system for the organization, using React, Next.js, and PostgreSQL.",
      "Designed and implemented new features for internal applications based on requirements from different areas of the cooperative.",
      "Participated in the full software development lifecycle: requirements analysis, implementation, testing, and deployment with Docker.",
      "Provided technical support and corrective/evolutive maintenance to developed systems, collaborating with the systems team.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Startup Vaquita, FractalSoft",
    location: "Cochabamba, Bolivia (remote)",
    period: "Apr 2025 – Jun 2025",
    bullets: [
      "Designed and developed responsive web interfaces in React, adapted to multiple devices and screen sizes.",
      "Contributed to product definition, providing technical input from a frontend development perspective.",
    ],
  },
  {
    role: "Lab Assistant",
    company: "Universidad Mayor de San Simón, Department of Computer Science",
    location: "Cochabamba, Bolivia",
    period: "Jul 2024 – Feb 2025",
    bullets: [
      "Contributed to software development for various internal department projects.",
      "Provided technical support and hardware/software maintenance to students and faculty.",
    ],
  },
  {
    role: "Teaching Assistant",
    company: "Universidad Mayor de San Simón, Department of Computer Science",
    location: "Cochabamba, Bolivia",
    period: "Apr 2022 – Jun 2024",
    bullets: [
      'Supported the "Introduction to Programming" course for students across multiple engineering majors.',
      "Designed and delivered theoretical-practical programming sessions for the department.",
    ],
  },
];

export const education = {
  degree: "B.Sc. in Computer Science",
  school: "Universidad Mayor de San Simón",
  location: "Cochabamba, Bolivia",
  period: "August 2026",
  note: "Graduate, thesis defense pending.",
};

export const skills = {
  Languages: ["JavaScript", "Java", "Python"],
  Frontend: ["React", "Next.js", "React Native", "HTML", "CSS"],
  "Backend & Data": ["PostgreSQL"],
  "Tools & Platforms": ["Git", "GitHub", "Docker", "Jira", "Trello", "Postman"],
};

export const spokenLanguages = [
  { language: "Spanish", level: "Native" },
  { language: "English", level: "B1" },
];
