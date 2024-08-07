// src/providers/GraphQLProvider.tsx
import { PropsWithChildren, useMemo } from "react";
import { Provider } from "urql";
import { createClient } from "../lib/create-graphql-client";
import authStore from "../mobx/authStore";
import { observer } from "mobx-react-lite";

export interface IAuthState {
  token: string | null;
  refreshToken: string | null;
}

export const GraphQLProvider: React.FC<PropsWithChildren> = observer(
  (props) => {
    const url = "http://localhost:8000/graphql/";

    const client = useMemo(() => {
      const authState = {
        token: authStore.token,
        refreshToken: authStore.refreshToken,
      };
      return createClient(url, authState);
    }, [authStore.token, authStore.refreshToken]);

    return <Provider value={client} {...props} />;
  }
);

export default GraphQLProvider;
