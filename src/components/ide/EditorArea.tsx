"use client";

import type { ReactNode } from "react";

export type EditorTab = { id: string; name: string; kind: "file" | "artesan" };

function FileIcon() {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-[#3178c6] text-[9px] font-bold text-white">
      TS
    </span>
  );
}

function BotIcon() {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-[#8957e5] text-[9px] font-bold text-white">
      AI
    </span>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4} className="size-3.5">
      <path strokeLinecap="round" d="m4 4 8 8m0-8-8 8" />
    </svg>
  );
}

export function EditorArea({
  openTabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  children,
}: {
  openTabs: EditorTab[];
  activeTabId: string | null;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col bg-white">
      <div className="flex h-9 shrink-0 items-stretch overflow-x-auto border-b border-[#e3e3e3] bg-[#f3f3f3]">
        {openTabs.map((tab) => {
          const active = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`group flex shrink-0 items-center gap-2 border-r border-[#e3e3e3] px-3 text-[13px] ${
                active
                  ? "border-t-2 border-t-[#007acc] bg-white text-[#1e1e1e]"
                  : "border-t-2 border-t-transparent text-[#6b6b6b] hover:bg-[#ececec]"
              }`}
            >
              {tab.kind === "artesan" ? <BotIcon /> : <FileIcon />}
              {tab.name}
              <span
                role="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                className="rounded p-0.5 text-transparent hover:bg-[#d8d8d8] group-hover:text-[#6b6b6b]"
                aria-label={`Close ${tab.name}`}
              >
                <CloseIcon />
              </span>
            </button>
          );
        })}
      </div>
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </div>
  );
}
