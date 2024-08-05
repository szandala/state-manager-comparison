import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState, initialAuthState } from "./slices/authSlice";
import filterReducer from "./slices/filterSlice";
import searchReducer from "./slices/searchSlice";
import sortReducer from "./slices/sortSlice";

// Function to load auth state from local storage
const loadAuthState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return initialAuthState; // Use initial state if no state is found in local storage
    }
    return JSON.parse(serializedState) as AuthState;
  } catch (err) {
    console.error("Could not load auth state", err);
    return initialAuthState; // Use initial state if an error occurs
  }
};

// Function to save auth state to local storage
const saveAuthState = (state: AuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (err) {
    console.error("Could not save auth state", err);
  }
};

const preloadedAuthState = loadAuthState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    search: searchReducer,
    sort: sortReducer,
  },
  preloadedState: { auth: preloadedAuthState },
});

// Subscribe to store updates and save the auth state to local storage
store.subscribe(() => {
  saveAuthState(store.getState().auth);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
