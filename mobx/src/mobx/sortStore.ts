// src/stores/sortStore.ts
import { makeAutoObservable } from "mobx";
import { OrderDirection, ProductOrderField } from "../generated/graphql";
import searchStore from "./searchStore";

class SortStore {
  order: "ASC" | "DESC" | undefined = "ASC";

  constructor() {
    makeAutoObservable(this);
  }

  toggleSortOrder() {
    if (this.order === "ASC") {
      this.order = "DESC";
    } else {
      this.order = "ASC";
    }
  }

  resetSortOrder() {
    this.order = "ASC";
  }

  get sortOrder() {
    return this.order
      ? {
          direction:
            this.order === "ASC" ? OrderDirection.Asc : OrderDirection.Desc,
          field: "PRICE" as ProductOrderField,
        }
      : undefined;
  }

  setSearchQuery(query: string) {
    searchStore.setSearchQuery(query);
    this.order = undefined;
  }
}

const sortStore = new SortStore();
export default sortStore;
