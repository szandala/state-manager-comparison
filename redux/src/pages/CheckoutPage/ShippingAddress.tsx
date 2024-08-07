import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";

const ShippingAddress = ({
  address,
  handleAddressChange,
  handleSaveAddress,
  handleSaveEmail,
}: {
  address: any;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveAddress: () => void;
  handleSaveEmail: () => void;
}) => (
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
          name="email"
          value={address.email}
          onChange={handleAddressChange}
        />
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          name="firstName"
          value={address.firstName}
          onChange={handleAddressChange}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="lastName"
          value={address.lastName}
          onChange={handleAddressChange}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          name="streetAddress1"
          value={address.streetAddress1}
          onChange={handleAddressChange}
        />
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          name="city"
          value={address.city}
          onChange={handleAddressChange}
        />
        <TextField
          label="State"
          variant="outlined"
          fullWidth
          name="countryArea"
          value={address.countryArea}
          onChange={handleAddressChange}
        />
        <TextField
          label="ZIP Code"
          variant="outlined"
          fullWidth
          name="postalCode"
          value={address.postalCode}
          onChange={handleAddressChange}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button variant="contained" onClick={handleSaveAddress}>
            Save address
          </Button>
          <Button variant="contained" onClick={handleSaveEmail}>
            Save email
          </Button>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default ShippingAddress;
