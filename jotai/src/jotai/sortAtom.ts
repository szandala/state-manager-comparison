import { atom } from "jotai";
import { OrderDirection, ProductOrderField } from "../generated/graphql";

interface SortState {
  order: "ASC" | "DESC" | undefined;
}

const initialSortState: SortState = {
  order: "ASC",
};

export const sortAtom = atom(initialSortState);

export const selectSortOrder = atom((get) => {
  const state = get(sortAtom);
  return state.order
    ? {
        direction:
          state.order === "ASC" ? OrderDirection.Asc : OrderDirection.Desc,
        field: "PRICE" as ProductOrderField,
      }
    : undefined;
});
