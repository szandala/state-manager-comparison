import React from "react";
import { Container, Grid, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { TaxedMoneyRange, useGetProductsQuery } from "../generated/graphql";

const Homepage: React.FC = () => {
  const [{ data }] = useGetProductsQuery();

  const products = data?.products?.edges.map((edge) => edge.node) ?? [];

  return (
    <Box sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Container>
        <Toolbar />
        <Grid container spacing={2}>
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
    </Box>
  );
};

export default Homepage;
