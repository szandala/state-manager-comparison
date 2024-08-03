import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GraphQLProvider } from "./providers/GraphqQLProvider.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <GraphQLProvider>
        <App />
      </GraphQLProvider>
    </ReduxProvider>
  </React.StrictMode>
);
