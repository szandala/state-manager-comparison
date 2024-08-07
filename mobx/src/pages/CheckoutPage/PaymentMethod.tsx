import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

const PaymentMethod = ({
  selectedPayment,
  handlePaymentChange,
  checkout,
}: {
  selectedPayment: string;
  handlePaymentChange: (event: SelectChangeEvent) => void;
  checkout: any;
}) => (
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
);

export default PaymentMethod;
