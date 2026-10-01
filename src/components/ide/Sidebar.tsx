"use client";

import type { RenderedFile } from "@/lib/ide-files";

function FileIcon() {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-[#3178c6] text-[9px] font-bold text-white">
      TS
    </span>
  );
}

export function Sidebar({
  files,
  activeFileId,
  onOpenFile,
}: {
  files: RenderedFile[];
  activeFileId: string | null;
  onOpenFile: (id: string) => void;
}) {
  return (
    <aside className="hidden w-56 shrink-0 flex-col bg-[#f3f3f3] text-[13px] text-[#3b3b3b] sm:flex">
      <div className="px-4 pb-1 pt-3 text-[11px] font-semibold tracking-wide text-[#6b6b6b]">
        EXPLORER
      </div>
      <div className="px-3 pb-1 pt-2 text-[11px] font-semibold text-[#3b3b3b]">
        PORTFOLIO
      </div>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <button
              onClick={() => onOpenFile(file.id)}
              className={`flex w-full items-center gap-2 py-[3px] pl-8 pr-2 text-left hover:bg-[#e8e8e8] ${
                activeFileId === file.id ? "bg-[#e4e6f1]" : ""
              }`}
            >
              <FileIcon />
              {file.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
