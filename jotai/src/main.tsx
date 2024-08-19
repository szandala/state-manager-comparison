import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GraphQLProvider } from "./providers/GraphqQLProvider.tsx";
import { AlertProvider } from "./providers/AlertProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GraphQLProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </GraphQLProvider>
  </React.StrictMode>
);
