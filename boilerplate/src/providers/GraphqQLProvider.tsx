import { PropsWithChildren, useState } from "react";
import { Provider } from "urql";
import { createClient } from "../lib/create-graphql-client";

export interface IAuthState {
  token?: string;
}

export function GraphQLProvider(props: PropsWithChildren) {
  // Update based on chosen state solution
  const [authState] = useState<IAuthState>({});

  const url = "http://localhost:8000/graphql/";

  const client = createClient(url, async () => authState);

  return <Provider value={client} {...props} />;
}
