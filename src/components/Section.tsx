export function Section({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-3xl px-6 py-16 ${className ?? ""}`}>
      {title && (
        <h2 className="mb-8 text-sm font-semibold tracking-widest text-muted uppercase">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
