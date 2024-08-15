import { authExchange } from "@urql/exchange-auth";
import {
  cacheExchange,
  createClient as urqlCreateClient,
  fetchExchange,
} from "urql";
import { gql } from "urql";
import { AuthState } from "../recoil/auth";

const refreshTokenMutation = gql`
  mutation TokenRefresh($refreshToken: String!) {
    tokenRefresh(refreshToken: $refreshToken) {
      token
    }
  }
`;

export const createClient = (
  url: string,
  authState: AuthState,
  setAuthState: (state: AuthState) => void,
  resetAuthState: () => void
) =>
  urqlCreateClient({
    url,
    exchanges: [
      cacheExchange,
      authExchange<AuthState>({
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
          return !authState?.token;
        },
        didAuthError: ({ error }) => {
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === "EXPIRED_SIGNATURE"
          );
        },
        getAuth: async () => {
          const currentAuthState = authState;
          if (!currentAuthState?.refreshToken) {
            return null;
          }
          console.log("Refreshing token...");

          try {
            const result = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: refreshTokenMutation.loc?.source.body,
                variables: {
                  refreshToken: currentAuthState.refreshToken,
                },
              }),
            });

            const json = await result.json();
            const newToken = json?.data?.tokenRefresh?.token;

            if (newToken) {
              setAuthState({
                token: newToken,
                refreshToken: currentAuthState.refreshToken,
              });
              return {
                token: newToken,
                refreshToken: currentAuthState.refreshToken,
                errors: [],
              };
            } else {
              resetAuthState();
              return null;
            }
          } catch (error) {
            resetAuthState();
            return null;
          }
        },
      }),
      fetchExchange,
    ],
  });
