import { atom } from "recoil";
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

export const filterState = atom<FilterState>({
  key: "filterState",
  default: {
    stockAvailability: false,
    priceRange: null,
    categories: [],
    attributes: [],
  },
});

export const selectFilterWhere = (state: FilterState) => ({
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
});
