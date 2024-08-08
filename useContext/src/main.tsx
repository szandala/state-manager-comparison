import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GraphQLProvider } from "./providers/GraphqQLProvider.tsx";
import { AlertProvider } from "./providers/AlertProvider.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CheckoutProvider } from "./contexts/CheckoutContext.tsx";
import { FilterProvider } from "./contexts/FilterContext.tsx";
import { SearchProvider } from "./contexts/SearchContext.tsx";
import { SortProvider } from "./contexts/SortContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CheckoutProvider>
        <FilterProvider>
          <SearchProvider>
            <SortProvider>
              <GraphQLProvider>
                <AlertProvider>
                  <App />
                </AlertProvider>
              </GraphQLProvider>
            </SortProvider>
          </SearchProvider>
        </FilterProvider>
      </CheckoutProvider>
    </AuthProvider>
  </React.StrictMode>
);
