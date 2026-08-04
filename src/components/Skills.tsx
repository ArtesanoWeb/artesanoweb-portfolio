import { Section } from "@/components/Section";
import { skills } from "@/lib/cv-data";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="space-y-5">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <h3 className="w-40 shrink-0 text-sm font-medium text-muted">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
