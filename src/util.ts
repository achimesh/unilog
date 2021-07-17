export function isNullOrUndefined<T>(value: T): boolean {
    return typeof value == 'undefined' || value == null;
}

export function hashCode(value: string): number {
    let hash = 0, i, chr;

    if (value.length === 0) {
        return hash;
    }
    
    for (i = 0; i < value.length; i++) {
        chr = value.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}