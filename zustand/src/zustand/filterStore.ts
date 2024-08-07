// src/stores/filterStore.ts
import { create } from "zustand";
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
  setStockAvailability: (availability: boolean) => void;
  setPriceRange: (range: PriceRange | null) => void;
  setCategories: (categories: string[]) => void;
  setAttributes: (attributes: AttributeFilter[]) => void;
  resetFilters: () => void;
}

const useFilterStore = create<FilterState>((set) => ({
  stockAvailability: false,
  priceRange: null,
  categories: [],
  attributes: [],
  setStockAvailability: (availability) =>
    set({ stockAvailability: availability }),
  setPriceRange: (range) => set({ priceRange: range }),
  setCategories: (categories) => set({ categories }),
  setAttributes: (attributes) => set({ attributes }),
  resetFilters: () =>
    set({
      stockAvailability: false,
      priceRange: null,
      categories: [],
      attributes: [],
    }),
}));

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

export default useFilterStore;
