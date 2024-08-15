import React from "react";
import { Container, Grid, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { TaxedMoneyRange, useGetProductsQuery } from "../generated/graphql";
import { useRecoilValue } from "recoil";
import { filterState, selectFilterWhere } from "../recoil/filter";
import { searchState, selectSearchQuery } from "../recoil/search";
import { selectSortOrder, sortState } from "../recoil/sort";

const Homepage: React.FC = () => {
  // Get filter, search, and sort state from Recoil
  const filter = useRecoilValue(filterState);
  const search = useRecoilValue(searchState);
  const sort = useRecoilValue(sortState);

  // Derive query variables from Recoil selectors
  const where = selectFilterWhere(filter);
  const searchQuery = selectSearchQuery(search);
  const order = selectSortOrder(sort);

  // Fetch products based on the query variables
  const [{ data }] = useGetProductsQuery({
    variables: { where, search: searchQuery, order },
  });

  // Extract product data or set an empty array as fallback
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
