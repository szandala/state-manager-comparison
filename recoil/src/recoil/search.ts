import { atom } from "recoil";

interface SearchState {
  query: string;
}

export const searchState = atom<SearchState>({
  key: "searchState",
  default: {
    query: "",
  },
});

export const selectSearchQuery = (state: SearchState) => state.query;
