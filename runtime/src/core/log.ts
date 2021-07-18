import { LogType } from '../consts';
import { getLogTypes, isNullOrUndefined } from '../util';
import { NamespaceIdentifier } from './namespace';

export type LogIdentifier = number;

export interface Log extends LogInput {
    id: LogIdentifier;
    timestamp: number;
}

export interface LogInput {
    content: unknown[];
    namespaceIds: NamespaceIdentifier[];
    type: LogType;
}

let nextLogId = 1;
const record: Record<LogIdentifier, Log> = {};
const logTypes = getLogTypes();

export function setLog(input: LogInput): LogIdentifier {
    validateInput(input);

    const id = nextLogId;
    nextLogId++;

    record[id] = {
        id: id,
        content: input.content,
        namespaceIds: input.namespaceIds,
        type: input.type,
        timestamp: new Date().getTime()
    }

    return id;
}

export function getLog(id: LogIdentifier): Log {
    if (isNullOrUndefined(id)) {
        throw new Error('Log identifier cannot be null or undefined');
    }

    if (isNullOrUndefined(record[id])) {
        throw new Error(`Log identifier ${id} does not exist`);
    }

    return { ...record[id] };
}

function validateInput(input: LogInput): void {
    if (isNullOrUndefined(input)) {
        throw new Error('Log input cannot be null or undefined');
    }

    if (isNullOrUndefined(input.content)) {
        throw new Error('Log content cannot be null or undefined');
    }

    if (input.content.length == 0) {
        throw new Error('Log content cannot be empty');
    }

    if (isNullOrUndefined(input.namespaceIds)) {
        throw new Error('Log namespace IDs cannot be null or undefined');
    }

    if (isNullOrUndefined(input.type)) {
        throw new Error('Log type cannot be null or undefined');
    }

    if (logTypes.some(type => type == input.type) == false) {
        throw new Error('Log type is invalid');
    }
}