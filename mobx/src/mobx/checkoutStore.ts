import { makeAutoObservable } from "mobx";
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

class CheckoutStore {
  checkoutId: string | null = null;
  selectedShipping: string = "";
  selectedPayment: string = "";
  address: Address = {
    email: "",
    firstName: "",
    lastName: "",
    streetAddress1: "",
    city: "",
    country: "US" as CountryCode,
    countryArea: "",
    postalCode: "",
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCheckoutId(id: string | null) {
    this.checkoutId = id;
  }

  setSelectedShipping(id: string) {
    this.selectedShipping = id;
  }

  setSelectedPayment(id: string) {
    this.selectedPayment = id;
  }

  setAddress(address: Partial<Address>) {
    this.address = { ...this.address, ...address };
  }

  resetCheckout() {
    this.checkoutId = null;
    this.selectedShipping = "";
    this.selectedPayment = "";
    this.address = {
      email: "",
      firstName: "",
      lastName: "",
      streetAddress1: "",
      city: "",
      country: "US" as CountryCode,
      countryArea: "",
      postalCode: "",
    };
  }

  loadCheckoutId() {
    const checkoutId = localStorage.getItem("checkoutId");
    if (checkoutId) {
      this.checkoutId = checkoutId;
    }
  }

  saveCheckoutId() {
    localStorage.setItem("checkoutId", this.checkoutId ?? "");
  }
}

const checkoutStore = new CheckoutStore();
checkoutStore.loadCheckoutId();
export default checkoutStore;
