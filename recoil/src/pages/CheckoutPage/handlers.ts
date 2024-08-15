import {
  useCheckoutAddressMutation,
  useCheckoutEmailUpdateMutation,
  useCheckoutCompleteMutation,
  useCheckoutUpdateShippingMutation,
  useCheckoutTransactionInitializeMutation,
} from "../../generated/graphql";
import { useAlert } from "../../providers/AlertProvider";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { checkoutState, clearCheckoutState } from "../../recoil/checkout";

export const useHandlers = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [checkout, setCheckout] = useRecoilState(checkoutState);

  const [, updateAddress] = useCheckoutAddressMutation();
  const [, updateEmail] = useCheckoutEmailUpdateMutation();
  const [, completeCheckout] = useCheckoutCompleteMutation();
  const [, updateShippingMethod] = useCheckoutUpdateShippingMutation();
  const [, initializeTransaction] = useCheckoutTransactionInitializeMutation();

  const handleShippingChange = async (newShippingMethodId: string) => {
    const { data } = await updateShippingMethod({
      checkoutId: checkout.checkoutId!,
      shippingMethodId: newShippingMethodId,
    });

    if (data?.checkoutDeliveryMethodUpdate?.errors.length) {
      data.checkoutDeliveryMethodUpdate.errors.forEach((error) => {
        alert(error?.message ?? "", "error");
      });
    } else {
      alert("Shipping method updated successfully", "success");
      setCheckout((prevState) => ({
        ...prevState,
        selectedShipping:
          data?.checkoutDeliveryMethodUpdate?.checkout?.deliveryMethod?.id ??
          "",
      }));
    }
  };

  const handleSaveAddress = async (address: any) => {
    const { data: shippingData } = await updateAddress({
      checkoutId: checkout.checkoutId!,
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
      checkoutId: checkout.checkoutId!,
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
        alert(error?.message ?? "", "error");
      });
    } else {
      alert("Address updated successfully", "success");
      setCheckout((prevState) => ({
        ...prevState,
        address: {
          email: prevState.address.email, // Keep the existing email
          ...address,
        },
      }));
    }
  };

  const handleSaveEmail = async (email: string) => {
    const { data } = await updateEmail({
      checkoutId: checkout.checkoutId!,
      email,
    });

    if (data?.checkoutEmailUpdate?.errors.length) {
      data.checkoutEmailUpdate.errors.forEach((error) => {
        alert(error?.message ?? "", "error");
      });
    } else {
      alert("Email updated successfully", "success");
      setCheckout((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          email,
        },
      }));
    }
  };

  const handleFinalizeCheckout = async (
    selectedPayment: string,
    checkout: any
  ) => {
    if (
      checkout.authorizeStatus === "PARTIAL" ||
      checkout.authorizeStatus === "NONE"
    ) {
      const { data } = await initializeTransaction({
        checkoutId: checkout.checkoutId!,
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
      checkoutId: checkout.checkoutId!,
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
      setCheckout(clearCheckoutState()); // Clear the checkout state after completion
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
