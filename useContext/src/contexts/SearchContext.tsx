import React, { createContext, useReducer, useContext, ReactNode } from "react";

interface SearchState {
  query: string;
}

interface SearchAction {
  type: "SET_SEARCH_QUERY" | "RESET_SEARCH_QUERY";
  payload?: string;
}

const initialSearchState: SearchState = {
  query: "",
};

const SearchContext = createContext<
  { state: SearchState; dispatch: React.Dispatch<SearchAction> } | undefined
>(undefined);

const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, query: action.payload ?? "" };
    case "RESET_SEARCH_QUERY":
      return initialSearchState;
    default:
      return state;
  }
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);
  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const selectSearchQuery = (state: SearchState) => state.query;
