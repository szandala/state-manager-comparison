// src/stores/authStore.ts
import { makeAutoObservable } from "mobx";
import { AccountError } from "../generated/graphql";

class AuthStore {
  token: string | null = null;
  refreshToken: string | null = null;
  errors: AccountError[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAuthState(token: string | null, refreshToken: string | null) {
    this.token = token;
    this.refreshToken = refreshToken;
  }

  setAuthErrors(errors: AccountError[]) {
    this.errors = errors;
  }

  clearAuthState() {
    this.token = null;
    this.refreshToken = null;
    this.errors = null;
  }

  loadAuthState() {
    const serializedState = localStorage.getItem("authState");
    if (serializedState) {
      const state = JSON.parse(serializedState);
      this.token = state.token;
      this.refreshToken = state.refreshToken;
    }
  }

  saveAuthState() {
    const state = {
      token: this.token,
      refreshToken: this.refreshToken,
    };
    localStorage.setItem("authState", JSON.stringify(state));
  }
}

const authStore = new AuthStore();
authStore.loadAuthState();
export default authStore;
