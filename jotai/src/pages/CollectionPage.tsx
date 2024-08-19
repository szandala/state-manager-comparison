import React from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { TaxedMoneyRange, useGetProductsQuery } from "../generated/graphql";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { useAtom } from "jotai";
import { selectFilterWhere } from "../jotai/filterAtom";
import { selectSearch } from "../jotai/searchAtom";
import { selectSortOrder } from "../jotai/sortAtom";

const CollectionPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [where] = useAtom(selectFilterWhere);
  const [search] = useAtom(selectSearch);
  const [order] = useAtom(selectSortOrder);

  const [{ data }] = useGetProductsQuery({
    variables: {
      where: {
        ...where,
        collection: {
          eq: collectionId,
        },
      },
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
};

export default CollectionPage;
