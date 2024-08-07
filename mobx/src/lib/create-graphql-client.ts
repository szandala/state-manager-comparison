// src/lib/create-graphql-client.ts
import { authExchange } from "@urql/exchange-auth";
import {
  cacheExchange,
  createClient as urqlCreateClient,
  fetchExchange,
} from "urql";
import { gql } from "urql";
import authStore from "../mobx/authStore";

const refreshTokenMutation = gql`
  mutation TokenRefresh($refreshToken: String!) {
    tokenRefresh(refreshToken: $refreshToken) {
      token
    }
  }
`;

export const createClient = (
  url: string,
  storeAuthState: { token: string | null; refreshToken: string | null }
) =>
  urqlCreateClient({
    url,
    exchanges: [
      cacheExchange,
      authExchange({
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
        willAuthError: ({ authState }) => {
          if (!authState?.token) {
            return true;
          }
          return false;
        },
        didAuthError: ({ error }) => {
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === "EXPIRED_SIGNATURE"
          );
        },
        getAuth: async () => {
          const authState = storeAuthState;
          if (!authState?.refreshToken) {
            return null;
          }

          try {
            const result = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: refreshTokenMutation.loc?.source.body,
                variables: {
                  refreshToken: authState.refreshToken,
                },
              }),
            });

            const json = await result.json();
            const newToken = json?.data?.tokenRefresh?.token;

            if (newToken) {
              authStore.setAuthState(newToken, authState.refreshToken);
              return {
                token: newToken,
                refreshToken: authState.refreshToken,
              };
            } else {
              authStore.clearAuthState();
              return null;
            }
          } catch (error) {
            authStore.clearAuthState();
            return null;
          }
        },
      }),
      fetchExchange,
    ],
  });
