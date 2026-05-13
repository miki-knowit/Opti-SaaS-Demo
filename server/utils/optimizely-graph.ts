import { print } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

interface GraphResponse<T> {
    data?: T;
    errors?: Array<{ message?: string }>;
}

export async function runGraphQuery<TData, TVariables>(
    document: TypedDocumentNode<TData, TVariables>,
    variables: TVariables,
) {
    const config = useRuntimeConfig();

    const start = performance.now();

    const response = await $fetch<GraphResponse<TData>>(config.optimizelyGraphUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: {
            query: print(document),
            variables,
        },
    });

    console.log(`Optimizely Graph request took ${Math.round(performance.now() - start)}ms`);

    if (response.errors?.length) {
        throw createError({
            statusCode: 502,
            statusMessage: response.errors[0]?.message || 'Graph request failed.',
        });
    }

    return response.data;
}
