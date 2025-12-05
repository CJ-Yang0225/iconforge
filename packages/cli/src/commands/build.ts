import chalk from "chalk";
import ora from "ora";
import { processIcons } from "@iconforge/core";
import { loadConfig } from "../utils/loadConfig";
import { generateReact } from "../generators/react";

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
    if (config.output.formats.react) {
      await generateReact(icons, config.output.dir);
    }

    spinner.succeed(
      chalk.green(`Successfully generated ${icons.length} icons!`),
    );
  } catch (error) {
    spinner.fail(chalk.red("Build failed."));
    console.error(error);
    process.exit(1);
  }
}
