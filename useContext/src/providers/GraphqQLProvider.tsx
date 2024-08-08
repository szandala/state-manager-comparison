import { PropsWithChildren, useMemo } from "react";
import { Provider } from "urql";
import { createClient } from "../lib/create-graphql-client";
import { useAuth } from "../contexts/AuthContext";

export interface IAuthState {
  token: string | null;
  refreshToken: string | null;
}

export function GraphQLProvider(props: PropsWithChildren) {
  const { state: authState, dispatch } = useAuth();

  const url = "http://localhost:8000/graphql/";

  const client = useMemo(
    () => createClient(url, authState, dispatch),
    [authState.token, authState.refreshToken]
  );

  return <Provider value={client} {...props} />;
}
