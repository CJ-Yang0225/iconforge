import { loadIcons, LoadedIcon } from "./loader";
import { optimizeIcon } from "./optimizer";
import { IconForgeConfig } from "./config";

export interface ProcessedIcon extends LoadedIcon {
  optimizedContent: string;
  // We can add AST or other metadata here later
}

export async function processIcons(
  config: IconForgeConfig,
): Promise<ProcessedIcon[]> {
  const icons = await loadIcons(config.srcDirs);

  return icons.map((icon) => {
    const optimizedContent = optimizeIcon(icon.content, config);
    return {
      ...icon,
      optimizedContent,
    };
  });
}
