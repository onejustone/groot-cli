import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import inquirer, { ConfirmQuestion } from "inquirer";
import validateNpmPackageName from "validate-npm-package-name";

import { CreateOption } from "@/groot-cli/bin/command-define";

export default async function create(projectName: string, options?: CreateOption) {
    const cwd = options.cwd || process.cwd();
    const inCurrent = projectName === ".";
    const name = inCurrent ? path.relative("../", cwd) : projectName;
    const targetDir = path.resolve(process.cwd(), projectName || ".");

    const validName = validateNpmPackageName(name);

    if (!validName.validForNewPackages) {
        validName.errors.forEach((error) =>
            console.log(`
            ${chalk.red.dim(`Error: ${error}`)}
        `)
        );

        validName.warnings.forEach((warning) =>
            console.log(`
            ${chalk.red.dim(`Warning: ${warning}`)}
        `)
        );

        process.exit();
    }

    if (fs.existsSync(targetDir)) {
        if (options.force) {
            await fs.remove(targetDir);
        }

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

    console.log(chalk.yellow("Create project success!!!"));
}
