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
import { useRecoilState } from "recoil";
import { checkoutState } from "../../recoil/checkout";

const CheckoutPage: React.FC = () => {
  const [checkoutData, setCheckoutData] = useRecoilState(checkoutState);
  const { selectedShipping, selectedPayment, address, checkoutId } =
    checkoutData;
  const {
    handleShippingChange,
    handleSaveAddress,
    handleSaveEmail,
    handleFinalizeCheckout,
  } = useHandlers();

  const [query] = useGetCheckoutQuery({
    variables: { id: checkoutId! },
    pause: !checkoutId,
  });

  console.log(query);

  const { data, fetching } = query;

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
        setCheckoutData((prevState) => ({
          ...prevState,
          address: {
            ...prevState.address,
            email: data.checkout?.email || prevState.address.email,
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
        setCheckoutData((prevState) => ({
          ...prevState,
          selectedShipping: data.checkout?.deliveryMethod?.id ?? "",
        }));
      }

      if (data.checkout.availablePaymentGateways.length && !selectedPayment) {
        setCheckoutData((prevState) => ({
          ...prevState,
          selectedPayment: data.checkout?.availablePaymentGateways[0].id ?? "",
        }));
      }
    }
  }, [data, selectedPayment, setCheckoutData]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckoutData((prevState) => ({
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
                handleShippingChange(e.target.value as string)
              }
              checkout={checkout}
            />
            <PaymentMethod
              selectedPayment={selectedPayment}
              handlePaymentChange={(e: SelectChangeEvent) =>
                setCheckoutData((prevState) => ({
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
              handleSaveAddress={() => handleSaveAddress(address)}
              handleSaveEmail={() => handleSaveEmail(address.email)}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => handleFinalizeCheckout(selectedPayment, checkout)}
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
