import { Command, Option } from "commander";

function camelize(str: string) {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

export default function pickCommandOptions<T>(cmd: Command): T {
    const args = {};

    cmd.options.forEach((option: Option) => {
        const key = camelize(option.long.replace(/^--/, ""));
        console.log(key);
        if (typeof cmd[key] !== "function" && typeof cmd[key] !== undefined) {
            args[key] = cmd[key];
        }
    });

    // todo
    return args as T;
}
