// src/stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AccountError } from "../generated/graphql";

export interface AuthState {
  token: string | null | undefined;
  refreshToken: string | null | undefined;
  errors: AccountError[] | null;
  setAuthState: (token: string | null, refreshToken: string | null) => void;
  setAuthErrors: (errors: AccountError[]) => void;
  clearAuthState: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      errors: null,
      setAuthState: (token, refreshToken) => set({ token, refreshToken }),
      setAuthErrors: (errors) => set({ errors }),
      clearAuthState: () =>
        set({ token: null, refreshToken: null, errors: null }),
    }),
    { name: "authState" }
  )
);

export default useAuthStore;
