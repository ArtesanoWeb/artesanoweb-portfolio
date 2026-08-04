import Link from "next/link";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="Henrique Alvarez — home"
          className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground"
        >
          HA
        </Link>
        <ul className="flex gap-4 overflow-x-auto text-sm text-muted sm:gap-6">
          {links.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
