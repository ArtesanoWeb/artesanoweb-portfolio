"use client";

import { useState } from "react";
import { TitleBar } from "@/components/ide/TitleBar";
import { ActivityBar } from "@/components/ide/ActivityBar";
import { Sidebar } from "@/components/ide/Sidebar";
import { EditorArea, type EditorTab } from "@/components/ide/EditorArea";
import { ArtesanPanel } from "@/components/ide/ArtesanPanel";
import { StatusBar } from "@/components/ide/StatusBar";
import type { RenderedFile } from "@/lib/ide-files";
import type { ArtesanStepMeta } from "@/lib/artesan";

const ARTESAN_TAB_ID = "artesan";
const ARTESAN_TAB_NAME = "Artesan Code";

export function IdeShell({
  explorerFiles,
  detailFiles,
  steps,
}: {
  explorerFiles: RenderedFile[];
  detailFiles: RenderedFile[];
  steps: ArtesanStepMeta[];
}) {
  const allFiles = [...explorerFiles, ...detailFiles];
  const [openTabIds, setOpenTabIds] = useState<string[]>([ARTESAN_TAB_ID]);
  const [activeId, setActiveId] = useState<string>(ARTESAN_TAB_ID);

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
        setActiveId(next[index - 1] ?? next[0] ?? ARTESAN_TAB_ID);
      }
      return next;
    });
  }

  const openTabs: EditorTab[] = openTabIds.map((id) =>
    id === ARTESAN_TAB_ID
      ? { id: ARTESAN_TAB_ID, name: ARTESAN_TAB_NAME, kind: "artesan" }
      : { id, name: allFiles.find((file) => file.id === id)?.name ?? id, kind: "file" }
  );

  const activeFile = allFiles.find((file) => file.id === activeId) ?? null;
  const activeFileName = activeId === ARTESAN_TAB_ID ? ARTESAN_TAB_NAME : (activeFile?.name ?? null);

  return (
    <div className="flex h-full flex-col overflow-hidden text-[#1e1e1e]">
      <TitleBar />
      <div className="flex min-h-0 flex-1">
        <ActivityBar />
        <Sidebar files={explorerFiles} activeFileId={activeId} onOpenFile={openFile} />
        <EditorArea
          openTabs={openTabs}
          activeTabId={activeId}
          onSelectTab={selectTab}
          onCloseTab={closeTab}
        >
          {activeId === ARTESAN_TAB_ID ? (
            <ArtesanPanel steps={steps} onOpenDetail={openFile} />
          ) : activeFile ? (
            <div
              className="ide-code-pane [&_pre]:m-0! [&_pre]:min-h-full [&_pre]:bg-white! [&_pre]:px-4 [&_pre]:py-3 [&_pre]:text-[13px] [&_pre]:leading-[1.6] [&_pre]:whitespace-pre-wrap [&_pre]:wrap-break-word sm:[&_pre]:whitespace-pre sm:[&_pre]:break-normal"
              dangerouslySetInnerHTML={{ __html: activeFile.html }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#8a8a8a]">
              No file open
            </div>
          )}
        </EditorArea>
      </div>
      <StatusBar activeFileName={activeFileName} />
    </div>
  );
}
