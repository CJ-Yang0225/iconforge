import { createJiti } from "jiti";
import path from "path";
import fs from "fs-extra";
import { IconForgeConfig, defaultConfig } from "@iconforge/core";

export async function loadConfig(): Promise<IconForgeConfig> {
  const configPath = path.join(process.cwd(), "iconforge.config.ts");

  if (!(await fs.pathExists(configPath))) {
    return defaultConfig;
  }

  const jiti = createJiti(process.cwd());
  const mod = (await jiti.import(configPath, {
    default: true,
  })) as { default?: IconForgeConfig } | IconForgeConfig;
  const userConfig =
    "default" in mod && mod.default ? mod.default : (mod as IconForgeConfig);

  return {
    ...defaultConfig,
    ...userConfig,
    output: {
      ...defaultConfig.output,
      ...userConfig?.output,
      formats: {
        ...defaultConfig.output.formats,
        ...userConfig?.output?.formats,
      },
    },
    colorProcessing: {
      ...defaultConfig.colorProcessing,
      ...userConfig?.colorProcessing,
    },
  };
}
