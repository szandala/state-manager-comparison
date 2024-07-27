import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  thumbnailUrl: string;
  price: {
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
}
const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  thumbnailUrl,
  price,
}) => {
  return (
    <Card
      component={Link}
      to={`/product/${id}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
      }}
    >
      <CardMedia
        component="img"
        image={thumbnailUrl}
        alt={name}
        sx={{ objectFit: "cover", height: 140 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price.stop.gross.amount} {price.stop.gross.currency}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
