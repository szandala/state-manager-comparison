// src/store/useSearchStore.ts
import create from "zustand";

interface SearchState {
  query: string;
  setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setSearchQuery: (query) => set({ query }),
}));
