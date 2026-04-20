import { existsSync, readFileSync } from 'node:fs';
import type { CodegenConfig } from '@graphql-codegen/cli';

function readEnvFile(filePath: string): Record<string, string> {
    if (!existsSync(filePath)) {
        return {};
    }

    const envEntries: Record<string, string> = {};
    const fileContent = readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');

    for (const line of fileContent.split(/\r?\n/)) {
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith('#')) {
            continue;
        }

        const separatorIndex = trimmedLine.indexOf('=');
        if (separatorIndex === -1) {
            continue;
        }

        const key = trimmedLine.slice(0, separatorIndex).trim();
        const value = trimmedLine.slice(separatorIndex + 1).trim();
        envEntries[key] = value;
    }

    return envEntries;
}

const envFromFile = readEnvFile('.env');
const schemaUrl = process.env.OPTIMIZELY_GRAPH_URL || envFromFile.OPTIMIZELY_GRAPH_URL;

if (!schemaUrl) {
    throw new Error('Missing OPTIMIZELY_GRAPH_URL. Set it in .env or the environment.');
}

const config: CodegenConfig = {
    overwrite: true,
    schema: schemaUrl,
    documents: ['app/graphql/**/*.graphql'],
    generates: {
        'app/graphql/generated.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
        },
    },
    ignoreNoDocuments: false,
};

export default config;
