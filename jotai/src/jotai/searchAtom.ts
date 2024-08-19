import { atom } from "jotai";

interface SearchState {
  query: string;
}

const initialSearchState: SearchState = {
  query: "",
};

export const searchAtom = atom(initialSearchState);

export const selectSearch = atom((get) => {
  const state = get(searchAtom);
  return state.query;
});
