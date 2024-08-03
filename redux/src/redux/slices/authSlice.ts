import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountError } from "../../generated/graphql";

interface AuthState {
  token: string | null | undefined;
  refreshToken: string | null | undefined;
  errors: AccountError[] | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  errors: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      action: PayloadAction<{
        token: string | null;
        refreshToken: string | null;
      }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    setAuthErrors: (state, action: PayloadAction<AccountError[]>) => {
      state.errors = action.payload;
    },
    clearAuthState: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.errors = null;
    },
  },
});

export const { setAuthState, setAuthErrors, clearAuthState } =
  authSlice.actions;
export default authSlice.reducer;
