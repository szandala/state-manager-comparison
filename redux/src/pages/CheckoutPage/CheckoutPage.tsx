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
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  setSelectedShipping,
  setSelectedPayment,
  setAddress,
} from "../../redux/slices/checkoutSlice";

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedShipping, selectedPayment, address, checkoutId } =
    useSelector((state: RootState) => state.checkout);
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
        dispatch(
          setAddress({
            email: data.checkout!.email || address.email,
            firstName,
            lastName,
            streetAddress1,
            city,
            countryArea,
            postalCode,
          })
        );
      }

      if (data.checkout.deliveryMethod) {
        dispatch(setSelectedShipping(data.checkout.deliveryMethod.id));
      }

      if (data.checkout.availablePaymentGateways.length && !selectedPayment) {
        dispatch(
          setSelectedPayment(data.checkout.availablePaymentGateways[0].id)
        );
      }
    }
  }, [data, selectedPayment, address.email, dispatch]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setAddress({ [name]: value }));
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
                dispatch(setSelectedPayment(e.target.value as string))
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
