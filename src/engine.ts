import { LogContext } from "./core";
import { isNullOrUndefined } from "./util";

export interface LogPlugin {
    name: string;
    setup?(): void | Promise<void>;
    execute(ctx: LogContext): void | Promise<void>;
    teardown?(): void | Promise<void>;
}

export function createPlugin<T>(caller: (options?: T) => LogPlugin): (options?: T) => LogPlugin {
    if (isNullOrUndefined(caller)) {
        throw new Error('Middware caller is null or undefined');
    }

    if (typeof caller != 'function') {
        throw new Error('Middware caller should be a function');
    }

    return caller;
}