import chalk from "chalk";
import ora from "ora";
import { processIcons } from "@iconforge/core";
import { loadConfig } from "../utils/loadConfig";

export async function statsCommand() {
  const spinner = ora("Collecting icon statistics...").start();

  try {
    const config = await loadConfig();
    const icons = await processIcons(config);

    if (icons.length === 0) {
      spinner.warn("No icons found.");
      return;
    }

    spinner.succeed(chalk.green("Statistics collected!\n"));

    // 計算統計資料
    const sizes = icons.map((icon) =>
      Buffer.byteLength(icon.optimizedContent, "utf-8")
    );
    const totalSize = sizes.reduce((a, b) => a + b, 0);
    const avgSize = Math.round(totalSize / icons.length);
    const minSize = Math.min(...sizes);
    const maxSize = Math.max(...sizes);

    // 找出最大和最小的 icon
    const minIcon = icons[sizes.indexOf(minSize)];
    const maxIcon = icons[sizes.indexOf(maxSize)];

    console.log(chalk.bold("📊 Icon Statistics"));
    console.log("─".repeat(40));
    console.log(`  Total icons:     ${chalk.cyan(icons.length)}`);
    console.log(`  Total size:      ${chalk.cyan(formatBytes(totalSize))}`);
    console.log(`  Average size:    ${chalk.cyan(formatBytes(avgSize))}`);
    console.log(
      `  Smallest icon:   ${chalk.green(minIcon.name)} (${formatBytes(minSize)})`
    );
    console.log(
      `  Largest icon:    ${chalk.yellow(maxIcon.name)} (${formatBytes(maxSize)})`
    );
    console.log("─".repeat(40));

    // 顯示所有 icon 列表
    console.log(chalk.bold("\n📋 Icon List"));
    icons
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((icon) => {
        const size = Buffer.byteLength(icon.optimizedContent, "utf-8");
        console.log(`  • ${icon.name} (${formatBytes(size)})`);
      });
  } catch (error) {
    spinner.fail(chalk.red("Failed to collect statistics."));
    console.error(error);
    process.exit(1);
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
