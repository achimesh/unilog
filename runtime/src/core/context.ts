import { LogType } from "../consts";
import { isNullOrUndefined } from "../util";
import { getLog, Log, LogIdentifier, setLog } from "./log";
import { getNamespace, Namespace, NamespaceIdentifier, setNamespace } from "./namespace";

export interface LogContext {
    log: ExposedLog;
}

interface ExposedLog extends Omit<Log, "namespaceIds"> {
    namespaces: Namespace[];
}

export interface LogContextInput {
    content: unknown[];
    namespaces: string[];
    type: LogType;
}

export function createLogContext(input: LogContextInput): LogContext {
    validateInput(input);

    const namespaceIds = input.namespaces.map(n => setNamespace(n));

    const logId = setLog({
        content: input.content,
        namespaceIds: namespaceIds,
        type: input.type
    });

    const context: LogContext = {
        log: createExposedLog(logId, namespaceIds)
    };

    return context;
}

function validateInput(input: LogContextInput): void {
    if (isNullOrUndefined(input)) {
        throw new Error('Log builder input cannot be null or undefined');
    }

    if (isNullOrUndefined(input.namespaces)) {
        throw new Error('Log builder input namespaces cannot be null or undefined');
    }

    if (Array.isArray(input.namespaces) == false) {
        throw new Error('Log builder input namespaces should be an array');
    }
}

function createExposedLog(logId: LogIdentifier, namespaceIds: NamespaceIdentifier[]): ExposedLog {
    const log = getLog(logId);
    const namespaces = namespaceIds.map(id => getNamespace(id));

    return {
        id: log.id,
        content: log.content,
        namespaces: namespaces,
        type: log.type,
        timestamp: log.timestamp
    };
}