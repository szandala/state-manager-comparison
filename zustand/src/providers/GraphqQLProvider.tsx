// src/providers/GraphQLProvider.tsx
import { PropsWithChildren, useMemo } from "react";
import { Provider } from "urql";
import { createClient } from "../lib/create-graphql-client";
import useAuthStore from "../zustand/authStore";

export interface IAuthState {
  token: string | null;
  refreshToken: string | null;
}

export function GraphQLProvider(props: PropsWithChildren) {
  const authState = useAuthStore();

  const url = "http://localhost:8000/graphql/";

  const client = useMemo(() => createClient(url, authState), [authState]);

  return <Provider value={client} {...props} />;
}
