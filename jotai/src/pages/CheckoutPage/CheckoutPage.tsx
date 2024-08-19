import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  SelectChangeEvent,
  Skeleton,
} from "@mui/material";
import { useGetCheckoutQuery } from "../../generated/graphql";
import { useHandlers } from "./handlers";
import CheckoutItems from "./CheckoutItems";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import { useAtom } from "jotai";
import { checkoutAtom } from "../../jotai/checkoutAtom";

const CheckoutPage: React.FC = () => {
  const [checkoutState, setCheckoutState] = useAtom(checkoutAtom);
  const { selectedShipping, selectedPayment, address, checkoutId } =
    checkoutState;

  const {
    handleShippingChange,
    handleSaveAddress,
    handleSaveEmail,
    handleFinalizeCheckout,
  } = useHandlers();

  const [{ data, fetching }] = useGetCheckoutQuery({
    variables: { id: checkoutId! },
    pause: !checkoutId,
  });

  useEffect(() => {
    if (data?.checkout) {
      if (data.checkout.shippingAddress) {
        const {
          firstName,
          lastName,
          streetAddress1,
          city,
          countryArea,
          postalCode,
        } = data.checkout.shippingAddress;

        setCheckoutState((prevState) => ({
          ...prevState,
          address: {
            ...prevState.address,
            email: data.checkout!.email || address.email,
            firstName,
            lastName,
            streetAddress1,
            city,
            countryArea,
            postalCode,
          },
        }));
      }

      if (data.checkout.deliveryMethod) {
        setCheckoutState((prevState) => ({
          ...prevState,
          selectedShipping: data.checkout!.deliveryMethod!.id,
        }));
      }

      if (data.checkout.availablePaymentGateways.length && !selectedPayment) {
        setCheckoutState((prevState) => ({
          ...prevState,
          selectedPayment: data.checkout!.availablePaymentGateways[0].id,
        }));
      }
    }
  }, [data, selectedPayment, address.email, setCheckoutState]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckoutState((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const checkout = data?.checkout;

  return (
    <Container sx={{ paddingY: 4 }}>
      {fetching && <Skeleton variant="rectangular" width="100%" height={118} />}
      {!checkout && !fetching && (
        <Typography variant="h5">No items in the checkout</Typography>
      )}
      {checkout && !fetching && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CheckoutItems checkout={checkout} />
            <ShippingMethod
              selectedShipping={selectedShipping}
              handleShippingChange={(e) =>
                handleShippingChange(checkout.id, e.target.value as string)
              }
              checkout={checkout}
            />
            <PaymentMethod
              selectedPayment={selectedPayment}
              handlePaymentChange={(e: SelectChangeEvent) =>
                setCheckoutState((prevState) => ({
                  ...prevState,
                  selectedPayment: e.target.value as string,
                }))
              }
              checkout={checkout}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ShippingAddress
              address={address}
              handleAddressChange={handleAddressChange}
              handleSaveAddress={() => handleSaveAddress(checkout.id, address)}
              handleSaveEmail={() =>
                handleSaveEmail(checkout.id, address.email)
              }
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => handleFinalizeCheckout(checkout, selectedPayment)}
            >
              Finalize Checkout
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CheckoutPage;
