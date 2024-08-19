import { atom } from "jotai";
import { AccountError } from "../generated/graphql";
import { loadState, saveState } from "./localStorage";

export interface AuthState {
  token: string | null | undefined;
  refreshToken: string | null | undefined;
  errors: AccountError[] | null;
}

export const initialAuthState: AuthState = {
  token: null,
  refreshToken: null,
  errors: null,
};

const preloadedAuthState = loadState<AuthState>("authState", initialAuthState);

export const authAtom = atom(preloadedAuthState);

authAtom.onMount = (setAuth) => {
  setAuth(preloadedAuthState);

  // Subscribe to changes in auth state and save to localStorage
  setAuth((prevAuth) => {
    saveState("authState", prevAuth);
    return prevAuth;
  });
};
