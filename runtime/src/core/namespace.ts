import { hashCode, isNullOrUndefined } from '../util';

export type NamespaceIdentifier = number;

export interface Namespace {
    id: NamespaceIdentifier;
    value: string;
}

const record: Record<NamespaceIdentifier, Namespace> = {};

export function setNamespace(input: string): NamespaceIdentifier {
    validateInput(input);

    const id = hashCode(input);

    if (isNullOrUndefined(record[id])) {
        record[id] = {
            id: id,
            value: input
        };
    }

    return id;
}

export function getNamespace(id: NamespaceIdentifier): Namespace {
    if (isNullOrUndefined(id)) {
        throw new Error('Namespace identifier cannot be null or undefined');
    }

    if (isNullOrUndefined(record[id])) {
        throw new Error(`Namespace identifier ${id} does not exist`);
    }

    return { ...record[id] };
}

function validateInput(input: string): void {
    if (isNullOrUndefined(input)) {
        throw new Error('Namespace cannot be null or undefined');
    }

    if (typeof input != 'string') {
        throw new Error('Namespace should be a string');
    }

    if (input.length == 0) {
        throw new Error('Namespace cannot be empty');
    }
}