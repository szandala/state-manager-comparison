// src/stores/sortStore.ts
import { create } from "zustand";
import useSearchStore from "./searchStore";
import { OrderDirection, ProductOrderField } from "../generated/graphql";

interface SortState {
  order: "ASC" | "DESC" | undefined;
  toggleSortOrder: () => void;
  resetSortOrder: () => void;
}

const useSortStore = create<SortState>((set) => ({
  order: "ASC",
  toggleSortOrder: () => {
    set((state) => ({
      order: state.order === "ASC" ? "DESC" : "ASC",
    }));
  },
  resetSortOrder: () => set({ order: undefined }),
}));

// Subscribe to search query changes and reset sort order
useSearchStore.subscribe((state) => {
  if (state.query) {
    useSortStore.getState().resetSortOrder();
  }
});

export const selectSortOrder = (state: SortState) => {
  return state.order
    ? {
        direction:
          state.order === "ASC" ? OrderDirection.Asc : OrderDirection.Desc,
        field: "PRICE" as ProductOrderField,
      }
    : undefined;
};

export default useSortStore;
