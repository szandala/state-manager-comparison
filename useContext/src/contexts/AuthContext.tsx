import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { AccountError } from "../generated/graphql";

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  errors: AccountError[] | null;
}

interface AuthAction {
  type: "SET_AUTH_STATE" | "SET_AUTH_ERRORS" | "CLEAR_AUTH_STATE";
  payload?: any;
}

const initialAuthState: AuthState = {
  token: null,
  refreshToken: null,
  errors: null,
};

const AuthContext = createContext<
  { state: AuthState; dispatch: React.Dispatch<AuthAction> } | undefined
>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_AUTH_STATE":
      return { ...state, ...action.payload };
    case "SET_AUTH_ERRORS":
      return { ...state, errors: action.payload };
    case "CLEAR_AUTH_STATE":
      return initialAuthState;
    default:
      return state;
  }
};

const loadAuthStateFromLocalStorage = (): AuthState => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return initialAuthState;
    }
    return JSON.parse(serializedState) as AuthState;
  } catch (err) {
    console.error("Could not load auth state", err);
    return initialAuthState;
  }
};

const saveAuthStateToLocalStorage = (state: AuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (err) {
    console.error("Could not save auth state", err);
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialAuthState,
    loadAuthStateFromLocalStorage
  );

  useEffect(() => {
    saveAuthStateToLocalStorage(state);
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
