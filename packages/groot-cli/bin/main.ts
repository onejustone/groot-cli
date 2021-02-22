import slash from "slash";
import minimist from "minimist";
import program, { Command } from "commander";
import didYouMean from "didyoumean";
import chalk from "chalk";
import semver from "semver";
import pkg from "../package.json";

import { CommandEnum, CreateOptionEnum, CreateOption, createOptions } from "./command-define";
import create from "../lib/create";

import pickCommandOptions from "@/groot-cli-utils/pick-command-options";

function checkNodeVersion(required: string) {
    if (!semver.satisfies(process.version, required)) {
        console.log(`
            ${chalk.red(`
                The node version mismatch, your current node version ${process.version} but required ${required} \n
                Please upgrade your node version.
            `)}
        `);
        process.exit(1);
    }
}

function suggestCommands(unknownCommand) {
    const availableCommands = program.commands.map((cmd) => {
        return cmd._name;
    });

    const suggestion = didYouMean(unknownCommand, availableCommands);
    if (suggestion) {
        console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
    }
}

checkNodeVersion(pkg.engines.node);

// enter debug mode when creating test repo
if (slash(process.cwd()).indexOf("/packages/test") > 0) {
    // todo
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    process.env.GROOT_CLI_DEBUG = true;
}

program.version(`groot-cli ${pkg.version}`).usage("<commad> [options]");

/** command::create */
program
    .command(`${CommandEnum.create} <projectName>`)
    .description("use groot-cli create a new project.")
    .option(`-${createOptions.preset.short} --${createOptions.preset.long}`, createOptions.preset.description)
    .option(`-${createOptions.git.short} --${createOptions.git.long}`, createOptions.git.description)
    .option(`-${createOptions.force.short} --${createOptions.force.long}`, createOptions.force.description)
    .option(`-${createOptions.default.short} --${createOptions.default.long}`, createOptions.default.description)
    .option(`-${createOptions.preset.short} --${createOptions.preset.long}`, createOptions.preset.description)
    .action((projectName: string, cmd: Command) => {
        const args = pickCommandOptions<CreateOption>(cmd);
        if (minimist(process.argv.slice(3))._.length > 1) {
            console.log(
                `${console.log(
                    chalk.yellow(
                        "\n Info: You provided more than one argument. " +
                            "The first one will be used as the app's name, " +
                            "the rest are ignored."
                    )
                )}`
            );
        }

        create(projectName, args);
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

// for unknown commands
program.arguments("<command>").action((cmd) => {
    console.log("Unknown command");
    program.outputHelp();
    console.log(`${chalk.red(`Unknown command ${chalk.yellow(cmd)}`)}`);
    console.log();
    suggestCommands(cmd);
});

// for -- help
program.on("--help", () => {
    console.log(`\n Run ${chalk.cyan(`groot <command> --help`)} get detail help`);
});

program.commands.forEach((c) => c.on("--help", () => console.log()));
