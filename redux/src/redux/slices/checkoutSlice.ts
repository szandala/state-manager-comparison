// src/redux/slices/checkoutSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountryCode } from "../../generated/graphql";

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

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialCheckoutState,
  reducers: {
    setCheckoutId(state, action: PayloadAction<string | null>) {
      state.checkoutId = action.payload;
    },
    setSelectedShipping(state, action: PayloadAction<string>) {
      state.selectedShipping = action.payload;
    },
    setSelectedPayment(state, action: PayloadAction<string>) {
      state.selectedPayment = action.payload;
    },
    setAddress(state, action: PayloadAction<Partial<Address>>) {
      state.address = { ...state.address, ...action.payload };
    },
    resetCheckout: () => initialCheckoutState,
  },
});

export const {
  setCheckoutId,
  setSelectedShipping,
  setSelectedPayment,
  setAddress,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
export type { CheckoutState };
