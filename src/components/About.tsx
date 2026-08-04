import { Section } from "@/components/Section";
import { education, spokenLanguages } from "@/lib/cv-data";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted">Education</h3>
          <p className="font-medium">{education.degree}</p>
          <p className="text-sm text-muted">{education.school}</p>
          <p className="text-sm text-muted">
            {education.location} &middot; {education.period}
          </p>
          <p className="mt-1 text-sm text-muted">{education.note}</p>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted">Languages</h3>
          <ul className="space-y-1">
            {spokenLanguages.map((lang) => (
              <li key={lang.language} className="text-sm">
                <span className="font-medium">{lang.language}</span>{" "}
                <span className="text-muted">— {lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
