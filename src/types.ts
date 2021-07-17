import { LogBuilder } from "./core";

/**
 * Standard logger. 
 */
export interface Unilog {
    /**
     * Log information.
     * @param args 
     */
    info(...args: unknown[]): void;

    /**
     * Log warnings.
     * @param args 
     */
    warn(...args: unknown[]): void;

    /**
     * Log errors.
     * @param args 
     */
    error(...args: unknown[]): void;

    /**
     * Log verbose information.
     * @param args 
     */
    debug(...args: unknown[]): void;

    /**
     * Create new Unilog instance with nested namespacce from parent namespace.
     * Timespan between logs will be reset in this nested namespace.
     * @param namespace Nested namespace.
     */
    createLogger(namespace: string): Unilog;
}