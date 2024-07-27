import React, { useState } from "react";
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

const CheckoutPage: React.FC = () => {
  const [selectedShipping, setSelectedShipping] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const handleShippingChange = (event: SelectChangeEvent) => {
    setSelectedShipping(event.target.value as string);
  };

  const handlePaymentChange = (event: SelectChangeEvent) => {
    setSelectedPayment(event.target.value as string);
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Checkout Items
              </Typography>
              {/* Map through your cart items here and display them */}
              <Typography variant="body1">Item 1 - $100</Typography>
              <Typography variant="body1">Item 2 - $50</Typography>
              <Typography variant="body1">Item 3 - $30</Typography>
              {/* Display the total amount */}
              <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                Total: $180
              </Typography>
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
                <TextField label="First Name" variant="outlined" fullWidth />
                <TextField label="Last Name" variant="outlined" fullWidth />
                <TextField label="Address" variant="outlined" fullWidth />
                <TextField label="City" variant="outlined" fullWidth />
                <TextField label="State" variant="outlined" fullWidth />
                <TextField label="ZIP Code" variant="outlined" fullWidth />
              </Box>
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
                  <MenuItem value={"standard"}>Standard - $5</MenuItem>
                  <MenuItem value={"express"}>Express - $10</MenuItem>
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
                  <MenuItem value={"creditCard"}>Credit Card</MenuItem>
                  <MenuItem value={"paypal"}>PayPal</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Finalize Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
