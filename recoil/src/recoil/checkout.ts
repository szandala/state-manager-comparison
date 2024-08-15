import { atom } from "recoil";
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

export const checkoutState = atom<CheckoutState>({
  key: "checkoutState",
  default: {
    checkoutId: localStorage.getItem("checkoutId"),
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
  },
});

export const setCheckoutId = (id: string | null) => {
  localStorage.setItem("checkoutId", id ?? "");
  return id;
};

export const clearCheckoutState = () => {
  localStorage.removeItem("checkoutId");
  return {
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
};
