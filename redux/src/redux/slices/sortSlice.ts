import { createSlice } from "@reduxjs/toolkit";
import { setSearchQuery } from "./searchSlice";
import { OrderDirection, ProductOrderField } from "../../generated/graphql";

interface SortState {
  order: "ASC" | "DESC" | undefined;
}

const initialState: SortState = {
  order: "ASC",
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    toggleSortOrder: (state) => {
      if (state.order === "ASC") {
        state.order = "DESC";
      } else {
        state.order = "ASC";
      }
    },
    resetSortOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(setSearchQuery, (state) => {
      state.order = undefined;
    });
  },
});

export const { toggleSortOrder, resetSortOrder } = sortSlice.actions;

export const selectSortOrder = (state: SortState) => {
  return state.order
    ? {
        direction:
          state.order === "ASC" ? OrderDirection.Asc : OrderDirection.Desc,
        field: "PRICE" as ProductOrderField,
      }
    : undefined;
};

export default sortSlice.reducer;
export type { SortState };
