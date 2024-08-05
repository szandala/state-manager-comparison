import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StockAvailability } from "../../generated/graphql";

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

const initialState: FilterState = {
  stockAvailability: false,
  priceRange: null,
  categories: [],
  attributes: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStockAvailability: (state, action: PayloadAction<boolean>) => {
      state.stockAvailability = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<PriceRange | null>) => {
      state.priceRange = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setAttributes: (state, action: PayloadAction<AttributeFilter[]>) => {
      state.attributes = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setStockAvailability,
  setPriceRange,
  setCategories,
  setAttributes,
  resetFilters,
} = filterSlice.actions;

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

export default filterSlice.reducer;
export type { FilterState };
