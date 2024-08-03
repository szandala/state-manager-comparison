import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { useGetProductByIdQuery } from "../generated/graphql";

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedVariant, setSelectedVariant] = useState<string>("");

  const [{ data }] = useGetProductByIdQuery({
    variables: { id: productId!, channel: "default-channel" },
    pause: !productId,
  });
  const product = data?.product;

  const renderDescription = (description: string) => {
    try {
      const parsedDescription = JSON.parse(description);
      return parsedDescription.blocks.map((block: any) => (
        <Typography
          key={block.id}
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: block.data.text,
          }}
        />
      ));
    } catch (error) {
      console.error("Error parsing description:", error);
      return <Typography variant="body1">{description}</Typography>;
    }
  };

  if (!product) {
    return null;
  }

  return (
    <Container>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <img
            src={product.thumbnail?.url ?? ""}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1">
            {product.name}
          </Typography>
          <Typography variant="h6" component="h2">
            {product.pricing?.priceRange?.start?.gross.amount}{" "}
            {product.pricing?.priceRange?.start?.gross.currency} -{" "}
            {product.pricing?.priceRange?.stop?.gross.amount}{" "}
            {product.pricing?.priceRange?.stop?.gross.currency}
          </Typography>
          <Box sx={{ my: 2 }}>
            <Typography variant="body1">Select Variant:</Typography>
            <Select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value as string)}
              displayEmpty
              fullWidth
            >
              {product.variants?.map((variant) => (
                <MenuItem key={variant.id} value={variant.id}>
                  {variant.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Button variant="contained" color="primary" fullWidth>
            Add to cart
          </Button>
          <Box sx={{ my: 2 }}>{renderDescription(product.description)}</Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
