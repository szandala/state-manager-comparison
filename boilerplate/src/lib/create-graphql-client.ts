import { AuthConfig, authExchange } from "@urql/exchange-auth";
import {
  cacheExchange,
  createClient as urqlCreateClient,
  fetchExchange,
} from "urql";
import { IAuthState } from "../providers/GraphqQLProvider";

export const createClient = (
  url: string,
  getAuth: AuthConfig<IAuthState>["getAuth"]
) =>
  urqlCreateClient({
    url,
    exchanges: [
      cacheExchange,
      authExchange<IAuthState>({
        addAuthToOperation: ({ authState, operation }) => {
          if (!authState?.token) {
            return operation;
          }

          const fetchOptions =
            typeof operation.context.fetchOptions === "function"
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};

          return {
            ...operation,
            context: {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: `Bearer ${authState.token}`,
                },
              },
            },
          };
        },
        getAuth,
      }),
      fetchExchange,
    ],
  });
