import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  SelectChangeEvent,
} from "@mui/material";
import {
  useGetCheckoutQuery,
  useCheckoutAddressMutation,
  useCheckoutEmailUpdateMutation,
  useCheckoutCompleteMutation,
  CountryCode,
} from "../generated/graphql";
import { getCheckoutFromLocalStorage } from "../lib/checkout";
import { useAlert } from "../providers/AlertProvider";

const CheckoutPage: React.FC = () => {
  const [selectedShipping, setSelectedShipping] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [checkout, setCheckout] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const alert = useAlert();

  const checkoutId = getCheckoutFromLocalStorage().id;

  const [{ data, error, fetching }] = useGetCheckoutQuery({
    variables: { id: checkoutId! },
    pause: !checkoutId,
  });

  const [, updateAddress] = useCheckoutAddressMutation();
  const [, updateEmail] = useCheckoutEmailUpdateMutation();
  const [, completeCheckout] = useCheckoutCompleteMutation();

  useEffect(() => {
    if (data?.checkout) {
      setCheckout(data.checkout);
      if (data.checkout.shippingMethods.length) {
        setSelectedShipping(data.checkout.shippingMethods[0].id);
      }
      if (data.checkout.availablePaymentGateways.length) {
        setSelectedPayment(data.checkout.availablePaymentGateways[0].id);
      }
    }
  }, [data]);

  const handleShippingChange = (event: SelectChangeEvent) => {
    setSelectedShipping(event.target.value as string);
  };

  const handlePaymentChange = (event: SelectChangeEvent) => {
    setSelectedPayment(event.target.value as string);
  };

  const handleSaveAddress = async () => {
    const addressInput = {
      firstName,
      lastName,
      streetAddress1: address,
      city,
      country: "US" as CountryCode, // Replace with the actual country code
      countryArea: state,
      postalCode: zipCode,
    };

    const { data: shippingData } = await updateAddress({
      checkoutId,
      address: addressInput,
    });

    const { data: billingData } = await updateAddress({
      checkoutId,
      address: addressInput,
    });

    if (
      shippingData?.checkoutShippingAddressUpdate?.errors.length ||
      billingData?.checkoutBillingAddressUpdate?.errors.length
    ) {
      alert("Error updating address");
    } else {
      alert("Address updated successfully");
    }
  };

  const handleSaveEmail = async () => {
    const { data } = await updateEmail({
      checkoutId,
      email,
    });

    if (data?.checkoutEmailUpdate?.errors.length) {
      alert("Error updating email");
    } else {
      alert("Email updated successfully");
    }
  };

  const handleFinalizeCheckout = async () => {
    const { data } = await completeCheckout({
      checkoutId,
    });

    if (data?.checkoutComplete?.errors.length) {
      alert("Error finalizing checkout");
    } else {
      alert(
        "Checkout completed successfully! Order number: " +
          data?.checkoutComplete?.order?.number
      );
    }
  };

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error loading checkout data: {error.message}</div>;

  return (
    <Container sx={{ paddingY: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Checkout Items
              </Typography>
              {checkout?.lines.map((line: any) => (
                <Box key={line.id} display="flex" alignItems="center" mb={2}>
                  <img
                    src={line.variant.product.thumbnail.url}
                    alt={line.variant.product.name}
                    style={{ width: 100 }}
                  />
                  <Box ml={2}>
                    <Typography variant="body1">
                      {line.variant.product.name} - {line.variant.name}
                    </Typography>
                    <Typography variant="body2">
                      {line.quantity} x {line.unitPrice.gross.amount}{" "}
                      {line.unitPrice.gross.currency}
                    </Typography>
                    <Typography variant="body2">
                      Total: {line.totalPrice.gross.amount}{" "}
                      {line.totalPrice.gross.currency}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                Total: {checkout?.totalPrice.gross.amount}{" "}
                {checkout?.totalPrice.gross.currency}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Shipping Method
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Shipping</InputLabel>
                <Select
                  value={selectedShipping}
                  onChange={handleShippingChange}
                  label="Shipping"
                >
                  {checkout?.shippingMethods.map((method: any) => (
                    <MenuItem key={method.id} value={method.id}>
                      {method.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Payment Method
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Payment</InputLabel>
                <Select
                  value={selectedPayment}
                  onChange={handlePaymentChange}
                  label="Payment"
                >
                  {checkout?.availablePaymentGateways.map((gateway: any) => (
                    <MenuItem key={gateway.id} value={gateway.id}>
                      {gateway.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Shipping Address
              </Typography>
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <TextField
                  label="ZIP Code"
                  variant="outlined"
                  fullWidth
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Save before selecting shipping:</Typography>
                  <Button variant="contained" onClick={handleSaveAddress}>
                    Save
                  </Button>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Save email:</Typography>
                  <Button variant="contained" onClick={handleSaveEmail}>
                    Save Email
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleFinalizeCheckout}
          >
            Finalize Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
