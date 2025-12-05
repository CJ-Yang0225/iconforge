import { Command } from "commander";
import { initCommand } from "./commands/init";
import { version } from "../package.json";
import { buildCommand } from "./commands/build";
import { validateCommand } from "./commands/validate";

const program = new Command();

program.name("iconforge").description("IconForge CLI tool").version(version);

program
  .command("init")
  .description("Initialize IconForge configuration")
  .action(initCommand);

program.command("build").description("Build icons").action(buildCommand);

program
  .command("validate")
  .description("Validate icons")
  .action(validateCommand);

program.parse(process.argv);
