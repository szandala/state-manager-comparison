import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const CheckoutItems = ({ checkout }: { checkout: any }) => (
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
);

export default CheckoutItems;
