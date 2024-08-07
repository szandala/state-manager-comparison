// src/stores/checkoutStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  setCheckoutId: (id: string | null) => void;
  setSelectedShipping: (id: string) => void;
  setSelectedPayment: (id: string) => void;
  setAddress: (address: Partial<Address>) => void;
  resetCheckout: () => void;
}

const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
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
      setCheckoutId: (id) => set({ checkoutId: id }),
      setSelectedShipping: (id) => set({ selectedShipping: id }),
      setSelectedPayment: (id) => set({ selectedPayment: id }),
      setAddress: (address) =>
        set((state) => ({
          address: { ...state.address, ...address },
        })),
      resetCheckout: () =>
        set({
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
        }),
    }),
    { name: "checkout" }
  )
);

export default useCheckoutStore;
