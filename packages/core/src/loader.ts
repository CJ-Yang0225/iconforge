import fg from "fast-glob";
import path from "path";
import fs from "fs-extra";

export interface LoadedIcon {
  name: string;
  content: string;
  path: string;
}

export async function loadIcons(srcDirs: string[]): Promise<LoadedIcon[]> {
  const entries = await fg(
    srcDirs.map((dir) => path.join(dir, "**/*.svg")),
    { absolute: true },
  );

  const icons: LoadedIcon[] = [];

  for (const entry of entries) {
    const content = await fs.readFile(entry, "utf-8");
    const name = path.basename(entry, ".svg");
    // Normalize name: replace spaces/dashes with underscores, etc. if needed
    // For now, we trust the filename is a valid identifier or close to it.
    // We might want to enforce snake_case or similar later.

    icons.push({
      name,
      content,
      path: entry,
    });
  }

  return icons;
}
