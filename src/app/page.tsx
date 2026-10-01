import { IdeShell } from "@/components/ide/IdeShell";
import { ideFiles, type IdeFile } from "@/lib/ide-files";
import { highlight } from "@/lib/highlight";
import { buildArtesanSteps } from "@/lib/artesan";
import { getPinnedRepos } from "@/lib/github";

async function renderFiles(files: IdeFile[]) {
  return Promise.all(
    files.map(async (file) => ({
      id: file.id,
      name: file.name,
      language: file.language,
      html: await highlight(file.source, file.language),
    }))
  );
}

export default async function Home() {
  const repos = await getPinnedRepos();
  const steps = buildArtesanSteps(repos);

  const explorerFiles = await renderFiles(ideFiles);
  const detailFiles = await renderFiles(
    steps.map((step) => ({
      id: step.id,
      name: step.tabName,
      language: "tsx",
      source: step.source,
    }))
  );

  const stepMeta = steps.map(({ id, kind, tabName, lineCount, inRows, outLines }) => ({
    id,
    kind,
    tabName,
    lineCount,
    inRows,
    outLines,
  }));

  return <IdeShell explorerFiles={explorerFiles} detailFiles={detailFiles} steps={stepMeta} />;
}
