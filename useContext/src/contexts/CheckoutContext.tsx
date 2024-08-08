import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { CountryCode } from "../generated/graphql";

interface Address {
  email: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  city: string;
  country: CountryCode;
  countryArea: string;
  postalCode: string;
}

interface CheckoutState {
  checkoutId: string | null;
  selectedShipping: string;
  selectedPayment: string;
  address: Address;
}

interface CheckoutAction {
  type:
    | "SET_CHECKOUT_ID"
    | "SET_SELECTED_SHIPPING"
    | "SET_SELECTED_PAYMENT"
    | "SET_ADDRESS"
    | "RESET_CHECKOUT";
  payload?: any;
}

const initialCheckoutState: CheckoutState = {
  checkoutId: null,
  selectedShipping: "",
  selectedPayment: "",
  address: {
    email: "",
    firstName: "",
    lastName: "",
    streetAddress1: "",
    city: "",
    country: "US" as CountryCode,
    countryArea: "",
    postalCode: "",
  },
};

const CheckoutContext = createContext<
  { state: CheckoutState; dispatch: React.Dispatch<CheckoutAction> } | undefined
>(undefined);

const checkoutReducer = (
  state: CheckoutState,
  action: CheckoutAction
): CheckoutState => {
  switch (action.type) {
    case "SET_CHECKOUT_ID":
      return { ...state, checkoutId: action.payload };
    case "SET_SELECTED_SHIPPING":
      return { ...state, selectedShipping: action.payload };
    case "SET_SELECTED_PAYMENT":
      return { ...state, selectedPayment: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: { ...state.address, ...action.payload } };
    case "RESET_CHECKOUT":
      return initialCheckoutState;
    default:
      return state;
  }
};

const loadCheckoutIdFromLocalStorage = (): string | null => {
  try {
    const checkoutId = localStorage.getItem("checkoutId");
    return checkoutId;
  } catch (err) {
    console.error("Could not load checkout ID from local storage", err);
    return null;
  }
};

const saveCheckoutIdToLocalStorage = (checkoutId: string | null) => {
  try {
    if (checkoutId) {
      localStorage.setItem("checkoutId", checkoutId);
    } else {
      localStorage.removeItem("checkoutId");
    }
  } catch (err) {
    console.error("Could not save checkout ID to local storage", err);
  }
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    checkoutReducer,
    initialCheckoutState,
    (initial) => {
      const checkoutId = loadCheckoutIdFromLocalStorage();
      return { ...initial, checkoutId };
    }
  );

  useEffect(() => {
    saveCheckoutIdToLocalStorage(state.checkoutId);
  }, [state.checkoutId]);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
