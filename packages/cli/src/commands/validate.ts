import chalk from "chalk";
import ora from "ora";
import { processIcons } from "@iconforge/core";
import { loadConfig } from "../utils/loadConfig";

export async function validateCommand() {
  const spinner = ora("Validating icons...").start();

  try {
    const config = await loadConfig();
    const icons = await processIcons(config);

    if (icons.length === 0) {
      spinner.warn("No icons found to validate.");
      return;
    }

    // Basic validation: Check for duplicate names (already handled by loader mostly, but good to check)
    const names = new Set<string>();
    const duplicates: string[] = [];

    icons.forEach((icon) => {
      if (names.has(icon.name)) {
        duplicates.push(icon.name);
      }
      names.add(icon.name);
    });

    if (duplicates.length > 0) {
      spinner.fail(
        chalk.red(`Found duplicate icon names: ${duplicates.join(", ")}`),
      );
      process.exit(1);
    }

    // Check for empty content
    const emptyIcons = icons.filter(
      (i) => !i.optimizedContent || i.optimizedContent.length === 0,
    );
    if (emptyIcons.length > 0) {
      spinner.fail(
        chalk.red(
          `Found empty icons: ${emptyIcons.map((i) => i.name).join(", ")}`,
        ),
      );
      process.exit(1);
    }

    spinner.succeed(chalk.green("All icons are valid!"));
  } catch (error) {
    spinner.fail(chalk.red("Validation failed."));
    console.error(error);
    process.exit(1);
  }
}
