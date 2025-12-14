import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { processIcons } from "@iconforge/core";
import { loadConfig } from "../utils/loadConfig";
import { generateReact } from "../generators/react";
import { generateVue } from "../generators/vue";

export async function buildCommand() {
  const spinner = ora("Building icons...").start();

  try {
    const config = await loadConfig();

    // 1. Process Icons
    spinner.text = "Processing SVGs...";
    const icons = await processIcons(config);

    if (icons.length === 0) {
      spinner.warn("No icons found.");
      return;
    }

    // 2. Generate Output
    spinner.text = "Generating components...";

    // Ensure output directory exists
    await fs.ensureDir(config.output.dir);

    // Generate React components
    if (config.output.formats.react) {
      await generateReact(icons, config.output.dir);
    }

    // Generate Vue components
    if (config.output.formats.vue) {
      await generateVue(icons, config.output.dir);
    }

    // 3. Generate icon-registry.json for IDE/VSCode extension support
    const registry = {
      $schema: "https://iconforge.dev/schemas/registry.json",
      prefix: config.prefix,
      icons: Object.fromEntries(
        icons.map((icon) => [
          icon.name,
          {
            viewBox: icon.viewBox,
            content: icon.optimizedContent
              .replace(/<svg[^>]*>|<\/svg>/g, "")
              .trim(),
          },
        ])
      ),
    };
    await fs.writeFile(
      path.join(config.output.dir, "icon-registry.json"),
      JSON.stringify(registry, null, 2)
    );

    spinner.succeed(
      chalk.green(`Successfully generated ${icons.length} icons!`)
    );
  } catch (error) {
    spinner.fail(chalk.red("Build failed."));
    console.error(error);
    process.exit(1);
  }
}
