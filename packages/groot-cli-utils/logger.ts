import readline from "readline";
import chalk from "chalk";

const chalkTag = (msg = "") => chalk.bgBlackBright.white.dim(`${msg} `);

const _log = (type = "", tag = "", message = "") => {
    // eventBus.emit("log", {
    //     message,
    //     type,
    //     tag
    // });
};

/**
 * 清除终端
 * @param title
 */
export const clearConsole = (title?: string) => {
    /** TTY 模块提供终端相关的接口 */
    /** process.stdin 是 Node.js 进程中唯一的 tty.ReadStream 实例 */
    /** process.stdout 和 process.stderr 是 Node.js 进程中唯一的 tty.WriteStream 实例 */
    if (process.stdout.isTTY) {
        const blankBlock = "\n".repeat(process.stdout.rows);
        console.log(blankBlock);
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);
        title && console.log(title);
    }
};

export const log = (msg = "", tag = "") => {
    _log("log", tag, msg);
};
