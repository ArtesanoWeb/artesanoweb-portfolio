import { Section } from "@/components/Section";
import { experience } from "@/lib/cv-data";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-10">
        {experience.map((entry) => (
          <div key={`${entry.company}-${entry.period}`} className="border-l-2 border-border pl-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-semibold">{entry.role}</h3>
              <span className="text-sm text-muted">{entry.period}</span>
            </div>
            <p className="text-sm text-accent">{entry.company}</p>
            <p className="mb-3 text-sm text-muted">{entry.location}</p>
            <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-foreground/90">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
