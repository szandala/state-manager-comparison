// src/stores/searchStore.ts
import { makeAutoObservable } from "mobx";

class SearchStore {
  query: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSearchQuery(query: string) {
    this.query = query;
  }

  resetSearchQuery() {
    this.query = "";
  }

  get searchQuery() {
    return this.query;
  }
}

const searchStore = new SearchStore();
export default searchStore;
