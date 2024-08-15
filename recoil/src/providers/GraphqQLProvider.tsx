import { PropsWithChildren, useMemo } from "react";
import { Provider } from "urql";
import { createClient } from "../lib/create-graphql-client";
import { useRecoilValue } from "recoil";
import {
  authState,
  setAuthState as persistAuthState,
  clearAuthState as resetAuthState,
} from "../recoil/auth";

export interface IAuthState {
  token: string | null;
  refreshToken: string | null;
}

export const GraphQLProvider: React.FC<PropsWithChildren> = (props) => {
  const auth = useRecoilValue(authState);

  const url = "http://localhost:8000/graphql/";

  const client = useMemo(() => {
    const setAuthState = (newState: IAuthState) => {
      // Avoid setting state if it's the same as the current state
      if (
        newState.token !== auth.token ||
        newState.refreshToken !== auth.refreshToken
      ) {
        persistAuthState(newState); // Persist in localStorage
      }
    };

    const clearAuthState = () => {
      resetAuthState(); // Clear from localStorage
    };

    return createClient(url, auth, setAuthState, clearAuthState);
  }, [auth]); // Using `auth` as a single dependency to avoid unnecessary rerenders

  return <Provider value={client} {...props} />;
};
