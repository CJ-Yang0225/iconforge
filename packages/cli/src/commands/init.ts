import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";

export async function initCommand() {
  console.log(chalk.blue("IconForge Initialization"));

  const answers = await inquirer.prompt([
    {
      type: "confirm",
      name: "proceed",
      message: "Do you want to initialize IconForge in this directory?",
      default: true,
    },
  ]);

  if (!answers.proceed) {
    console.log("Initialization cancelled.");
    return;
  }

  const spinner = ora("Initializing...").start();

  try {
    // 1. Create iconforge.config.ts
    const configContent = `
      import { defineConfig } from '@iconforge/cli';

      export default defineConfig({
        srcDirs: ['src/assets/icons'],
        output: {
          dir: 'src/components/icons',
          formats: {
            svg: true,
            typescript: true,
            react: true,
          },
        },
      });
    `
      .replace(/^\s{6}/gm, "")
      .trim();

    await fs.writeFile(
      path.join(process.cwd(), "iconforge.config.ts"),
      configContent
    );

    // 2. Create src/assets/icons directory
    await fs.ensureDir(path.join(process.cwd(), "src/assets/icons"));

    // 3. Create .gitignore entry (append if exists)
    const gitignorePath = path.join(process.cwd(), ".gitignore");
    const ignoreEntry = "\n# IconForge generated files\nsrc/components/icons\n";

    if (await fs.pathExists(gitignorePath)) {
      const currentGitignore = await fs.readFile(gitignorePath, "utf-8");
      if (!currentGitignore.includes("src/components/icons")) {
        await fs.appendFile(gitignorePath, ignoreEntry);
      }
    } else {
      await fs.writeFile(gitignorePath, ignoreEntry);
    }

    spinner.succeed(chalk.green("IconForge initialized successfully!"));
    console.log(chalk.cyan("\nNext steps:"));
    console.log("1. Add your SVG icons to src/assets/icons");
    console.log("2. Run `npx iconforge build` to generate components");
  } catch (error) {
    spinner.fail(chalk.red("Initialization failed."));
    console.error(error);
  }
}
