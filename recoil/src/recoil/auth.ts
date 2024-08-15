import { atom } from "recoil";
import { AccountError } from "../generated/graphql";

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  errors?: AccountError[] | null;
}

export const authState = atom<AuthState>({
  key: "authState",
  default: JSON.parse(localStorage.getItem("authState") || "{}") || {
    token: null,
    refreshToken: null,
    errors: null,
  },
});

export const setAuthState = (newState: AuthState) => {
  localStorage.setItem("authState", JSON.stringify(newState));
  return newState;
};

export const clearAuthState = () => {
  localStorage.removeItem("authState");
  return {
    token: null,
    refreshToken: null,
    errors: null,
  };
};
