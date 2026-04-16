  import { print } from "graphql";
  import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

  interface GraphResponse<T> {
    data?: T;
    errors?: Array<{ message?: string }>;
  }

  export async function runGraphQuery<TData, TVariables>(
    document: TypedDocumentNode<TData, TVariables>,
    variables: TVariables,
  ) {
    const config = useRuntimeConfig();

    const response = await $fetch<GraphResponse<TData>>(config.optimizelyGraphUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: {
        query: print(document),
        variables,
      },
    });

    if (response.errors?.length) {
      throw createError({
        statusCode: 502,
        statusMessage: response.errors[0]?.message || "Graph request failed.",
      });
    }

    return response.data;
  }