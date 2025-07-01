// src/handlers.ts
import {
  useCheckoutAddressMutation,
  useCheckoutEmailUpdateMutation,
  useCheckoutCompleteMutation,
  useCheckoutUpdateShippingMutation,
  useCheckoutTransactionInitializeMutation,
} from "../../generated/graphql";
import { useAlert } from "../../providers/AlertProvider";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../contexts/CheckoutContext";

export const useHandlers = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { dispatch } = useCheckout();

  const [, updateAddress] = useCheckoutAddressMutation();
  const [, updateEmail] = useCheckoutEmailUpdateMutation();
  const [, completeCheckout] = useCheckoutCompleteMutation();
  const [, updateShippingMethod] = useCheckoutUpdateShippingMutation();
  const [, initializeTransaction] = useCheckoutTransactionInitializeMutation();

  const handleShippingChange = async (
    checkoutId: string,
    newShippingMethodId: string
  ) => {
    const { data } = await updateShippingMethod({
      checkoutId,
      shippingMethodId: newShippingMethodId,
    });

    if (data?.checkoutDeliveryMethodUpdate?.errors.length) {
      data.checkoutDeliveryMethodUpdate.errors.forEach((error) => {
        alert(error?.message ?? "", "error");
      });
    } else {
      alert("Shipping method updated successfully", "success");
      dispatch({
        type: "SET_SELECTED_SHIPPING",
        payload:
          data?.checkoutDeliveryMethodUpdate?.checkout?.deliveryMethod?.id ??
          "",
      });
    }
  };

  const handleSaveAddress = async (checkoutId: string, address: any) => {
    const { data: shippingData } = await updateAddress({
      checkoutId,
      address: {
        firstName: address.firstName,
        lastName: address.lastName,
        streetAddress1: address.streetAddress1,
        city: address.city,
        country: address.country,
        countryArea: address.countryArea,
        postalCode: address.postalCode,
      },
    });

    const { data: billingData } = await updateAddress({
      checkoutId,
      address: {
        firstName: address.firstName,
        lastName: address.lastName,
        streetAddress1: address.streetAddress1,
        city: address.city,
        country: address.country,
        countryArea: address.countryArea,
        postalCode: address.postalCode,
      },
    });

    if (
      shippingData?.checkoutShippingAddressUpdate?.errors.length ||
      billingData?.checkoutBillingAddressUpdate?.errors.length
    ) {
      [
        ...(shippingData?.checkoutShippingAddressUpdate?.errors ?? []),
        ...(billingData?.checkoutBillingAddressUpdate?.errors ?? []),
      ].forEach((error) => {
        console.log({error})
        alert(error?.message ?? "", "error");
      });
    } else {
      alert("Address updated successfully", "success");
    }
  };

  const handleSaveEmail = async (checkoutId: string, email: string) => {
    const { data } = await updateEmail({
      checkoutId,
      email,
    });

    if (data?.checkoutEmailUpdate?.errors.length) {
      data.checkoutEmailUpdate.errors.forEach((error) => {
        alert(error?.message ?? "", "error");
      });
    } else {
      alert("Email updated successfully", "success");
    }
  };

  const handleFinalizeCheckout = async (
    checkout: any,
    selectedPayment: string
  ) => {
    const checkoutId = checkout.id;
    if (
      checkout.authorizeStatus === "PARTIAL" ||
      checkout.authorizeStatus === "NONE"
    ) {
      const { data } = await initializeTransaction({
        checkoutId,
        paymentGateway: {
          id: selectedPayment,
          data: {
            event: {
              type: "CHARGE_SUCCESS",
              includePspReference: true,
            },
          },
        },
      });

      if (data?.transactionInitialize?.errors.length) {
        data.transactionInitialize.errors.forEach((error) => {
          alert(error?.message ?? "", "error");
        });
        return;
      }

      alert("Transaction initialized successfully", "success");
    }

    const { data: completeData } = await completeCheckout({
      checkoutId,
    });

    if (completeData?.checkoutComplete?.errors.length) {
      completeData.checkoutComplete.errors.forEach((error) => {
        alert(error?.message ?? "", "error");
      });
    } else {
      alert(
        "Checkout completed successfully! Order number: " +
          completeData?.checkoutComplete?.order?.number,
        "success"
      );
      dispatch({ type: "RESET_CHECKOUT" });
      navigate("/");
    }
  };

  return {
    handleShippingChange,
    handleSaveAddress,
    handleSaveEmail,
    handleFinalizeCheckout,
  };
};
