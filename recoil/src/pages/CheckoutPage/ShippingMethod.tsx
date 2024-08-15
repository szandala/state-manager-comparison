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

const ShippingMethod = ({
  selectedShipping,
  handleShippingChange,
  checkout,
}: {
  selectedShipping: string;
  handleShippingChange: (event: SelectChangeEvent) => void;
  checkout: any;
}) => (
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
);

export default ShippingMethod;
