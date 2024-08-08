// src/components/Navbar.tsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useGetCollectionsQuery } from "../generated/graphql";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [{ data }] = useGetCollectionsQuery();
  const collections = data?.collections?.edges.map((edge) => edge.node) ?? [];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Wrocław University of Science and Technology
          </Typography>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Button component={Link} to="/" color="inherit">
              Products
            </Button>
            <Button color="inherit" onClick={handleMenu}>
              Collections
            </Button>
          </Box>
          <Menu
            id="collections-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {collections.map((collection) => (
              <MenuItem
                key={collection.id}
                component={Link}
                to={`/collection/${collection.id}`}
                onClick={handleClose}
              >
                {collection.name}
              </MenuItem>
            ))}
          </Menu>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton component={Link} to="/checkout" color="inherit">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton component={Link} to="/user" color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
