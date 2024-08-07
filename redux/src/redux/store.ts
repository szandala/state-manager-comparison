// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState, initialAuthState } from "./slices/authSlice";
import filterReducer from "./slices/filterSlice";
import searchReducer from "./slices/searchSlice";
import sortReducer from "./slices/sortSlice";
import checkoutReducer, { initialCheckoutState } from "./slices/checkoutSlice";
import { getCheckoutIdFromLocalStorage } from "../lib/checkout";

// Function to load state from local storage
const loadState = <T>(key: string, initialState: T): T => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState) as T;
  } catch (err) {
    console.error(`Could not load ${key} state`, err);
    return initialState;
  }
};

// Function to save state to local storage
const saveState = <T>(key: string, state: T) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error(`Could not save ${key} state`, err);
  }
};

const preloadedAuthState = loadState<AuthState>("authState", initialAuthState);
const preloadedCheckoutId = getCheckoutIdFromLocalStorage();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    search: searchReducer,
    sort: sortReducer,
    checkout: checkoutReducer,
  },
  preloadedState: {
    auth: preloadedAuthState,
    checkout: {
      ...initialCheckoutState,
      checkoutId: preloadedCheckoutId,
    },
  },
});

store.subscribe(() => {
  saveState("authState", store.getState().auth);
  saveState("checkoutId", store.getState().checkout.checkoutId);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
