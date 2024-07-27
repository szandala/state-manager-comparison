// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
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
import { fetchGraphQL } from "../graphql/client";
import { GET_COLLECTIONS } from "../graphql/queries";

interface Collection {
  id: string;
  name: string;
}

const Navbar: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data: any = await fetchGraphQL(GET_COLLECTIONS);
        const collections = data.collections.edges.map(
          (edge: any) => edge.node
        );
        setCollections(collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

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
            Politechnika Wrocławska
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
