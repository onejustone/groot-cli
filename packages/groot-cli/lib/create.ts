import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import inquirer, { ConfirmQuestion } from "inquirer";
import validateNpmPackageName from "validate-npm-package-name";

import { CreateOption, createOptions } from "@/groot-cli/bin/command-define";
import { clearConsole } from "@/groot-cli-utils";

/**
 * cli command::create
 * @param projectName
 * @param options
 */
export default async function create(projectName: string, options?: CreateOption) {
    const cwd = options.cwd || process.cwd();
    const inCurrent = projectName === ".";
    const name = inCurrent ? path.relative("../", cwd) : projectName;
    const targetDir = path.resolve(process.cwd(), projectName || ".");

    const validName = validateNpmPackageName(name);

    /** 检查 projectName 是否符合 npm package 命名规范 */
    if (!validName.validForNewPackages) {
        console.error(chalk.red(`Invalid project name: ${name}`));
        validName?.errors?.forEach((error) =>
            console.log(`
            ${chalk.red.dim(`Error: ${error}`)}
        `)
        );

        validName?.warnings?.forEach((warning) =>
            console.log(`
            ${chalk.red.dim(`Warning: ${warning}`)}
        `)
        );

        process.exit(1);
    }

    /** 如果目标路径已经存在 */
    if (fs.existsSync(targetDir)) {
        /** 强制覆盖 */
        if (options.force) {
            await fs.remove(targetDir);
        } else {
            clearConsole();
            if (inCurrent) {
                const generatorProjectQues: ConfirmQuestion = {
                    type: "confirm",
                    name: "ok",
                    message: "Generator project in current?"
                };

                const { ok } = await inquirer.prompt([generatorProjectQues]);

                if (!ok) {
                    return;
                }
            } else {
                const { action } = await inquirer.prompt([
                    {
                        name: "action",
                        type: "list",
                        message: `Target directory is existed ${targetDir}, please pick action:`,
                        choices: [
                            {
                                name: "Overwrite",
                                value: "overwrite"
                            },
                            {
                                name: "Merge",
                                value: "merge"
                            },
                            {
                                name: "Cancel",
                                value: false
                            }
                        ]
                    }
                ]);

                if (!action) {
                    return;
                }

                if (action === "overwrite") {
                    console.log(`\n Removing ${chalk.cyan(targetDir)}......`);
                    await fs.remove(targetDir);
                }
            }
        }
    }

    console.log(chalk.yellow("Create project success!!!"));
}
