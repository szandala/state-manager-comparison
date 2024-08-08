import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { OrderDirection, ProductOrderField } from "../generated/graphql";

interface SortState {
  order: "ASC" | "DESC" | undefined;
}

interface SortAction {
  type:
    | "TOGGLE_SORT_ORDER"
    | "RESET_SORT_ORDER"
    | "SET_SORT_ORDER"
    | "CLEAR_SORT_ORDER";
  payload?: "ASC" | "DESC" | undefined;
}

const initialSortState: SortState = {
  order: "ASC",
};

const SortContext = createContext<
  { state: SortState; dispatch: React.Dispatch<SortAction> } | undefined
>(undefined);

const sortReducer = (state: SortState, action: SortAction): SortState => {
  switch (action.type) {
    case "TOGGLE_SORT_ORDER":
      return { ...state, order: state.order === "ASC" ? "DESC" : "ASC" };
    case "RESET_SORT_ORDER":
      return initialSortState;
    case "SET_SORT_ORDER":
      return { ...state, order: action.payload };
    case "CLEAR_SORT_ORDER":
      return { ...state, order: undefined };
    default:
      return state;
  }
};

export const SortProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(sortReducer, initialSortState);
  return (
    <SortContext.Provider value={{ state, dispatch }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSort must be used within a SortProvider");
  }
  return context;
};

export const selectSortOrder = (state: SortState) => {
  return state.order
    ? {
        direction:
          state.order === "ASC" ? OrderDirection.Asc : OrderDirection.Desc,
        field: "PRICE" as ProductOrderField,
      }
    : undefined;
};
