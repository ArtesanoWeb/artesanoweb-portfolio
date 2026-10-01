"use client";

import { useState } from "react";
import { TitleBar } from "@/components/ide/TitleBar";
import { ActivityBar } from "@/components/ide/ActivityBar";
import { Sidebar } from "@/components/ide/Sidebar";
import { EditorArea } from "@/components/ide/EditorArea";
import { StatusBar } from "@/components/ide/StatusBar";
import type { RenderedFile } from "@/lib/ide-files";

export function IdeShell({ files }: { files: RenderedFile[] }) {
  const [openTabIds, setOpenTabIds] = useState<string[]>(["about"]);
  const [activeId, setActiveId] = useState<string | null>("about");

  function openFile(id: string) {
    setOpenTabIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveId(id);
  }

  function selectTab(id: string) {
    setActiveId(id);
  }

  function closeTab(id: string) {
    setOpenTabIds((prev) => {
      const index = prev.indexOf(id);
      const next = prev.filter((tabId) => tabId !== id);
      if (activeId === id) {
        const fallback = next[index - 1] ?? next[0] ?? null;
        setActiveId(fallback);
      }
      return next;
    });
  }

  const openFiles = openTabIds
    .map((id) => files.find((file) => file.id === id))
    .filter((file): file is RenderedFile => Boolean(file));
  const activeFile = files.find((file) => file.id === activeId) ?? null;

  return (
    <div className="flex h-full flex-col overflow-hidden text-[#1e1e1e]">
      <TitleBar />
      <div className="flex min-h-0 flex-1">
        <ActivityBar />
        <Sidebar files={files} activeFileId={activeId} onOpenFile={openFile} />
        <EditorArea
          openFiles={openFiles}
          activeFileId={activeId}
          html={activeFile?.html ?? null}
          onSelectTab={selectTab}
          onCloseTab={closeTab}
        />
      </div>
      <StatusBar activeFileName={activeFile?.name ?? null} />
    </div>
  );
}
