import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GraphQLProvider } from "./providers/GraphqQLProvider.tsx";
import { AlertProvider } from "./providers/AlertProvider.tsx";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <GraphQLProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </GraphQLProvider>
    </RecoilRoot>
  </React.StrictMode>
);
