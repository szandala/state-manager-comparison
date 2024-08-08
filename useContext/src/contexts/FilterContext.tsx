import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { StockAvailability } from "../generated/graphql";

interface PriceRange {
  gte: number;
  lte: number;
}

interface AttributeFilter {
  slug: string;
  values: string[];
}

interface FilterState {
  stockAvailability: boolean;
  priceRange: PriceRange | null;
  categories: string[];
  attributes: AttributeFilter[];
}

interface FilterAction {
  type:
    | "SET_STOCK_AVAILABILITY"
    | "SET_PRICE_RANGE"
    | "SET_CATEGORIES"
    | "SET_ATTRIBUTES"
    | "RESET_FILTERS";
  payload?: any;
}

const initialFilterState: FilterState = {
  stockAvailability: false,
  priceRange: null,
  categories: [],
  attributes: [],
};

const FilterContext = createContext<
  { state: FilterState; dispatch: React.Dispatch<FilterAction> } | undefined
>(undefined);

const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_STOCK_AVAILABILITY":
      return { ...state, stockAvailability: action.payload };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_ATTRIBUTES":
      return { ...state, attributes: action.payload };
    case "RESET_FILTERS":
      return initialFilterState;
    default:
      return state;
  }
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

export const selectFilterWhere = (state: FilterState) => {
  return {
    stockAvailability: state.stockAvailability
      ? StockAvailability.InStock
      : undefined,
    category: state.categories.length ? { oneOf: state.categories } : undefined,
    price: state.priceRange ? { range: state.priceRange } : undefined,
    attributes:
      state.attributes.length > 0
        ? state.attributes.map((attr) => ({
            slug: attr.slug,
            values: attr.values,
          }))
        : undefined,
  };
};
