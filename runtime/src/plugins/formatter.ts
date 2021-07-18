import { LogContext } from '../core';
import { createPlugin } from '../engine';
import { LogType, PLUGIN_FORMATTER } from '../consts';
import { createPluginName } from '../util';

export default createPlugin((options?: number) => {
    return {
        name: createPluginName(PLUGIN_FORMATTER),
        execute(ctx) {
            const content = ctx.log.content;
            const timestamp = getStrTimestamp(ctx);
            const type = getStrPrefixType(ctx);
            const namespaces = getStrNamespaces(ctx);

            const formatted = format(content, timestamp, type, namespaces);        
        }
    }
});

function format(content: unknown[], timestamp: string, type: string, namespaces: string): unknown[] {
    const metadata = timestamp + type + namespaces;

    if (typeof content[0] == 'string') {
        content[0] = metadata + ' ' + content[0];
    }
    else {
        content.unshift(metadata);
    }

    return content;
}

function getStrPrefixType(ctx: LogContext): string {
    switch (ctx.log.type) {
        case LogType.Info: return '[info]';
        case LogType.Warning: return '[warn]';
        case LogType.Error: return '[error]';
        case LogType.Debug: return '[debug]';

        default: throw new Error('Log type in invalid');
    }
}

function getStrTimestamp(ctx: LogContext): string {
    return '[' + new Date(ctx.log.timestamp).toISOString() + ']';
}

function getStrNamespaces(ctx: LogContext): string {
    const str = ctx.log.namespaces
        .map(n => n.value.trim())
        .join('.');

    return '[' + str + ']';
}