const chalk = require("chalk"); // eslint-disable-line
const msgPath = process.env.GIT_PARAMS;
const msg = require("fs")
    .readFileSync(msgPath, "utf-8")
    .trim();

// eslint-disable-next-line max-len
const commitRE = /^(v\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?$)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|improvement)(\(.+\))?!?: .{1,50})/;

if (!commitRE.test(msg)) {
    console.error(
        `  ${chalk.bgRed.white(" ERROR ")} ${chalk.red(`invalid commit message format.`)}\n\n` +
            chalk.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) +
            `    ${chalk.green(`feat(user): add 'comments' option`)}\n` +
            `    ${chalk.green(`fix(auth): handle events on blur `)}\n\n` +
            chalk.red(`  See .git-doc/COMMIT_CONVENTION.md for more details.\n`) +
            chalk.red(
                `  You can also use ${chalk.cyan(`npm run commit`)} to interactively generate a commit message.\n`
            )
    );
    process.exit(1);
}
