import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GraphQLProvider } from "./providers/GraphqQLProvider.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { AlertProvider } from "./providers/AlertProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <GraphQLProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </GraphQLProvider>
    </ReduxProvider>
  </React.StrictMode>
);
