export type EnumToKeyMapString<U extends keyof any> = {
    [P in U]: string;
};

/**
 * command 枚举
 * */
export enum CommandEnum {
    /** 创建项目 */
    create = "create",
    /** 添加插件 */
    add = "add"
}

/** command option 类型定义 */
export type CommandOption<T extends string> = {
    long: T;
    short: string;
    description: string;
};

export type CommandOptionMap<O extends string> = Record<O, CommandOption<O>>;

/** command::create  相关的 options */
export enum CreateOptionEnum {
    preset = "preset",
    git = "git",
    force = "force",
    default = "default",
    cwd = "cwd"
}

export type CreateOption = EnumToKeyMapString<CreateOptionEnum>;
export const createOptions: CommandOptionMap<CreateOptionEnum> = {
    [CreateOptionEnum.preset]: {
        long: CreateOptionEnum.preset,
        short: "p",
        description: "指定预设配置"
    },
    [CreateOptionEnum.git]: {
        long: CreateOptionEnum.git,
        short: "g",
        description: "使用 git 初始化并提交 init commit message"
    },
    [CreateOptionEnum.force]: {
        long: CreateOptionEnum.force,
        short: "f",
        description: "如果目标目录已经存在，强制覆盖"
    },
    [CreateOptionEnum.default]: {
        long: CreateOptionEnum.default,
        short: "d",
        description: "使用默认的预设配置"
    },
    [CreateOptionEnum.cwd]: {
        long: CreateOptionEnum.cwd,
        short: "cwd",
        description: "ss"
    }
};

// export const createOptions: CommandOption<CreateOptionEnum>[] = [
//     {
//         long: CreateOptionEnum.preset,
//         shortName: "p",
//         description: "指定预设配置"
//     },
//     {
//         long: CreateOptionEnum.git,
//         shortName: "g",
//         description: "使用 git 初始化并提交 init commit message"
//     },
//     {
//         long: CreateOptionEnum.force,
//         shortName: "f",
//         description: "如果目标目录已经存在，强制覆盖"
//     },
//     {
//         long: CreateOptionEnum.default,
//         shortName: "d",
//         description: "使用默认的预设配置"
//     },
//     {
//         long: CreateOptionEnum.cwd,
//         shortName: "cwd",
//         description: "ss"
//     }
// ];

/** command::add 插件相关的 options */
export enum AddOptions {}
