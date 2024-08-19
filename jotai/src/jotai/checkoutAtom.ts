import { atom } from "jotai";
import { CountryCode } from "../generated/graphql";
import {
  getCheckoutIdFromLocalStorage,
  saveCheckoutIdToLocalStorage,
} from "../lib/checkout";

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

export const initialCheckoutState: CheckoutState = {
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

const preloadedCheckoutId = getCheckoutIdFromLocalStorage();

export const checkoutAtom = atom({
  ...initialCheckoutState,
  checkoutId: preloadedCheckoutId,
});

checkoutAtom.onMount = (setCheckout) => {
  setCheckout((prevCheckout) => {
    if (prevCheckout.checkoutId) {
      saveCheckoutIdToLocalStorage(prevCheckout.checkoutId);
    }
    return prevCheckout;
  });
};
