// src/pages/Homepage.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, Box } from "@mui/material";
import { fetchGraphQL } from "../graphql/client";
import { GET_PRODUCTS } from "../graphql/queries";
import ProductCard from "../components/ProductCard";
import { RootState } from "../redux/store";

interface Product {
  id: string;
  name: string;
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
}

const Homepage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const searchQuery = useSelector((state: RootState) => state.search.query);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: any = await fetchGraphQL(GET_PRODUCTS);
        const products = data.products.edges.map((edge: any) => edge.node);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Container>
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={2} xl={2}>
              <ProductCard
                id={product.id}
                name={product.name}
                thumbnailUrl={product.thumbnail.url}
                price={product.pricing.priceRange}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Homepage;
