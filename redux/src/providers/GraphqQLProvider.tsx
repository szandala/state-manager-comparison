import { PropsWithChildren } from "react";
import { Provider } from "urql";
import { createClient } from "../lib/create-graphql-client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export interface IAuthState {
  token: string | null;
}

export function GraphQLProvider(props: PropsWithChildren) {
  const authState = useSelector((state: RootState) => state.auth);

  const url = "http://localhost:8000/graphql/";

  const client = createClient(url, async () => authState);

  return <Provider value={client} {...props} />;
}
