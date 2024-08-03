// src/pages/CollectionPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import {
  TaxedMoneyRange,
  useGetProductsByCollectionQuery,
} from "../generated/graphql";

const CollectionPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();

  const [{ data }] = useGetProductsByCollectionQuery({
    variables: { collectionId: collectionId!, channel: "default-channel" },
    pause: !collectionId,
  });

  const products = data?.products?.edges.map((edge) => edge.node) ?? [];

  return (
    <Container>
      <Grid container spacing={2} paddingY={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={2} xl={2}>
            <ProductCard
              id={product.id}
              name={product.name}
              thumbnailUrl={product.thumbnail?.url ?? ""}
              price={product.pricing?.priceRange as TaxedMoneyRange}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CollectionPage;
