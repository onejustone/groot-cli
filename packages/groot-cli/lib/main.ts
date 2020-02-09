import program, { Option } from 'commander';

import pkg from '../package.json';

export type ConvertEnum<E extends keyof any> = {
    [U in E]: any;
};

console.log(pkg.name);

program.version(pkg.version);
