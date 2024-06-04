import React, { useEffect, useState } from "react";
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
import { fetchGraphQL } from "../graphql/client";
import { GET_PRODUCT_BY_ID } from "../graphql/queries";

interface Variant {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    url: string;
  };
  pricing: {
    priceRange: {
      start: {
        gross: {
          amount: number;
          currency: string;
        };
      };
      stop: {
        gross: {
          amount: number;
          currency: string;
        };
      };
    };
  };
  variants: Variant[];
}

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data: any = await fetchGraphQL(GET_PRODUCT_BY_ID, {
          id: productId,
          channel: "default-channel",
        });
        setProduct(data.product);
        if (data.product.variants.length > 0) {
          setSelectedVariant(data.product.variants[0].id);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

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
            src={product.thumbnail.url}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1">
            {product.name}
          </Typography>
          <Typography variant="h6" component="h2">
            {product.pricing.priceRange.start.gross.amount}{" "}
            {product.pricing.priceRange.start.gross.currency} -{" "}
            {product.pricing.priceRange.stop.gross.amount}{" "}
            {product.pricing.priceRange.stop.gross.currency}
          </Typography>
          <Box sx={{ my: 2 }}>
            <Typography variant="body1">Select Size:</Typography>
            <Select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value as string)}
              displayEmpty
              fullWidth
            >
              {product.variants.map((variant) => (
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
