import { loadIcons, LoadedIcon } from "./loader";
import { optimizeIcon, extractViewBox } from "./optimizer";
import { IconForgeConfig } from "./config";

export interface ProcessedIcon extends LoadedIcon {
  optimizedContent: string;
  viewBox: string;
}

export async function processIcons(
  config: IconForgeConfig
): Promise<ProcessedIcon[]> {
  const icons = await loadIcons(config.srcDirs);

  return icons.map((icon) => {
    // 先提取 viewBox，再進行優化
    const viewBox = extractViewBox(icon.content);
    const optimizedContent = optimizeIcon(icon.content, config);
    return {
      ...icon,
      optimizedContent,
      viewBox,
    };
  });
}
