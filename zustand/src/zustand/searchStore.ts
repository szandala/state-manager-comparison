// src/stores/searchStore.ts
import { create } from "zustand";

interface SearchState {
  query: string;
  setSearchQuery: (query: string) => void;
  resetSearchQuery: () => void;
}

const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setSearchQuery: (query) => set({ query }),
  resetSearchQuery: () => set({ query: "" }),
}));

export const selectSearchQuery = (state: SearchState) => state.query;

export default useSearchStore;
