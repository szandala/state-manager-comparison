// src/components/Footer.tsx
import React from "react";
import { Box, Container, Typography, Link, Grid } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: 3, marginTop: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Politechnika Wrocławska
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Wybrzeże Stanisława Wyspiańskiego 27, 50-370 Wrocław
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/" color="inherit" underline="none">
                Privacy Policy
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit" underline="none">
                Shipping Information
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit" underline="none">
                Terms of Service
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Box>
              <Link href="/" color="inherit" underline="none">
                Contact Us
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit" underline="none">
                Returns
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit" underline="none">
                FAQ
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
