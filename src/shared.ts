export enum LogType {
    Info = "info",
    Warning = "warning",
    Error = "error",
    Verbose = "verbose"
}

export const allowedLogTypes = [
    LogType.Error,
    LogType.Info,
    LogType.Verbose,
    LogType.Warning
];