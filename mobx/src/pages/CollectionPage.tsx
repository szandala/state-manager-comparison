import React from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { TaxedMoneyRange, useGetProductsQuery } from "../generated/graphql";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { observer } from "mobx-react-lite";
import filterStore from "../mobx/filterStore";
import searchStore from "../mobx/searchStore";
import sortStore from "../mobx/sortStore";

const CollectionPage: React.FC = observer(() => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const where = {
    ...filterStore.where,
    collection: {
      eq: collectionId,
    },
  };
  const search = searchStore.searchQuery;
  const order = sortStore.sortOrder;

  const [{ data }] = useGetProductsQuery({
    variables: {
      where,
      search,
      order,
    },
    pause: !collectionId,
  });

  const products = data?.products?.edges.map((edge) => edge.node) ?? [];

  return (
    <Box sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Container>
        <Toolbar />
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
    </Box>
  );
});

export default CollectionPage;
