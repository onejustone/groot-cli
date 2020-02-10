export enum CommandCollections {
    create = "create"
}

export type ConvertEnum<U extends keyof any> = {
    [P in U]: any;
};

export type CreateOption = ConvertEnum<CreateOptions>;

export enum CreateOptions {
    git = "git",
    force = "force",
    preset = "preset",
    default = "default",
    cwd = "cwd"
}
