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
import { observer } from "mobx-react-lite";
import checkoutStore from "../../mobx/checkoutStore";

export const CheckoutPage: React.FC = observer(() => {
  const {
    selectedShipping,
    selectedPayment,
    address,
    checkoutId,
    setSelectedShipping,
    setSelectedPayment,
    setAddress,
  } = checkoutStore;
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
        setAddress({
          email: data.checkout!.email || address.email,
          firstName,
          lastName,
          streetAddress1,
          city,
          countryArea,
          postalCode,
        });
      }

      if (data.checkout.deliveryMethod) {
        setSelectedShipping(data.checkout.deliveryMethod.id);
      }

      if (data.checkout.availablePaymentGateways.length && !selectedPayment) {
        setSelectedPayment(data.checkout.availablePaymentGateways[0].id);
      }
    }
  }, [
    data,
    selectedPayment,
    address.email,
    setAddress,
    setSelectedShipping,
    setSelectedPayment,
  ]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({ [name]: value });
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
                setSelectedPayment(e.target.value as string)
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
});

export default CheckoutPage;
