import { profile } from "@/lib/cv-data";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path strokeLinecap="round" d="m20 20-4.5-4.5" />
    </svg>
  );
}

function GitBranchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
      <circle cx="6" cy="5" r="2.2" />
      <circle cx="6" cy="19" r="2.2" />
      <circle cx="18" cy="12" r="2.2" />
      <path strokeLinecap="round" d="M6 7.2V16.8M6 9.5c0 3 3.5 2.5 6 2.5h3.8" />
    </svg>
  );
}

function ExtensionsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 4.5h3V6a1.5 1.5 0 0 0 3 0V4.5h3A1.5 1.5 0 0 1 19.5 6v3H18a1.5 1.5 0 0 0 0 3h1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3V15a1.5 1.5 0 0 0-3 0v1.5H9A1.5 1.5 0 0 1 7.5 15v-3H6a1.5 1.5 0 0 1 0-3h1.5V6A1.5 1.5 0 0 1 9 4.5Z"
      />
    </svg>
  );
}

function RunDebugIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
      <circle cx="12" cy="12" r="8.5" />
      <path fill="currentColor" stroke="none" d="M10 8.5v7l6-3.5-6-3.5Z" />
    </svg>
  );
}

const icons = [
  { id: "search", icon: SearchIcon, label: "Search" },
  { id: "git", icon: GitBranchIcon, label: "Source Control" },
  { id: "run", icon: RunDebugIcon, label: "Run and Debug" },
  { id: "extensions", icon: ExtensionsIcon, label: "Extensions" },
];

export function ActivityBar() {
  return (
    <div className="flex w-12 shrink-0 flex-col items-center justify-between bg-[#2c2c2c] py-2 text-[#c5c5c5]">
      <div className="flex flex-col gap-1">
        {icons.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            aria-label={label}
            title={label}
            className="flex size-12 items-center justify-center transition-colors hover:text-white"
          >
            <Icon />
          </button>
        ))}
      </div>
      <button
        aria-label="Account"
        title={profile.name}
        className="mb-1 flex size-9 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/20 transition-opacity hover:opacity-80"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${profile.github}.png`}
          alt={profile.name}
          className="size-full object-cover"
        />
      </button>
    </div>
  );
}
