import { atom } from "recoil";
import { OrderDirection, ProductOrderField } from "../generated/graphql";

interface SortState {
  order: "ASC" | "DESC" | undefined;
}

export const sortState = atom<SortState>({
  key: "sortState",
  default: {
    order: "ASC",
  },
});

export const selectSortOrder = (state: SortState) => ({
  direction: state.order === "ASC" ? OrderDirection.Asc : OrderDirection.Desc,
  field: "PRICE" as ProductOrderField,
});
