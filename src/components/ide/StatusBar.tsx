function BranchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5">
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="12" r="2" />
      <path strokeLinecap="round" d="M6 7v10M6 9c0 3 3.5 2.5 6 2.5h4" />
    </svg>
  );
}

export function StatusBar({ activeFileName }: { activeFileName: string | null }) {
  return (
    <div className="flex h-6 shrink-0 items-center justify-between bg-[#007acc] px-2 text-[12px] text-white">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <BranchIcon />
          develop
        </span>
      </div>
      <div className="flex items-center gap-3">
        {activeFileName && <span>TypeScript</span>}
        <span>UTF-8</span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}
