type InfoArgs = Parameters<typeof console["info"]>;
type WarningArgs = Parameters<typeof console["warn"]>;
type ErrorArgs = Parameters<typeof console["error"]>;
type DebugArgs = Parameters<typeof console["debug"]>;

export function info(...args: InfoArgs): void {
    console.info(args);
}

export function warn(...args: WarningArgs): void {
    console.warn(args);
}

export function error(...args: ErrorArgs): void {
    console.error(args);
}

export function debug(...args: DebugArgs): void {
    console.debug(args);
}