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
import {
  useGetProductByIdQuery,
  useCheckoutCreateMutation,
  useCheckoutLinesAddMutation,
} from "../generated/graphql";
import { useAlert } from "../providers/AlertProvider";
import useCheckoutStore from "../zustand/checkoutStore";

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const checkoutId = useCheckoutStore((state) => state.checkoutId);
  const setCheckoutId = useCheckoutStore((state) => state.setCheckoutId);

  const [{ data }] = useGetProductByIdQuery({
    variables: { id: productId!, channel: "default-channel" },
    pause: !productId,
  });
  const [, checkoutCreate] = useCheckoutCreateMutation();
  const [, checkoutLinesAdd] = useCheckoutLinesAddMutation();
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

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      alert("Please select a variant");
      return;
    }

    setLoading(true);

    try {
      if (checkoutId) {
        await addLineToCheckout(checkoutId);
      } else {
        await createNewCheckout();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addLineToCheckout = async (checkoutId: string) => {
    const { data: linesAddData } = await checkoutLinesAdd({
      id: checkoutId,
      lines: [
        {
          quantity: 1,
          variantId: selectedVariant,
        },
      ],
    });

    if (linesAddData?.checkoutLinesAdd?.errors?.length) {
      alert(
        "Error adding lines: " +
          linesAddData.checkoutLinesAdd.errors.map((e) => e.message).join(", "),
        "error"
      );
      await createNewCheckout();
    } else if (linesAddData?.checkoutLinesAdd?.checkout) {
      alert("Successfully added to cart", "success");
    }
  };

  const createNewCheckout = async () => {
    const { data: newCheckoutData } = await checkoutCreate({
      input: {
        channel: "default-channel",
        lines: [
          {
            quantity: 1,
            variantId: selectedVariant,
          },
        ],
      },
    });

    if (newCheckoutData?.checkoutCreate?.errors?.length) {
      alert(
        "Error creating checkout: " +
          newCheckoutData.checkoutCreate.errors
            .map((e) => e.message)
            .join(", "),
        "error"
      );
    } else if (newCheckoutData?.checkoutCreate?.checkout) {
      alert("Successfully added to cart", "success");
      setCheckoutId(newCheckoutData.checkoutCreate.checkout.id);
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? "Adding to cart..." : "Add to cart"}
          </Button>
          <Box sx={{ my: 2 }}>{renderDescription(product.description)}</Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
