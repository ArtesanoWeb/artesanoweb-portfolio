import { IdeShell } from "@/components/ide/IdeShell";
import { ideFiles } from "@/lib/ide-files";
import { highlight } from "@/lib/highlight";

export default async function Home() {
  const files = await Promise.all(
    ideFiles.map(async (file) => ({
      id: file.id,
      name: file.name,
      language: file.language,
      html: await highlight(file.source, file.language),
    }))
  );

  return <IdeShell files={files} />;
}
