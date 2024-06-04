// src/pages/CollectionPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Box } from "@mui/material";
import { fetchGraphQL } from "../graphql/client";
import { GET_PRODUCTS_BY_COLLECTION } from "../graphql/queries";
import ProductCard from "../components/ProductCard";

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

const CollectionPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: any = await fetchGraphQL(GET_PRODUCTS_BY_COLLECTION, {
          collectionId,
          channel: "default-channel",
        });
        const products = data.products.edges.map((edge: any) => edge.node);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [collectionId]);

  return (
    <Container>
      <Grid container spacing={2} paddingY={4}>
        {products.map((product) => (
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
  );
};

export default CollectionPage;
