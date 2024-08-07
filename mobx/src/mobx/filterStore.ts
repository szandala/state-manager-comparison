// src/stores/filterStore.ts
import { makeAutoObservable } from "mobx";
import { StockAvailability } from "../generated/graphql";

class FilterStore {
  stockAvailability = false;
  priceRange: { gte: number; lte: number } | null = null;
  categories: string[] = [];
  attributes: { slug: string; values: string[] }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setStockAvailability(value: boolean) {
    this.stockAvailability = value;
  }

  setPriceRange(range: { gte: number; lte: number } | null) {
    this.priceRange = range;
  }

  setCategories(categories: string[]) {
    this.categories = categories;
  }

  setAttributes(attributes: { slug: string; values: string[] }[]) {
    this.attributes = attributes;
  }

  resetFilters() {
    this.stockAvailability = false;
    this.priceRange = null;
    this.categories = [];
    this.attributes = [];
  }

  get where() {
    return {
      stockAvailability: this.stockAvailability
        ? StockAvailability.InStock
        : undefined,
      category: this.categories.length ? { oneOf: this.categories } : undefined,
      price: this.priceRange ? { range: this.priceRange } : undefined,
      attributes:
        this.attributes.length > 0
          ? this.attributes.map((attr) => ({
              slug: attr.slug,
              values: attr.values,
            }))
          : undefined,
    };
  }
}

const filterStore = new FilterStore();
export default filterStore;
